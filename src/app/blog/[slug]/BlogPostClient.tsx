'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, EyeIcon, UserIcon, ArrowLeftIcon, TagIcon, ShareIcon, HeartIcon, BookOpenIcon, ChartBarIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
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
  seoTitle: string
  seoDescription: string
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [shareText, setShareText] = useState('Paylaş')
  const [copied, setCopied] = useState(false)

  const fetchRelatedPosts = useCallback(async (tags: string[]) => {
    try {
      const response = await fetch(`/api/blog?published=true&limit=3`)
      const data = await response.json()

      if (response.ok && data.posts) {
        // Filter posts with similar tags, excluding current post
        const related = data.posts
          .filter((p: BlogPost) => p.slug !== params.slug)
          .filter((p: BlogPost) => p.tags.some(tag => tags.includes(tag)))
          .slice(0, 3)
        setRelatedPosts(related)
      }
    } catch (error) {
      console.error('Failed to fetch related posts:', error)
    }
  }, [params.slug])

  const fetchPost = useCallback(async (slug: string) => {
    try {
      // First try to find by slug
      const response = await fetch(`/api/blog?slug=${slug}&published=true`)
      const data = await response.json()

      if (response.ok && data.posts && data.posts.length > 0) {
        setPost(data.posts[0])
        // Fetch related posts
        await fetchRelatedPosts(data.posts[0].tags)
      } else {
        setError('Blog yazısı bulunamadı')
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
      setError('Blog yazısı yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }, [fetchRelatedPosts])

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug, fetchPost])

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

  const sharePost = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        setShareText('Paylaşıldı!')
        setTimeout(() => setShareText('Paylaş'), 2000)
      } catch (error) {
        console.log('Share failed:', error)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setShareText('Link kopyalandı!')
    setTimeout(() => {
      setCopied(false)
      setShareText('Paylaş')
    }, 2000)
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-white pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              {/* Back button loading */}
              <div className="h-12 rounded-xl mb-8 w-48"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                }}></div>

              {/* Title loading */}
              <div className="h-16 rounded-2xl mb-6"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                }}></div>
              <div className="h-8 rounded-xl mb-8 w-3/4"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                }}></div>

              {/* Meta info loading */}
              <div className="h-24 rounded-2xl mb-8"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                }}></div>

              {/* Content loading */}
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 rounded"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))',
                      width: i % 4 === 0 ? '90%' : i % 3 === 0 ? '95%' : '100%'
                    }}></div>
                ))}
              </div>

              {/* Gold accent loading bar */}
              <div className="mt-8 h-2 rounded-full overflow-hidden">
                <div className="h-full rounded-full w-1/3 animate-pulse"
                  style={{
                    background: 'linear-gradient(to right, rgba(175, 160, 98, 0.5), rgba(195, 180, 118, 0.5))'
                  }}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border"
              style={{
                background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))',
                borderColor: 'rgba(175, 160, 98, 0.3)'
              }}>
              <ExclamationTriangleIcon className="w-10 h-10"
                style={{ color: 'rgb(175, 160, 98)' }} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 gold-gradient-text">
              {error || 'Blog yazısı bulunamadı'}
            </h1>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 transition-colors"
              style={{
                color: 'rgb(175, 160, 98)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgb(155, 140, 78)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgb(175, 160, 98)'
              }}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Blog sayfasına dön</span>
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-white">
        {/* Enhanced Header Section */}
        <div className="relative pt-32 pb-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(175,160,98,0.08),transparent_50%)]" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <Link
                  href="/blog"
                  className="group inline-flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-all duration-300 backdrop-blur-sm border rounded-xl px-4 py-3"
                  style={{
                    background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))',
                    borderColor: 'rgba(175, 160, 98, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                  }}
                >
                  <div className="p-1 rounded-lg transition-colors"
                    style={{
                      background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.3), rgba(195, 180, 118, 0.3))'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                    }}>
                    <ArrowLeftIcon className="w-4 h-4" style={{ color: 'white' }} />
                  </div>
                  <span className="font-medium gold-gradient-text">Blog&rsquo;a Dön</span>
                </Link>
              </motion.div>

              {/* Tags with Enhanced Styling */}
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  {post.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      className="inline-flex items-center px-4 py-2 text-sm rounded-full border backdrop-blur-sm transition-all duration-300 cursor-pointer"
                      style={{
                        background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(200, 200, 200, 0.1))',
                        color: 'rgba(120, 107, 63, 1)',
                        borderColor: 'rgba(175, 160, 98, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(200, 200, 200, 0.2))'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(200, 200, 200, 0.1))'
                      }}
                    >
                      <TagIcon className="w-3 h-3 mr-2" />
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {/* Enhanced Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                <span className="gold-gradient-text">
                  {post.title}
                </span>
              </motion.h1>

              {/* Enhanced Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white backdrop-blur-2xl border border-gray-200 rounded-2xl p-6 mb-8"
              >
                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center space-x-8 text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgb(175, 160, 98), rgb(195, 180, 118))'
                        }}>
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Yazar</p>
                        <p className="font-medium">{post.author.split('@')[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgb(175, 160, 98), rgb(195, 180, 118))'
                        }}>
                        <CalendarIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Yayın Tarihi</p>
                        <p className="font-medium">{formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgb(175, 160, 98), rgb(195, 180, 118))'
                        }}>
                        <ClockIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Okuma Süresi</p>
                        <p className="font-medium">{calculateReadingTime(post.content)} dakika</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgb(175, 160, 98), rgb(195, 180, 118))'
                        }}>
                        <EyeIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Görüntülenme</p>
                        <p className="font-medium">{post.views}</p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Share Button */}
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${isLiked
                          ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                          : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HeartIcon className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      <span className={isLiked ? '' : 'gold-gradient-text'}>{isLiked ? 'Beğenildi' : 'Beğen'}</span>
                    </motion.button>

                    <motion.button
                      onClick={sharePost}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300"
                      style={{
                        background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))',
                        color: 'rgb(120, 107, 63)',
                        borderColor: 'rgba(175, 160, 98, 0.3)',
                        border: '1px solid'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? <CheckIcon className="w-4 h-4" style={{ color: 'rgb(175, 160, 98)' }} /> : <ShareIcon className="w-4 h-4" style={{ color: 'rgb(175, 160, 98)' }} />}
                      <span className="gold-gradient-text">{shareText}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Featured Image */}
        {post.featuredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to right, rgba(175, 160, 98, 0.2), rgba(200, 200, 200, 0.2))'
                }} />
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-gray-200">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Image Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-800">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{calculateReadingTime(post.content)} dk okuma</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ChartBarIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{post.views} görüntülenme</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          {/* Main Content */}
          <div className="bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl p-8 lg:p-12 mb-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.2), rgba(195, 180, 118, 0.2))'
              }} />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(195, 180, 118, 0.2), rgba(175, 160, 98, 0.2))'
              }} />

            <div className="relative">
              {/* Content */}
              <div
                className="prose prose-lg max-w-none leading-relaxed"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                  color: '#374151'
                }}
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-yellow-600">$1</em>')
                }}
              />

              {/* Reading Progress Indicator */}
              <div className="mt-12 pt-8 border-t border-yellow-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Makaleyi okudunuz</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-yellow-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" />
                    </div>
                    <span className="text-yellow-600 font-medium" style={{ color: 'rgb(175, 160, 98)' }}>%100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Engagement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl p-8 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                  }} />
              </div>

              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <HeartIcon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 gold-gradient-text">
                  Bu yazıyı beğendiniz mi?
                </h3>
                <p className="text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Sosyal medyada paylaşarak daha fazla kişinin görmesini sağlayın ve yeni içeriklerden haberdar olmak için bizi takip edin!
                </p>

                <div className="flex items-center justify-center space-x-4">
                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isLiked
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/25'
                        : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 hover:from-yellow-200 hover:to-yellow-300 border border-yellow-300'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className={isLiked ? '' : 'gold-gradient-text'}>{isLiked ? 'Beğenildi' : 'Beğen'}</span>
                  </motion.button>

                  <motion.button
                    onClick={sharePost}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-700 hover:to-yellow-800 hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <CheckIcon className="w-5 h-5" /> : <ShareIcon className="w-5 h-5" />}
                    <span className="gold-gradient-text">{shareText}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl p-8 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-40 h-40 rounded-full blur-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))'
                  }} />
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(195, 180, 118, 0.1), rgba(175, 160, 98, 0.1))'
                  }} />

                <div className="relative">
                  {/* Section Header */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center">
                      <BookOpenIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 gold-gradient-text">İlgili Yazılar</h3>
                      <p className="text-gray-600 text-sm">Sizi ilgilendirebilecek diğer içerikler</p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-yellow-300/50 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.div
                        key={relatedPost._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      >
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-yellow-300 transition-all duration-500 hover:scale-[1.02] group relative">
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-gray-300/0 to-yellow-600/0 group-hover:from-yellow-600/5 group-hover:via-gray-300/5 group-hover:to-yellow-600/5 transition-all duration-500 rounded-2xl" />

                            {relatedPost.featuredImage && (
                              <div className="relative h-40 overflow-hidden">
                                <Image
                                  src={relatedPost.featuredImage}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Quick Stats */}
                                <div className="absolute top-3 left-3 right-3 flex justify-between">
                                  <span className="bg-black/50 backdrop-blur-sm text-white/90 text-xs px-2 py-1 rounded-full">
                                    {calculateReadingTime(relatedPost.content)} dk
                                  </span>
                                  <span className="bg-black/50 backdrop-blur-sm text-white/90 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                                    <EyeIcon className="w-3 h-3" />
                                    <span>{relatedPost.views}</span>
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="p-5 relative">
                              {/* Tags */}
                              {relatedPost.tags && relatedPost.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {relatedPost.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <span key={tagIndex} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-300">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <h4 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-tight gold-gradient-text">
                                {relatedPost.title}
                              </h4>
                              <p className="text-gray-700 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {relatedPost.excerpt}
                              </p>

                              <div className="flex items-center justify-between text-xs text-gray-600">
                                <span>{formatDate(relatedPost.createdAt)}</span>
                                <div className="flex items-center space-x-1 group-hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'rgb(175, 160, 98)'
                                    e.currentTarget.style.opacity = '1'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'rgb(175, 160, 98)'
                                    e.currentTarget.style.opacity = '0'
                                  }}>
                                  <span className="font-medium gold-gradient-text">Oku</span>
                                  <ArrowLeftIcon className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* View All Posts Button */}
                  <div className="text-center mt-8">
                    <Link href="/blog">
                      <motion.button
                        className="font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          background: 'linear-gradient(to right, rgba(175, 160, 98, 0.1), rgba(195, 180, 118, 0.1))',
                          borderColor: 'rgba(175, 160, 98, 0.3)',
                          color: 'rgb(120, 107, 63)',
                          border: '1px solid'
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
                        <BookOpenIcon className="w-5 h-5" style={{ color: 'rgb(175, 160, 98)' }} />
                        <span className="gold-gradient-text">Tüm Yazıları Gör</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Chatbot />
      <WhatsAppButton />
    </>
  )
}