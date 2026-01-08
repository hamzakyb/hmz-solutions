'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, ClockIcon, EyeIcon, UserIcon, PaperAirplaneIcon, TagIcon, MagnifyingGlassIcon, FunnelIcon, BookOpenIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Chatbot from '@/components/Chatbot'
import WhatsAppButton from '@/components/WhatsAppButton'

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
  updatedAt: string
  views: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [skip, setSkip] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [allTags, setAllTags] = useState<string[]>([])
  const limit = 20

  const filterPosts = useCallback(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedTag])

  const fetchPosts = useCallback(async (loadMore = false) => {
    try {
      const currentSkip = loadMore ? skip : 0
      const response = await fetch(`/api/blog?published=true&limit=${limit}&skip=${currentSkip}`)
      const data = await response.json()

      if (response.ok) {
        if (loadMore) {
          setPosts(prev => [...prev, ...data.posts])
        } else {
          setPosts(data.posts)
          // Extract all unique tags
          const tags = [...new Set(data.posts.flatMap((post: BlogPost) => post.tags))] as string[]
          setAllTags(tags)
        }
        setHasMore(data.hasMore)
        setSkip(currentSkip + data.posts.length)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }, [skip, limit])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    filterPosts()
  }, [filterPosts])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const getFeaturedPosts = () => {
    return posts.slice(0, 3)
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-white pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading Header with Gold Accents */}
            <div className="mb-12">
              <div className="h-8 rounded-xl mb-6 animate-pulse w-1/3"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                }}></div>
              <div className="h-16 rounded-2xl mb-8 animate-pulse"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl p-6 animate-pulse"
                  style={{
                    background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                  }}>
                  <div className="w-full h-48 rounded-xl mb-4"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                    }}></div>
                  <div className="h-4 rounded mb-2"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                    }}></div>
                  <div className="h-4 rounded w-3/4 mb-4"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                    }}></div>
                  <div className="h-3 rounded w-1/2"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                    }}></div>

                  {/* Gold accent loading indicator */}
                  <div className="mt-4 h-6 rounded-full animate-pulse"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2), rgba(175, 160, 98, 0.2))',
                      backgroundSize: '200% 100%',
                      animation: 'loading 1.5s ease-in-out infinite'
                    }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add loading animation styles */}
        <style jsx>{`
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        {/* Enhanced Hero Section */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(175,160,98,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(175,160,98,0.08),transparent_50%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-yellow-100 backdrop-blur-xl border border-yellow-200 rounded-full text-yellow-800 text-sm mb-8 group hover:bg-yellow-200 transition-all duration-300"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: 'rgba(175, 160, 98, 0.8)' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: 'rgb(175, 160, 98)' }}></span>
                </span>
                <SparklesIcon className="w-4 h-4 mr-2" style={{ color: 'rgb(175, 160, 98)' }} />
                Teknoloji ile Geleceği Şekillendirmek
                <ChartBarIcon className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" style={{ color: 'rgb(175, 160, 98)' }} />
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight flex justify-center items-center flex-wrap gap-2"
              >
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Teknoloji
                </span>
                <span className="gold-gradient-text inline-block transform hover:scale-105 transition-transform duration-300 relative">
                  Yolculuğu
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Nevşehir ve Kapadokya bölgesindeki dijital dönüşüm hikayelerini, teknoloji trendlerini ve yazılım dünyasındaki yenilikleri sizlerle paylaşıyoruz.
                <span style={{ color: 'rgb(175, 160, 98)' }}> Yerel çözümlerle</span> Türkiye&apos;nin dijital geleceğini birlikte inşa ediyoruz.
              </motion.p>

              {/* Enhanced Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white backdrop-blur-2xl border border-gray-200 rounded-2xl p-6 shadow-2xl">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1 relative group">
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
                        style={{
                          background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                        }} />
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors"
                          style={{
                            color: 'rgb(175, 160, 98)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'rgb(175, 160, 98)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgb(107, 114, 128)'
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Hangi konuyu öğrenmek istersiniz?"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all duration-300 hover:bg-yellow-50"
                          onFocus={(e) => {
                            e.currentTarget.style.outline = 'none'
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(175, 160, 98, 0.5)'
                            e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.5)'
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.style.borderColor = 'rgb(209, 213, 219)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div className="lg:w-64 relative group">
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
                        style={{
                          background: 'linear-gradient(to right, rgba(195, 180, 118, 0.2), rgba(175, 160, 98, 0.2))'
                        }} />
                      <div className="relative">
                        <FunnelIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors"
                          style={{
                            color: 'rgb(175, 160, 98)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'rgb(175, 160, 98)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgb(107, 114, 128)'
                          }}
                        />
                        <select
                          value={selectedTag}
                          onChange={(e) => setSelectedTag(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none transition-all duration-300 hover:bg-yellow-50 appearance-none cursor-pointer"
                          onFocus={(e) => {
                            e.currentTarget.style.outline = 'none'
                            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(175, 160, 98, 0.5)'
                            e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.5)'
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = 'none'
                            e.currentTarget.style.borderColor = 'rgb(209, 213, 219)'
                          }}
                        >
                          <option value="" className="bg-white">Tüm Kategoriler</option>
                          {allTags.map((tag) => (
                            <option key={tag} value={tag} className="bg-white">
                              {tag}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Active Filters with Animation */}
                  <AnimatePresence>
                    {(searchTerm || selectedTag) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-yellow-200"
                      >
                        {searchTerm && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="inline-flex items-center px-3 py-2 rounded-full text-sm transition-all cursor-pointer group"
                            style={{
                              background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))',
                              borderColor: 'rgba(175, 160, 98, 0.3)',
                              color: 'rgba(120, 107, 63, 1)',
                              border: '1px solid'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                            }}
                          >
                            <MagnifyingGlassIcon className="w-3 h-3 mr-2" />
                            Arama: <span className="font-medium ml-1">&ldquo;{searchTerm}&rdquo;</span>
                            <button
                              onClick={() => setSearchTerm('')}
                              className="ml-2 transition-colors w-4 h-4 flex items-center justify-center rounded-full"
                              style={{
                                color: 'rgba(120, 107, 63, 1)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'rgba(100, 87, 43, 1)'
                                e.currentTarget.style.backgroundColor = 'rgba(175, 160, 98, 0.2)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(120, 107, 63, 1)'
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }}
                            >
                              ×
                            </button>
                          </motion.span>
                        )}
                        {selectedTag && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="inline-flex items-center px-3 py-2 rounded-full text-sm hover:bg-yellow-200 transition-all cursor-pointer group"
                            style={{
                              background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))',
                              borderColor: 'rgba(175, 160, 98, 0.3)',
                              color: 'rgba(120, 107, 63, 1)',
                              border: '1px solid'
                            }}
                          >
                            <TagIcon className="w-3 h-3 mr-2" />
                            Kategori: <span className="font-medium ml-1">{selectedTag}</span>
                            <button
                              onClick={() => setSelectedTag('')}
                              className="ml-2 transition-colors w-4 h-4 flex items-center justify-center rounded-full"
                              style={{
                                color: 'rgba(120, 107, 63, 1)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'rgba(100, 87, 43, 1)'
                                e.currentTarget.style.backgroundColor = 'rgba(175, 160, 98, 0.2)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(120, 107, 63, 1)'
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }}
                            >
                              ×
                            </button>
                          </motion.span>
                        )}
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          onClick={() => {
                            setSearchTerm('')
                            setSelectedTag('')
                          }}
                          className="inline-flex items-center px-3 py-2 rounded-full text-sm transition-all"
                          style={{
                            background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))',
                            borderColor: 'rgba(175, 160, 98, 0.3)',
                            color: 'rgba(120, 107, 63, 1)',
                            border: '1px solid'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.3), rgba(195, 180, 118, 0.3))'
                            e.currentTarget.style.color = 'rgba(100, 87, 43, 1)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                            e.currentTarget.style.color = 'rgba(120, 107, 63, 1)'
                          }}
                        >
                          Temizle
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Blog Posts Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="backdrop-blur-2xl border border-gray-200 rounded-3xl p-16 max-w-lg mx-auto"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                }}>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gray-300"
                  style={{
                    background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))',
                    borderColor: 'rgba(175, 160, 98, 0.3)'
                  }}
                >
                  <MagnifyingGlassIcon className="w-10 h-10"
                    style={{ color: 'rgb(175, 160, 98)' }} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4 section-title-gold">
                  {searchTerm || selectedTag ? 'Sonuç bulunamadı' : 'Henüz blog yazısı bulunmuyor'}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {searchTerm || selectedTag
                    ? 'Arama kriterlerinizi değiştirmeyi veya farklı anahtar kelimeler kullanmayı deneyin'
                    : 'Yakında ilginç içeriklerle burada olacağız!'}
                </p>
                {(searchTerm || selectedTag) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedTag('')
                    }}
                    className="text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(to right, rgb(175, 160, 98), rgb(195, 180, 118))',
                      boxShadow: '0 8px 25px rgba(175, 160, 98, 0.25)'
                    }}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to right, rgb(195, 180, 118), rgb(155, 140, 78))'
                      }} />
                    <span className="relative flex items-center space-x-2">
                      <BookOpenIcon className="w-5 h-5" />
                      <span className="gold-gradient-text">Tüm Yazıları Gör</span>
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Featured Posts */}
              {!searchTerm && !selectedTag && posts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-16"
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgb(175, 160, 98), rgb(195, 180, 118))'
                      }}>
                      <SparklesIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="section-title-gold">Öne Çıkanlar</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {getFeaturedPosts().map((post, index) => (
                      <motion.article
                        key={post._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div className="bg-white backdrop-blur-2xl border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-300 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-600/10 relative">
                            {/* Featured Badge */}
                            <div className="absolute top-4 left-4 z-10">
                              <div className="bg-gradient-to-r text-white text-xs font-bold px-2 py-1 rounded-full"
                                style={{
                                  background: 'linear-gradient(to right, rgb(175, 160, 98), rgb(195, 180, 118))'
                                }}>
                                <SparklesIcon className="w-3 h-3 inline mr-1" />
                                Öne Çıkan
                              </div>
                            </div>

                            {/* Image */}
                            {post.featuredImage && (
                              <div className="relative h-56 overflow-hidden">
                                <Image
                                  src={post.featuredImage}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Reading Time */}
                                <div className="absolute bottom-4 right-4">
                                  <span className="inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm text-white/90 rounded-full text-xs font-medium">
                                    <ClockIcon className="w-3 h-3 mr-1" />
                                    {calculateReadingTime(post.content)} dakika
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="p-6">
                              {/* Tags */}
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <button
                                      key={tagIndex}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedTag(tag)
                                      }}
                                      className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-full hover:bg-yellow-200 transition-all duration-300"
                                    >
                                      <TagIcon className="w-3 h-3 mr-1" />
                                      {tag}
                                    </button>
                                  ))}
                                </div>
                              )}

                              {/* Title */}
                              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2 gold-gradient-text">
                                {post.title}
                              </h2>

                              {/* Excerpt */}
                              <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                                {post.excerpt}
                              </p>

                              {/* Meta Info */}
                              <div className="flex items-center justify-between text-xs text-gray-600">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <CalendarIcon className="w-3 h-3" />
                                    <span>{formatDate(post.createdAt)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <EyeIcon className="w-3 h-3" />
                                    <span>{post.views} görüntüleme</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-1 text-yellow-600 group-hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'rgba(155, 140, 78)'
                                    e.currentTarget.style.opacity = '1'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'rgb(175, 160, 98)'
                                    e.currentTarget.style.opacity = '0'
                                  }}>
                                  <span className="font-medium">Oku</span>
                                  <PaperAirplaneIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* All Posts Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Stats Bar - Moved to better position */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="bg-white backdrop-blur-2xl border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <BookOpenIcon className="w-4 h-4" style={{ color: 'rgb(175, 160, 98)' }} />
                          <span className="text-gray-700 text-sm">
                            <span className="text-gray-900 font-medium">{filteredPosts.length}</span> yazı bulundu
                            {searchTerm && <span className="ml-1" style={{ color: 'rgb(175, 160, 98)' }}>&ldquo;{searchTerm}&rdquo; için</span>}
                            {selectedTag && <span className="ml-1" style={{ color: 'rgb(175, 160, 98)' }}>&ldquo;{selectedTag}&rdquo; kategorisinde</span>}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <ChartBarIcon className="w-4 h-4" style={{ color: 'rgb(175, 160, 98)' }} />
                            <span className="text-gray-700 text-sm">
                              <span className="font-medium" style={{ color: 'rgb(175, 160, 98)' }}>{posts.reduce((acc, post) => acc + post.views, 0)}</span> toplam görüntüleme
                            </span>
                          </div>
                        </div>
                      </div>
                      {(searchTerm || selectedTag) && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSearchTerm('')
                            setSelectedTag('')
                          }}
                          className="transition-colors text-sm rounded-full border px-3 py-1"
                          style={{
                            background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))',
                            borderColor: 'rgba(175, 160, 98, 0.3)',
                            color: 'rgb(120, 107, 63)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                            e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.5)'
                            e.currentTarget.style.color = 'rgb(100, 87, 43)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                            e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                            e.currentTarget.style.color = 'rgb(120, 107, 63)'
                          }}
                        >
                          <span className="gold-gradient-text">Tüm Yazıları Gör</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>

                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgb(175, 160, 98), rgb(195, 180, 118))'
                    }}>
                    <BookOpenIcon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="section-title-gold">Tüm Yazılar</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(searchTerm || selectedTag ? filteredPosts : posts.slice(3)).map((post, index) => (
                    <motion.article
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="bg-white backdrop-blur-2xl border rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                          style={{
                            borderColor: 'rgba(175, 160, 98, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                            e.currentTarget.style.boxShadow = '0 25px 50px rgba(175, 160, 98, 0.1)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                            e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)'
                          }}>
                          {/* Featured Image */}
                          {post.featuredImage && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                              {/* Reading Time Estimate */}
                              <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm text-white/80 rounded-full text-xs">
                                  <ClockIcon className="w-3 h-3 mr-1" />
                                  {calculateReadingTime(post.content)} dakika
                                </span>
                              </div>

                              {/* View Count */}
                              <div className="absolute top-4 right-4">
                                <span className="inline-flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm text-white/80 rounded-full text-xs">
                                  <EyeIcon className="w-3 h-3 mr-1" />
                                  {post.views} görüntüleme
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="p-6">
                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                  <button
                                    key={tagIndex}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setSelectedTag(tag)
                                    }}
                                    className="inline-flex items-center px-2 py-1 text-xs bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-full hover:bg-yellow-200 transition-all duration-300"
                                  >
                                    <TagIcon className="w-3 h-3 mr-1" />
                                    {tag}
                                  </button>
                                ))}
                                {post.tags.length > 2 && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs text-gray-400 rounded-full">
                                    +{post.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Title */}
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2 gold-gradient-text">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span>{formatDate(post.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <UserIcon className="w-3 h-3" />
                                  <span>{post.author.split('@')[0]}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <EyeIcon className="w-3 h-3" />
                                  <span>{post.views} görüntüleme</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-1 text-yellow-600 group-hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <span>Devamını oku</span>
                                <PaperAirplaneIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Load More Button */}
              {hasMore && !searchTerm && !selectedTag && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-16"
                >
                  <motion.button
                    onClick={() => fetchPosts(true)}
                    className="text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(to right, rgb(175, 160, 98), rgb(195, 180, 118))',
                      boxShadow: '0 8px 25px rgba(175, 160, 98, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, rgb(195, 180, 118), rgb(175, 160, 98))'
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(175, 160, 98, 0.35)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, rgb(175, 160, 98), rgb(195, 180, 118))'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(175, 160, 98, 0.25)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to right, rgb(195, 180, 118), rgb(155, 140, 78))'
                      }} />
                    <span className="relative flex items-center space-x-2">
                      <BookOpenIcon className="w-5 h-5" />
                      <span className="gold-gradient-text">Daha Fazla İçerik</span>
                      <PaperAirplaneIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
      <Chatbot />
      <WhatsAppButton />
    </>
  )
}