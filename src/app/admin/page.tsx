'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Shield,
  RefreshCw,
  LogOut,
  MessageCircle,
  FileText,
  Settings,
  Search,
  User,
  Building,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  X
} from 'lucide-react'

interface ContactMessage {
  _id: string
  name: string
  email: string
  company: string
  message: string
  createdAt: string
  status: 'new' | 'read' | 'replied'
  ip: string
}

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

interface SiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  socialLinks: {
    twitter: string
    linkedin: string
    instagram: string
    facebook: string
  }
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
  }
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'messages' | 'blog' | 'settings'>('messages')
  
  // Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  
  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [isEditingPost, setIsEditingPost] = useState(false)
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    slug: '',
    tags: '',
    published: false
  })
  
  // Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [isEditingSettings, setIsEditingSettings] = useState(false)
  
  // Login states
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages()
      fetchBlogPosts()
      fetchSiteSettings()
    }
  }, [isAuthenticated])

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('admin_token', data.token)
        setIsAuthenticated(true)
      } else {
        setLoginError(data.error || 'Login failed')
      }
    } catch {
      setLoginError('Network error occurred')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setMessages([])
  }

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      console.log('Token being used:', token)
      
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', [...response.headers.entries()])
      
      if (response.ok) {
        const data = await response.json()
        console.log('Messages data:', data)
        setMessages(data.messages)
        setFilteredMessages(data.messages)
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch messages:', response.status, errorData)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const fetchBlogPosts = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/blog', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data.posts)
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
    }
  }

  const fetchSiteSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSiteSettings(data.settings)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const filterMessages = useCallback(() => {
    let filtered = messages
    
    if (searchTerm) {
      filtered = filtered.filter(message => 
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(message => message.status === statusFilter)
    }
    
    setFilteredMessages(filtered)
  }, [messages, searchTerm, statusFilter])

  useEffect(() => {
    filterMessages()
  }, [filterMessages])

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...postForm,
          tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      })

      if (response.ok) {
        await fetchBlogPosts()
        setIsCreatingPost(false)
        setPostForm({
          title: '',
          content: '',
          excerpt: '',
          featuredImage: '',
          slug: '',
          tags: '',
          published: false
        })
      }
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleUpdatePost = async () => {
    if (!selectedPost) return
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/blog/${selectedPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...postForm,
          tags: postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      })

      if (response.ok) {
        await fetchBlogPosts()
        setIsEditingPost(false)
        setSelectedPost(null)
      }
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchBlogPosts()
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  const handleUpdateSettings = async () => {
    if (!siteSettings) return
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(siteSettings)
      })

      if (response.ok) {
        setIsEditingSettings(false)
        await fetchSiteSettings()
      }
    } catch (error) {
      console.error('Failed to update settings:', error)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const token = localStorage.getItem('admin_token')
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        return data.fileUrl
      }
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500'
      case 'read': return 'bg-blue-500'
      case 'replied': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Yeni'
      case 'read': return 'Okundu'
      case 'replied': return 'Yanıtlandı'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-white/60">HMZ Solutions Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                  placeholder="admin@hmzsolutions.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>

              {loginError && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Giriş yapılıyor...</span>
                  </div>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/40">
              Default: admin@hmzsolutions.com / admin123
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                {activeTab === 'messages' ? `${messages.length} mesaj` : 
                 activeTab === 'blog' ? `${blogPosts.length} yazı` : 'Ayarlar'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (activeTab === 'messages') fetchMessages()
                  else if (activeTab === 'blog') fetchBlogPosts()
                  else fetchSiteSettings()
                }}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-t border-white/10">
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'messages' 
                  ? 'border-blue-400 text-white' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Mesajlar</span>
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'blog' 
                  ? 'border-blue-400 text-white' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Blog</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'border-blue-400 text-white' 
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Site Ayarları</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'messages' && (
          <>
            {/* Filters */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Mesajlarda ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    />
                  </div>
                </div>
                
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'new' | 'read' | 'replied')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="new">Yeni</option>
                    <option value="read">Okundu</option>
                    <option value="replied">Yanıtlandı</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {message.name}
                          </h3>
                          <p className="text-sm text-white/60">{message.email}</p>
                        </div>
                      </div>
                      
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(message.status)}`} />
                    </div>

                    {message.company && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Building className="w-4 h-4 text-white/40" />
                        <span className="text-sm text-white/70">{message.company}</span>
                      </div>
                    )}

                    <p className="text-white/80 text-sm mb-4 line-clamp-3">
                      {message.message}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/40">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                      <span className="bg-white/10 px-2 py-1 rounded-full">
                        {getStatusText(message.status)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/60 mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'Sonuç bulunamadı' : 'Henüz mesaj yok'}
                </h3>
                <p className="text-white/40">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Arama kriterlerinizi değiştirmeyi deneyin'
                    : 'Yeni mesajlar burada görünecek'}
                </p>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'blog' && (
          <>
            {/* Blog Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Blog Yönetimi</h2>
              <button
                onClick={() => {
                  setIsCreatingPost(true)
                  setPostForm({
                    title: '',
                    content: '',
                    excerpt: '',
                    featuredImage: '',
                    slug: '',
                    tags: '',
                    published: false
                  })
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Yeni Yazı</span>
              </button>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div key={post._id} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden">
                  {post.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.published 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {post.published ? 'Yayında' : 'Taslak'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPost(post)
                            setPostForm({
                              title: post.title,
                              content: post.content,
                              excerpt: post.excerpt,
                              featuredImage: post.featuredImage,
                              slug: post.slug,
                              tags: post.tags.join(', '),
                              published: post.published
                            })
                            setIsEditingPost(true)
                          }}
                          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>{formatDate(post.createdAt)}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white/60 mb-2">Henüz blog yazısı yok</h3>
                <p className="text-white/40 mb-6">İlk blog yazınızı oluşturmaya başlayın!</p>
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  İlk Yazıyı Oluştur
                </button>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'settings' && siteSettings && (
          <>
            {/* Settings Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Site Ayarları</h2>
              <button
                onClick={() => setIsEditingSettings(!isEditingSettings)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Edit className="w-5 h-5" />
                <span>{isEditingSettings ? 'Düzenlemeden Çık' : 'Ayarları Düzenle'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Genel Ayarlar */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Genel Ayarlar</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Site Adı</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Site Açıklaması</label>
                    <textarea
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                      disabled={!isEditingSettings}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Logo URL</label>
                    <input
                      type="text"
                      value={siteSettings.logo}
                      onChange={(e) => setSiteSettings({...siteSettings, logo: e.target.value})}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* İletişim Bilgileri */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">İletişim Bilgileri</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={siteSettings.contactInfo.email}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        contactInfo: {...siteSettings.contactInfo, email: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Telefon</label>
                    <input
                      type="text"
                      value={siteSettings.contactInfo.phone}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        contactInfo: {...siteSettings.contactInfo, phone: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Adres</label>
                    <input
                      type="text"
                      value={siteSettings.contactInfo.address}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        contactInfo: {...siteSettings.contactInfo, address: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Ayarları */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">SEO Ayarları</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Meta Başlık</label>
                    <input
                      type="text"
                      value={siteSettings.seo.metaTitle}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        seo: {...siteSettings.seo, metaTitle: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Meta Açıklama</label>
                    <textarea
                      value={siteSettings.seo.metaDescription}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        seo: {...siteSettings.seo, metaDescription: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Anahtar Kelimeler</label>
                    <input
                      type="text"
                      value={siteSettings.seo.keywords}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        seo: {...siteSettings.seo, keywords: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Sosyal Medya</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Twitter</label>
                    <input
                      type="url"
                      value={siteSettings.socialLinks.twitter}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialLinks: {...siteSettings.socialLinks, twitter: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={siteSettings.socialLinks.linkedin}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings, 
                        socialLinks: {...siteSettings.socialLinks, linkedin: e.target.value}
                      })}
                      disabled={!isEditingSettings}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {isEditingSettings && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleUpdateSettings}
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Ayarları Kaydet
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Blog Post Creation/Edit Modal */}
      <AnimatePresence>
        {(isCreatingPost || isEditingPost) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setIsCreatingPost(false)
              setIsEditingPost(false)
              setSelectedPost(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {isCreatingPost ? 'Yeni Blog Yazısı' : 'Blog Yazısını Düzenle'}
                </h2>
                <button
                  onClick={() => {
                    setIsCreatingPost(false)
                    setIsEditingPost(false)
                    setSelectedPost(null)
                  }}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Başlık</label>
                    <input
                      type="text"
                      value={postForm.title}
                      onChange={(e) => {
                        setPostForm({...postForm, title: e.target.value})
                        // Auto-generate slug from title
                        if (isCreatingPost) {
                          const slug = e.target.value
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, '')
                            .replace(/\s+/g, '-')
                            .trim()
                          setPostForm(prev => ({...prev, slug}))
                        }
                      }}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="Blog yazısı başlığı..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Slug (URL)</label>
                    <input
                      type="text"
                      value={postForm.slug}
                      onChange={(e) => setPostForm({...postForm, slug: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="url-slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Kısa Açıklama</label>
                    <textarea
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
                      placeholder="Yazının kısa açıklaması..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Etiketler (virgülle ayırın)</label>
                    <input
                      type="text"
                      value={postForm.tags}
                      onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="web, geliştirme, teknoloji"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Öne Çıkan Görsel
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const imageUrl = await handleImageUpload(file)
                            if (imageUrl) {
                              setPostForm({...postForm, featuredImage: imageUrl})
                            }
                          }
                        }}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                      />
                      {postForm.featuredImage && (
                        <div className="relative">
                          <Image 
                            src={postForm.featuredImage} 
                            alt="Preview" 
                            width={100}
                            height={100}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setPostForm({...postForm, featuredImage: ''})}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="published"
                      checked={postForm.published}
                      onChange={(e) => setPostForm({...postForm, published: e.target.checked})}
                      className="w-4 h-4 text-blue-600 bg-white/5 border-white/20 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="published" className="text-white/80">
                      Hemen yayınla
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    İçerik
                  </label>
                  <textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                    rows={20}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
                    placeholder="Blog yazısı içeriğini buraya yazın..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsCreatingPost(false)
                    setIsEditingPost(false)
                    setSelectedPost(null)
                  }}
                  className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  İptal
                </button>
                <button
                  onClick={isCreatingPost ? handleCreatePost : handleUpdatePost}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {isCreatingPost ? 'Oluştur' : 'Güncelle'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                  <p className="text-white/70">{selectedMessage.email}</p>
                  {selectedMessage.company && (
                    <p className="text-white/60 mt-1">{selectedMessage.company}</p>
                  )}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedMessage.status)} text-white`}>
                  {getStatusText(selectedMessage.status)}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-white mb-3">Mesaj İçeriği:</h3>
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-white/60 mb-6">
                <span>Gönderim: {formatDate(selectedMessage.createdAt)}</span>
                <span>IP: {selectedMessage.ip}</span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: İletişim Formu Mesajınız&body=Merhaba ${selectedMessage.name},%0D%0A%0D%0A`
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Email ile Yanıtla
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}