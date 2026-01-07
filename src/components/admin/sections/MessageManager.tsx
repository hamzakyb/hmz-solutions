'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    MessageCircle,
    User,
    Building,
    Calendar,
    X,
    CheckCircle,
    Eye,
    Trash2,
    Mail,
    RefreshCw
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

const MessageManager: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('admin_token')
            const response = await fetch('/api/contact', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setMessages(data.messages || [])
                setFilteredMessages(data.messages || [])
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoading(false)
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

    const updateMessageStatus = async (id: string, status: string) => {
        try {
            const token = localStorage.getItem('admin_token')
            const response = await fetch(`/api/contact`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id, status })
            })

            if (response.ok) {
                fetchMessages()
                if (selectedMessage?._id === id) {
                    setSelectedMessage(prev => prev ? { ...prev, status: status as any } : null)
                }
            }
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    const deleteMessage = async (id: string) => {
        if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return
        try {
            const token = localStorage.getItem('admin_token')
            const response = await fetch(`/api/contact`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            })

            if (response.ok) {
                fetchMessages()
                setSelectedMessage(null)
            }
        } catch (error) {
            console.error('Failed to delete message:', error)
        }
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

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'new': return { color: 'text-green-400', bg: 'bg-green-500/10', label: 'Yeni' }
            case 'read': return { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Okundu' }
            case 'replied': return { color: 'text-white/40', bg: 'bg-white/5', label: 'Yanıtlandı' }
            default: return { color: 'text-white/40', bg: 'bg-white/5', label: status }
        }
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">İletişim Mesajları</h2>
                    <p className="text-white/40">Ziyaretçilerinizden gelen iletileri yönetin.</p>
                </div>
                <button
                    onClick={fetchMessages}
                    className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/10"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Yenile</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="İsim, e-posta veya mesaj içeriğinde ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-[#0A0A0A] border border-white/10 text-white/60 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <option value="all">Tüm Mesajlar</option>
                    <option value="new">Yeni Gelenler</option>
                    <option value="read">Okunanlar</option>
                    <option value="replied">Yanıtlananlar</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMessages.map((message) => {
                    const config = getStatusConfig(message.status);
                    return (
                        <div
                            key={message._id}
                            onClick={() => {
                                setSelectedMessage(message);
                                if (message.status === 'new') updateMessageStatus(message._id, 'read');
                            }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                        >
                            {message.status === 'new' && (
                                <div className="absolute top-0 right-0 w-20 h-20">
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                                </div>
                            )}

                            <div className="flex items-start space-x-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{message.name}</h3>
                                    <div className="flex items-center space-x-2 text-white/30 text-xs mt-1">
                                        <Mail className="w-3 h-3" />
                                        <span className="truncate max-w-[150px]">{message.email}</span>
                                    </div>
                                </div>
                            </div>

                            {message.company && (
                                <div className="flex items-center space-x-2 mb-3 bg-white/5 rounded-lg px-3 py-1.5 w-fit">
                                    <Building className="w-3 h-3 text-white/40" />
                                    <span className="text-[11px] font-medium text-white/60 uppercase">{message.company}</span>
                                </div>
                            )}

                            <p className="text-white/50 text-sm line-clamp-3 mb-6 min-h-[60px] leading-relaxed">
                                {message.message}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                <div className="flex items-center space-x-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(message.createdAt)}</span>
                                </div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${config.bg} ${config.color}`}>
                                    {config.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredMessages.length === 0 && !loading && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <MessageCircle className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white/60 mb-2">Mesaj bulunamadı</h3>
                    <p className="text-white/30 max-w-xs mx-auto">
                        Henüz herhangi bir iletişim formu iletisi alınmamış.
                    </p>
                </div>
            )}

            {/* Message Viewer Modal */}
            <AnimatePresence>
                {selectedMessage && (
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
                            className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white">Mesaj İçeriği</h2>
                                        <p className="text-white/40 text-xs">Ayrıntılı görünüm</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Gönderen</p>
                                        <p className="text-white font-medium">{selectedMessage.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tarih</p>
                                        <p className="text-white font-medium">{formatDate(selectedMessage.createdAt)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">E-posta</p>
                                        <p className="text-blue-400 font-medium underline">{selectedMessage.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Şirket</p>
                                        <p className="text-white font-medium">{selectedMessage.company || '-'}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Mesaj</p>
                                    <p className="text-white/90 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                            </div>

                            <div className="p-6 border-t border-white/10 flex items-center justify-between">
                                <button
                                    onClick={() => deleteMessage(selectedMessage._id)}
                                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Mesajı Sil</span>
                                </button>

                                <div className="flex space-x-3">
                                    {selectedMessage.status !== 'replied' && (
                                        <button
                                            onClick={() => updateMessageStatus(selectedMessage._id, 'replied')}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all flex items-center space-x-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-wider">Yanıtlandı Olarak İşaretle</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            window.location.href = `mailto:${selectedMessage.email}?subject=HMZ Solutions Yanıtı`;
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all flex items-center space-x-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span className="text-xs uppercase tracking-wider">E-posta Gönder</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MessageManager
