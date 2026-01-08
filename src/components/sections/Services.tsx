'use client'

import { motion } from 'framer-motion'
import {
  CommandLineIcon,
  DevicePhoneMobileIcon,
  CodeBracketSquareIcon,
  ShoppingCartIcon,
  PaintBrushIcon,
  CloudIcon,
  PresentationChartLineIcon,
  CpuChipIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'

interface DynamicService {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  delay: number;
}

const Services = () => {
  const [content, setContent] = useState({
    title: 'Dijital Geleceğinizi Şekillendiriyoruz',
    subtitle: 'İşletmenizi modern teknolojiyle buluşturan, uçtan uca profesyonel dijital çözümler.',
    services: [
      {
        title: 'Web Geliştirme',
        subtitle: 'Modern & Performanslı',
        description: 'Markanızı en iyi yansıtan, yüksek performanslı ve kullanıcı dostu kurumsal web siteleri tasarlıyoruz.',
        features: ['Next.js & React Alt Yapısı', 'SEO Uyumlu Kodlama', 'Hızlı Yüklenme Performansı', 'Dinamik Yönetim Paneli'],
        delay: 0.1
      },
      {
        title: 'Mobil Uygulama',
        subtitle: 'iOS & Android',
        description: 'Kullanıcı alışkanlıklarına uygun, native veya cross-platform mobil uygulamalar ile müşterilerinize her an ulaşın.',
        features: ['React Native & Flutter', 'App Store & Play Store', 'Bildirim Entegrasyonu', 'Kullanıcı Analitiği'],
        delay: 0.15
      },
      {
        title: 'E-Ticaret Çözümleri',
        subtitle: 'Global Satış Altyapısı',
        description: 'Güvenli ödeme sistemleri ve kullanıcı dostu arayüzlerle satışlarınızı katlayacak e-ticaret platformları.',
        features: ['Ödeme Sistemleri Entegrasyonu', 'Stok Takip Modülü', 'Kampanya Yönetimi', 'Kargo Entegrasyonları'],
        delay: 0.2
      },
      {
        title: 'Özel Yazılım',
        subtitle: 'İşinize Özel Çözümler',
        description: 'Şirket içi süreçlerinizi dijitalleştiren, verimliliği artıran ve maliyetleri düşüren CRM/ERP benzeri sistemler.',
        features: ['İş Süreçleri Otomasyonu', 'Veri Analizi & Raporlama', 'Personel Yönetimi', 'Stok & Depo Takibi'],
        delay: 0.25
      },
      {
        title: 'UI/UX Tasarım',
        subtitle: 'Kullanıcı Deneyimi',
        description: 'Kullanıcılarınızı etkileyen, modern ve sezgisel arayüz tasarımları ile dijital varlıklarınıza değer katıyoruz.',
        features: ['Kullanıcı Araştırması', 'Wireframe & Prototip', 'Modern Arayüz Tasarımı', 'Kullanılabilirlik Testleri'],
        delay: 0.3
      },
      {
        title: 'Bulut Sistemleri',
        subtitle: 'Ölçeklenebilir Altyapı',
        description: 'Uygulamalarınızın kesintisiz çalışması için güvenli, hızlı ve ölçeklenebilir bulut mimarileri kuruyoruz.',
        features: ['AWS & Azure & Google Cloud', 'DevOps Süreçleri', 'Sunucu Güvenliği', 'Yedekleme Çözümleri'],
        delay: 0.35
      },
      {
        title: 'Dijital Pazarlama',
        subtitle: 'SEO & Büyüme',
        description: 'Markanızın dijital dünyada görünürlüğünü artıracak stratejik planlama ve performans odaklı reklam yönetimi.',
        features: ['SEO Optimizasyonu', 'Google Ads Yönetimi', 'Sosyal Medya Stratejisi', 'İçerik Pazarlaması'],
        delay: 0.4
      },
      {
        title: 'Yapay Zeka',
        subtitle: 'Akıllı Çözümler',
        description: 'İş süreçlerinize yapay zeka entegre ederek otomatik, akıllı ve geleceğe dönük sistemler geliştiriyoruz.',
        features: ['Chatbot Entegrasyonu', 'Veri Tahminleme', 'Görüntü İşleme', 'NLP Çözümleri'],
        delay: 0.45
      }
    ]
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?section=services')
        const result = await response.json()
        if (result.content?.data) {
          // If admin has defined data, merge or use it. 
          // For now, using it directly but we might want to ensure new fields/structure matches.
          setContent(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch services content:', error)
      }
    }
    fetchContent()
  }, [])

  // Map service titles or generic keys to icons
  const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('web')) return CommandLineIcon;
    if (t.includes('mobil')) return DevicePhoneMobileIcon;
    if (t.includes('e-ticaret') || t.includes('ticaret')) return ShoppingCartIcon;
    if (t.includes('özel yazılım') || t.includes('yazılım')) return CodeBracketSquareIcon;
    if (t.includes('tasarım') || t.includes('ui') || t.includes('ux')) return PaintBrushIcon;
    if (t.includes('bulut') || t.includes('devops')) return CloudIcon;
    if (t.includes('pazarlama') || t.includes('seo')) return PresentationChartLineIcon;
    if (t.includes('yapay') || t.includes('ai') || t.includes('zeka')) return CpuChipIcon;
    return CommandLineIcon; // default
  }

  return (
    <section id="services" className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold tracking-widest uppercase mb-4 border border-amber-100"
            >
              Hizmetlerimiz
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              {content.title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-gray-600 text-lg font-light leading-relaxed"
          >
            {content.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.services.map((service: DynamicService, index: number) => {
            const IconComponent = getIconForTitle(service.title)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.delay || index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-gray-50 text-gray-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t border-gray-100 pt-6">
                    {service.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center text-xs text-gray-500">
                        <ArrowRightIcon className="w-3 h-3 text-amber-400 mr-2 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
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

export default Services