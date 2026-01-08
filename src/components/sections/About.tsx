'use client'

import { motion } from 'framer-motion'
import { TrophyIcon, UsersIcon, EyeIcon, LightBulbIcon, AcademicCapIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const About = () => {
  const [data, setData] = useState({
    title1: 'Stratejik',
    title2: 'Çözüm Ortağınız',
    description: 'HMZ Solutions, işletmelerin dijital dönüşüm süreçlerine liderlik eden profesyonel bir teknoloji şirketidir. Karmaşık iş problemlerini, kullanıcı odaklı tasarım ve güçlü yazılım mimarisiyle çözüyoruz. Amacımız, markanızı dijital dünyada güvenilir ve lider bir konuma taşımaktır.',
    philosophy: 'Başarı tesadüf değildir; doğru strateji ve kusursuz uygulamanın sonucudur.',
    mainImage: '',
    stats: [
      { number: 'Profesyonel', label: 'Yaklaşım' },
      { number: 'Yüksek', label: 'Teknoloji' },
      { number: 'Sürdürülebilir', label: 'Büyüme' },
      { number: 'Garantili', label: 'Sonuç' }
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
    <section id="about" className="py-24 sm:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4 block">Hakkımızda</span>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-8">
              {data.title1} <span className="text-gray-400">{data.title2}</span>
            </h2>
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
              {data.description}
            </p>
            <div className="pl-6 border-l-2 border-gray-900">
              <p className="text-gray-800 italic">
                &ldquo;{data.philosophy}&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full bg-gray-200 overflow-hidden"
          >
            {data.mainImage ? (
              <Image
                src={data.mainImage}
                alt="HMZ Solutions - Nevşehir Yazılım ve Web Tasarım Şirketi"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Görsel Yükleniyor...
              </div>
            )}
            {/* Minimalist Overlay */}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-gray-200 pt-16">
          {data.stats.map((stat, index) => {
            const IconComponent = statIcons[index % statIcons.length]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-1"
              >
                {/* Decorational Circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AF9C64]/5 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150 group-hover:bg-[#AF9C64]/10" />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-[#AF9C64]/10 text-[#AF9C64] group-hover:bg-[#AF9C64] group-hover:text-white transition-colors duration-500">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-2xl lg:text-3xl font-serif italic text-gray-900 group-hover:text-[#AF9C64] transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="h-px w-12 bg-gray-200 group-hover:w-full group-hover:bg-[#AF9C64]/30 transition-all duration-500" />
                    <div className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase group-hover:text-gray-900 transition-colors duration-300 pt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About