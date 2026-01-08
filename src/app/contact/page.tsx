'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Toast from '@/components/ui/Toast'

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            })

            const data = await response.json()

            if (response.ok) {
                setToast({ message: 'Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.', type: 'success' })
                setFormState({ name: '', email: '', company: '', message: '' })
            } else {
                setToast({ message: data.error || 'Mesaj gönderilemedi.', type: 'error' })
            }
        } catch {
            setToast({ message: 'Bir bağlantı hatası oluştu.', type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="bg-black min-h-screen">
            <Navigation />
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#050505]" />

                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-900/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Left Column: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                                Bizimle <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Geleceği Kurun</span>
                            </h1>

                            <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed max-w-lg">
                                Projenizi dinlemek ve size özel çözümler üretmek için sabırsızlanıyoruz.
                                Teknoloji ortağınız olarak yanınızdayız.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-blue-500/10 transition-colors border border-white/5">
                                        <MapPinIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Genel Merkez</h3>
                                        <p className="text-gray-500 font-light leading-relaxed">
                                            Bekdik, Millet Cd. No:38, 50040<br />
                                            Nevşehir Merkez/Nevşehir
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-purple-500/10 transition-colors border border-white/5">
                                        <EnvelopeIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">E-posta</h3>
                                        <a href="mailto:info@hmzsolutions.com" className="text-gray-500 hover:text-white transition-colors text-lg">
                                            info@hmzsolutions.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-green-500/10 transition-colors border border-white/5">
                                        <PhoneIcon className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">Telefon</h3>
                                        <a href="tel:+905050959950" className="text-gray-500 hover:text-white transition-colors text-lg">
                                            +90 (505) 095 99 50
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[#0A0A0A] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
                        >
                            {/* Glass Effect Overlay */}
                            <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none" />

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Ad Soyad</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">E-posta</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="ornek@sirket.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Şirket (Opsiyonel)</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formState.company}
                                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="Şirket Adı"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">Mesajınız</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                                        placeholder="Projenizden bahsedin..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4"
                                >
                                    {isSubmitting && <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
                                    <span>{isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
