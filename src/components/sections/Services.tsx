'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowsPointingOutIcon, CodeBracketIcon, DevicePhoneMobileIcon, LinkIcon, PaperAirplaneIcon, SparklesIcon, StarIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useRef, useState, useEffect } from 'react'

interface DynamicService {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  delay: number;
}

const Services = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const [content, setContent] = useState({
    title: 'Dijital Hizmetlerimiz',
    subtitle: 'İşletmenizin dijital ihtiyaçları için profesyonel çözümler sunuyoruz. Her projede müşteri memnuniyetini ön planda tutuyoruz.',
    services: [
      {
        title: 'Web Sitesi',
        subtitle: 'Profesyonel Web Çözümleri',
        description: 'Şirketiniz için modern, hızlı ve kolay kullanımlı web siteleri yapıyoruz.',
        features: ['Hızlı Yükleme', 'Mobil Uyumlu', 'Arama Motorlarında Görünür', 'Kolay Yönetim'],
        delay: 0.1
      },
      {
        title: 'Mobil Uygulama',
        subtitle: 'iOS & Android Uygulamalar',
        description: 'iPhone ve Android telefonlar için kullanıcı dostu mobil uygulamalar geliştiriyoruz.',
        features: ['iOS Uygulamaları', 'Android Uygulamaları', 'Kullanıcı Dostu Arayüz', 'Mağaza Yayınlama'],
        delay: 0.2
      },
      {
        title: 'Özel Yazılım',
        subtitle: 'İşe Özel Teknoloji',
        description: 'İş süreçlerinize özel yazılım çözümleri ile verimliliği artırıyoruz.',
        features: ['İş Süreçleri Otomasyonu', 'Veri Analizi', 'Güvenli Sistemler', 'Teknik Destek'],
        delay: 0.3
      }
    ]
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?section=services')
        const result = await response.json()
        if (result.content?.data) {
          setContent(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch services content:', error)
      }
    }
    fetchContent()
  }, [])

  // Icon mapping for dynamic services
  const iconMap = [ComputerDesktopIcon, DevicePhoneMobileIcon, CodeBracketIcon, SparklesIcon, ArrowsPointingOutIcon, LinkIcon]

  return (
    <section ref={containerRef} id="services" className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/80 to-gray-100/90" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-grid" />
        </motion.div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => {
          // Sabit pozisyonlar hydration hatası için
          const positions = [
            { left: 27.5, top: 56.6 }, { left: 10.1, top: 71.5 }, { left: 67.2, top: 75.0 },
            { left: 29.1, top: 40.0 }, { left: 4.8, top: 21.2 }, { left: 60.1, top: 54.4 },
            { left: 30.4, top: 69.4 }, { left: 55.3, top: 61.5 }, { left: 39.9, top: 55.1 },
            { left: 11.3, top: 89.0 }, { left: 43.4, top: 78.3 }, { left: 77.9, top: 87.8 },
            { left: 79.8, top: 88.3 }, { left: 67.6, top: 18.1 }, { left: 51.7, top: 91.2 },
            { left: 96.4, top: 61.5 }, { left: 22.5, top: 45.4 }, { left: 22.2, top: 97.7 },
            { left: 7.1, top: 14.6 }, { left: 40.2, top: 31.6 }
          ]
          const position = positions[i] || positions[0]
          const delays = [0, 0.5, 1.0, 1.5, 2.0, 0.3, 0.8, 1.3, 1.8, 0.2, 0.7, 1.2, 1.7, 0.4, 0.9, 1.4, 1.9, 0.6, 1.1, 1.6]
          const durations = [3, 4, 5, 6, 7, 3.5, 4.5, 5.5, 6.5, 3.2, 4.2, 5.2, 6.2, 3.8, 4.8, 5.8, 6.8, 3.3, 4.3, 5.3]

          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
                backgroundColor: 'rgba(175, 160, 98, 0.4)', // RGB(175,160,98) ile altın rengi
                boxShadow: '0 0 8px rgba(175, 160, 98, 0.3), 0 0 16px rgba(175, 160, 98, 0.2)' // Granüllü efekt
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
                scale: [1, 1.2, 1] // Granüllü efekt için ölçek animasyonu
              }}
              transition={{
                duration: durations[i] || 4,
                repeat: Infinity,
                delay: delays[i] || 0,
              }}
            />
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-20"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 backdrop-blur-xl border rounded-full px-6 py-3 mb-8"
            style={{
              backgroundColor: 'rgba(175, 160, 98, 0.1)',
              borderColor: 'rgba(175, 160, 98, 0.3)',
              boxShadow: '0 4px 16px rgba(175, 160, 98, 0.1), inset 0 1px 0 rgba(175, 160, 98, 0.2)' // Granüllü efekt
            }}
          >
            <span className="font-medium" style={{ color: 'rgb(120, 100, 60)' }}>Premium Hizmetler</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-thin text-gray-900 mb-6 tracking-tight"
          >
            <span className="font-extralight">{content.title.split(' ')[0]}</span>
            <br />
            <span className="font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                textShadow: '0 2px 8px rgba(175, 160, 98, 0.3)' // Granüllü text efekti
              }}
            >
              {content.title.split(' ').slice(1).join(' ')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed"
          >
            {content.subtitle}
          </motion.p>
        </motion.div>

        {/* Premium Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {content.services.map((service: DynamicService, index: number) => {
            const IconComponent = iconMap[index % iconMap.length] || ComputerDesktopIcon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: service.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card Container with 3D Effect */}
                <motion.div
                  className="relative h-full"
                  whileHover={{
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  {/* Premium Glow Effect - Altın rengi ile */}
                  <div
                    className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.3) 0%, rgba(195, 180, 118, 0.4) 50%, rgba(175, 160, 98, 0.3) 100%)'
                    }}
                  />

                  {/* Main Card - Altın rengi ile hover efekti */}
                  <div
                    className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 border transition-all duration-500 h-full"
                    style={{
                      borderColor: 'rgba(175, 160, 98, 0.2)',
                      boxShadow: '0 4px 20px rgba(175, 160, 98, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)' // Granüllü kart efekti
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.5)'
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(175, 160, 98, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(175, 160, 98, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Premium Icon */}
                    <div className="relative mb-8">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotateZ: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Altın rengi background ile gradient efekt */}
                        <div
                          className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                          style={{
                            background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.4) 0%, rgba(195, 180, 118, 0.6) 50%, rgba(175, 160, 98, 0.4) 100%)'
                          }}
                        />
                        <div
                          className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                          style={{
                            background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                            boxShadow: '0 8px 24px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' // Granüllü icon efekti
                          }}
                        >
                          <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                          {service.title}
                        </h3>
                        <p className="font-medium text-sm tracking-wide uppercase" style={{ color: 'rgb(175, 160, 98)' }}>
                          {service.subtitle}
                        </p>
                      </div>

                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Premium Features */}
                      <ul className="space-y-3">
                        {service.features.map((feature: string, i: number) => (
                          <motion.li
                            key={i}
                            className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <div
                              className="w-2 h-2 rounded-full mr-3 transition-shadow duration-300"
                              style={{
                                background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)',
                                boxShadow: '0 0 8px rgba(175, 160, 98, 0.4), 0 0 16px rgba(175, 160, 98, 0.2)' // Granüllü bullet efekti
                              }}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Premium CTA */}
                      <motion.div
                        className="pt-6"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="flex items-center font-medium transition-colors duration-300 cursor-pointer"
                          style={{ color: 'rgb(175, 160, 98)' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'rgb(195, 180, 118)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgb(175, 160, 98)'
                          }}
                          onClick={() => {
                            const element = document.getElementById('contact')
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }
                          }}
                        >
                          <span className="mr-3">Daha Fazla Keşfet</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Premium Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Projeyi birlikte hayata geçirmeye hazır mısınız?
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block group"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.5) 0%, rgba(195, 180, 118, 0.6) 50%, rgba(175, 160, 98, 0.5) 100%)'
              }}
            />
            <button
              className="relative backdrop-blur-xl border text-white font-medium px-12 py-4 rounded-full text-lg shadow-2xl transition-all duration-300 group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(155, 140, 78) 50%, rgb(175, 160, 98) 100%)',
                borderColor: 'rgba(175, 160, 98, 0.3)',
                boxShadow: '0 8px 32px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)' // Granüllü buton efekti
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgb(195, 180, 118) 0%, rgb(175, 160, 98) 50%, rgb(155, 140, 78) 100%)'
                e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.4)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(175, 160, 98, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(155, 140, 78) 50%, rgb(175, 160, 98) 100%)'
                e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Projeyi Başlat
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services