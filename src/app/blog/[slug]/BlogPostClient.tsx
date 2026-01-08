'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ShareIcon, CheckIcon } from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface BlogPost {
  _id: string
  title: string
  content: string
  excerpt: string
  featuredImage: string
  slug: string
  tags: string[]
  published: boolean
  author: string
  createdAt: string
  views: number
}

export default function BlogPostClient() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    try {
      const res = await fetch(`/api/blog?slug=${slug}&published=true`)
      const data = await res.json()
      if (data.posts && data.posts.length > 0) {
        setPost(data.posts[0])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">Yükleniyor...</div>
  if (!post) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">Yazı bulunamadı.</div>

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <Navigation />

      <article className="pb-24">
        {/* Hero / Header */}
        <div className="pt-32 pb-12 max-w-4xl mx-auto px-6 text-center">
          <Link href="/blog" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#AF9C64] mb-8 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Geri Dön
          </Link>

          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 font-light tracking-wide uppercase">
            <span>{new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>{post.author.split('@')[0]}</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.featuredImage && (
          <div className="w-full max-w-7xl mx-auto px-6 mb-16">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-900">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-p:font-light prose-p:leading-loose prose-a:text-[#AF9C64] hover:prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
          />

          {/* Tags & Share */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs border border-white/20 px-3 py-1 rounded-full text-gray-400 hover:border-white hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ShareIcon className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı' : 'Paylaş'}</span>
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}