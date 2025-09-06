'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../ui/Button'
import { Mail, Phone, MapPin, Send, Clock, Sparkles, Star, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      info: 'info@hmzsolutions.com',
      description: 'Projeleriniz hakkında konuşalım',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Phone,
      title: 'Telefon',
      info: '+90 (555) 123 45 67',
      description: 'Size hemen geri dönelim',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: MapPin,
      title: 'Adres',
      info: 'İstanbul, Türkiye',
      description: 'Ofisimize bekleriz',
      gradient: 'from-emerald-500 to-teal-400'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      info: 'Pzt-Cum 09:00-18:00',
      description: '7/24 acil destek mevcut',
      gradient: 'from-orange-500 to-red-400'
    }
  ]

  return (
    <section ref={containerRef} id="contact" className="py-24 sm:py-32 bg-black relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-dots" />
        </motion.div>
        
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-10 ${
              i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-emerald-500'
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
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
            className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 animate-pulse" />
            <span className="text-white/90 font-medium text-sm sm:text-base">Get In Touch</span>
            <Star className="w-3 sm:w-4 h-3 sm:h-4 text-purple-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-4 sm:mb-6 tracking-tight"
          >
            <span className="font-extralight">Let&apos;s Create</span>
            <br />
            <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-2xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed px-4"
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Form Container */}
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:border-white/20 transition-all duration-500">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                >
                  Start Your Project
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-white/60 mb-8 text-sm sm:text-base"
                >
                  Let&apos;s discuss your vision and create something extraordinary together.
                </motion.p>
            
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-xl"
                        placeholder="Enter your name"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-xl"
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
                    <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-3">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-xl"
                      placeholder="Your company name"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-3">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-xl resize-none"
                      placeholder="Tell us about your project vision, goals, and requirements..."
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
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-[0.98]"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-3 text-base sm:text-lg">
                        <span>Send Proposal Request</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
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
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Contact Information
              </h3>
              <p className="text-white/60 leading-relaxed mb-8 text-sm sm:text-base">
                Reach out through any of these channels. We&apos;re here to bring your vision to life 
                with cutting-edge technology and exceptional design.
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
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      {/* Card */}
                      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-6 group-hover:border-white/20 transition-all duration-500 shadow-lg">
                        <div className="flex items-start space-x-4">
                          {/* Icon */}
                          <div className="relative flex-shrink-0">
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                            <div className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-xl`}>
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white mb-1 text-sm sm:text-base group-hover:text-glow transition-all duration-300">
                              {item.title}
                            </h4>
                            <p className="text-white/90 font-medium mb-2 text-sm sm:text-base break-all sm:break-normal">
                              {item.info}
                            </p>
                            <p className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
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
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* CTA Card */}
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 group-hover:border-white/20 transition-all duration-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        Quick Start
                      </h4>
                      <p className="text-white/60 text-sm">
                        Free consultation available
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-white/70 mb-6 text-sm leading-relaxed">
                    Ready to transform your ideas into reality? Let&apos;s start your project today with our 
                    expert consultation and premium development services.
                  </p>
                  
                  <button className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]">
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Call Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </button>
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