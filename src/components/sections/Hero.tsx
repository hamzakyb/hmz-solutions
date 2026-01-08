'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [content, setContent] = useState({
    title1: 'Global',
    title2: 'Dijital Çözümler',
    subtitle: 'İşletmenizi dijital çağın gereklilikleriyle donatıyor, yüksek performanslı web teknolojileri geliştiriyoruz. Nevşehir merkezli ekibimizle, markanız için ölçeklenebilir ve sürdürülebilir bir dijital altyapı kuruyoruz.',
    ctaText: 'Teklif Alın'
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?section=hero')
        const result = await response.json()
        if (result.content?.data) {
          setContent({
            title1: result.content.data.title1 || 'Global',
            title2: result.content.data.title2 || 'Dijital Çözümler',
            subtitle: result.content.data.subtitle || 'İşletmenizi dijital çağın gereklilikleriyle donatıyor, yüksek performanslı web teknolojileri geliştiriyoruz. Nevşehir merkezli ekibimizle, markanız için ölçeklenebilir ve sürdürülebilir bir dijital altyapı kuruyoruz.',
            ctaText: result.content.data.cta1Text || 'Teklif Alın'
          })
        }
      } catch (error) {
        console.error('Failed to fetch hero content:', error)
      }
    }
    fetchContent()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden px-6">
      {/* Abstract Background - CSS Only, No JS Overhead */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-yellow-500/[0.02] blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Minimalist Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 overflow-hidden"
          >
            <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-medium tracking-widest text-white/60 uppercase">
              HMZ Solutions • Nevşehir
            </span>
          </motion.div>

          {/* Cinematic Typography */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white leading-[0.9] mb-8">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {content.title1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white/50"
            >
              {content.title2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed mb-12"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-white text-black hover:bg-neutral-200 border-0 rounded-full px-10 py-6 text-lg tracking-wide transition-all duration-300"
            >
              {content.ctaText}
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero