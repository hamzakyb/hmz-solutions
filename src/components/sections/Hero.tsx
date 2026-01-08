'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

interface HeroSlide {
  id: string;
  badge: string;
  title1: string;
  title2: string;
  subtitle: string;
  image?: string;
  ctaText: string;
  ctaLink: string;
}

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?section=hero')
        const result = await response.json()
        const data = result.content?.data

        if (data?.slides && Array.isArray(data.slides) && data.slides.length > 0) {
          setSlides(data.slides)
        } else {
          // Default initial state with Premium Content (Overrides legacy flat data)
          // If no 'slides' array exists, we default to our new premium content 
          // to ensure the user sees the new design immediately.
          setSlides([
            {
              id: 'slide-1',
              badge: 'HMZ SOLUTIONS • GLOBAL',
              title1: 'Sınırları Aşan',
              title2: 'Teknoloji',
              subtitle: 'İşletmenizi global standartlara taşıyan, ölçeklenebilir ve güvenli dijital altyapılar kuruyoruz.',
              image: '/hero-slides/hero-globe.png?v=2',
              ctaText: 'Keşfedin',
              ctaLink: '#services'
            },
            {
              id: 'slide-2',
              badge: 'YAPAY ZEKA • İNOVASYON',
              title1: 'Geleceği',
              title2: 'Tasarlıyoruz',
              subtitle: 'İş süreçlerinizi yapay zeka ve veri odaklı çözümlerle optimize ederek verimliliğinizi maksimize edin.',
              image: '/hero-slides/hero-ai.png?v=2',
              ctaText: 'AI Çözümleri',
              ctaLink: '#services'
            },
            {
              id: 'slide-3',
              badge: 'DİJİTAL DÖNÜŞÜM',
              title1: 'Kodun',
              title2: 'Sanatı',
              subtitle: 'Modern, hızlı ve kullanıcı odaklı yazılım çözümleriyle markanızın dijital varlığını güçlendiriyoruz.',
              image: '/hero-slides/hero-growth.png?v=2',
              ctaText: 'Proje Başlatın',
              ctaLink: '#contact'
            }
          ])
        }
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to fetch hero content:', error)
      }
    }
    fetchContent()
  }, [])

  useEffect(() => {
    if (isPlaying && slides.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, slides.length])

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    resetTimer()
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    resetTimer()
  }

  const resetTimer = () => {
    if (isPlaying && slides.length > 1) {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  if (!isLoaded || slides.length === 0) return (
    <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
    </div>
  )

  const slide = slides[currentSlide]

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          {slide.image ? (
            <>
              <div className="absolute inset-0 bg-black/60 z-10" />
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title1}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-[#0a0a0a] to-black" />
              {/* Premium Golden Glows */}
              <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gold-400/[0.03] blur-[120px] pointer-events-none mix-blend-screen" />
              <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-gold-600/[0.02] blur-[100px] pointer-events-none mix-blend-screen" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
        <div className="flex flex-col items-start max-w-5xl">
          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 overflow-hidden"
              >
                <div className="h-[1px] w-8 bg-gold-500/50" />
                <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase">
                  {slide.badge}
                </span>
              </motion.div>

              {/* Cinematic Title */}
              <div className="space-y-2">
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9]"
                >
                  <span className="block">{slide.title1}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">
                    {slide.title2}
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-neutral-400 max-w-2xl font-light leading-relaxed pl-1"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  onClick={() => {
                    if (slide.ctaLink.startsWith('#')) {
                      document.getElementById(slide.ctaLink.substring(1))?.scrollIntoView({ behavior: 'smooth' })
                    } else {
                      window.open(slide.ctaLink, '_blank')
                    }
                  }}
                  className="group bg-gold-500 hover:bg-gold-400 text-black border-0 rounded-full px-10 py-7 text-lg font-bold tracking-wide transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_-10px_rgba(212,175,55,0.5)] transform hover:-translate-y-1"
                >
                  {slide.ctaText}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 right-6 md:right-12 z-20 flex items-center space-x-6">
          {/* Pagination Dots */}
          <div className="flex items-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSlide(index); resetTimer(); }}
                className={`h-1 transition-all duration-300 rounded-full ${currentSlide === index ? 'w-8 bg-gold-500' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 text-white/60 hover:text-gold-400 transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all backdrop-blur-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 text-white/60 hover:text-gold-400 transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && isPlaying && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-gold-500"
          />
        </div>
      )}
    </section>
  )
}

export default Hero