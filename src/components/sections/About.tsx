'use client'

import { motion } from 'framer-motion'
import { TrophyIcon, UsersIcon, EyeIcon, LightBulbIcon, AcademicCapIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const About = () => {
  const [data, setData] = useState({
    title1: 'Yenilikçi',
    title2: 'Dijital Çözümler',
    description: 'Yaratıcı yaklaşımımız ve teknolojiye olan tutkumuzla, işletmenizin dijital dünyadaki yolculuğunu şekillendiriyoruz. Her fikri benzersiz bir dijital deneyime dönüştürüyoruz.',
    philosophy: 'Mükemmel dijital deneyimler, sadece teknolojiyle değil, aynı zamanda insan odaklı yaklaşımla da mümkündür.',
    mainImage: '',
    stats: [
      { number: 'Yenilikçi', label: 'Yaklaşımlar' },
      { number: 'Özgün', label: 'Çözümler' },
      { number: 'Müşteri', label: 'Odaklılık' },
      { number: 'Sürekli', label: 'Gelişim' }
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
              <div key={index}>
                <div className="mb-4 text-gray-400">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About