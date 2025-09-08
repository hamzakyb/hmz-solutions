'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  agentName?: string
  agentTitle?: string
  agentAvatar?: string
  isSystemMessage?: boolean
  isTransferMessage?: boolean
  hasQuickReplies?: boolean
  quickReplies?: string[]
  isTyping?: boolean
  reactions?: string[]
}

interface Agent {
  id: string
  name: string
  title: string
  avatar: string
  specialization: string[]
  expertise: string[]
  greeting: string
}

interface LeadData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  budget?: string
  timeline?: string
  source?: string
}

interface BotPersonality {
  greeting: string
  farewell: string
  helpMessage: string
  errorMessage: string
  workingHours: string
  responseStyle: 'formal' | 'friendly' | 'professional'
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [isTransferring, setIsTransferring] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    budget: '',
    timeline: '',
    source: 'chatbot'
  })
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [messageReactions, setMessageReactions] = useState<{[key: string]: string[]}>({})
  const [quickReplyInput, setQuickReplyInput] = useState('')
  const [conversationStartTime] = useState(new Date())
  const [messageCount, setMessageCount] = useState(0)
  const [userSatisfaction, setUserSatisfaction] = useState<number | null>(null)
  const [showSatisfactionSurvey, setShowSatisfactionSurvey] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const [isUserTyping, setIsUserTyping] = useState(false)
  const [lastTypingTime, setLastTypingTime] = useState<number>(0)
  const [conversationContext, setConversationContext] = useState<{
    userInterests: string[]
    projectType?: string
    budget?: string
    timeline?: string
    askedQuestions: string[]
  }>({
    userInterests: [],
    askedQuestions: []
  })
  
  // Missing essential state variables
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Kapsamlı Uzman Agent Profilleri
  const agents: { [key: string]: Agent } = {
    default: {
      id: 'hamza',
      name: 'Hamza',
      title: 'Dijital Çözüm Uzmanı & Kurucu',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['genel', 'danışmanlık', 'strateji', 'proje yönetimi'],
      expertise: ['Dijital dönüşüm', 'Teknoloji stratejisi', 'Proje yönetimi', 'İş analizi'],
      greeting: 'Merhaba! 👋 Ben Hamza, HMZ Solutions kurucusu ve dijital çözüm uzmanınızım. Projelerinizi hayata geçirmek için buradayım. Size nasıl yardımcı olabilirim?'
    },
    web: {
      id: 'mehmet',
      name: 'Mehmet',
      title: 'Senior Web Geliştirme Uzmanı', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['web', 'website', 'react', 'nextjs', 'frontend', 'backend', 'full stack'],
      expertise: ['React & Next.js', 'TypeScript', 'Node.js', 'Database Design', 'API Development'],
      greeting: 'Merhaba! 💻 Ben Mehmet, web geliştirme uzmanınızım. Modern, hızlı ve SEO-friendly web uygulamaları geliştiriyorum. Hangi projeyi hayata geçirmek istiyorsunuz?'
    },
    mobile: {
      id: 'ayse',
      name: 'Ayşe',
      title: 'Mobil Uygulama Geliştirme Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80', 
      specialization: ['mobil', 'uygulama', 'ios', 'android', 'react native', 'flutter', 'app'],
      expertise: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'App Store Optimization'],
      greeting: 'Merhaba! 📱 Ben Ayşe, mobil uygulama uzmanınızım. iOS ve Android platformları için kullanıcılarınızın sevecekleri uygulamalar geliştirelim!'
    },
    ecommerce: {
      id: 'ali',
      name: 'Ali',
      title: 'E-ticaret & Online Satış Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['eticaret', 'e-ticaret', 'online satış', 'shopify', 'woocommerce', 'satış', 'mağaza'],
      expertise: ['E-ticaret Platformları', 'Ödeme Entegrasyonları', 'Stok Yönetimi', 'Dijital Pazarlama', 'Conversion Optimization'],
      greeting: 'Merhaba! 🛒 Ben Ali, e-ticaret uzmanınızım. Online satış kanallarınızı güçlendirip gelirlerinizi katlamanın yollarını konuşalım!'
    },
    seo: {
      id: 'zeynep',
      name: 'Zeynep',
      title: 'SEO & Dijital Pazarlama Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['seo', 'google', 'pazarlama', 'reklam', 'sosyal medya', 'analitik', 'optimizasyon'],
      expertise: ['SEO Optimizasyonu', 'Google Ads', 'Sosyal Medya Pazarlama', 'Content Marketing', 'Analytics'],
      greeting: 'Merhaba! 🚀 Ben Zeynep, SEO ve dijital pazarlama uzmanınızım. Markanızı dijital dünyada görünür kılalım ve müşterilerinizi artıralım!'
    },
    design: {
      id: 'emre',
      name: 'Emre',
      title: 'UI/UX Tasarım Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['tasarım', 'design', 'ui', 'ux', 'kullanıcı deneyimi', 'arayüz', 'grafik'],
      expertise: ['UI/UX Design', 'Figma & Adobe XD', 'User Research', 'Prototyping', 'Brand Identity'],
      greeting: 'Merhaba! 🎨 Ben Emre, UI/UX tasarım uzmanınızım. Kullanıcılarınızın aşık olacağı, etkileyici ve kullanıcı dostu tasarımlar oluşturalım!'
    },
    ai: {
      id: 'elif',
      name: 'Elif',
      title: 'Yapay Zeka & Makine Öğrenmesi Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['yapay zeka', 'ai', 'makine öğrenmesi', 'veri analizi', 'otomasyon', 'tahmin'],
      expertise: ['Makine Öğrenmesi', 'Veri Analizi', 'Tahmine Dayalı Modeller', 'Otomasyon'],
      greeting: 'Merhaba! 🤖 Ben Elif, yapay zeka uzmanınızım. İş süreçlerinizi otomatikleştirmek ve verimliliği artırmak için buradayım!'
    },
    ar: {
      id: 'can',
      name: 'Can',
      title: 'Artırılmış Gerçeklik Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['artırılmış gerçeklik', 'ar', '3d modelleme', 'interaktif', 'deneyim'],
      expertise: ['3D Modelleme', 'Interaktif Deneyimler', 'Gerçek Zamanlı İşleme', 'AR Uygulamaları'],
      greeting: 'Merhaba! 🕶️ Ben Can, artırılmış gerçeklik uzmanınızım. Müşterilerinize etkileyici deneyimler sunmak için buradayım!'
    },
    blockchain: {
      id: 'berk',
      name: 'Berk',
      title: 'Blockchain & Kripto Teknolojileri Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      specialization: ['blockchain', 'kripto', 'şeffaflık', 'güvenlik', 'akıllı sözleşme'],
      expertise: ['Akıllı Sözleşmeler', 'Şeffaf Kayıt Sistemi', 'Kripto Para Entegrasyonu', 'Güvenli Veri Saklama'],
      greeting: 'Merhaba! 🔗 Ben Berk, blockchain teknolojileri uzmanınızım. Şeffaf ve güvenli sistemler oluşturmak için buradayım!'
    }
  }

  // İlk agent ayarla
  useEffect(() => {
    if (!currentAgent) {
      const defaultAgent = agents.default
      setCurrentAgent(defaultAgent)
      setMessages([{
        id: '1',
        text: defaultAgent.greeting,
        isBot: true,
        timestamp: new Date(),
        agentName: defaultAgent.name,
        agentTitle: defaultAgent.title,
        agentAvatar: defaultAgent.avatar
      }])
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced message sending functionality
  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessageCount(prev => prev + 1)
    saveConversationHistory(inputText.trim())
    
    // Update conversation context
    updateConversationContext(inputText.trim())
    
    const userInput = inputText.trim()
    setInputText('')
    setIsTyping(true)

    // Check if agent transfer is needed
    const bestAgent = selectBestAgent(userInput)
    if (bestAgent.id !== currentAgent?.id) {
      setIsTransferring(true)
      setTimeout(() => {
        setCurrentAgent(bestAgent)
        setIsTransferring(false)
        
        const transferMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `${bestAgent.name} ile bağlantınız kuruldu. ${bestAgent.greeting}`,
          isBot: true,
          timestamp: new Date(),
          agentName: bestAgent.name,
          agentTitle: bestAgent.title,
          agentAvatar: bestAgent.avatar,
          isTransferMessage: true
        }
        setMessages(prev => [...prev, transferMessage])
      }, 1500)
    }

    // Simulate bot response with context
    setTimeout(() => {
      setIsTyping(false)
      const botResponse = generateBotResponse(userInput, bestAgent)
      const botMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        agentName: bestAgent.name,
        agentTitle: bestAgent.title,
        agentAvatar: bestAgent.avatar
      }
      setMessages(prev => [...prev, botMessage])
    }, 2000)
  }

  // Update conversation context based on user input
  const updateConversationContext = (input: string) => {
    const lowerInput = input.toLowerCase()
    
    setConversationContext(prev => {
      const newContext = { ...prev }
      
      // Track interests
      const interests = ['web', 'mobil', 'e-ticaret', 'seo', 'tasarım', 'uygulama']
      interests.forEach(interest => {
        if (lowerInput.includes(interest) && !newContext.userInterests.includes(interest)) {
          newContext.userInterests.push(interest)
        }
      })
      
      // Track project type
      if (lowerInput.includes('e-ticaret') || lowerInput.includes('mağaza')) {
        newContext.projectType = 'e-ticaret'
      } else if (lowerInput.includes('mobil') || lowerInput.includes('uygulama')) {
        newContext.projectType = 'mobil'
      } else if (lowerInput.includes('web') || lowerInput.includes('site')) {
        newContext.projectType = 'web'
      }
      
      // Track budget hints
      if (lowerInput.includes('bütçe') || lowerInput.includes('fiyat')) {
        if (lowerInput.includes('küçük') || lowerInput.includes('sınırlı')) {
          newContext.budget = 'limited'
        } else if (lowerInput.includes('geniş') || lowerInput.includes('büyük')) {
          newContext.budget = 'flexible'
        }
      }
      
      // Track timeline hints
      if (lowerInput.includes('acil') || lowerInput.includes('hızlı')) {
        newContext.timeline = 'urgent'
      } else if (lowerInput.includes('zaman') && lowerInput.includes('var')) {
        newContext.timeline = 'flexible'
      }
      
      return newContext
    })
  }

  // Enhanced bot response generation with more variety and depth
  const generateBotResponse = (input: string, agent: Agent): string => {
    const lowerInput = input.toLowerCase()
    const context = conversationContext
    
    // Context-aware responses
    if (context.userInterests.length > 1) {
      const interests = context.userInterests.join(', ')
      if (lowerInput.includes('hepsi') || lowerInput.includes('hep') || lowerInput.includes('de')) {
        return `Anladığım kadarıyla ${interests} konularında ilginiz var. Bu alanları birleştiren kapsamlı bir çözüm önerebilirim:\n\n🚀 **Entegre Çözüm:** Tüm ihtiyaçlarınızı tek platformda\n🔗 **Koordinasyon:** Uzman ekiplerin ortak çalışması\n💰 **Maliyet Avantajı:** Paket fiyat indirimi\n\nHangi alanın öncelikli olmasını istersiniz?`
      }
    }
    
    // Budget-aware responses
    if (context.budget === 'limited' && (lowerInput.includes('fiyat') || lowerInput.includes('ücret'))) {
      return `Bütçe dostu çözümlerimiz var! Size uygun seçenekler:\n\n💸 **Aşamalı Geliştirme:** Önce temel, sonra geliştirme\n🔄 **Template Bazında:** Hazır çözümleri özelleştirme\n🤝 **Ortaklık:** Gelir paylaşım modeli\n📅 **Vade Seçenekleri:** Esnek ödeme planları\n\nHangi yaklaşım size daha uygun?`
    }
    
    // Urgent timeline responses
    if (context.timeline === 'urgent' && (lowerInput.includes('süre') || lowerInput.includes('hızlı'))) {
      return `Acil projeniz için express çözümümüz var:\n\n⚡ **Express Team:** Deneyimli ekip tahsisi\n🔄 **7/24 Çalışma:** Kesintisiz geliştirme\n📅 **Daily Updates:** Günlük ilerleme raporu\n🚀 **MVP Yaklaşım:** Hızlı piyasaya çıkış\n\nNe kadar sürede tamamlanması gerekiyor?`
    }
    
    // Greeting responses with variety
    const greetings = ['merhaba', 'selam', 'hello', 'hi', 'hey', 'iyi günler', 'günaydın']
    if (greetings.some(greeting => lowerInput.includes(greeting))) {
      const responses = [
        `Merhaba! Ben ${agent.name}, ${agent.title}. Size nasıl yardımcı olabilirim?`,
        `Selam! ${agent.name} burada. Hangi konuda destek almak istiyorsunuz?`,
        `İyi günler! ${agent.expertise.join(', ')} konularında size yardımcı olabilirim. Projeniz hakkında konuşalım mı?`
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Pricing and cost inquiries with detailed responses
    if (lowerInput.includes('fiyat') || lowerInput.includes('ücret') || lowerInput.includes('maliyet') || lowerInput.includes('bütçe')) {
      const pricingResponses = [
        `Proje maliyetleri birçok faktöre bağlı olarak değişir:\n\n• Projenin kapsamı ve karmaşıklığı\n• Kullanılacak teknolojiler\n• Tasarım gereksinimleri\n• Entegrasyonlar\n\nSize özel bir teklif hazırlayabilmem için:\n1. Hangi tür bir proje planlıyorsunuz?\n2. Hedef kitleniz kimler?\n3. Özel özellik talepleriniz var mı?`,
        `Fiyatlandırma konusunda şeffaflık bizim için önemli. Projeler genellikle şu aralıklarda değişir:\n\n📱 Basit Web Sitesi: 15.000₺ - 35.000₺\n🚀 E-ticaret Platformu: 45.000₺ - 150.000₺\n📊 Özel Yazılım: 75.000₺ - 300.000₺\n\nDetaylı teklif için projenizi değerlendirelim. Hangi kategoride yer alıyor?`,
        `Bütçenizi en verimli şekilde kullanmanız için önceliklerinizi belirlememiz gerekiyor. Projenizin:\n\n✅ Must-have özellikleri\n🎯 Nice-to-have eklentileri\n⏰ Aciliyet durumu\n\nBu bilgilerle size en uygun çözümü sunabilirim. Hangi özellikler sizin için kritik?`
      ]
      return pricingResponses[Math.floor(Math.random() * pricingResponses.length)]
    }
    
    // Timeline and duration responses
    if (lowerInput.includes('süre') || lowerInput.includes('zaman') || lowerInput.includes('ne kadar') || lowerInput.includes('teslim')) {
      const timelineResponses = [
        `Proje teslim süreleri projenin türüne göre değişir:\n\n⚡ Landing Page: 1-2 hafta\n🌐 Kurumsal Web Sitesi: 3-6 hafta\n🛒 E-ticaret: 6-12 hafta\n📱 Mobil Uygulama: 8-16 hafta\n⚙️ Özel Yazılım: 3-12 ay\n\nProjenizin detaylarını paylaşırsanız, kesin bir zaman çizelgesi oluşturabilirim.`,
        `Hızlı teslimat bizim uzmanlık alanımız! Acil projelerde:\n\n• Express geliştirme hizmeti\n• 7/24 geliştirici desteği\n• Paralel çalışma metodları\n• Haftalık ilerleme raporları\n\nAcil bir durumunuz var mı? Size özel çözüm üretebiliriz.`,
        `Kaliteli iş zamanında teslim etmek bizim önceliğimiz. Proje sürecinde:\n\n1️⃣ Detaylı planlama (1-3 gün)\n2️⃣ Tasarım süreci (1-2 hafta)\n3️⃣ Geliştirme (ana süre)\n4️⃣ Test ve optimizasyon (3-7 gün)\n5️⃣ Yayınlama ve eğitim (1-2 gün)\n\nHangi aşama sizin için en önemli?`
      ]
      return timelineResponses[Math.floor(Math.random() * timelineResponses.length)]
    }
    
    // Contact and communication
    if (lowerInput.includes('iletişim') || lowerInput.includes('telefon') || lowerInput.includes('email') || lowerInput.includes('randevu')) {
      const contactResponses = [
        `İletişime geçmek için birden fazla seçeneğiniz var:\n\n📞 Telefon: +90 (505) 095 99 50\n📧 E-posta: info@hmzsolutions.com\n💬 WhatsApp: Anında destek\n📅 Calendly: Online randevu\n\nHangi yöntem sizin için daha uygun?`,
        `Hemen konuşmak ister misiniz? \n\n• Şimdi arayabilirim (5 dk içinde)\n• WhatsApp'tan devam edelim\n• E-posta ile detayları gönderebilirim\n• Video görüşme ayarlayalım\n\nTercihiniz nedir?`,
        `Projenizi değerlendirmek için 15 dakikalık ücretsiz danışmanlık görüşmesi ayarlayabilirim. Bu görüşmede:\n\n✅ İhtiyaç analizi\n✅ Teknik öneriler\n✅ Fiyat tahmini\n✅ Zaman planlaması\n\nBu hafta uygun olduğunuz bir zaman var mı?`
      ]
      return contactResponses[Math.floor(Math.random() * contactResponses.length)]
    }
    
    // Thank you responses
    if (lowerInput.includes('teşekkür') || lowerInput.includes('sağol') || lowerInput.includes('thanks') || lowerInput.includes('mersi')) {
      const thankResponses = [
        `Rica ederim! 😊 Başka sorularınız olursa çekinmeden sorun. Size yardımcı olmak için buradayım.`,
        `Ne demek, görevim! 🚀 Projeniz hakkında daha fazla konuşmak isterseniz, buradayım.`,
        `Memnun olduğunuza sevindim! 💫 İhtiyacınız olan başka bir şey var mı?`
      ]
      return thankResponses[Math.floor(Math.random() * thankResponses.length)]
    }
    
    // Technology and technical questions
    if (lowerInput.includes('teknoloji') || lowerInput.includes('nasıl') || lowerInput.includes('hangi')) {
      const techResponses = [
        `Projelerimizde en güncel teknolojileri kullanıyoruz:\n\n🌐 **Web:** React, Next.js, TypeScript\n📱 **Mobil:** React Native, Flutter\n⚙️ **Backend:** Node.js, Python, .NET\n🗄️ **Database:** PostgreSQL, MongoDB\n☁️ **Cloud:** AWS, Google Cloud\n\nHangi teknoloji sizin için önemli?`,
        `Teknoloji seçimi projenizin ihtiyaçlarına göre yapılır. Size özel teknoloji önerilerim için:\n\n• Projenizin amacı nedir?\n• Hedef kullanıcı sayınız?\n• Performans beklentileriniz?\n• Entegrasyon ihtiyaçlarınız?\n\nBu bilgilerle en uygun stack'i önerebilirim.`
      ]
      return techResponses[Math.floor(Math.random() * techResponses.length)]
    }
    
    // Portfolio and examples
    if (lowerInput.includes('portfolyo') || lowerInput.includes('örnek') || lowerInput.includes('çalışma') || lowerInput.includes('referans')) {
      return `Portfolyomuzda farklı sektörlerden başarılı projeler var:\n\n🏢 **Kurumsal:** 50+ şirket web sitesi\n🛒 **E-ticaret:** 25+ online mağaza\n📱 **Mobil:** 15+ iOS/Android uygulama\n⚙️ **Özel Yazılım:** 30+ custom solution\n\nSize en yakın sektördeki çalışmalarımızı gösterebilirim. Hangi alan ilginizi çekiyor?`
    }
    
    // Agent-specific enhanced responses
    if (agent.id === 'web') {
      const webResponses = [
        `Web geliştirme konusunda size kapsamlı destek verebilirim:\n\n🎨 **Modern Tasarım:** Responsive, mobil-uyumlu\n⚡ **Performans:** Hızlı yükleme, SEO optimized\n🔒 **Güvenlik:** SSL, GDPR uyumlu\n📊 **Analitik:** Google Analytics entegrasyonu\n\nHangi tür web sitesi düşünüyorsunuz?`,
        `Web sitesi türleri ve özellikler:\n\n📄 **Landing Page:** Ürün/hizmet tanıtımı\n🏢 **Kurumsal Site:** Şirket kimliği\n📰 **Blog/İçerik:** CMS sistemi\n🛒 **E-ticaret:** Online satış\n👥 **Portal:** Kullanıcı paneli\n\nProjeniz hangi kategoride?`
      ]
      return webResponses[Math.floor(Math.random() * webResponses.length)]
    }
    
    if (agent.id === 'mobile') {
      const mobileResponses = [
        `Mobil uygulama geliştirmede uzman ekibimizle:\n\n📱 **Native iOS/Android:** En yüksek performans\n🔄 **Cross-Platform:** React Native, Flutter\n🔔 **Push Notification:** Kullanıcı etkileşimi\n💳 **Ödeme Entegrasyonu:** Güvenli işlemler\n📊 **Analytics:** Kullanıcı davranış analizi\n\nHangi platform hedefliyorsunuz?`,
        `Mobil uygulama türleri ve özellikler:\n\n🛒 **E-ticaret:** Online alışveriş\n📱 **Sosyal:** Topluluk uygulaması\n🎮 **Oyun:** Eğlence uygulaması\n💼 **İş:** Productivity uygulaması\n🍕 **Servis:** On-demand hizmet\n\nUygulama fikriniz nedir?`
      ]
      return mobileResponses[Math.floor(Math.random() * mobileResponses.length)]
    }
    
    if (agent.id === 'ecommerce') {
      return `E-ticaret konusunda size sunabileceğim çözümler:\n\n🛒 **Platform:** Shopify, WooCommerce, Custom\n💳 **Ödeme:** İyzico, PayTR, Stripe entegrasyonu\n📦 **Kargo:** Aras, Yurtiçi, PTT entegrasyonu\n📊 **Pazarlama:** SEO, Google Ads, Social Media\n📈 **Analitik:** Satış raporları, müşteri analizi\n\nKaç ürününüz var ve hedef satış hacminiz nedir?`
    }
    
    if (agent.id === 'seo') {
      return `SEO ve dijital pazarlama hizmetlerimiz:\n\n🔍 **Teknik SEO:** Site hızı, yapısal optimizasyon\n📝 **İçerik SEO:** Anahtar kelime optimizasyonu\n🔗 **Link Building:** Kaliteli backlink stratejisi\n📊 **Analytics:** Detaylı performans raporları\n💰 **Google Ads:** PPC kampanya yönetimi\n\nMevcut web sitenizin SEO skoru kaç?`
    }
    
    if (agent.id === 'design') {
      return `UI/UX tasarım hizmetlerimiz:\n\n🎨 **Visual Design:** Modern, kullanıcı dostu arayüz\n🔍 **User Research:** Hedef kitle analizi\n📱 **Prototype:** İnteraktif tasarım örnekleri\n🧪 **A/B Testing:** Optimizasyon testleri\n🎯 **Brand Identity:** Logo, renk paleti, tipografi\n\nMevcut bir tasarımınız var mı yoksa sıfırdan mı başlayacağız?`
    }
    
    // Default enhanced responses based on context
    const defaultResponses = [
      `Bu konuda size detaylı bilgi verebilirim. Projenizin özelliklerini daha iyi anlayabilmem için:\n\n• Hangi sektörde faaliyet gösteriyorsunuz?\n• Hedef kitleniz kimler?\n• Bütçe aralığınız nedir?\n• Zaman çizelgeniz nasıl?\n\nBu bilgilerle size özel çözüm önerebilirim.`,
      `Size en uygun çözümü sunabilmem için projenizi daha detaylı konuşalım:\n\n🎯 **Hedef:** Neyi başarmak istiyorsunuz?\n👥 **Kitle:** Kimler kullanacak?\n💰 **Bütçe:** Yatırım planınız nedir?\n⏱️ **Süre:** Ne zaman tamamlanmalı?\n\nHangi soruyla başlayalım?`,
      `Projeniz hakkında daha fazla bilgi almak için kısa bir görüşme yapalım mı? 15 dakikada:\n\n✅ İhtiyaçlarınızı analiz edelim\n✅ Çözüm önerilerim sunayım\n✅ Fiyat tahmini vereyim\n✅ Zaman planlaması yapalım\n\nBu hafta uygun bir zamanınız var mı?`
    ]
    
    // Lead capture trigger for serious prospects
    if (messageCount >= 3 && !leadSubmitted && (lowerInput.includes('teklif') || lowerInput.includes('fiyat') || lowerInput.includes('başlayalım') || lowerInput.includes('devam'))) {
      setTimeout(() => {
        setShowLeadForm(true)
      }, 1000)
      return `Harika! Size özel bir teklif hazırlamak için kısa bir form doldurmanızı rica ediyorum. Bu sayede:\n\n✅ Detaylı fiyat teklifi\n✅ Özel indirim fırsatları\n✅ Ücretsiz danışmanlık\n✅ Proje planı taslak\n\nsunabilirim. Formu görüyor musunuz?`
    }
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Get agent-specific suggestions
  const getAgentSuggestions = (agentId: string): string[] => {
    const suggestions = {
      web: [
        'E-ticaret sitesi',
        'Kurumsal web sitesi',
        'Blog sistemi',
        'API geliştirme',
        'SEO optimizasyonu'
      ],
      mobile: [
        'iOS uygulama',
        'Android uygulama',
        'Cross-platform',
        'App Store yükleme',
        'Push notification'
      ],
      ecommerce: [
        'Ödeme entegrasyonu',
        'Stok yönetimi',
        'Kargo entegrasyonu',
        'Pazaryeri entegrasyonu',
        'Müşteri yönetimi'
      ],
      seo: [
        'Anahtar kelime analizi',
        'Google Ads',
        'Sosyal medya pazarlama',
        'Link building',
        'Performans analizi'
      ],
      design: [
        'Logo tasarımı',
        'Web arayüzü',
        'Mobil arayüz',
        'Marka kimliği',
        'Kullanıcı deneyimi'
      ],
      ai: [
        'Makine öğrenmesi modelleri',
        'Veri analizi çözümleri',
        'İş süreci otomasyonu',
        'Tahmine dayalı analizler',
        'Yapay zeka entegrasyonu'
      ],
      ar: [
        '3D modelleme',
        'Interaktif deneyimler',
        'AR uygulama geliştirme',
        'Gerçek zamanlı işleme',
        'Platformlar arası uyumluluk'
      ],
      blockchain: [
        'Akıllı sözleşme geliştirme',
        'Şeffaf kayıt sistemleri',
        'Kripto para entegrasyonu',
        'Güvenli veri saklama',
        'Blockchain danışmanlığı'
      ]
    }
    return suggestions[agentId as keyof typeof suggestions] || []
  }

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    if (action.includes('Randevu')) {
      const message = 'Ücretsiz danışmanlık randevusu almak istiyorum. Hangi gün ve saatlerde müsaitsiniz?'
      setInputText(message)
    } else if (action.includes('WhatsApp')) {
      const phoneNumber = '+905050959950'
      const message = encodeURIComponent('Merhaba! HMZ Solutions hizmetleri hakkında bilgi almak istiyorum.')
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    } else if (action.includes('Teklif')) {
      const message = 'Projemiz için detaylı teklif almak istiyorum. Nasıl devam edebiliriz?'
      setInputText(message)
    }
  }

  // Kullanıcı yazma durumu takibi
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUserTyping(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [lastTypingTime])

  // Kullanıcı aktivite takibi
  const handleUserTyping = () => {
    if (!isUserTyping) {
      setIsUserTyping(true)
    }
    setLastTypingTime(Date.now())
  }

  // Mesaj reaksiyonları
  const addReaction = (messageId: string, reaction: string) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), reaction]
    }))
  }

  // Memnuniyet anketi göster
  const showSatisfactionAfterMessages = () => {
    if (messageCount >= 5 && !showSatisfactionSurvey && !userSatisfaction) {
      setShowSatisfactionSurvey(true)
    }
  }

  // Konuşma geçmişini kaydet
  const saveConversationHistory = (message: string) => {
    setConversationHistory(prev => [...prev.slice(-10), message]) // Son 10 mesajı tut
  }

  // Gelişmiş Agent Seçimi ve Transfer Sistemi
  const selectBestAgent = (input: string): Agent => {
    const lowerInput = input.toLowerCase()
    let bestMatch = agents.default
    let maxScore = 0

    // Tüm agentları puanla
    for (const [key, agent] of Object.entries(agents)) {
      if (key === 'default') continue
      
      let score = 0
      // Specialization kontrolü
      agent.specialization.forEach(spec => {
        if (lowerInput.includes(spec)) {
          score += 3 // Yüksek puan
        }
      })
      
      // Expertise kontrolü
      agent.expertise.forEach(exp => {
        if (lowerInput.includes(exp.toLowerCase())) {
          score += 2 // Orta puan
        }
      })
      
      // İlgili kelimeler kontrolü
      const relatedWords = {
        web: ['site', 'internet', 'web', 'online', 'frontend', 'backend'],
        mobile: ['telefon', 'mobil', 'app', 'aplikasyon'],
        ecommerce: ['satış', 'ürün', 'mağaza', 'sepet', 'ödeme'],
        seo: ['google', 'arama', 'sıralama', 'trafik', 'reklam'],
        design: ['görsel', 'logo', 'renk', 'düzen', 'arayüz'],
        ai: ['yapay zeka', 'ai', 'makine öğrenmesi', 'veri analizi', 'otomasyon', 'tahmin'],
        ar: ['artırılmış gerçeklik', 'ar', '3d', 'modelleme', 'interaktif'],
        blockchain: ['blockchain', 'kripto', 'şeffaflık', 'güvenlik', 'akıllı sözleşme']
      }
      
      if (relatedWords[key as keyof typeof relatedWords]) {
        relatedWords[key as keyof typeof relatedWords].forEach(word => {
          if (lowerInput.includes(word)) {
            score += 1
          }
        })
      }
      
      if (score > maxScore) {
        maxScore = score
        bestMatch = agent
      }
    }
    
    return bestMatch
  }

  return (
    <>
      {/* Apple-Style Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group md:bottom-8 md:right-8"
            style={{
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))'
            }}
          >
            {/* Apple-style backdrop blur container */}
            <div className="relative">
              {/* Soft glow effect */}
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.8) 0%, rgba(195, 180, 118, 0.9) 100%)'
                }}
              />
              
              {/* Main button with glass morphism */}
              <div className="relative w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.95) 0%, rgba(195, 180, 118, 0.95) 50%, rgba(175, 160, 98, 0.95) 100%)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                }}
              >
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-white drop-shadow-sm" />
                
                {/* Subtle inner glow */}
                <div className="absolute inset-1 rounded-xl opacity-30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
                  }}
                />
              </div>
              
              {/* Notification indicator */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </motion.div>
              
              {/* Apple-style message preview tooltip */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    x: [20, 0, 0, 20],
                    scale: [0.9, 1, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 5,
                    times: [0, 0.2, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 10
                  }}
                  className="absolute right-20 top-0 transform -translate-y-full -mt-8 pointer-events-none hidden md:block"
                >
                  <div className="relative">
                    {/* Backdrop blur background */}
                    <div className="absolute inset-0 rounded-2xl backdrop-blur-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                      }}
                    />
                    
                    <div className="relative px-4 py-3 max-w-xs w-64">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 rounded-full"
                          style={{
                            background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                          }}
                        />
                        <span className="text-xs font-semibold text-gray-800">HMZ Solutions</span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">Merhaba! Dijital projeleriniz için size yardımcı olabilirim 🚀</p>
                    </div>
                    
                    {/* Chat bubble tail */}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 rotate-45">
                      <div className="w-2 h-2 border-r border-b"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderColor: 'rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Apple-Style Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[600px] flex flex-col overflow-hidden md:w-[30rem] md:h-[32rem] lg:w-[32rem] lg:h-[36rem] sm:h-[500px] max-h-[80vh]"
            style={{
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))'
            }}
          >
            {/* Glass morphism background */}
            <div className="absolute inset-0 rounded-3xl backdrop-blur-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
              }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Apple-style Header */}
              <div className="relative">
                {/* Header background with gradient */}
                <div className="absolute inset-0 rounded-t-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.95) 0%, rgba(195, 180, 118, 0.95) 50%, rgba(175, 160, 98, 0.95) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                  }}
                />
                
                <div className="relative p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg"
                        style={{
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <img 
                          src={currentAgent?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80'} 
                          alt={`${currentAgent?.name} - HMZ Solutions Uzmanı`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full">
                        <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold text-sm drop-shadow-sm">{currentAgent?.name || 'Uzman'}</h3>
                      <p className="text-white text-xs opacity-90 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse bg-green-300" />
                        Aktif • {currentAgent?.title || 'Dijital Çözüm Uzmanı'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Close button with Apple-style design */}
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <XMarkIcon className="w-4 h-4 text-white drop-shadow-sm" />
                  </motion.button>
                </div>
                
                {/* Transfer indicator */}
                <AnimatePresence>
                  {isTransferring && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-0 left-0 right-0 px-4 pb-2"
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center">
                        <p className="text-white text-xs font-medium">Uzman transfer ediliyor...</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Apple-style Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3"
                style={{
                  background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.5) 0%, rgba(241, 245, 249, 0.3) 100%)'
                }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      damping: 20,
                      stiffness: 300
                    }}
                    className={`flex items-end space-x-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
                        style={{
                          background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.9) 0%, rgba(195, 180, 118, 0.9) 100%)',
                          boxShadow: '0 2px 8px rgba(175, 160, 98, 0.3)'
                        }}
                      >
                        <SparklesIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[75%] ${message.isBot ? 'order-last' : 'order-first'}`}>
                      {/* Agent transfer message */}
                      {message.isTransferMessage ? (
                        <div className="text-center my-4">
                          <div className="inline-block px-4 py-2 rounded-full text-xs font-medium"
                            style={{
                              background: 'rgba(175, 160, 98, 0.1)',
                              color: 'rgb(120, 113, 108)',
                              border: '1px solid rgba(175, 160, 98, 0.2)'
                            }}
                          >
                            {message.text}
                          </div>
                        </div>
                      ) : (
                        <div className={`relative group ${
                          message.isBot ? 'mr-8' : 'ml-8'
                        }`}>
                          {/* Message bubble with Apple-style design */}
                          <div className={`px-4 py-3 rounded-2xl relative ${
                            message.isBot 
                              ? 'rounded-bl-md' 
                              : 'rounded-br-md'
                          }`}
                            style={{
                              background: message.isBot 
                                ? 'rgba(255, 255, 255, 0.9)'
                                : 'linear-gradient(135deg, rgba(175, 160, 98, 0.95) 0%, rgba(195, 180, 118, 0.95) 50%, rgba(175, 160, 98, 0.95) 100%)',
                              backdropFilter: 'blur(20px)',
                              boxShadow: message.isBot 
                                ? '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                                : '0 4px 20px rgba(175, 160, 98, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                              border: message.isBot 
                                ? '1px solid rgba(0, 0, 0, 0.05)'
                                : 'none'
                            }}
                          >
                            <p className={`text-sm leading-relaxed ${
                              message.isBot ? 'text-gray-800' : 'text-white'
                            }`} style={{
                              textShadow: message.isBot ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}>
                              {message.text}
                            </p>
                            
                            {/* Subtle inner highlight */}
                            <div className="absolute inset-1 rounded-xl pointer-events-none opacity-30"
                              style={{
                                background: message.isBot 
                                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%)'
                                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)'
                              }}
                            />
                          </div>
                          
                          {/* Timestamp with Apple-style design */}
                          <div className={`mt-1 text-xs opacity-60 ${
                            message.isBot ? 'text-left' : 'text-right'
                          }`}>
                            <span className="font-medium" style={{ color: 'rgb(120, 113, 108)' }}>
                              {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!message.isBot && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-1 bg-gray-600"
                        style={{
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <UserIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.9) 0%, rgba(195, 180, 118, 0.9) 100%)',
                          boxShadow: '0 2px 8px rgba(175, 160, 98, 0.3)'
                        }}
                      >
                        <SparklesIcon className="w-3 h-3 text-white" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-2 h-2 rounded-full"
                              style={{ background: 'rgba(175, 160, 98, 0.6)' }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
                
                {/* Lead Capture Form */}
                <AnimatePresence>
                  {showLeadForm && !leadSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-2xl p-4 border-2 border-yellow-200 mx-4 my-2"
                      style={{
                        background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%)',
                        borderColor: 'rgba(175, 160, 98, 0.3)'
                      }}
                    >
                      <div className="text-center mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">🎉 Özel Teklif Formu</h4>
                        <p className="text-xs text-gray-600">Bilgilerinizi paylaşın, size özel teklif hazırlayalım!</p>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Adınız"
                          value={leadData.name}
                          onChange={(e) => setLeadData(prev => ({...prev, name: e.target.value}))}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                          style={{ borderColor: 'rgba(175, 160, 98, 0.3)' }}
                        />
                        <input
                          type="email"
                          placeholder="E-posta adresiniz"
                          value={leadData.email}
                          onChange={(e) => setLeadData(prev => ({...prev, email: e.target.value}))}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                          style={{ borderColor: 'rgba(175, 160, 98, 0.3)' }}
                        />
                        <textarea
                          placeholder="Proje hakkında kısaca bilgi verin"
                          value={leadData.message}
                          onChange={(e) => setLeadData(prev => ({...prev, message: e.target.value}))}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none resize-none"
                          style={{ borderColor: 'rgba(175, 160, 98, 0.3)' }}
                        />
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setLeadSubmitted(true)
                              setShowLeadForm(false)
                              const thankYouMessage: Message = {
                                id: Date.now().toString(),
                                text: `Teşekkür ederim ${leadData.name}! Bilgileriniz aldım. Size 24 saat içinde özel teklif göndereceğim. 🚀`,
                                isBot: true,
                                timestamp: new Date(),
                                agentName: currentAgent?.name,
                                agentTitle: currentAgent?.title,
                                agentAvatar: currentAgent?.avatar
                              }
                              setMessages(prev => [...prev, thankYouMessage])
                            }}
                            disabled={!leadData.name || !leadData.email}
                            className="flex-1 py-2 px-3 text-xs font-medium rounded-lg text-white transition-all"
                            style={{
                              background: leadData.name && leadData.email 
                                ? 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                                : 'rgba(156, 163, 175, 0.5)'
                            }}
                          >
                            Gönder 🚀
                          </button>
                          <button
                            onClick={() => setShowLeadForm(false)}
                            className="px-3 py-2 text-xs text-gray-600 border rounded-lg"
                            style={{ borderColor: 'rgba(175, 160, 98, 0.3)' }}
                          >
                            Daha sonra
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Apple-style Input Area */}
              <div className="p-4">
                {/* Input container with glass morphism */}
                <div className="relative">
                  {/* Background blur effect */}
                  <div className="absolute inset-0 rounded-2xl backdrop-blur-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  
                  <div className="relative flex items-end space-x-3 p-3">
                    {/* Text input with Apple-style design */}
                    <div className="flex-1 relative">
                      <textarea
                        value={inputText}
                        onChange={(e) => {
                          setInputText(e.target.value)
                          handleUserTyping()
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder="Mesajınızı yazın... Size nasıl yardımcı olabilirim?"
                        rows={1}
                        className="w-full px-4 py-3 text-sm text-gray-800 placeholder:text-gray-500 bg-transparent border-0 resize-none focus:outline-none leading-relaxed"
                        style={{
                          maxHeight: '120px',
                          minHeight: '48px'
                        }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement
                          target.style.height = 'auto'
                          target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                        }}
                        onFocus={() => {
                          const focusRing = document.getElementById('input-focus-ring')
                          if (focusRing) focusRing.style.opacity = '1'
                        }}
                        onBlur={() => {
                          const focusRing = document.getElementById('input-focus-ring')
                          if (focusRing) focusRing.style.opacity = '0'
                        }}
                      />
                      
                      {/* Focus ring */}
                      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-200"
                        style={{
                          background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.05) 0%, rgba(195, 180, 118, 0.05) 100%)',
                          border: '2px solid rgba(175, 160, 98, 0.2)'
                        }}
                        id="input-focus-ring"
                      />
                    </div>
                    
                    {/* Send button with Apple-style design */}
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isTyping}
                      whileHover={{ scale: inputText.trim() ? 1.05 : 1 }}
                      whileTap={{ scale: inputText.trim() ? 0.95 : 1 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: inputText.trim() 
                          ? 'linear-gradient(135deg, rgba(175, 160, 98, 0.95) 0%, rgba(195, 180, 118, 0.95) 50%, rgba(175, 160, 98, 0.95) 100%)'
                          : 'rgba(156, 163, 175, 0.3)',
                        boxShadow: inputText.trim() 
                          ? '0 4px 16px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                          : '0 2px 8px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {isTyping ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <PaperAirplaneIcon className={`w-5 h-5 ${
                          inputText.trim() ? 'text-white' : 'text-gray-400'
                        }`} style={{
                          transform: 'rotate(45deg)',
                          textShadow: inputText.trim() ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none'
                        }} />
                      )}
                    </motion.button>
                  </div>
                </div>
                
                {/* Enhanced Quick Actions with Dynamic Suggestions */}
                <div className="mt-3">
                  {messages.length <= 2 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2 font-medium">Popüler sorular:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Web sitesi fiyatları 💰',
                          'Mobil uygulama geliştirme 📱',
                          'E-ticaret çözümleri 🛒',
                          'Proje süreleri ⏱️',
                          'Portfolyo örnekleri 🎨',
                          'İletişim bilgileri 📞'
                        ].map((action, index) => (
                          <motion.button
                            key={action}
                            onClick={() => setInputText(action.replace(/[💰📱🛒⏱️🎨📞]/g, '').trim())}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                            style={{
                              background: 'rgba(175, 160, 98, 0.1)',
                              color: 'rgb(120, 113, 108)',
                              border: '1px solid rgba(175, 160, 98, 0.2)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(175, 160, 98, 0.15)'
                              e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.3)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(175, 160, 98, 0.1)'
                              e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                            }}
                          >
                            {action}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Agent-specific suggestions */}
                  {currentAgent && currentAgent.id !== 'default' && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2 font-medium">{currentAgent.name} ile konuşabilecekleriniz:</p>
                      <div className="flex flex-wrap gap-2">
                        {getAgentSuggestions(currentAgent.id).map((suggestion, index) => (
                          <motion.button
                            key={suggestion}
                            onClick={() => setInputText(suggestion)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                            style={{
                              background: 'rgba(175, 160, 98, 0.15)',
                              color: 'rgb(100, 93, 88)',
                              border: '1px solid rgba(175, 160, 98, 0.3)'
                            }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* General quick actions */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Randevu al 📅',
                      'WhatsApp ile devam et 💬',
                      'Teklif iste 📝'
                    ].map((action, index) => (
                      <motion.button
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                        style={{
                          background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.2) 0%, rgba(195, 180, 118, 0.2) 100%)',
                          color: 'rgb(100, 93, 88)',
                          border: '1px solid rgba(175, 160, 98, 0.4)'
                        }}
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot