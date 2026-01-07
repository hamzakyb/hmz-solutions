'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    FileText,
    X,
    Save,
    Image as ImageIcon,
    Tag
} from 'lucide-react'

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

const BlogManager: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        fetchBlogPosts()
    }, [])

    const fetchBlogPosts = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('admin_token')
            const response = await fetch('/api/blog', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setBlogPosts(data.posts || [])
            }
        } catch (error) {
            console.error('Failed to fetch blog posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault()
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
                resetForm()
            }
        } catch (error) {
            console.error('Failed to create post:', error)
        }
    }

    const handleUpdatePost = async (e: React.FormEvent) => {
        e.preventDefault()
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
                resetForm()
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

    const resetForm = () => {
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading && blogPosts.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Blog Yönetimi</h2>
                    <p className="text-white/40">Sitenizdeki blog içeriklerini buradan yönetin.</p>
                </div>
                <button
                    onClick={() => {
                        resetForm()
                        setIsCreatingPost(true)
                    }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>Yeni Yazı</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <div key={post._id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-300">
                        {post.featuredImage && (
                            <div className="relative h-48">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                        )}

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${post.published
                                        ? 'bg-green-500/20 text-green-300'
                                        : 'bg-yellow-500/20 text-yellow-300'
                                    }`}>
                                    {post.published ? 'Yayında' : 'Taslak'}
                                </span>
                                <div className="flex items-center space-x-1">
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
                                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePost(post._id)}
                                        className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-semibold text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">{post.title}</h3>
                            <p className="text-white/40 text-sm mb-6 line-clamp-2">{post.excerpt}</p>

                            <div className="flex items-center justify-between text-[11px] font-medium text-white/20 border-t border-white/5 pt-4 uppercase tracking-widest">
                                <div className="flex items-center space-x-2">
                                    <ImageIcon className="w-3 h-3" />
                                    <span>{formatDate(post.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Eye className="w-3 h-3" />
                                    <span>{post.views} İzlenme</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {blogPosts.length === 0 && !loading && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white/60 mb-2">Henüz blog yazısı yok</h3>
                    <p className="text-white/30 max-w-xs mx-auto mb-8">
                        İlk blog yazınızı oluşturarak takipçilerinizle paylaşmaya başlayın.
                    </p>
                    <button
                        onClick={() => setIsCreatingPost(true)}
                        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        <span>İlk Yazıyı Oluştur</span>
                    </button>
                </div>
            )}

            {/* Editor Modal */}
            <AnimatePresence>
                {(isCreatingPost || isEditingPost) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A0A0A] z-10">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                                        {isCreatingPost ? <Plus className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{isCreatingPost ? 'Yeni Blog Yazısı' : 'Yazıyı Düzenle'}</h2>
                                        <p className="text-white/40 text-xs">Yazı detaylarını aşağıdan doldurun.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsCreatingPost(false)
                                        setIsEditingPost(false)
                                        setSelectedPost(null)
                                    }}
                                    className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                <form id="blog-form" onSubmit={isCreatingPost ? handleCreatePost : handleUpdatePost} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Main Settings */}
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-white/80 flex items-center space-x-2">
                                                    <span>Başlık</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={postForm.title}
                                                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                                                    placeholder="Yazı başlığı..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-white/80">Slug (URL)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={postForm.slug}
                                                    onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                                                    placeholder="yazi-basligi-url"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-white/80">Kısa Özet</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={postForm.excerpt}
                                                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                                                    placeholder="Yazı hakkında kısa bilgi..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Meta Settings */}
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-white/80 flex items-center space-x-2">
                                                    <ImageIcon className="w-4 h-4 text-white/40" />
                                                    <span>Öne Çıkan Görsel URL</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={postForm.featuredImage}
                                                    onChange={(e) => setPostForm({ ...postForm, featuredImage: e.target.value })}
                                                    placeholder="https://..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-white/80 flex items-center space-x-2">
                                                    <Tag className="w-4 h-4 text-white/40" />
                                                    <span>Etiketler (virgülle ayırın)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={postForm.tags}
                                                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                                                    placeholder="teknoloji, yazılım, web"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                                />
                                            </div>

                                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-bold text-white">Yayında mı?</p>
                                                    <p className="text-xs text-white/40">Yazının herkes tarafından görülmesini sağlar.</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setPostForm({ ...postForm, published: !postForm.published })}
                                                    className={`w-12 h-6 rounded-full transition-all relative ${postForm.published ? 'bg-green-500' : 'bg-white/10'}`}
                                                >
                                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${postForm.published ? 'left-7' : 'left-1'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-white/80 flex items-center space-x-2">
                                            <FileText className="w-4 h-4 text-white/40" />
                                            <span>İçerik (HTML desteklenir)</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={12}
                                            value={postForm.content}
                                            onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                                            placeholder="Yazı içeriğini buraya girin..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 italic font-light"
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-white/10 flex items-center justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreatingPost(false)
                                        setIsEditingPost(false)
                                        setSelectedPost(null)
                                    }}
                                    className="px-6 py-3 text-white/60 hover:text-white font-medium transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    form="blog-form"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center space-x-2"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{isCreatingPost ? 'Oluştur ve Yayınla' : 'Değişiklikleri Kaydet'}</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default BlogManager
