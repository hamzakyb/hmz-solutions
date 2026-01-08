'use client'

import React from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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
    ArrowRightIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

const servicesData = [
    {
        title: 'Web Geliştirme',
        subtitle: 'Modern & Performanslı',
        description: 'Markanızı en iyi yansıtan, yüksek performanslı ve kullanıcı dostu kurumsal web siteleri tasarlıyoruz. SEO uyumlu altyapı ve modern teknolojilerle dijital varlığınızı güçlendiriyoruz.',
        features: ['Next.js & React Alt Yapısı', 'SEO Uyumlu Kodlama', 'Hızlı Yüklenme Performansı', 'Dinamik Yönetim Paneli', 'Responsive Tasarım', 'Güvenlik Optimizasyonu'],
        icon: CommandLineIcon,
        gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
        title: 'Mobil Uygulama',
        subtitle: 'iOS & Android',
        description: 'Kullanıcı alışkanlıklarına uygun, native veya cross-platform mobil uygulamalar ile müşterilerinize her an ulaşın. React Native ve Flutter teknolojileriyle maliyet etkin çözümler sunuyoruz.',
        features: ['React Native & Flutter', 'App Store & Play Store Yayınlama', 'Bildirim Entegrasyonu', 'Kullanıcı Analitiği', 'Çevrimdışı Çalışma Modu', 'Biyometrik Doğrulama'],
        icon: DevicePhoneMobileIcon,
        gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
        title: 'E-Ticaret Çözümleri',
        subtitle: 'Global Satış Altyapısı',
        description: 'Güvenli ödeme sistemleri ve kullanıcı dostu arayüzlerle satışlarınızı katlayacak e-ticaret platformları. B2B ve B2C iş modellerine uygun ölçeklenebilir altyapılar.',
        features: ['Ödeme Sistemleri Entegrasyonu', 'Stok Takip Modülü', 'Kampanya Yönetimi', 'Kargo Entegrasyonları', 'Pazaryeri Entegrasyonları', 'Gelişmiş Raporlama'],
        icon: ShoppingCartIcon,
        gradient: 'from-amber-500/20 to-orange-500/20'
    },
    {
        title: 'Yapay Zeka',
        subtitle: 'Akıllı Çözümler',
        description: 'İş süreçlerinize yapay zeka entegre ederek otomatik, akıllı ve geleceğe dönük sistemler geliştiriyoruz. Veri analitiği ve makine öğrenimi ile verimliliği artırın.',
        features: ['Chatbot Entegrasyonu', 'Veri Tahminleme', 'Görüntü İşleme', 'NLP Çözümleri', 'Öneri Sistemleri', 'Otomatik Raporlama'],
        icon: CpuChipIcon,
        gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    {
        title: 'Bulut Sistemleri',
        subtitle: 'Ölçeklenebilir Altyapı',
        description: 'Uygulamalarınızın kesintisiz çalışması için güvenli, hızlı ve ölçeklenebilir bulut mimarileri kuruyoruz. DevOps süreçleri ile dağıtım ve yönetim maliyetlerini düşürüyoruz.',
        features: ['AWS & Azure & Google Cloud', 'DevOps Süreçleri', 'Sunucu Güvenliği', 'Yedekleme Çözümleri', 'Docker & Kubernetes', 'CI/CD Pipeline'],
        icon: CloudIcon,
        gradient: 'from-sky-500/20 to-indigo-500/20'
    },
    {
        title: 'UI/UX Tasarım',
        subtitle: 'Kullanıcı Deneyimi',
        description: 'Kullanıcılarınızı etkileyen, modern ve sezgisel arayüz tasarımları ile dijital varlıklarınıza değer katıyoruz. Kullanıcı araştırmaları ve testlerle en iyi deneyimi hedefliyoruz.',
        features: ['Kullanıcı Araştırması', 'Wireframe & Prototip', 'Modern Arayüz Tasarımı', 'Kullanılabilirlik Testleri', 'Design System Oluşturma', 'Micro-Animation'],
        icon: PaintBrushIcon,
        gradient: 'from-rose-500/20 to-red-500/20'
    }
]

import { useState, useEffect } from 'react'

const initialServicesData = [
    // ... (keep default services mapped to icons here if needed or empty and rely on defaults)
    // For simplicity, we'll keep the static array as fallback or initial state
    {
        title: 'Web Geliştirme',
        subtitle: 'Modern & Performanslı',
        description: 'Markanızı en iyi yansıtan, yüksek performanslı ve kullanıcı dostu kurumsal web siteleri tasarlıyoruz. SEO uyumlu altyapı ve modern teknolojilerle dijital varlığınızı güçlendiriyoruz.',
        features: ['Next.js & React Alt Yapısı', 'SEO Uyumlu Kodlama', 'Hızlı Yüklenme Performansı', 'Dinamik Yönetim Paneli', 'Responsive Tasarım', 'Güvenlik Optimizasyonu'],
        gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    // ... (simulated default data)
]

export default function ServicesPage() {
    const [content, setContent] = useState<any>(null)

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

    // Helper to get icon (duplicated from Services section, ideally shared util)
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
        return CommandLineIcon;
    }

    const title = content?.title || 'Dijital Mükemmellik'
    const subtitle = content?.subtitle || 'İşletmenizi geleceğe taşıyan, uçtan uca tasarlanmış teknoloji çözümleri. Modern yazılım mimarileri ve ödüllü tasarım anlayışıyla fark yaratın.'
    const services = content?.services || servicesData

    return (
        <main className="bg-black min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[#050505]" />
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent opacity-30 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{title.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed font-light">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service: any, index: number) => {
                            const IconComponent = getIconForTitle(service.title)
                            // Assign gradient based on index if not present (backend might not store gradients)
                            const gradients = [
                                'from-blue-500/20 to-cyan-500/20',
                                'from-purple-500/20 to-pink-500/20',
                                'from-amber-500/20 to-orange-500/20',
                                'from-emerald-500/20 to-teal-500/20',
                                'from-sky-500/20 to-indigo-500/20',
                                'from-rose-500/20 to-red-500/20'
                            ]
                            const gradient = service.gradient || gradients[index % gradients.length]

                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                            <IconComponent className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                                        <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-4">{service.subtitle}</p>

                                        <p className="text-gray-400 leading-relaxed mb-8 min-h-[80px]">
                                            {service.description}
                                        </p>

                                        <ul className="space-y-3">
                                            {service.features.map((feature: string, i: number) => (
                                                <li key={i} className="flex items-start text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                                    <CheckCircleIcon className="w-5 h-5 text-blue-500/50 mr-3 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-white/40 group-hover:text-white transition-colors cursor-pointer">
                                            <span className="text-sm font-bold mr-2">Detaylı İncele</span>
                                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-6">Projenizi Hayata Geçirelim</h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Sizin için en doğru teknolojiyi belirleyelim ve dijital dönüşümünüzü başlatalım.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors transform hover:scale-105 duration-300"
                    >
                        Hemen Teklif Alın
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    )
}
