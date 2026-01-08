'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  category: string // Note: API might not return this, check usage
  publishedAt: string // Note: API returns createdAt
  createdAt: string
  author: string
  readTime: string // Note: API doesn't return this, calculated on client usually
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = 9

  useEffect(() => {
    fetchPosts()
  }, [page])

  const fetchPosts = async () => {
    try {
      const skip = (page - 1) * limit
      const res = await fetch(`/api/blog?skip=${skip}&limit=${limit}&published=true`)
      const data = await res.json()

      if (page === 1) {
        setPosts(data.posts)
      } else {
        // Filter out potential duplicates just in case
        setPosts(prev => {
          const newPosts = data.posts.filter((p: BlogPost) => !prev.some(existing => existing._id === p._id))
          return [...prev, ...newPosts]
        })
      }
      setHasMore(data.hasMore)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const calculateReadTime = (text: string) => {
    // Simple fallback if readTime isn't in API
    const wordsPerMinute = 200;
    const noOfWords = text ? text.split(/\s/g).length : 0;
    return Math.ceil(noOfWords / wordsPerMinute);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />

      {/* Header / Editorial Title */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-b border-white/10">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
          Journal
        </h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl">
          Dijital inovasyon, tasarım trendleri ve teknoloji dünyasından içgörüler.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900 mb-6">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
                      Görsel Yok
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs font-medium uppercase tracking-widest text-[#AF9C64]">
                    <span>{post.category || 'Teknoloji'}</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span>{post.readTime || '3'} DK OKUMA</span>
                  </div>
                  <h2 className="text-2xl font-light leading-snug text-white group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        {hasMore && !loading && (
          <div className="mt-24 text-center">
            <button
              onClick={() => setPage(p => p + 1)}
              className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 hover:border-white transition-all"
            >
              Daha Fazla
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-24 text-center text-gray-500 text-sm animate-pulse">
            Yükleniyor...
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}