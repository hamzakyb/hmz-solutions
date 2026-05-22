'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowRight, 
  Cpu, 
  Globe, 
  Layers, 
  LineChart, 
  ShoppingBag, 
  Smartphone, 
  Sparkles, 
  X, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  Zap 
} from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  category: string
  shortDescription: string
  description: string
  problem: string
  solution: string
  results: string[]
  metrics: { label: string; value: string }[]
  tags: string[]
  image: string
  icon: any
  features: string[]
  liveUrl?: string
}

const projectsData: CaseStudy[] = [
  {
    id: 'step-filtre',
    title: 'Step Filtre B2B E-Ticaret Platformu',
    category: 'B2B & E-Ticaret',
    shortDescription: 'Filtre üreticileri için B2B cari takipli, Excel entegrasyonlu ve Socket.io destekli tam kapsamlı e-ticaret yönetim merkezi.',
    description: 'Step Filtre için özel olarak geliştirilen bu sistem, filtre imalatı ve toptan dağıtım süreçlerindeki tüm bayi ağını (B2B) ve sipariş akışlarını (B2C) dijitalleştiren uçtan uca kurumsal bir platformdur. Proje, bayilere özel dinamik fiyat listelerinden, saniyeler içinde binlerce ürünü güncelleyen Excel toplu yükleme motoruna ve canlı cari borç/bakiye takibine kadar geniş bir finansal ve operasyonel hacmi tek panelden yönetmektedir.',
    problem: 'Geleneksel yöntemlerle yönetilen otomotiv ve sanayi filtre kataloğunda, binlerce farklı modelin stok ve fiyat listelerini manuel güncellemenin yarattığı zaman kaybı, telefonla sipariş almada yaşanan stok çakışmaları ve bayilerin cari borç/limit mutabakatlarının Excel tablolarıyla elle yürütülmesinden kaynaklanan yüksek operasyonel hatalar.',
    solution: 'React (Vite SPA) frontend ve Node.js + Express.js backend mimarisi üzerinde, Mongoose/MongoDB veritabanı, gerçek zamanlı WebSocket (Socket.io) bildirim mekanizmaları ve XLSX tabanlı toplu veri işleme servisleri ile entegre, rol tabanlı erişim denetimli (RBAC) yüksek performanslı kurumsal otomasyon paneli.',
    results: [
      'Toplu ürün/fiyat ve stok güncellemelerinde (10.000+ kalem) XLSX veri motoru sayesinde %98 zaman tasarrufu (ortalama 1.5 saniye işlem süresi).',
      'Anlık WebSocket stok bildirimleri sayesinde mükerrer veya stokta kalmayan ürün siparişi hata oranının tamamen sıfırlanması (%0 sipariş hatası).',
      'Bayilerin kendi panellerinden bakiye, kredi limiti, vadesi gelen ödemeler ve geçmiş ödeme dekontlarını sorgulayabilmesiyle finans ekibinin mutabakat iş yükünde %75 azalma.',
      'Sipariş özetleri, proforma faturalar ve cari hesap ekstrelerinin tarayıcı tarafında jsPDF ve AutoTable entegrasyonuyla anında indirilebilir dinamik PDF belgelere dönüştürülmesi.'
    ],
    metrics: [
      { label: 'Toplu Güncelleme', value: '1.5s' },
      { label: 'Sipariş Hatası', value: '%0' },
      { label: 'Muhasebe İş Yükü', value: '-%75' }
    ],
    tags: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Stripe', 'jsPDF', 'XLSX Parser'],
    image: '/projects/step_filtre.png',
    icon: ShoppingBag,
    features: [
      'Toplu Ürün ve Fiyat Güncelleme Motoru (Multer & XLSX Entegrasyonu)',
      'Bayi Cari Hesap & Finansal Bakiye Takip Sistemi (Debt, Paid, Credit Limit)',
      'Ödeme Vadeleri ve Ödeme Söz Tarihleri İzleme (DueDate & PromiseDate)',
      'Gerçek Zamanlı Kritik Stok ve Sipariş Bildirimleri (Socket.io)',
      'Sipariş Özeti ve Cari Hesap Ekstresi PDF Motoru (jsPDF & AutoTable)',
      'Kupon, İskonto ve Kampanya Yönetimi (Coupons Service)',
      'Rol Tabanlı Güvenli Yetkilendirme Arayüzü (JWT & Bcryptjs)'
    ],
    liveUrl: 'https://www.stepfiltre.com.tr/'
  },
  {
    id: 'ai-saas',
    title: 'Akıllı Yapay Zeka SaaS Platformu',
    category: 'Yapay Zeka',
    shortDescription: 'Veri analitiği ve yapay zeka entegrasyonlu yeni nesil SaaS platformumuz çok yakında burada sergilenecektir.',
    description: 'Sıradaki büyük projemiz için çalışmalarımız devam ediyor. Gelişmiş veri analitiği ve akıllı otomasyon çözümlerini içeren yeni platformumuzu yakında burada paylaşacağız.',
    problem: 'Modern işletmelerin büyük veri ve yapay zeka entegrasyonlarını kendi süreçlerine hızlı ve verimli bir şekilde adapte edememesi.',
    solution: 'Özel eğitilmiş yapay zeka modelleri ve kolay entegre edilebilir API altyapısıyla donatılmış yeni nesil SaaS platformu.',
    results: [
      'Geliştirme süreci aktif olarak devam etmektedir.',
      'Yapay zeka modellerinin entegrasyonu tamamlanmıştır.',
      'Yakında gerçek müşteri verileriyle yayına alınacaktır.'
    ],
    metrics: [
      { label: 'Durum', value: 'Geliştiriliyor' },
      { label: 'Yapay Zeka', value: 'GPT-4' },
      { label: 'Tamamlanma', value: '%85' }
    ],
    tags: ['Next.js', 'OpenAI API', 'Python', 'Tailwind', 'SaaS'],
    image: '/projects/ai.png',
    icon: Cpu,
    features: [
      'Yapay Zeka Destekli Tahminleme Modülleri',
      'Akıllı Veri Analitiği Dashboard Arayüzü',
      'Özelleştirilebilir Slack ve E-Posta Entegrasyonları'
    ]
  }
]

const categories = ['Tümü', 'B2B & E-Ticaret', 'Yapay Zeka']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null)

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'Tümü'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory)

  return (
    <main className="bg-black min-h-screen relative overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-400/[0.02] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-gold-500/[0.01] blur-[120px] pointer-events-none mix-blend-screen" />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase">
                BAŞARI HİKAYELERİMİZ
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Dijital Dünyada{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400">
                İmzamız
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light"
            >
              Global iş ortaklarımızın dijital altyapılarını baştan inşa ettik, ölçeklenebilir ve yüksek performanslı çözümlerle hedeflerine ulaştırdık.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-black border-gold-400 font-bold shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]'
                    : 'bg-white/[0.02] text-neutral-400 border-white/5 hover:text-white hover:border-white/10 hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const Icon = project.icon
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => setActiveProject(project)}
                    className="group relative rounded-3xl bg-neutral-900/30 backdrop-blur-xl border border-white/5 p-6 hover:border-gold-500/20 transition-all duration-500 shadow-glow-gold hover:shadow-glow-gold-hover cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    {/* Glowing effect inside card */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gold-500/5 blur-[60px] group-hover:bg-gold-500/10 transition-all duration-700 pointer-events-none" />

                    <div>
                      {/* Project Image */}
                      <div className="relative w-full h-[220px] rounded-2xl overflow-hidden mb-6 border border-white/5">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Category Tag */}
                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10">
                          <Icon className="w-3.5 h-3.5 text-gold-400" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-2xl font-bold text-white group-hover:text-gold-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-neutral-400 text-sm font-light mt-3 leading-relaxed min-h-[60px]">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 mt-6 py-4 border-y border-white/5">
                      {project.metrics.slice(0, 3).map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-gold-400 text-lg font-bold tracking-tight">{m.value}</div>
                          <div className="text-[9px] text-neutral-500 uppercase font-semibold mt-0.5 tracking-wider truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-6 flex items-center justify-between text-neutral-500 group-hover:text-gold-400 transition-colors">
                      <span className="text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center">
                        Detayları İncele <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                      <div className="flex gap-1.5">
                        {project.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded text-neutral-500 group-hover:text-gold-300/80 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* interactive Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/10 p-6 md:p-10 shadow-[0_0_80px_rgba(212,175,55,0.15)] scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mt-4">
                
                {/* Left Side: Image & Stats */}
                <div className="lg:col-span-5 flex flex-col space-y-6">
                  <div className="relative w-full h-[250px] md:h-[320px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                        {activeProject.category}
                      </span>
                    </div>
                  </div>

                  {/* High Impact Metrics */}
                  <div className="grid grid-cols-3 gap-3 bg-neutral-900/40 border border-white/5 p-5 rounded-2xl text-center">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-gold-400 text-2xl font-black tracking-tight">{m.value}</div>
                        <div className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold font-sans">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Used */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">KULLANILAN TEKNOLOJİLER</div>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((t, idx) => (
                        <span key={idx} className="text-xs bg-gold-950/20 border border-gold-500/20 px-3.5 py-1.5 rounded-full text-gold-400 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Case Study Narrative */}
                <div className="lg:col-span-7 flex flex-col space-y-8">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-gold-500 uppercase tracking-[0.2em]">{activeProject.category} Vaka Analizi</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{activeProject.title}</h2>
                    <p className="text-neutral-400 text-base font-light leading-relaxed">{activeProject.description}</p>
                  </div>

                  {/* Problem & Solution block */}
                  <div className="space-y-6">
                    <div className="relative border-l-2 border-red-500/30 pl-5 space-y-2">
                      <div className="flex items-center text-xs font-bold text-red-400 uppercase tracking-widest space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Karşılaşılan Problem</span>
                      </div>
                      <p className="text-neutral-400 text-sm font-light leading-relaxed">{activeProject.problem}</p>
                    </div>

                    <div className="relative border-l-2 border-gold-500/40 pl-5 space-y-2">
                      <div className="flex items-center text-xs font-bold text-gold-400 uppercase tracking-widest space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Sunduğumuz Çözüm</span>
                      </div>
                      <p className="text-neutral-400 text-sm font-light leading-relaxed">{activeProject.solution}</p>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">ÖNE ÇIKAN ÖZELLİKLER</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-neutral-300">
                          <div className="p-0.5 bg-gold-500/10 rounded-full border border-gold-500/30 text-gold-400 mr-3 flex-shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics bullet list */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center text-xs font-bold text-neutral-400 uppercase tracking-widest space-x-2">
                      <TrendingUp className="w-4 h-4 text-gold-400" />
                      <span>Elde Edilen Sonuçlar</span>
                    </div>
                    <ul className="space-y-2.5">
                      {activeProject.results.map((res, idx) => (
                        <li key={idx} className="flex items-start text-sm text-neutral-400">
                          <span className="text-gold-400 font-bold mr-3">{idx + 1}.</span>
                          <span className="font-light leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Live Website Button */}
                  {activeProject.liveUrl && (
                    <div className="pt-6 border-t border-white/5 flex">
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group/btn w-full sm:w-auto"
                      >
                        <span>Canlı Siteyi Ziyaret Et</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
