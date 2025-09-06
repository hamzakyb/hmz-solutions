'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../ui/Button'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
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
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Dynamic Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid animate-pulse" />
        </div>
        
        {/* Floating Orbs with Mouse Interaction */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${
              i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
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
        
        {/* Interactive Cursor Light */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="text-white/90 font-medium">Premium Digital Solutions</span>
                <Star className="w-4 h-4 text-purple-400" />
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
              <div className="absolute inset-0 bg-white rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-500 overflow-hidden p-4 sm:p-5">
                {/* Logo with better sizing and padding */}
                <img 
                  src="/logo.png" 
                  alt="HMZ Solutions Logo" 
                  className="w-full h-full object-contain max-w-none"
                  onError={(e) => {
                    // Fallback to letter H if logo image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <span className="text-white font-bold text-3xl tracking-tight hidden">
                  H
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cinematic Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin text-white mb-8 leading-none tracking-tighter">
              <motion.span 
                className="block font-extralight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Think
              </motion.span>
              <motion.span 
                className="block font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Beyond
              </motion.span>
            </h1>
          </motion.div>
          
          {/* Premium Subtitle with Typewriter Effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-3xl font-light text-white/80 mb-12 max-w-5xl mx-auto leading-relaxed"
          >
            Teknolojinin sınırlarını aşan, geleceği şekillendiren dijital deneyimler yaratıyoruz.
            <br className="hidden md:block" />
            <span className="text-blue-400 font-medium">İnovasyon. Tasarım. Mükemmellik.</span>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <Button 
                size="lg" 
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium px-12 py-4 rounded-full text-lg shadow-2xl hover:bg-white/20 transition-all duration-300 group"
              >
                Projeye Başla
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/50 font-medium px-12 py-4 rounded-full text-lg transition-all duration-300"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700" />
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                      { icon: '🌐', title: 'Web Excellence', desc: 'Premium web experiences' },
                      { icon: '📱', title: 'Mobile Innovation', desc: 'Next-gen mobile apps' },
                      { icon: '⚡', title: 'AI Integration', desc: 'Intelligent solutions' }
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
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          <div className="relative w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto border border-white/20 group-hover/item:border-white/40 transition-all duration-300">
                            <span className="text-3xl">{item.icon}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-white mb-2 text-xl group-hover/item:text-blue-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/60 group-hover/item:text-white/80 transition-colors duration-300">
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
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero