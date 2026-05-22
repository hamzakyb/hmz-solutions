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
}

const projectsData: CaseStudy[] = [
  {
    id: 'ecommerce',
    title: 'Nouveau Luxury E-Commerce',
    category: 'E-Ticaret',
    shortDescription: 'Yüksek dönüşüm oranlı, global ödeme altyapılı ve Headless mimariye sahip lüks moda e-ticaret platformu.',
    description: 'Nouveau Luxury markası için sıfır gecikmeli, 3D saat modellerinin sergilenebildiği ve global çapta yüksek trafik altındayken bile performans kaybetmeyen bir e-ticaret altyapısı geliştirdik.',
    problem: 'Mevcut hazır e-ticaret altyapısının yavaşlığı, yüksek görsel kalitede yüklenen saat modellerinde yaşanan takılmalar ve global ödeme entegrasyonlarının yetersizliği marka prestijini olumsuz etkiliyordu.',
    solution: 'Next.js 16 App Router ve Headless Shopify mimarisi ile sıfır sunucu bekleme süreli bir arayüz oluşturduk. Stripe entegrasyonu ve çoklu para birimi / dil desteğiyle küresel sipariş akışını optimize ettik.',
    results: [
      'Sayfa yüklenme hızlarında (LCP) %75 oranında iyileşme.',
      'Global ödeme geçitleriyle sepeti terk etme oranında %35 azalma.',
      'Organik arama motoru sıralamasında (SEO) birinci sayfaya yükseliş.'
    ],
    metrics: [
      { label: 'Dönüşüm Artışı', value: '+%45' },
      { label: 'Mobil Performans', value: '%99' },
      { label: 'Sayfa Açılış Hızı', value: '0.4s' }
    ],
    tags: ['Next.js', 'Headless Shopify', 'Stripe', 'Tailwind CSS', 'GraphQL'],
    image: '/projects/ecommerce.png',
    icon: ShoppingBag,
    features: [
      'Gelişmiş 3D Model Görüntüleyici',
      'Tek Tıkla Hızlı Ödeme (One-Click Checkout)',
      'Çoklu Para Birimi & Dinamik Vergi Hesaplama',
      'Kişiselleştirilmiş Akıllı Arama Algoritması'
    ]
  },
  {
    id: 'ai',
    title: 'Sentinet AI CRM & Analytics',
    category: 'Yapay Zeka',
    shortDescription: 'Akıllı müşteri ilişkileri analizi, anlık duygu tahmini ve satış eğilimlerini raporlayan AI gösterge paneli.',
    description: 'Müşteri destek taleplerini, sosyal medya geri bildirimlerini ve e-postaları yapay zeka ile süzerek anlık müşteri memnuniyeti ölçen ve akıllı biletleme yapan bir SaaS platformu geliştirdik.',
    problem: 'Müşteri hizmetleri ekibinin yüzlerce talebi manuel olarak sınıflandırması zaman alıyor, öncelikli sorunlar gözden kaçıyor ve veriye dayalı satış kararları alınamıyordu.',
    solution: 'GPT-4 ve özel eğitilmiş Doğal Dil İşleme (NLP) modellerini entegre ederek tüm yazılı müşteri etkileşimlerini anlık analiz eden ve müşteri duygusunu (sentiman) ölçen bir yapay zeka paneli kurduk.',
    results: [
      'Müşteri destek yanıt süresinde %70 oranında düşüş.',
      'Sorun çözüm doğruluğunda %92 başarı artışı.',
      'Yapay zeka biletleme ile operasyonel maliyetlerde %40 tasarruf.'
    ],
    metrics: [
      { label: 'Yanıt Süresi İyileşmesi', value: '%70' },
      { label: 'Doğruluk Oranı', value: '%92' },
      { label: 'Maliyet Tasarrufu', value: '%40' }
    ],
    tags: ['OpenAI API', 'Python', 'React', 'MongoDB', 'Node.js'],
    image: '/projects/ai.png',
    icon: Cpu,
    features: [
      'Anlık Duygu Analizi (Sentiment Analysis)',
      'Otomatik Bilet Sınıflandırma & Yönlendirme',
      'Akıllı Gelir ve Talep Tahminleme Modülü',
      'Özelleştirilebilir AI Chatbot Entegrasyonu'
    ]
  },
  {
    id: 'corporate',
    title: 'Zenith Holding Corporate Portal',
    category: 'Kurumsal',
    shortDescription: 'Çok dilli, 3D animasyonlu ve yüksek performanslı global holding prestij web platformu.',
    description: 'Zenith Holding\'in küresel gücünü ve prestijini yansıtan, etkileşimli 3D grafikler, yatırımcı ilişkileri araçları ve sürdürülebilirlik raporları içeren üst düzey kurumsal web platformu.',
    problem: 'Holdingin eski web sitesi mobil uyumlu değildi, yatırımcı ilişkileri verileri statikti ve modern küresel marka vizyonunu yansıtmakta zayıf kalıyordu.',
    solution: 'Three.js ve Framer Motion kullanarak 3D interaktif holding haritası ve canlı hisse senedi takip modülleri içeren, tamamen responsive ve erişilebilir bir deneyim tasarladık.',
    results: [
      'Yatırımcı ilişkileri sayfalarında kalma süresinde %120 artış.',
      'Sürdürülebilirlik raporu indirmelerinde %85 artış.',
      'Uluslararası tasarım ve erişilebilirlik standartlarına tam uyumluluk.'
    ],
    metrics: [
      { label: 'Ziyaretçi Etkileşimi', value: '+%120' },
      { label: 'Hisse Takip Gecikmesi', value: '1.2s' },
      { label: 'Erişilebilirlik Skoru', value: '100/100' }
    ],
    tags: ['Next.js', 'Framer Motion', 'Three.js', 'Tailwind', 'REST APIs'],
    image: '/projects/corporate.png',
    icon: Globe,
    features: [
      'Three.js Tabanlı İnteraktif 3D Grafikler',
      'Canlı Hisse Senedi & Döviz Entegrasyonu',
      'Çok Dilli Dinamik İçerik Yönetimi (CMS)',
      'Gelişmiş Sürdürülebilirlik Veri Görselleştirmeleri'
    ]
  },
  {
    id: 'b2b',
    title: 'AeroParts B2B Supply Chain',
    category: 'B2B',
    shortDescription: 'Havacılık yedek parçaları için gerçek zamanlı stok takipli ve ERP entegrasyonlu toptan satış platformu.',
    description: 'AeroParts havacılık bayileri için dünya genelinde binlerce parça stokunun anlık takip edilebildiği, teklif oluşturma ve lojistik entegrasyonlu devasa bir B2B tedarik zinciri portalı.',
    problem: 'Stok güncellemelerinin günde bir kez yapılması nedeniyle mükerrer siparişler alınıyor, kargo takip süreçleri manuel yürütülüyor ve bayi sipariş yönetimi yavaş ilerliyordu.',
    solution: 'SAP ERP sistemi ile doğrudan çift yönlü entegrasyon sağladık. PostgreSQL veri tabanı ve Redis önbellek mekanizması ile milisaniyeler bazında stok sorgulama altyapısı kurduk.',
    results: [
      'Hatalı veya çakışan sipariş sayısında %95 azalma.',
      'Bayi sipariş onay sürelerinin 2 günden 10 saniyeye inmesi.',
      'Yıllık toptan satış cirosunda otomatik işlemler sayesinde %28 artış.'
    ],
    metrics: [
      { label: 'Sipariş Hata Düşüşü', value: '%95' },
      { label: 'İşlem Süresi', value: '10s' },
      { label: 'Ciro Artışı', value: '+%28' }
    ],
    tags: ['React', 'NestJS', 'PostgreSQL', 'SAP SDK', 'Redis'],
    image: '/projects/b2b.png',
    icon: Layers,
    features: [
      'SAP ERP ile Gerçek Zamanlı Çift Yönlü Entegrasyon',
      'Bayilere Özel Dinamik Fiyatlandırma Modülü',
      'Otomatik Gümrük ve Lojistik Evrak Oluşturma',
      'Toplu Sipariş Girişi ve Excel Aktarım Motoru'
    ]
  },
  {
    id: 'saas',
    title: 'Cloud Insights SaaS Dashboard',
    category: 'SaaS',
    shortDescription: 'Bulut altyapı kaynaklarını, veri akışını ve sistem sağlığını anlık izleyen SaaS veri analitiği paneli.',
    description: 'Büyük ölçekli bulut mimarilerini, sunucu tüketim verilerini ve API performanslarını tek bir ekrandan anlık izleyen yüksek verimli bir SaaS izleme ve analiz kontrol paneli geliştirdik.',
    problem: 'Farklı bulut sağlayıcılarındaki sunucu verilerinin ayrı ayrı ekranlardan takip edilmesi zorluğu ve aşırı kaynak kullanımı durumunda anlık alarm mekanizmalarının olmaması.',
    solution: 'Apache Kafka ile anlık veri akışını işleyen, React ve Recharts kütüphaneleriyle milisaniyelik veri güncellemelerini ekrana yansıtan tam kapsamlı bir SaaS arayüzü kodladık.',
    results: [
      'Kaynak takibi sayesinde gereksiz sunucu maliyetlerinde %30 tasarruf.',
      'Olası sunucu çökmelerini %80 oranında önceden tahmin eden alarm yapısı.',
      'Sistem yöneticilerinin hata tespit süresinde %65 kısalma.'
    ],
    metrics: [
      { label: 'Maliyet Tasarrufu', value: '%30' },
      { label: 'Arıza Önleme', value: '%80' },
      { label: 'Hata Tespit Hızı', value: '%65' }
    ],
    tags: ['TypeScript', 'Apache Kafka', 'Recharts', 'Tailwind', 'Node.js'],
    image: '/projects/saas.png',
    icon: LineChart,
    features: [
      'Anlık Apache Kafka Veri Akış Entegrasyonu',
      'Özelleştirilebilir Sürükle-Bırak Grafik Düzenleyici',
      'Slack ve E-Posta Uyumlu Akıllı Alarm Sistemi',
      'Otomatik Sunucu Optimizasyon Öneri Motoru'
    ]
  },
  {
    id: 'mobile',
    title: 'Valor Fintek Mobile Wallet',
    category: 'Mobil',
    shortDescription: 'Güvenli, hızlı ve kullanıcı dostu varlık yönetimi sunan iOS & Android fintek cüzdan uygulaması.',
    description: 'Çoklu para birimi desteği, anında QR kodla ödeme, hisse senedi / kripto varlık alım satımı ve üst düzey biyometrik güvenlik sunan yeni nesil mobil finans cüzdanı.',
    problem: 'Finansal işlemlerin yavaşlığı, karmaşık arayüzler ve özellikle düşük internet hızlarında para transferi sırasında yaşanan kopmalar kullanıcı kaybına yol açıyordu.',
    solution: 'React Native ile cross-platform, hafif ve yüksek performanslı bir mobil arayüz kodladık. Redis önbellek ve mikro hizmet mimarisiyle transfer sürelerini milisaniyelere düşürdük.',
    results: [
      'Uygulama mağazalarında 1 milyondan fazla indirilme.',
      'Para transferi tamamlama süresinde %85 hızlanma.',
      'Kullanıcı memnuniyet skorunda (NPS) 4.8 / 5 başarı derecesi.'
    ],
    metrics: [
      { label: 'Aktif İndirilme', value: '1M+' },
      { label: 'İşlem Hızlanması', value: '%85' },
      { label: 'NPS Skoru', value: '4.8/5' }
    ],
    tags: ['React Native', 'Node.js', 'Redis', 'WebSockets', 'Biometrics'],
    image: '/projects/mobile.png',
    icon: Smartphone,
    features: [
      'Gelişmiş Biyometrik (FaceID / TouchID) Güvenlik',
      'Milisaniyelik Anlık QR Kod Para Transferi',
      'Detaylı Kişisel Finans Raporlama & Grafik Modülü',
      'Gömülü Kripto ve Hisse Senedi Yatırım Arayüzü'
    ]
  }
]

const categories = ['Tümü', 'Yapay Zeka', 'E-Ticaret', 'SaaS', 'B2B', 'Kurumsal', 'Mobil']

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
