'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import Toast from '../ui/Toast' // Import Toast

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null) // Toast state

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

      const data = await response.json() // Parse response

      if (response.ok) {
        setToast({ message: 'Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.', type: 'success' })
        setFormState({ name: '', email: '', message: '' })
      } else {
        setToast({ message: data.error || 'Mesaj gönderilemedi. Lütfen tekrar deneyin.', type: 'error' })
        console.error('Failed to send message:', data.error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setToast({ message: 'Bir bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white border-t border-gray-100 relative">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 lg:gap-24">
          {/* Contact Info - Editorial Style */}
          <div className="w-full md:w-1/3">
            <span className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4 block">İletişim</span>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8">
              Bizimle <br /><span className="text-gray-400">Tanışın</span>
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-12">
              Projeleriniz için en doğru çözümleri konuşmak üzere bir kahve içmeye bekleriz.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400">
                  <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Ofis</h4>
                  <p className="text-gray-600 font-light">Bekdik, Millet Cd. No:38, 50040<br />Nevşehir Merkez/Nevşehir</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400">
                  <EnvelopeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">E-posta</h4>
                  <a href="mailto:info@hmzsolutions.com" className="text-gray-600 font-light hover:text-black transition-colors">
                    info@hmzsolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-400">
                  <PhoneIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Telefon</h4>
                  <a href="tel:+905050959950" className="text-gray-600 font-light hover:text-black transition-colors">
                    +90 (505) 095 99 50
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Form */}
          <div className="w-full md:w-2/3 lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors bg-transparent"
                    placeholder="Adınız"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors bg-transparent"
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mesajınız</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full border-b border-gray-300 py-3 text-gray-900 placeholder-gray-300 focus:border-black focus:outline-none transition-colors bg-transparent resize-none"
                  placeholder="Projenizden bahsedin..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                <span>{isSubmitting ? 'Gönderiliyor...' : 'Gönder'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact