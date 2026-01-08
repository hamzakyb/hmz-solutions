'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Toast from '@/components/ui/Toast'

import { useEffect } from 'react' // Import useEffect

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
    const [contactContent, setContactContent] = useState<any>(null)
    const [settings, setSettings] = useState<any>(null)

    useEffect(() => {
        // Fetch Settings
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/content?section=settings')
                const result = await response.json()
                if (result.content?.data) {
                    setSettings(result.content.data)
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error)
            }
        }

        // Fetch Contact Page Content
        const fetchContactContent = async () => {
            try {
                const response = await fetch('/api/content?section=contact')
                const result = await response.json()
                if (result.content?.data) {
                    setContactContent(result.content.data)
                }
            } catch (error) {
                console.error('Failed to fetch contact content:', error)
            }
        }

        fetchSettings()
        fetchContactContent()
    }, [])

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

    const title = contactContent?.title || 'Bizimle Geleceği Kurun'
    const subtitle = contactContent?.subtitle || 'Projenizi dinlemek ve size özel çözümler üretmek için sabırsızlanıyoruz. Teknoloji ortağınız olarak yanınızdayız.'
    const infoHeaders = contactContent?.infoHeaders || { address: 'Genel Merkez', email: 'E-posta', phone: 'Telefon' }
    const formLabels = contactContent?.form?.labels || { name: 'Ad Soyad', email: 'E-posta', company: 'Şirket (Opsiyonel)', message: 'Mesajınız' }
    const formPlaceholders = contactContent?.form?.placeholders || { name: 'Adınız Soyadınız', email: 'ornek@sirket.com', company: 'Şirket Adı', message: 'Projenizden bahsedin...' }
    const formButtons = contactContent?.form?.button || { submit: 'Mesajı Gönder', submitting: 'Gönderiliyor...' }

    const titleFirstWord = title.split(' ')[0]
    const titleRest = title.split(' ').slice(1).join(' ')

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

                        {/* Left Column: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                                {titleFirstWord} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{titleRest}</span>
                            </h1>

                            <p className="text-xl text-gray-400 font-light mb-12 leading-relaxed max-w-lg">
                                {subtitle}
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-blue-500/10 transition-colors border border-white/5">
                                        <MapPinIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">{infoHeaders.address}</h3>
                                        <p className="text-gray-500 font-light leading-relaxed">
                                            {settings?.contactInfo?.address || 'Bekdik, Millet Cd. No:38, 50040\nNevşehir Merkez/Nevşehir'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-purple-500/10 transition-colors border border-white/5">
                                        <EnvelopeIcon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">{infoHeaders.email}</h3>
                                        <a href={`mailto:${settings?.contactInfo?.email || 'info@hmzsolutions.com'}`} className="text-gray-500 hover:text-white transition-colors text-lg">
                                            {settings?.contactInfo?.email || 'info@hmzsolutions.com'}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-green-500/10 transition-colors border border-white/5">
                                        <PhoneIcon className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">{infoHeaders.phone}</h3>
                                        <a href={`tel:${settings?.contactInfo?.phone || '+905050959950'}`} className="text-gray-500 hover:text-white transition-colors text-lg">
                                            {settings?.contactInfo?.phone || '+90 (505) 095 99 50'}
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
                                    <label htmlFor="name" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">{formLabels.name}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder={formPlaceholders.name}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">{formLabels.email}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder={formPlaceholders.email}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">{formLabels.company}</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formState.company}
                                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder={formPlaceholders.company}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">{formLabels.message}</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                                        placeholder={formPlaceholders.message}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-4"
                                >
                                    {isSubmitting && <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
                                    <span>{isSubmitting ? formButtons.submitting : formButtons.submit}</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Google Map Section */}
                    {/* Always render map now that we have a default */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative"
                    >
                        <div className="absolute inset-0 bg-white/5 animate-pulse" /> {/* Loading state placeholder */}
                        <iframe
                            src={(settings?.contactInfo?.googleMapsUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12485.667576596144!2d34.7126!3d38.6244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152a65a6390141f1%3A0x6c63b7e6d0590a0!2sNev%C5%9Fehir!5e0!3m2!1str!2str!4v1684321234567!5m2!1str!2str').match(/src="([^"]+)"/)?.[1] || (settings?.contactInfo?.googleMapsUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12485.667576596144!2d34.7126!3d38.6244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152a65a6390141f1%3A0x6c63b7e6d0590a0!2sNev%C5%9Fehir!5e0!3m2!1str!2str!4v1684321234567!5m2!1str!2str')}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
