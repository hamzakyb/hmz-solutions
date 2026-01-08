import { motion, useScroll, useTransform } from 'framer-motion'
import { TrophyIcon, UsersIcon, EyeIcon, LightBulbIcon, SparklesIcon, StarIcon, AcademicCapIcon, RocketLaunchIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const About = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const [data, setData] = useState({
    badge: 'Hakkımızda',
    title1: 'Yenilikçi',
    title2: 'Dijital Çözümler',
    description: 'Yaratıcı yaklaşımımız ve teknolojiye olan tutkumuzla, işletmenizin dijital dünyadaki yolculuğunu şekillendiriyoruz. Her fikri benzersiz bir dijital deneyime dönüştürüyoruz.',
    philosophy: 'Mükemmel dijital deneyimler, sadece teknolojiyle değil, aynı zamanda insan odaklı yaklaşımla da mümkündür. Her projede bu dengeyi kurmak bizim önceliğimizdir.',
    mainImage: '',
    stats: [
      { number: 'Yenilikçi', label: 'Yaklaşımlar' },
      { number: 'Özgün', label: 'Çözümler' },
      { number: 'Müşteri', label: 'Odaklılık' },
      { number: 'Sürekli', label: 'Gelişim' }
    ],
    values: [
      {
        title: 'Stratejik Yaklaşım',
        description: 'Her projeye özel stratejiler geliştirerek hedeflerinizi başarıyla dönüştürüyoruz.'
      },
      {
        title: 'Yaratıcı Çözümler',
        description: 'Standartların ötesine geçerek özgün ve etkileyici dijital deneyimler sunuyoruz.'
      },
      {
        title: 'Sürekli Gelişim',
        description: 'Teknolojiyi yakından takip ederek çözümlerimizi sürekli geliştiriyoruz.'
      }
    ]
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?section=about')
        const result = await response.json()
        if (result.content?.data) {
          setData(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch about content:', error)
      }
    }
    fetchContent()
  }, [])

  const statIcons = [TrophyIcon, UsersIcon, EyeIcon, LightBulbIcon, AcademicCapIcon, RocketLaunchIcon]

  return (
    <section ref={containerRef} id="about" className="py-24 sm:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white/80 to-gray-100/90" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-dots" />
        </motion.div>

        {/* Floating Orbs - Altın rengi */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: i % 4 === 0
                ? 'rgba(175, 160, 98, 0.3)'
                : i % 4 === 1
                  ? 'rgba(195, 180, 118, 0.2)'
                  : i % 4 === 2
                    ? 'rgba(175, 160, 98, 0.4)'
                    : 'rgba(185, 170, 108, 0.25)'
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
            className="inline-flex items-center space-x-3 backdrop-blur-xl border rounded-full px-4 sm:px-6 py-3 mb-6 sm:mb-8"
            style={{
              background: 'rgba(175, 160, 98, 0.1)',
              borderColor: 'rgba(175, 160, 98, 0.3)',
              boxShadow: '0 4px 16px rgba(175, 160, 98, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="text-gray-800 font-medium text-sm sm:text-base">{data.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-thin text-gray-900 mb-4 sm:mb-6 tracking-tight"
          >
            <span className="font-extralight">{data.title1}</span>
            <br />
            <span className="font-bold bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 50%, rgb(175, 160, 98) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {data.title2}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-2xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed px-4"
          >
            {data.description}
          </motion.p>
        </motion.div>

        {/* Dynamic Image Section */}
        {data.mainImage && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-white/50 rounded-[2rem] -rotate-1" />
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-gray-200 shadow-2xl">
              <Image
                src={data.mainImage}
                alt="HMZ Solutions - Nevşehir Yazılım ve Web Tasarım Şirketi"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24"
        >
          {data.stats.map((stat, index) => {
            const IconComponent = statIcons[index % statIcons.length] || TrophyIcon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + stat.label.length * 0.1 }}
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
                    <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(175, 160, 98, 0.2) 0%, rgba(195, 180, 118, 0.3) 100%)`
                      }}
                    />
                    <div className="relative bg-white/90 backdrop-blur-2xl rounded-2xl p-4 sm:p-6 lg:p-8 border transition-all duration-500"
                      style={{
                        borderColor: 'rgba(175, 160, 98, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(175, 160, 98, 0.25)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {/* Icon */}
                      <div className="relative mb-3 sm:mb-4">
                        <div className="absolute inset-0 rounded-xl blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, rgba(175, 160, 98, 0.4) 0%, rgba(195, 180, 118, 0.6) 100%)`
                          }}
                        />
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mx-auto shadow-xl"
                          style={{
                            background: `linear-gradient(135deg, rgba(175, 160, 98, 0.8) 0%, rgba(195, 180, 118, 0.9) 100%)`,
                            boxShadow: '0 8px 24px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                      </div>

                      {/* Number */}
                      <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-glow transition-all duration-300">
                        {stat.number}
                      </div>

                      {/* Label */}
                      <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
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
          {data.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.2,
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
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, rgba(175, 160, 98, 0.3) 0%, rgba(195, 180, 118, 0.4) 100%)`
                  }}
                />

                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-10 border transition-all duration-500 h-full"
                  style={{
                    borderColor: 'rgba(175, 160, 98, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.6)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(175, 160, 98, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Premium Icon Placeholder */}
                  <div className="relative mb-6 sm:mb-8">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, rgba(175, 160, 98, 0.4) 0%, rgba(195, 180, 118, 0.6) 100%)`
                        }}
                      />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                        style={{
                          background: `linear-gradient(135deg, rgba(175, 160, 98, 0.8) 0%, rgba(195, 180, 118, 0.9) 100%)`,
                          boxShadow: '0 12px 32px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                        }}
                      >
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-white/30 rounded-lg" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 text-sm sm:text-base">
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
            <div className="absolute inset-0 rounded-3xl blur-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.1) 0%, rgba(195, 180, 118, 0.15) 50%, rgba(175, 160, 98, 0.1) 100%)'
              }}
            />
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-12 border"
              style={{
                borderColor: 'rgba(175, 160, 98, 0.3)',
                boxShadow: '0 8px 32px rgba(175, 160, 98, 0.15)'
              }}
            >
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-light leading-relaxed italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                viewport={{ once: true }}
              >
                &ldquo;{data.philosophy}&rdquo;
              </motion.p>
              <motion.div
                className="mt-4 sm:mt-6 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                viewport={{ once: true }}
                style={{
                  color: 'rgb(175, 160, 98)'
                }}
              >
                - HMZ Solutions Felsefesi
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About