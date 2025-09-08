'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { SparklesIcon, StarIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { CodeBracketIcon, BriefcaseIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRef } from 'react'

const Footer = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['30px', '-30px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Ana Sayfa', href: '#home', description: 'Başa dön' },
    { label: 'Hizmetler', href: '#services', description: 'Uzmanlığımız' },
    { label: 'Hakkımızda', href: '#about', description: 'Hikayemiz' },
    { label: 'İletişim', href: '#contact', description: 'Bize ulaşın' },
  ]

  const services = [
    { label: 'Web Geliştirme', href: '#services', description: 'Modern web siteleri' },
    { label: 'Mobil Uygulamalar', href: '#services', description: 'iOS ve Android' },
    { label: 'Özel Yazılım', href: '#services', description: 'Özelleştirilmiş çözümler' },
    { label: 'AI Entegrasyonu', href: '#services', description: 'Geleceğe hazır teknoloji' },
  ]

  const socialLinks = [
    { 
      icon: CodeBracketIcon, 
      href: '#', 
      label: 'GitHub', 
      gradient: 'from-gray-800 to-gray-900',
      hoverGradient: 'hover:from-gray-700 hover:to-gray-800'
    },
    { 
      icon: BriefcaseIcon, 
      href: '#', 
      label: 'LinkedIn', 
      gradient: 'from-blue-600 to-blue-700',
      hoverGradient: 'hover:from-blue-500 hover:to-blue-600'
    },
    { 
      icon: ChatBubbleOvalLeftEllipsisIcon, 
      href: '#', 
      label: 'İletişim', 
      gradient: 'from-green-600 to-green-700',
      hoverGradient: 'hover:from-green-500 hover:to-green-600'
    },
  ]

  return (
    <footer ref={containerRef} className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-white to-gray-100" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-dots" />
        </motion.div>
        
        {/* Floating Orbs - Altın rengi */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 sm:w-48 h-32 sm:h-48 rounded-full blur-3xl opacity-20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 30}%`,
              background: i % 2 === 0 
                ? 'rgba(175, 160, 98, 0.3)' 
                : 'rgba(195, 180, 118, 0.2)'
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-12 sm:mb-16"
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
            <SparklesIcon className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" style={{ color: 'rgb(175, 160, 98)' }} />
            <span className="text-gray-800 font-medium text-sm sm:text-base">İletişimde Kalın</span>
            <StarIcon className="w-3 sm:w-4 h-3 sm:h-4" style={{ color: 'rgb(195, 180, 118)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-gray-900 mb-4 tracking-tight"
          >
            <span className="font-extralight">Geleceği Birlikte</span>
            <br />
            <span className="font-bold bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Geliştirelim
            </span>
          </motion.h2>
        </motion.div>
        {/* Premium Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {/* Premium Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 group"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.1) 0%, rgba(195, 180, 118, 0.15) 50%, rgba(175, 160, 98, 0.1) 100%)'
                }}
              />
              
              <div className="relative bg-white/80 backdrop-blur-2xl border rounded-2xl p-6 sm:p-8 transition-all duration-500"
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(175, 160, 98, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Premium Logo */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl blur-lg opacity-40"
                      style={{
                        background: 'rgba(175, 160, 98, 0.4)'
                      }}
                    />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-xl overflow-hidden p-2.5 sm:p-3">
                      {/* Logo with better sizing and padding */}
                      <Image 
                        src="/logo.png" 
                        alt="HMZ Solutions Logo" 
                        fill
                        className="object-contain"
                        onError={(e) => {
                          // Fallback to letter H if logo image fails to load
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'block';
                        }}
                      />
                      <span className="text-gray-800 font-bold text-lg sm:text-xl hidden">
                        H
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">HMZ SOLUTIONS</span>
                    <p className="text-gray-600 text-sm">Dijital İnovasyon Ortakları</p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
                  Vizyonları dijital gerçekliklere dönüştürmek için en çağdaş teknolojiyi, 
                  olağanüstü tasarımı ve mükemmelliğe olan sarsılmaz bağlılığı kullanıyoruz.
                </p>
                
                {/* Premium Social Links */}
                <div className="flex space-x-3 sm:space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group/social relative"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl blur-lg opacity-0 group-hover/social:opacity-40 transition-opacity duration-300`} />
                        <div className={`relative p-3 bg-gradient-to-br ${social.gradient} ${social.hoverGradient} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-white/10`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.1) 0%, rgba(195, 180, 118, 0.15) 50%, rgba(175, 160, 98, 0.1) 100%)'
                }}
              />
              
              <div className="relative bg-white/80 backdrop-blur-2xl border rounded-2xl p-6 transition-all duration-500"
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(175, 160, 98, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                    }}
                  />
                  Navigasyon
                </h3>
                
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        className="group/link flex items-start space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                      >
                        <PaperAirplaneIcon className="w-4 h-4 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        <div>
                          <div className="font-medium">{link.label}</div>
                          <div className="text-xs text-gray-500">{link.description}</div>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Premium Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.1) 0%, rgba(195, 180, 118, 0.15) 50%, rgba(175, 160, 98, 0.1) 100%)'
                }}
              />
              
              <div className="relative bg-white/80 backdrop-blur-2xl border rounded-2xl p-6 transition-all duration-500"
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(175, 160, 98, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                    }}
                  />
                  Çözümler
                </h3>
                
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={service.href}
                        className="group/link flex items-start space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                      >
                        <PaperAirplaneIcon className="w-4 h-4 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        <div>
                          <div className="font-medium">{service.label}</div>
                          <div className="text-xs text-gray-500">{service.description}</div>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Divider */}
          <div className="w-full h-px mb-8"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(175, 160, 98, 0.4), transparent)'
            }}
          />
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-600 text-sm">
                © {currentYear} HMZ Solutions. Tüm hakları saklıdır.
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              {[
                { label: 'Gizlilik Politikası', href: '#' },
                { label: 'Hizmet Şartları', href: '#' },
                { label: 'Çerezler', href: '#' },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(to right, rgb(175, 160, 98), rgb(195, 180, 118))'
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <div className="inline-flex items-center space-x-2 text-gray-500 text-xs">
              <StarIcon className="w-3 h-3" />
              <span>Yenilikçi Teknoloji Çözümleri</span>
              <StarIcon className="w-3 h-3" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer