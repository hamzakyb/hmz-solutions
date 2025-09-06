'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Users, Target, Lightbulb, Sparkles, Star } from 'lucide-react'
import { useRef } from 'react'

const About = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const stats = [
    { number: '100+', label: 'Tamamlanan Proje', icon: Award, gradient: 'from-blue-500 to-cyan-400' },
    { number: '50+', label: 'Mutlu Müşteri', icon: Users, gradient: 'from-purple-500 to-pink-400' },
    { number: '5+', label: 'Yıl Deneyim', icon: Target, gradient: 'from-emerald-500 to-teal-400' },
    { number: '24/7', label: 'Destek Hizmeti', icon: Lightbulb, gradient: 'from-orange-500 to-red-400' },
  ]

  const values = [
    {
      title: 'İnovasyon',
      description: 'En yeni teknolojileri kullanarak geleceği bugünden yaşatıyoruz.',
      gradient: 'from-blue-600 to-cyan-400',
      delay: 0.2
    },
    {
      title: 'Kalite',
      description: 'Her projede mükemmellik standartlarını aşmaya odaklanıyoruz.',
      gradient: 'from-purple-600 to-pink-400',
      delay: 0.4
    },
    {
      title: 'Güvenilirlik',
      description: 'Zamanında teslimat ve sürekli destek ile yanınızdayız.',
      gradient: 'from-emerald-600 to-teal-400',
      delay: 0.6
    }
  ]

  return (
    <section ref={containerRef} id="about" className="py-24 sm:py-32 bg-black relative overflow-hidden">
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
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-10 ${
              i % 4 === 0 ? 'bg-blue-500' : i % 4 === 1 ? 'bg-purple-500' : i % 4 === 2 ? 'bg-pink-500' : 'bg-emerald-500'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
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
            <span className="text-white/90 font-medium text-sm sm:text-base">About Excellence</span>
            <Star className="w-3 sm:w-4 h-3 sm:h-4 text-purple-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-4 sm:mb-6 tracking-tight"
          >
            <span className="font-extralight">Crafting</span>
            <br />
            <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Digital Dreams
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-2xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed px-4"
          >
            Teknolojinin sınırlarını zorlayarak, işletmenizin dijital potansiyelini gerçeğe dönüştürüyoruz. 
            Her projede mükemmellik arayışımız, sizi rekabette öne çıkarır.
          </motion.p>
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className="text-center"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Premium Stat Card */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 group-hover:border-white/20 transition-all duration-500">
                      {/* Icon */}
                      <div className="relative mb-3 sm:mb-4">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className={`relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto shadow-xl`}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Number */}
                      <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-glow transition-all duration-300">
                        {stat.number}
                      </div>
                      
                      {/* Label */}
                      <div className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Premium Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: value.delay,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Premium Value Card */}
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
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                {/* Main Card */}
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 group-hover:border-white/20 transition-all duration-500 h-full">
                  {/* Premium Icon Placeholder */}
                  <div className="relative mb-6 sm:mb-8">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/20 rounded-lg" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {value.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300 text-sm sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 text-center"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10">
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-white/80 font-light leading-relaxed italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                viewport={{ once: true }}
              >
                "Teknoloji sadece bir araç değil, hayallerin gerçeğe dönüştüğü köprüdür. 
                Biz bu köprüyü en güçlü şekilde inşa ediyoruz."
              </motion.p>
              <motion.div
                className="mt-4 sm:mt-6 text-blue-400 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                viewport={{ once: true }}
              >
                - HMZ Solutions Team
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About