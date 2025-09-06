'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Sparkles, Star, ArrowRight } from 'lucide-react'
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
    { label: 'Home', href: '#home', description: 'Back to top' },
    { label: 'Services', href: '#services', description: 'Our expertise' },
    { label: 'About', href: '#about', description: 'Our story' },
    { label: 'Contact', href: '#contact', description: 'Get in touch' },
  ]

  const services = [
    { label: 'Web Development', href: '#services', description: 'Modern websites' },
    { label: 'Mobile Apps', href: '#services', description: 'iOS & Android' },
    { label: 'Custom Software', href: '#services', description: 'Tailored solutions' },
    { label: 'AI Integration', href: '#services', description: 'Future-ready tech' },
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', gradient: 'from-gray-500 to-gray-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', gradient: 'from-blue-500 to-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', gradient: 'from-sky-400 to-sky-500' },
  ]

  return (
    <footer ref={containerRef} className="py-16 sm:py-24 bg-black relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-dots" />
        </motion.div>
        
        {/* Floating Orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 sm:w-48 h-32 sm:h-48 rounded-full blur-3xl opacity-10 ${
              i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'
            }`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 30}%`,
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
            className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 animate-pulse" />
            <span className="text-white/90 font-medium text-sm sm:text-base">Stay Connected</span>
            <Star className="w-3 sm:w-4 h-3 sm:h-4 text-purple-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-white mb-4 tracking-tight"
          >
            <span className="font-extralight">Let&apos;s Build</span>
            <br />
            <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Future Together
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all duration-500">
                {/* Premium Logo */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-xl blur-lg opacity-70" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center shadow-xl overflow-hidden p-2.5 sm:p-3">
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
                      <span className="text-white font-bold text-lg sm:text-xl hidden">
                        H
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-white">HMZ SOLUTIONS</span>
                    <p className="text-white/60 text-sm">Digital Innovation Partners</p>
                  </div>
                </div>
                
                <p className="text-white/70 leading-relaxed mb-6 text-sm sm:text-base">
                  Transforming visions into digital realities with cutting-edge technology, 
                  exceptional design, and unwavering commitment to excellence.
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
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="group/social relative"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} rounded-xl blur-lg opacity-0 group-hover/social:opacity-70 transition-opacity duration-300`} />
                        <div className={`relative p-3 bg-gradient-to-br ${social.gradient} rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
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
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-3 animate-pulse" />
                  Navigation
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
                        className="group/link flex items-start space-x-3 text-white/70 hover:text-white transition-colors duration-300"
                      >
                        <ArrowRight className="w-4 h-4 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        <div>
                          <div className="font-medium">{link.label}</div>
                          <div className="text-xs text-white/50">{link.description}</div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 animate-pulse" />
                  Solutions
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
                        className="group/link flex items-start space-x-3 text-white/70 hover:text-white transition-colors duration-300"
                      >
                        <ArrowRight className="w-4 h-4 mt-0.5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        <div>
                          <div className="font-medium">{service.label}</div>
                          <div className="text-xs text-white/50">{service.description}</div>
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
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <div className="text-white/60 text-sm">
                © {currentYear} HMZ Solutions. Crafted with passion in Istanbul.
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookies', href: '#' },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/60 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
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
            <div className="inline-flex items-center space-x-2 text-white/40 text-xs">
              <Star className="w-3 h-3" />
              <span>Powered by Innovation & Excellence</span>
              <Star className="w-3 h-3" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer