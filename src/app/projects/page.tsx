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
    description: 'Step Filtre için özel olarak geliştirilen bu sistem, filtre imalatı ve toptan dağıtım süreçlerindeki tüm bayi ağını (B2B) ve sipariş akışlarını dijitalleştiren uçtan uca kurumsal bir platformdur. Proje, bayilere özel dinamik kademeli fiyat listelerinden (1., 2. ve 3. iskonto kademeleri), saniyeler içinde binlerce ürünü güncelleyen Excel veri motoruna, canlı cari borç/bakiye takibine ve bayilerin banka transfer (Havale/EFT) ödeme dekontlarını sisteme yükleyip finans ekibine anında iletebildiği modern bir Bayi/Müşteri Portalı barındırmaktadır.',
    problem: 'Geleneksel yöntemlerle yönetilen otomotiv ve sanayi filtre kataloğunda, binlerce farklı modelin stok ve fiyat listelerini manuel güncellemenin yarattığı zaman kaybı, telefonla sipariş almada yaşanan stok çakışmaları, bayilerin muadil filtre OEM kodlarını ararken yaşadığı zorluklar ve cari borç/limit mutabakatlarının Excel tablolarıyla elle yürütülmesinden kaynaklanan yüksek operasyonel hatalar.',
    solution: 'React (Vite SPA) frontend ve Node.js + Express.js backend mimarisi üzerinde, Mongoose/MongoDB veritabanı, gerçek zamanlı WebSocket (Socket.io) bildirim mekanizmaları, banka Havale/EFT dekont bildirim altyapısı, araç & filtre OEM kodlarına göre çapraz muadil arama motoru ve XLSX tabanlı toplu veri işleme servisleri ile entegre, rol tabanlı erişim denetimli (RBAC) yüksek performanslı kurumsal otomasyon paneli.',
    results: [
      'Toplu ürün/fiyat ve stok güncellemelerinde (10.000+ kalem) XLSX veri motoru sayesinde %98 zaman tasarrufu (ortalama 1.5 saniye işlem süresi).',
      'Anlık WebSocket stok bildirimleri sayesinde mükerrer veya stokta kalmayan ürün siparişi hata oranının tamamen sıfırlanması (%0 sipariş hatası).',
      'Bayilerin kendi panellerinden bakiye, kredi limiti, vadesi gelen ödemeler ve geçmiş ödeme dekontlarını sorgulayabilmesiyle finans ekibinin mutabakat iş yükünde %75 azalma.',
      'Bayilerin araç/makine filtre OEM numaralarını girerek muadil filtreleri saniyeler içinde bulmasını sağlayan çapraz referans arama motoru ile bayi sipariş tamamlama hızında %80 artış.',
      'Sipariş özetleri, proforma faturalar ve cari hesap ekstrelerinin tarayıcı tarafında jsPDF ve AutoTable entegrasyonuyla anında indirilebilir dinamik PDF belgelere dönüştürülmesi.'
    ],
    metrics: [
      { label: 'Toplu Güncelleme', value: '1.5s' },
      { label: 'Sipariş Hatası', value: '%0' },
      { label: 'Muhasebe İş Yükü', value: '-%75' }
    ],
    tags: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Stripe', 'jsPDF', 'XLSX Parser', 'Ant Design', 'Material UI'],
    image: '/projects/step_filtre.png',
    icon: ShoppingBag,
    features: [
      'Bayi Özel Fiyatlandırma & Kademeli İskonto Motoru (1., 2. ve 3. İskonto)',
      'Araç & Filtre OEM Çapraz Referans Arama ve Muadil Eşleştirme Sistemi',
      'Bayi Cari Hesap & Finansal Bakiye Takip Paneli (Debt, Paid, Credit Limit)',
      'Banka Transferi (Havale/EFT) & Online Dekont Gönderim Modülü',
      'Ödeme Vadeleri ve Ödeme Söz Tarihleri İzleme (DueDate & PromiseDate)',
      'Dinamik Sipariş Takip Zaman Çizelgesi (Timeline Tracker - 5 Aşamalı)',
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
  },
  {
    id: 'bark-one',
    title: 'barkOne Mobilya E-Ticaret & CMS Platformu',
    category: 'E-Ticaret & CMS',
    shortDescription: 'Lüks masif ahşap ve modüler raf sistemleri için dynamic CMS altyapılı, iyzico 3D secure entegrasyonlu ve Vercel Blob destekli e-ticaret platformu.',
    description: 'barkOne Mobilya için tasarlanan bu premium sistem, el işçiliği masif ve metal duvar raflarının satış, sipariş ve içerik akışlarını uçtan uca dijitalleştiren özel bir e-ticaret ve CMS (İçerik Yönetim) platformudur. Altyapı, adminlerin kod yazmadan ana sayfa slider görsellerinden hakkımızda değerlerine kadar tüm marka varlıklarını MongoDB üzerinden anlık yönetebildiği dinamik bir panel, iyzico kart ödeme geçidi entegrasyonu ve bulut tabanlı Vercel Blob Storage medya yönetim modülü barındırmaktadır.',
    problem: 'Müşterilerin özel ölçü ve farklı ahşap/metal renk kombinasyonlarındaki modüler duvar raflarını incelerken yaşadığı kafa karışıklığı ve telefon trafiği; site içeriğinde (logo, banner, hakkımızda ekibi, sosyal medya adresleri, banka bilgileri) yapılacak en ufak güncellemede dahi yazılımcıya bağımlı olunması ve taksitli online ödeme altyapısının bulunmaması.',
    solution: 'Next.js (App Router) mimarisiyle sıfırdan inşa edilmiş, Tailwind CSS v4 ve Framer Motion ile tasarlanan yüksek hızlı kullanıcı arayüzü; MongoDB/Mongoose veri katmanında çalışan esnek SiteSettings CMS yönetim modeli, iyzico API ödeme entegrasyonu ve bulut tabanlı dosya yükleme için @vercel/blob servis entegrasyonu.',
    results: [
      'SiteSettings dinamik şeması sayesinde yöneticilerin site görsel ve metinlerini 5 saniyede güncelleyebilmesiyle yazılımcı bağımlılığının %100 sıfırlanması.',
      'iyzico 3D Secure kredi/banka kartı entegrasyonu ve otomatik sipariş takipli Havale/EFT kanallarıyla sipariş dönüşüm oranında %45 artış.',
      '@vercel/blob entegrasyonu sayesinde ürün görsel yüklemelerinin optimize edilmesi ve CDN üzerinden ultra hızlı servis edilerek sayfa açılış hızının 0.8 saniyeye düşürülmesi.',
      'Admin performans özet paneli (Gelir Eğrisi, En Çok Satanlar, Sipariş Durumları) ile operasyon ve envanter kararlarının tamamen veriye dayalı hale gelmesi.'
    ],
    metrics: [
      { label: 'Sayfa Açılışı', value: '0.8s' },
      { label: 'Sipariş Artışı', value: '+%45' },
      { label: 'Yazılımcı Bağımlılığı', value: '%0' }
    ],
    tags: ['Next.js', 'Tailwind v4', 'MongoDB', 'Mongoose', 'iyzico API', 'Vercel Blob', 'Framer Motion', 'Embla Carousel'],
    image: '/projects/bark_one.png',
    icon: Globe,
    features: [
      'Dinamik CMS & Site Ayarları Yönetim Paneli (Real-time SiteSettings CMS)',
      'iyzico 3D Secure Kredi Kartı Ödeme Geçidi Entegrasyonu',
      'Banka Transferi (Havale/EFT) & Benzersiz Referans Sipariş Takibi',
      '@vercel/blob Entegre Medya Dosyası Yükleme ve CDN Servisi',
      'Gelişmiş Satış & Gelir Analitiği Dashboard Göstergeleri (Card & Charts)',
      'En Çok Satan Ürünler ve Günlük/Haftalık Ciro Dağılım Grafikleri',
      'Modüler Ürün Kataloğu, Filtrelenebilir Arama ve Detay Sayfası',
      'Zod ile Şema Tabanlı Form & Güvenlik Validasyonu (Bcryptjs & JWT)'
    ],
    liveUrl: 'https://www.barkone.com.tr/'
  },
  {
    id: 'uren-global',
    title: 'Uren Global B2B Tarım Emtia & İhracat Platformu',
    category: 'B2B & E-Ticaret',
    shortDescription: 'Küresel tarım gıdaları ve emtia ihracatı yapan Uren Global için; Next.js 16 Server Actions, Mongoose dynamic Category/Variety şemaları ve Vercel Blob entegrasyonlu B2B ihracat portalı.',
    description: 'Uren Global Endüstriyel Makine ve Dış Ticaret şirketi için tasarlanan bu B2B portalı, küresel tarım gıdaları (taze meyveler, narenciye, yumuşak çekirdekli meyveler vb.) ve endüstriyel ihracat emtialarının tüm küresel dağıtım, lojistik, sertifikasyon ve katalog akışlarını dijitalleştiren uçtan uca modern bir kurumsal ticaret platformudur. Sistem, en son teknoloji olan Next.js 16 ve Server Actions veri kanalı, Mongoose dynamic Category şeması ve jose kütüphanesi tabanlı esnek JWT oturum yönetimi ile donatılmıştır.',
    problem: 'Küresel ithalatçıların farklı dillerde taze meyve, çekirdekli meyveler veya sert kabuklu yemişler için menşei (origin), hasat dönemleri (harvest), lojistik teslim süreleri (leadTime) ve ambalaj standartlarına (packaging) kolayca erişememesi, statik sayfaların küresel operasyonel dinamikleri yavaşlatması.',
    solution: 'Next.js 16 (App Router) ve React 19 mimarisiyle sıfırdan inşa edilmiş, Tailwind CSS v4 ve SASS ile kodlanmış yüksek performanslı kullanıcı arayüzü; MongoDB veritabanı üzerinde çalışan esnek Category & Variety modeli, Server Actions veri iletişim katmanı, Vercel Blob bulut medya entegrasyonu ve jose ile yerel JWT session yönetim kalkanı.',
    results: [
      'Next.js 16 Server Actions entegrasyonu sayesinde veritabanı veri iletişim yanıt süresinin 0.5 saniyenin altına düşürülmesi.',
      'Sektörde yenilikçi Next.js 16, React 19 ve Tailwind CSS v4 mimarisi ile sıfır hata derlenen %100 modern ve sürdürülebilir teknolojik standartlar.',
      'Küresel alıcıların menşei, hasat ayları ve lojistik (FOB/CIF, FCL) verilerine tek tıkla ulaşmasıyla B2B müşteri talep/lead oluşturma oranlarında %55 artış.',
      'Dinamik CMS paneli üzerinden tüm ürün ambalaj, sertifika ve PDF belgelerinin kod yazmadan anlık yönetilebilmesi.'
    ],
    metrics: [
      { label: 'Sayfa Tepki Süresi', value: '0.5s' },
      { label: 'Talep Dönüşümü', value: '+%55' },
      { label: 'Next.js Sürümü', value: 'v16.1' }
    ],
    tags: ['Next.js 16', 'React 19', 'Tailwind v4', 'Server Actions', 'MongoDB', 'Mongoose', 'Vercel Blob', 'jose JWT'],
    image: '/projects/uren_global.png',
    icon: Globe,
    features: [
      'Dinamik B2B Tarım Emtia & Ürün Kataloğu Yönetimi (Category Model)',
      'Next.js 16 Server Actions Tabanlı Yüksek Performanslı Veri İletişim Modeli',
      'Menşei (Origin), Hasat Periyodu ve Çeşit (Variety) İzleme Altyapısı',
      'Global Lojistik ve Ticaret Bilgileri Paneli (TradeInfo: LeadTime, FOB/CIF)',
      'Gıda Güvenliği ve Sertifikasyon Uyum Sistemleri (Compliance & Documents)',
      'Vercel Blob ile Bulut Medya Entegrasyonu ve Küresel CDN Servisi',
      'jose Kütüphanesi ile Native Runtime JWT Oturum ve Rol Yetkilendirme',
      'Zod ile Form Validasyonu ve Next.js Middleware Güvenlik Kalkanı'
    ],
    liveUrl: 'https://www.urenglobal.com/'
  }
]

const categories = ['Tümü', 'B2B & E-Ticaret', 'E-Ticaret & CMS', 'Yapay Zeka']

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
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-800/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-[-10%] w-[600px] h-[600px] rounded-full bg-zinc-900/[0.02] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-zinc-950/[0.01] blur-[120px] pointer-events-none mix-blend-screen" />

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
              <Sparkles className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400 text-xs font-semibold tracking-[0.2em] uppercase">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
                İmzamız
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light"
            >
              Global iş ortaklarımızın dijital altyapılarını baştan inşa ettik, ölçeklenebilir ve yüksek performanslı çözümlerle hedeflerine ulaştırdık.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-zinc-950/40 p-2 rounded-lg border border-zinc-900 max-w-2xl mx-auto">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-white text-black border-zinc-200 font-semibold shadow-sm'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-100 hover:bg-zinc-900/50'
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
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setActiveProject(project)}
                    className="group relative rounded-xl bg-zinc-900/20 backdrop-blur-xl border border-zinc-800/80 p-6 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Project Image */}
                      <div className="relative w-full h-[220px] rounded-lg overflow-hidden mb-6 border border-zinc-800/50">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                        />
                        {/* Category Tag */}
                        <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-zinc-950/90 backdrop-blur-md border border-zinc-800">
                          <Icon className="w-3 h-3 text-zinc-400" />
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-300">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors duration-200">
                        {project.title}
                      </h3>
                      
                      <p className="text-zinc-400 text-sm font-normal mt-2 leading-relaxed min-h-[60px]">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 mt-6 py-3 border-y border-zinc-800/80">
                      {project.metrics.slice(0, 3).map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-zinc-100 text-base font-semibold tracking-tight">{m.value}</div>
                          <div className="text-[9px] text-zinc-500 uppercase font-medium mt-0.5 tracking-widest truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="mt-6 flex items-center justify-between text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <span className="text-xs font-medium uppercase tracking-widest group-hover:translate-x-0.5 transition-transform flex items-center">
                        Detayları İncele <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </span>
                      <div className="flex gap-1.5">
                        {project.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[9px] bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400 transition-colors">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.97, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl bg-zinc-950 border border-zinc-800 p-6 md:p-8 shadow-2xl scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mt-4">
                
                {/* Left Side: Image & Stats */}
                <div className="lg:col-span-5 flex flex-col space-y-6">
                  <div className="relative w-full h-[250px] md:h-[320px] rounded-lg overflow-hidden border border-zinc-800/80 shadow-lg">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-zinc-950/90 backdrop-blur-md border border-zinc-800">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-300">
                        {activeProject.category}
                      </span>
                    </div>
                  </div>

                  {/* High Impact Metrics */}
                  <div className="grid grid-cols-3 gap-3 bg-zinc-900/30 border border-zinc-800/80 p-4 rounded-lg text-center">
                    {activeProject.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-white text-xl font-bold tracking-tight">{m.value}</div>
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Used */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">KULLANILAN TEKNOLOJİLER</div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tags.map((t, idx) => (
                        <span key={idx} className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md text-zinc-300 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Case Study Narrative */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{activeProject.category} Vaka Analizi</span>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">{activeProject.title}</h2>
                    <p className="text-zinc-400 text-sm font-normal leading-relaxed">{activeProject.description}</p>
                  </div>

                  {/* Problem & Solution block */}
                  <div className="space-y-4">
                    <div className="bg-red-950/10 border border-red-900/20 p-4 rounded-lg space-y-1.5">
                      <div className="flex items-center text-xs font-semibold text-red-400 uppercase tracking-wider space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Karşılaşılan Problem</span>
                      </div>
                      <p className="text-zinc-400 text-sm font-normal leading-relaxed">{activeProject.problem}</p>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-lg space-y-1.5">
                      <div className="flex items-center text-xs font-semibold text-zinc-100 uppercase tracking-wider space-x-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Sunduğumuz Çözüm</span>
                      </div>
                      <p className="text-zinc-400 text-sm font-normal leading-relaxed">{activeProject.solution}</p>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">ÖNE ÇIKAN ÖZELLİKLER</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {activeProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-zinc-300">
                          <div className="p-0.5 bg-zinc-900 rounded border border-zinc-800 text-zinc-400 mr-2.5 flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="font-normal">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics bullet list */}
                  <div className="space-y-3 pt-5 border-t border-zinc-800/80">
                    <div className="flex items-center text-xs font-semibold text-zinc-400 uppercase tracking-wider space-x-2">
                      <TrendingUp className="w-4 h-4 text-zinc-400" />
                      <span>Elde Edilen Sonuçlar</span>
                    </div>
                    <ul className="space-y-2">
                      {activeProject.results.map((res, idx) => (
                        <li key={idx} className="flex items-start text-sm text-zinc-400">
                          <span className="text-zinc-500 font-medium mr-2.5">{idx + 1}.</span>
                          <span className="font-normal leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Live Website Button */}
                  {activeProject.liveUrl && (
                    <div className="pt-5 border-t border-zinc-800/80 flex">
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-md bg-white hover:bg-zinc-200 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 group/btn w-full sm:w-auto shadow-lg"
                      >
                        <span>Canlı Siteyi Ziyaret Et</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
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
