'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Smartphone, Globe, ArrowRight, Sparkles, Star } from 'lucide-react'
import { useRef } from 'react'

const Services = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const services = [
    {
      icon: Globe,
      title: 'Web Excellence',
      subtitle: 'Premium Digital Experiences',
      description: 'Cutting-edge web technologies that transform your digital presence with unmatched performance and design.',
      features: ['Next.js & React 18', 'Advanced Animations', 'Performance Optimization', 'SEO Mastery'],
      gradient: 'from-blue-600 via-blue-500 to-cyan-400',
      glowColor: 'blue',
      delay: 0.2
    },
    {
      icon: Smartphone,
      title: 'Mobile Innovation',
      subtitle: 'Next-Gen App Development',
      description: 'Revolutionary mobile experiences that set new standards for user engagement and technological innovation.',
      features: ['React Native', 'SwiftUI & Jetpack', 'AR/VR Integration', 'AI-Powered Features'],
      gradient: 'from-purple-600 via-purple-500 to-pink-400',
      glowColor: 'purple',
      delay: 0.4
    },
    {
      icon: Code,
      title: 'AI Solutions',
      subtitle: 'Intelligent Software Systems',
      description: 'Future-ready AI solutions that automate processes and unlock new possibilities for your business.',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      gradient: 'from-emerald-600 via-green-500 to-teal-400',
      glowColor: 'emerald',
      delay: 0.6
    }
  ]

  return (
    <section ref={containerRef} id="services" className="py-32 bg-black relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-grid" />
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
            className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-white/90 font-medium">Premium Services</span>
            <Star className="w-4 h-4 text-purple-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-thin text-white mb-6 tracking-tight"
          >
            <span className="font-extralight">Redefining</span>
            <br />
            <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed"
          >
            Where innovation meets perfection. Experience the future of digital solutions crafted with precision and passion.
          </motion.p>
        </motion.div>

        {/* Premium Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
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
                  {/* Premium Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                  
                  {/* Main Card */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500 h-full">
                    {/* Premium Icon */}
                    <div className="relative mb-8">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotateZ: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                          {service.title}
                        </h3>
                        <p className="text-blue-400 font-medium text-sm tracking-wide uppercase">
                          {service.subtitle}
                        </p>
                      </div>
                      
                      <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Premium Features */}
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 group-hover:shadow-lg group-hover:shadow-${service.glowColor}-500/50 transition-shadow duration-300`} />
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
                        <div className="flex items-center text-white font-medium group-hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                          <span className="mr-3">Explore More</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
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
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Ready to transform your vision into reality?
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <button className="relative bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium px-12 py-4 rounded-full text-lg shadow-2xl hover:bg-white/20 transition-all duration-300 group">
              Start Your Project
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 inline-block" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services