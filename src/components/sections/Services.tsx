'use client'

import { motion } from 'framer-motion'
import { ArrowsPointingOutIcon, CodeBracketIcon, DevicePhoneMobileIcon, LinkIcon, SparklesIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useRef, useState, useEffect } from 'react'

interface DynamicService {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  delay: number;
}

const Services = () => {
  const [content, setContent] = useState({
    title: 'Dijital Hizmetlerimiz',
    subtitle: 'İşletmenizin dijital ihtiyaçları için profesyonel çözümler sunuyoruz.',
    services: [
      {
        title: 'Web Sitesi',
        subtitle: 'Profesyonel Web Çözümleri',
        description: 'Şirketiniz için modern, hızlı ve kolay kullanımlı web siteleri yapıyoruz.',
        features: ['Hızlı Yükleme', 'Mobil Uyumlu', 'Arama Motorlarında Görünür', 'Kolay Yönetim'],
        delay: 0.1
      },
      {
        title: 'Mobil Uygulama',
        subtitle: 'iOS & Android Uygulamalar',
        description: 'iPhone ve Android telefonlar için kullanıcı dostu mobil uygulamalar geliştiriyoruz.',
        features: ['iOS Uygulamaları', 'Android Uygulamaları', 'Kullanıcı Dostu Arayüz', 'Mağaza Yayınlama'],
        delay: 0.2
      },
      {
        title: 'Özel Yazılım',
        subtitle: 'İşe Özel Teknoloji',
        description: 'İş süreçlerinize özel yazılım çözümleri ile verimliliği artırıyoruz.',
        features: ['İş Süreçleri Otomasyonu', 'Veri Analizi', 'Güvenli Sistemler', 'Teknik Destek'],
        delay: 0.3
      }
    ]
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?section=services')
        const result = await response.json()
        if (result.content?.data) {
          setContent(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch services content:', error)
      }
    }
    fetchContent()
  }, [])

  const iconMap = [ComputerDesktopIcon, DevicePhoneMobileIcon, CodeBracketIcon, SparklesIcon, ArrowsPointingOutIcon, LinkIcon]

  return (
    <section id="services" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4 block">Hizmetlerimiz</span>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              {content.title}
            </h2>
          </div>
          <p className="max-w-md text-gray-500 font-light leading-relaxed mb-1">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-gray-100 border border-gray-100 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service: DynamicService, index: number) => {
            const IconComponent = iconMap[index % iconMap.length] || ComputerDesktopIcon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white p-10 hover:bg-neutral-50 transition-colors duration-300"
              >
                <div className="mb-8 inline-flex p-3 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <IconComponent className="w-6 h-6 text-gray-900" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">
                  {service.subtitle}
                </p>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <span className="w-1 h-1 bg-gray-300 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services