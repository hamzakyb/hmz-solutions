'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  AtSymbolIcon,
  DevicePhoneMobileIcon,
  BuildingOfficeIcon,
  ClockIcon,
  SparklesIcon,
  StarIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react'

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [contactData, setContactData] = useState({
    email: 'info@hmzsolutions.com',
    phone: '+90 (505) 095 99 50',
    address: 'Nevşehir Merkez, Türkiye',
    hours: 'Pzt-Cum 09:00-18:00'
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/content?section=settings')
        const result = await response.json()
        if (result.content?.data?.contactInfo) {
          setContactData(result.content.data.contactInfo)
        }
      } catch (error) {
        console.error('Failed to fetch contact settings:', error)
      }
    }
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        throw new Error(data.error || 'Mesaj gönderilirken hata oluştu')
      }

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: AtSymbolIcon,
      title: 'E-posta',
      info: contactData.email,
      description: 'Projeleriniz hakkında konuşalım'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Telefon',
      info: contactData.phone,
      description: 'Size hemen geri dönelim'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Adres',
      info: contactData.address,
      description: 'Ofisimize bekliyoruz'
    },
    {
      icon: ClockIcon,
      title: 'Çalışma Saatleri',
      info: contactData.hours,
      description: '7/24 acil destek mevcut'
    }
  ]

  return (
    <section ref={containerRef} id="contact" className="py-24 sm:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/80 to-gray-100/90" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-dots" />
        </motion.div>

        {/* Floating Orbs - Altın rengi */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              background: i % 3 === 0
                ? 'rgba(175, 160, 98, 0.3)'
                : i % 3 === 1
                  ? 'rgba(195, 180, 118, 0.2)'
                  : 'rgba(175, 160, 98, 0.4)'
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 backdrop-blur-xl border rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8"
            style={{
              background: 'rgba(175, 160, 98, 0.1)',
              borderColor: 'rgba(175, 160, 98, 0.3)',
              boxShadow: '0 4px 16px rgba(175, 160, 98, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-gray-800 font-medium text-sm sm:text-base">İletişim</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin text-gray-900 mb-4 sm:mb-6 tracking-tight"
          >
            <span className="font-extralight">Hadi Birlikte</span>
            <br />
            <span className="font-bold bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Harika Bir Şey İnşa Edelim
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-2xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed px-4"
          >
            Projeniz hakkında konuşmak için bize ulaşın. Size en uygun çözümü birlikte bulalım ve
            dijital dünyada fark yaratmanızı sağlayalım.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.2) 0%, rgba(195, 180, 118, 0.3) 50%, rgba(175, 160, 98, 0.2) 100%)'
                }}
              />

              {/* Form Container */}
              <div className="relative bg-white/90 backdrop-blur-2xl border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500"
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(175, 160, 98, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                  e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)'
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                >
                  Projenizi Başlatın
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-8 text-sm sm:text-base"
                >
                  Vizyonunuzu tartışalım ve birlikte olağanüstü projeler geliştirelim.
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border rounded-2xl text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                        style={{
                          borderColor: 'rgba(175, 160, 98, 0.3)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(175, 160, 98, 0.1)'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                        placeholder="Adınızı girin"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                        E-posta Adresi *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border rounded-2xl text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                        style={{
                          borderColor: 'rgba(175, 160, 98, 0.3)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(175, 160, 98, 0.1)'
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-3">
                      Şirket
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border rounded-2xl text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all duration-300 backdrop-blur-xl"
                      style={{
                        borderColor: 'rgba(175, 160, 98, 0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(175, 160, 98, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      placeholder="Şirket adınız"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                      Proje Detayları *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border rounded-2xl text-gray-900 placeholder:text-gray-500 focus:outline-none transition-all duration-300 backdrop-blur-xl resize-none"
                      style={{
                        borderColor: 'rgba(175, 160, 98, 0.3)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(175, 160, 98, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      placeholder="Proje vizyonunuz, hedefleriniz ve gereksinimleriniz hakkında bize anlatın..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full group relative overflow-hidden ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'text-white font-semibold'
                        } py-4 sm:py-5 px-6 sm:px-8 rounded-2xl transition-all duration-500 active:scale-[0.98]`}
                      style={{
                        background: isSubmitting
                          ? undefined
                          : 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                        boxShadow: isSubmitting
                          ? undefined
                          : '0 8px 32px rgba(175, 160, 98, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgb(195, 180, 118) 0%, rgb(175, 160, 98) 50%, rgb(155, 140, 78) 100%)'
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(175, 160, 98, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)'
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(175, 160, 98, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-3 text-base sm:text-lg">
                        <span>
                          {isSubmitting ? 'Gönderiliyor...' :
                            submitStatus === 'success' ? 'Başarıyla Gönderildi!' :
                              submitStatus === 'error' ? 'Tekrar Deneyin' :
                                'Teklif Talebi Gönder'}
                        </span>
                        {isSubmitting && (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                      </span>
                      {!isSubmitting && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'linear-gradient(135deg, rgb(155, 140, 78) 0%, rgb(135, 120, 58) 50%, rgb(115, 100, 38) 100%)'
                          }}
                        />
                      )}
                    </button>

                    {/* Success/Error Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 text-center"
                      >
                        ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-100 border border-red-300 rounded-xl text-red-800 text-center"
                      >
                        ❌ Mesaj gönderilemedi. Lütfen tekrar deneyin veya direkt email gönderin.
                      </motion.div>
                    )}
                  </motion.div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Premium Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                İletişim Bilgileri
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                İletişim bilgileriyle bize ulaşın. Vizyonunuzu en çağdaş teknoloji ve
                olağanüstü tasarımla hayata geçirmeye hazırız.
              </p>
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, rgba(175, 160, 98, ${0.3 + index * 0.1}) 0%, rgba(195, 180, 118, ${0.4 + index * 0.1}) 100%)`
                        }}
                      />

                      {/* Card */}
                      <div className="relative bg-white/80 backdrop-blur-2xl border rounded-2xl p-4 sm:p-6 transition-all duration-500 shadow-lg"
                        style={{
                          borderColor: 'rgba(175, 160, 98, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(175, 160, 98, 0.2)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, rgba(175, 160, 98, 0.4) 0%, rgba(195, 180, 118, 0.6) 100%)`
                              }}
                            />
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-xl"
                              style={{
                                background: `linear-gradient(135deg, rgba(175, 160, 98, 0.8) 0%, rgba(195, 180, 118, 0.9) 100%)`,
                                boxShadow: '0 8px 24px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                              }}
                            >
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base group-hover:text-glow transition-all duration-300">
                              {item.title}
                            </h4>
                            <p className="text-gray-800 font-medium mb-2 text-sm sm:text-base break-all sm:break-normal">
                              {item.info}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Premium CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.15) 0%, rgba(195, 180, 118, 0.2) 50%, rgba(175, 160, 98, 0.15) 100%)'
                  }}
                />

                {/* CTA Card */}
                <div className="relative bg-white/80 backdrop-blur-2xl border rounded-2xl p-6 sm:p-8 transition-all duration-500"
                  style={{
                    borderColor: 'rgba(175, 160, 98, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(175, 160, 98, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)',
                        boxShadow: '0 8px 24px rgba(175, 160, 98, 0.3)'
                      }}
                    >
                      <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Hızlı Başlangıç
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Ücretsiz danışmanlık mevcut
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                    Fikirlerinizi gerçeğe dönüştürmeye hazır mısınız? Uzman danışmanlığımız ve
                    premium geliştirme hizmetlerimizle projenizi bugün başlatalım.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      className="w-full group/btn relative overflow-hidden text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                        boxShadow: '0 8px 24px rgba(175, 160, 98, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgb(195, 180, 118) 0%, rgb(175, 160, 98) 50%, rgb(155, 140, 78) 100%)'
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(175, 160, 98, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)'
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(175, 160, 98, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                      onClick={() => {
                        window.open(`tel:${contactData.phone.replace(/\s/g, '')}`, '_self')
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Hemen Ara</span>
                      </span>
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, rgb(155, 140, 78) 0%, rgb(135, 120, 58) 50%, rgb(115, 100, 38) 100%)'
                        }}
                      />
                    </button>

                    <button
                      className="w-full group/wa relative overflow-hidden bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98] cursor-pointer"
                      onClick={() => {
                        const message = encodeURIComponent('Merhaba! HMZ Solutions hizmetleri hakkında bilgi almak istiyorum.')
                        window.open(`https://wa.me/${contactData.phone.replace(/\D/g, '')}?text=${message}`, '_blank')
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                        </svg>
                        <span>WhatsApp</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-700 to-green-800 opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact