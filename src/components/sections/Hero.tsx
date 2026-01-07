'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../ui/Button'
import { PaperAirplaneIcon, SparklesIcon, StarIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [enableMouseTracking, setEnableMouseTracking] = useState(false)

  useEffect(() => {
    // Defer mouse tracking to improve initial load performance
    const timer = setTimeout(() => setEnableMouseTracking(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!enableMouseTracking) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enableMouseTracking])

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white"
    >
      {/* Dynamic Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y, opacity, willChange: 'transform, opacity' }}
      >
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid animate-pulse" />
        </div>

        {/* Floating Orbs with Mouse Interaction - Altın rengi */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              background: i % 3 === 0
                ? 'rgba(175, 160, 98, 0.3)'
                : i % 3 === 1
                  ? 'rgba(195, 180, 118, 0.2)'
                  : 'rgba(175, 160, 98, 0.4)'
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Interactive Cursor Light - Only enabled after initial load */}
        {enableMouseTracking && (
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{
              background: 'rgba(175, 160, 98, 0.2)',
              willChange: 'transform'
            }}
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200
            }}
          />
        )}
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto text-center px-6 relative z-10 pt-32 sm:pt-40">
        <motion.div
          style={{ scale }}
          className="space-y-12"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-12 sm:mb-16"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.4) 0%, rgba(195, 180, 118, 0.5) 100%)'
                }}
              />
              <div
                className="relative backdrop-blur-2xl border rounded-full px-6 py-3 flex items-center space-x-3 shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(175, 160, 98, 0.3)'
                }}
              >
                <SparklesIcon className="w-5 h-5 animate-pulse" style={{ color: 'rgb(175, 160, 98)' }} />
                <span className="text-gray-800 font-medium">Premium Dijital Çözümler</span>
                <StarIcon className="w-4 h-4" style={{ color: 'rgb(175, 160, 98)' }} />
              </div>
            </div>
          </motion.div>

          {/* Cinematic Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="flex justify-center mb-12"
          >
            <div className="relative group">
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
                style={{
                  background: 'rgba(175, 160, 98, 0.4)'
                }}
              />
              <div
                className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl border transform group-hover:scale-110 transition-all duration-500 overflow-hidden p-4 sm:p-5"
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.3)',
                  boxShadow: '0 20px 40px rgba(175, 160, 98, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
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
                <span className="text-gray-800 font-bold text-3xl tracking-tight hidden">
                  H
                </span>
              </div>
            </div>
          </motion.div>

          {/* SEO-Optimized H1 - Hidden but crawlable */}
          <h1 className="sr-only">
            Nevşehir Yazılım Şirketi - Web Sitesi, Mobil Uygulama ve Dijital Çözümler | HMZ Solutions
          </h1>

          {/* Cinematic Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="text-6xl md:text-8xl lg:text-9xl font-thin text-gray-900 mb-8 leading-none tracking-tighter" role="presentation">
              <motion.span
                className="block font-extralight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Düşüncenin
              </motion.span>
              <motion.span
                className="block font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                  textShadow: '0 4px 12px rgba(175, 160, 98, 0.3)'
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Ötesinde
              </motion.span>
            </div>
          </motion.div>


          {/* Premium Subtitle with Location Info */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-3xl font-light text-gray-700 mb-12 max-w-5xl mx-auto leading-relaxed"
          >
            <span className="font-medium" style={{ color: 'rgb(175, 160, 98)' }}>Nevşehir ve Kapadokya</span> bölgesinden tüm Türkiye'ye,
            <br className="hidden md:block" />
            teknolojinin sınırlarını aşan dijital deneyimler geliştiriyoruz.
            <br className="hidden md:block" />
            <span className="font-medium" style={{ color: 'rgb(175, 160, 98)' }}>İnovasyon. Tasarım. Mükemmellik.</span>
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.6) 0%, rgba(195, 180, 118, 0.7) 100%)'
                }}
              />
              <Button
                size="lg"
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="relative backdrop-blur-xl border text-white font-medium px-12 py-4 rounded-full text-lg shadow-2xl transition-all duration-300 group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                  borderColor: 'rgba(175, 160, 98, 0.2)',
                  boxShadow: '0 8px 32px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgb(195, 180, 118) 0%, rgb(175, 160, 98) 50%, rgb(155, 140, 78) 100%)'
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)'
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                }}
              >
                Projeye Başla
                <PaperAirplaneIcon className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.getElementById('services')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="border-2 backdrop-blur-xl font-medium px-12 py-4 rounded-full text-lg transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'rgb(120, 100, 60)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(175, 160, 98, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.4)'
                }}
              >
                Portföyü Keşfet
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium Product Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="relative"
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-700"
                  style={{
                    background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.2) 0%, rgba(195, 180, 118, 0.2) 50%, rgba(175, 160, 98, 0.3) 100%)'
                  }}
                />
                <div
                  className="relative backdrop-blur-2xl rounded-3xl p-12 border transition-all duration-500 shadow-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(175, 160, 98, 0.2)',
                    boxShadow: '0 20px 40px rgba(175, 160, 98, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                      {
                        icon: ComputerDesktopIcon,
                        title: 'Web Sitesi',
                        desc: 'Güzel ve kullanışlı web siteleri'
                      },
                      {
                        icon: DevicePhoneMobileIcon,
                        title: 'Mobil Uygulama',
                        desc: 'Akıllı telefon uygulamaları'
                      },
                      {
                        icon: CpuChipIcon,
                        title: 'Yapay Zeka',
                        desc: 'Akıllı teknoloji çözümleri'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="text-center group/item cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
                        whileHover={{ y: -10, scale: 1.05 }}
                      >
                        <div className="relative mb-6">
                          <div
                            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.15) 0%, rgba(195, 180, 118, 0.15) 100%)'
                            }}
                          />
                          <div
                            className="relative w-20 h-20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto border transition-all duration-300"
                            style={{
                              backgroundColor: 'rgba(248, 248, 248, 0.8)',
                              borderColor: 'rgba(175, 160, 98, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                            }}
                          >
                            <item.icon className="w-10 h-10 text-gray-800" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-xl transition-colors duration-300"
                          style={{
                            color: 'rgb(60, 60, 60)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'rgb(175, 160, 98)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgb(60, 60, 60)'
                          }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero