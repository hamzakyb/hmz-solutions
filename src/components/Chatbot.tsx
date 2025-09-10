'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  ArrowPathIcon,
  HandThumbUpIcon,
  HandThumbDownIcon
} from '@heroicons/react/24/outline'
import { useChatbot } from '@/context/ChatbotContext'

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
  showRating?: boolean
  rating?: 'positive' | 'negative' | null
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

const Chatbot = () => {
  const { isChatOpen, openChat, closeChat } = useChatbot()
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  const [isTransferring, setIsTransferring] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [conversationId, setConversationId] = useState<string>('')
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

  // Generate a unique conversation ID
  useEffect(() => {
    if (!conversationId) {
      const newId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setConversationId(newId)
    }
  }, [conversationId])

  // Load messages from localStorage on component mount
  useEffect(() => {
    if (isChatOpen) {
      const savedMessages = localStorage.getItem(`chatbot_messages_${conversationId}`)
      const savedAgent = localStorage.getItem(`chatbot_agent_${conversationId}`)
      
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
          setMessages(parsedMessages)
        } catch (e) {
          console.error('Failed to parse saved messages', e)
        }
      }
      
      if (savedAgent) {
        try {
          const parsedAgent = JSON.parse(savedAgent)
          setCurrentAgent(parsedAgent)
        } catch (e) {
          console.error('Failed to parse saved agent', e)
          setCurrentAgent(agents.default)
        }
      } else if (!currentAgent) {
        setCurrentAgent(agents.default)
      }
    }
  }, [isChatOpen, conversationId, agents.default, currentAgent])

  // Save messages and agent to localStorage whenever they change
  useEffect(() => {
    if (conversationId && messages.length > 0) {
      localStorage.setItem(`chatbot_messages_${conversationId}`, JSON.stringify(messages))
    }
    if (conversationId && currentAgent) {
      localStorage.setItem(`chatbot_agent_${conversationId}`, JSON.stringify(currentAgent))
    }
  }, [messages, currentAgent, conversationId])

  // İlk agent ayarla
  useEffect(() => {
    if (!currentAgent && isChatOpen) {
      const defaultAgent = agents.default
      setCurrentAgent(defaultAgent)
      const greetingMessage: Message = {
        id: '1',
        text: defaultAgent.greeting,
        isBot: true,
        timestamp: new Date(),
        agentName: defaultAgent.name,
        agentTitle: defaultAgent.title,
        agentAvatar: defaultAgent.avatar,
        hasQuickReplies: true,
        quickReplies: ['Fiyat teklifi almak istiyorum', 'Projemi anlatmak istiyorum', 'Referans projelerinizi görmek istiyorum']
      }
      setMessages([greetingMessage])
    }
  }, [agents.default, currentAgent, isChatOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Improved agent selection algorithm
  const selectBestAgent = (userInput: string): Agent => {
    const input = userInput.toLowerCase();
    
    // Score each agent based on keyword matches
    const agentScores: { [key: string]: number } = {}
    
    Object.entries(agents).forEach(([agentKey, agent]) => {
      if (agentKey === 'default') {
        agentScores[agentKey] = 0
        return
      }
      
      let score = 0
      
      // Check specialization keywords
      agent.specialization.forEach(keyword => {
        if (input.includes(keyword)) {
          score += 3
        }
      })
      
      // Check expertise keywords
      agent.expertise.forEach(keyword => {
        const normalizedKeyword = keyword.toLowerCase()
        if (input.includes(normalizedKeyword)) {
          score += 2
        }
      })
      
      agentScores[agentKey] = score
    })
    
    // Find agent with highest score
    let bestAgentKey = 'default'
    let maxScore = 0
    
    Object.entries(agentScores).forEach(([agentKey, score]) => {
      if (score > maxScore) {
        maxScore = score
        bestAgentKey = agentKey
      }
    })
    
    return agents[bestAgentKey]
  }

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
    
    // Update conversation context
    setInputText('')
    setIsTyping(true)

    // Check if agent transfer is needed based on keywords
    const userInput = inputText.toLowerCase();
    const bestAgent = selectBestAgent(userInput);

    // If a different agent is needed, initiate transfer
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
          isTransferMessage: true,
          hasQuickReplies: true,
          quickReplies: ['Fiyat teklifi almak istiyorum', 'Projemi anlatmak istiyorum', 'Referans projelerinizi görmek istiyorum']
        }
        setMessages(prev => [...prev, transferMessage])
      }, 1500)
    }

    // Simulate bot response with context
    setTimeout(() => {
      setIsTyping(false)
      
      // If we just transferred, don't send another message immediately
      if (bestAgent.id !== currentAgent?.id) return;
      
      // Generate response based on current agent with realistic information
      let botResponse = "Üzgünüm, tam olarak ne demek istediğinizi anlamadım. Lütfen daha detaylı açıklayabilir misiniz?";
      let quickReplies: string[] | undefined = undefined;
      
      // Response logic based on current agent with realistic information
      if (currentAgent) {
        if (currentAgent.id === 'hamza') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Projelerin maliyeti, kapsam ve karmaşıklığa göre değişir. Genel olarak:\n\n• Kurumsal web sitesi: 15.000-50.000 TL\n• E-ticaret sitesi: 25.000-100.000 TL\n• Mobil uygulama: 30.000-150.000 TL\n• Yapay zeka çözümü: 20.000-200.000 TL\n• Blockchain uygulaması: 50.000-300.000 TL\n• AR/VR çözümü: 80.000-250.000 TL\n\nFiyat teklifi için projenizin detaylarını paylaşır mısınız?\n\n1. Proje türü\n2. Hedef kitle\n3. Beklenen özellikler\n4. Zaman çizelgesi";
            quickReplies = ['Web sitesi yaptırmak istiyorum', 'Mobil uygulama yaptırmak istiyorum', 'E-ticaret sitesi yaptırmak istiyorum']
          } else if (userInput.includes('süre') || userInput.includes('zaman') || userInput.includes('teslim')) {
            botResponse = "Projelerin süresi ihtiyaçlara göre değişir:\n\n• Kurumsal web sitesi: 2-4 hafta\n• E-ticaret sitesi: 4-8 hafta\n• Mobil uygulama: 6-12 hafta\n• Yapay zeka çözümü: 4-16 hafta\n• Blockchain uygulaması: 8-20 hafta\n• AR/VR çözümü: 12-24 hafta\n\nDaha spesifik bir süre için projenizi detaylandırabilir misiniz?";
            quickReplies = ['2 hafta içinde bitmesini istiyorum', '2 ay sürem var', 'Ne kadar sürede biter?']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Bize aşağıdaki yollarla ulaşabilirsiniz:\n\n• WhatsApp: +90 505 095 99 50\n• E-posta: info@hmzsolutions.com\n• Telefon: +90 384 212 12 12\n• Adres: Nevşehir, Türkiye\n\nAyrıca sizi daha iyi tanımam için projenizi kısaca anlatır mısınız?";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Telefonla görüşmek istiyorum']
          } else if (userInput.includes('ödeme') || userInput.includes('taksit')) {
            botResponse = "Ödeme seçeneklerimiz esnektir:\n\n• Peşin ödeme: %5 indirim\n• 2 taksit: Ekstra ücret yok\n• 3-6 taksit: %5 ek ücret\n• Aşamalı ödeme: Projeye göre planlanır\n\nFatura kesimleri genellikle aşama sonlarında gerçekleşir.";
            quickReplies = ['Peşin ödeme yapmak istiyorum', 'Taksit yapmak istiyorum', 'Aşamalı ödeme nasıl olur?']
          } else if (userInput.includes('referans') || userInput.includes('örnek') || userInput.includes('portfolio')) {
            botResponse = "Referans projelerimiz:\n\n• Nevşehir Belediyesi dijital dönüşüm\n• Kapadokya Otel Rezervasyon Sistemi\n• Yerel e-ticaret platformu\n• Mobil tur rehberi uygulaması\n\nDaha fazla örnek görmek için web sitemizi ziyaret edebilir veya özel olarak paylaşabilirim.";
            quickReplies = ['Web sitesi örnekleri', 'Mobil uygulama örnekleri', 'E-ticaret örnekleri']
          } else if (userInput.includes('destek') || userInput.includes('bakım') || userInput.includes('süreç sonrası')) {
            botResponse = "Süreç sonrası destek paketlerimiz:\n\n• 3 ay ücretsiz bakım\n• Aylık bakım: 2.000-5.000 TL\n• Yıllık bakım: 20.000-50.000 TL\n• 7/24 destek: + %30\n\nTüm projelerde kullanıcı eğitimleri de sağlanır.";
            quickReplies = ['Ücretsiz destek süresi nedir?', 'Yıllık bakım paketi', '7/24 destek']
          } else {
            botResponse = "Bu konuda size nasıl yardımcı olabilirim? Daha fazla detay verebilir misiniz?";
            quickReplies = ['Fiyat teklifi almak istiyorum', 'Projemi anlatmak istiyorum', 'Referans projelerinizi görmek istiyorum']
          }
        } else if (currentAgent.id === 'mehmet') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Web geliştirme projelerimizin fiyat aralığı:\n\n• Landing page: 8.000-15.000 TL\n• Kurumsal web sitesi: 15.000-50.000 TL\n• Özel web uygulaması: 30.000-150.000 TL\n• E-ticaret entegrasyonu: 10.000-40.000 TL\n• CMS entegrasyonu: 5.000-20.000 TL\n• API geliştirme: 10.000-50.000 TL\n\nProjeyi detaylandırırsanız daha net bir fiyat verebilirim.";
            quickReplies = ['Kurumsal web sitesi', 'E-ticaret entegrasyonu', 'Özel web uygulaması']
          } else if (userInput.includes('teknoloji') || userInput.includes('framework') || userInput.includes('stack')) {
            botResponse = "Kullandığımız teknolojiler:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS, Redux\n• Backend: Node.js, Express, NestJS, Python, Django\n• Veritabanı: MongoDB, PostgreSQL, Redis\n• Deployment: Vercel, AWS, Docker, Kubernetes\n• Diğer: REST API, GraphQL, WebSockets, CI/CD\n\nHangi teknoloji hakkında daha fazla bilgi istersiniz?";
            quickReplies = ['React/Next.js', 'Node.js', 'MongoDB/PostgreSQL']
          } else if (userInput.includes('seo') || userInput.includes('arama') || userInput.includes('google')) {
            botResponse = "SEO dostu web geliştirme:\n\n• Semantik HTML yapısı\n• Hızlı yükleme süreleri\n• Mobil uyumluluk\n• Schema.org entegrasyonu\n• Open Graph etiketleri\n• Sitemap ve robots.txt optimizasyonu\n\nTüm projelerde SEO en iyi uygulamalar dikkate alınır.";
            quickReplies = ['SEO nasıl yapılır?', 'Google sıralaması', 'Mobil uyumluluk']
          } else if (userInput.includes('güvenlik') || userInput.includes('security')) {
            botResponse = "Web güvenliği önlemlerimiz:\n\n• OWASP Top 10 korumaları\n• JWT ve OAuth 2.0 kimlik doğrulama\n• SSL/TLS sertifikaları\n• Input validasyonu\n• CORS ve CSRF korumaları\n• Güvenli header'lar\n• Düzenli güvenlik testleri\n\nVeri gizliliği için GDPR uyumluluğu sağlanır.";
            quickReplies = ['GDPR uyumluluğu', 'Kimlik doğrulama', 'Siber güvenlik']
          } else if (userInput.includes('performans') || userInput.includes('hız') || userInput.includes('optimizasyon')) {
            botResponse = "Performans optimizasyonu:\n\n• Code splitting ve lazy loading\n• Image optimization (WebP, lazy loading)\n• CDN entegrasyonu\n• Caching stratejileri\n• Minification ve compression\n• Server-side rendering\n• Database query optimization\n\nHedef: Lighthouse skoru 90+";
            quickReplies = ['Hız testi nasıl yapılır?', 'CDN nedir?', 'Lazy loading']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Web geliştirme projeleriniz için bana doğrudan ulaşabilirsiniz:\n\n• E-posta: mehmet@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nVeya şirket genel hatları üzerinden de ulaşabilirsiniz. Projeyi anlatır mısınız?";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Projemi anlatmak istiyorum']
          } else {
            botResponse = "Web geliştirme konusunda uzmanlaşmış bir teknik danışman olarak size yardımcı olabilirim. Hangi teknolojiyi kullanmak istiyorsunuz?";
            quickReplies = ['React/Next.js projesi', 'Node.js backend', 'Mobil uyumlu tasarım']
          }
        } else if (currentAgent.id === 'ayse') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Mobil uygulama geliştirme fiyatlarımız:\n\n• Basit iOS/Android uygulaması: 25.000-50.000 TL\n• Karmaşık mobil uygulama: 50.000-150.000 TL\n• Cross-platform (React Native): 30.000-100.000 TL\n• Flutter uygulaması: 35.000-120.000 TL\n• Enterprise uygulama: 100.000-300.000 TL\n• Uygulama bakım: Aylık 5.000-15.000 TL\n\nDetaylı fiyat için projeyi anlatır mısınız?";
            quickReplies = ['iOS uygulaması', 'Android uygulaması', 'Cross-platform (React Native)']
          } else if (userInput.includes('platform') || userInput.includes('ios') || userInput.includes('android')) {
            botResponse = "Mobil uygulama geliştirme seçeneklerimiz:\n\n• Native iOS (Swift, Objective-C)\n• Native Android (Kotlin, Java)\n• Cross-platform (React Native, Flutter)\n• Progressive Web Apps (PWA)\n\nHer platformun avantajları farklıdır:\n• Native: En iyi performans ve UX\n• Cross-platform: Maliyet etkinlik\n• PWA: Web tarayıcı uyumluluğu\n\nHangi platformu tercih etmek istersiniz ve neden?";
            quickReplies = ['Native iOS', 'Native Android', 'Cross-platform']
          } else if (userInput.includes('özellik') || userInput.includes('feature') || userInput.includes('entegrasyon')) {
            botResponse = "Popüler mobil uygulama özellikleri:\n\n• Push bildirimler\n• Sosyal medya entegrasyonu\n• Harita ve lokasyon servisleri\n• Ödeme entegrasyonu\n• Kamera ve galeri erişimi\n• Offline çalışma\n• Biyometrik kimlik doğrulama\n• Chat sistemi\n\nHangi özellikleri uygulamanızda görmek istiyorsunuz?";
            quickReplies = ['Push bildirim', 'Sosyal medya entegrasyonu', 'Harita entegrasyonu']
          } else if (userInput.includes('app store') || userInput.includes('play store') || userInput.includes('yayınlama')) {
            botResponse = "App Store/Play Store yayınlama süreci:\n\n• Geliştirici hesabı açılması\n• Uygulama meta verileri hazırlama\n• Ekran görüntüleri ve tanıtım videosu\n• TestFlight/Beta testing\n• App Store Review süreci\n• Yayın sonrası izleme ve güncellemeler\n\nOrtalama onay süresi: 24-72 saat";
            quickReplies = ['App Store süreçleri', 'Play Store süreçleri', 'TestFlight']
          } else if (userInput.includes('test') || userInput.includes('debug') || userInput.includes('kalite')) {
            botResponse = "Mobil uygulama test süreçlerimiz:\n\n• Unit testing\n• Integration testing\n• UI testing\n• Performance testing\n• Security testing\n• Device farm testing\n• User acceptance testing\n• A/B testing\n\nDesteklenen cihazlar: iOS 12+ ve Android 8+\n\nTest otomasyonu ile kalite garantisi sağlanır.";
            quickReplies = ['Unit testing', 'UI testing', 'Performance testing']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Mobil uygulama projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: ayse@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nProjeyi kısaca anlatırsanız size en uygun çözümü sunabilirim.";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Projemi anlatmak istiyorum']
          } else {
            botResponse = "Mobil uygulama geliştirme konusunda size nasıl yardımcı olabilirim? iOS mu Android mi düşünüyorsunuz?";
            quickReplies = ['iOS uygulaması geliştirmek istiyorum', 'Android uygulaması geliştirmek istiyorum', 'Cross-platform uygulama']
          }
        } else if (currentAgent.id === 'ali') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "E-ticaret çözümlerimizin fiyat aralığı:\n\n• Shopify temelli e-ticaret: 15.000-40.000 TL\n• WooCommerce e-ticaret: 20.000-50.000 TL\n• Özel e-ticaret çözümü: 50.000-200.000 TL\n• Ürün entegrasyonu (1000 ürün): 10.000-25.000 TL\n• Ödeme entegrasyonu: 5.000-15.000 TL\n• Stok yönetim sistemi: 15.000-40.000 TL\n\nDetaylı fiyat için mağaza tipinizi söyler misiniz?";
            quickReplies = ['Shopify e-ticaret', 'WooCommerce e-ticaret', 'Özel e-ticaret çözümü']
          } else if (userInput.includes('platform') || userInput.includes('sistem')) {
            botResponse = "E-ticaret platform önerilerimiz:\n\n• Shopify: Kolay kullanım, hızlı kurulum, geniş uygulama marketi\n• WooCommerce: Esneklik, WordPress entegrasyonu, açık kaynak\n• Magento: Kurumsal çözümler için, yüksek özelleştirme\n• PrestaShop: Avrupa'da popüler, çoklu dil desteği\n• Özel çözüm: Tam özelleştirme, özel ihtiyaçlar için\n\nSektörünüz ve hedef kitleniz nedir?";
            quickReplies = ['Shopify', 'WooCommerce', 'Magento']
          } else if (userInput.includes('ödeme') || userInput.includes('payment')) {
            botResponse = "Desteklenen ödeme yöntemleri:\n\n• Kredi kartı (Visa, MasterCard)\n• Banka havalesi\n• PayPal\n• Stripe\n• Iyzico\n• NestPay\n• PayU\n• Hepsipay\n• Kripto para (Bitcoin, Ethereum)\n\n3D Secure entegrasyonu standarttır.\n\nTaksit seçenekleri banka bazlı yapılandırılabilir.";
            quickReplies = ['Kredi kartı ödeme', 'PayPal entegrasyonu', 'Kripto para ödeme']
          } else if (userInput.includes('kargo') || userInput.includes('shipping')) {
            botResponse = "Kargo entegrasyonları:\n\n• Trendyol Entegrasyonu\n• Hepsijet Entegrasyonu\n• MNG Kargo\n• Yurtiçi Kargo\n• Sürat Kargo\n• Aras Kargo\n• UPS\n• DHL\n• FedEx\n\nOtomatik takip numarası üretimi ve müşteri bildirimleri sağlanır.";
            quickReplies = ['MNG Kargo', 'Yurtiçi Kargo', 'UPS entegrasyonu']
          } else if (userInput.includes('envanter') || userInput.includes('stok') || userInput.includes('inventory')) {
            botResponse = "Envanter yönetim sistemleri:\n\n• Gerçek zamanlı stok takibi\n• Otomatik stok yenileme\n• Tedarikçi entegrasyonu\n• Barkod sistemi\n• Multi-depo desteği\n• Stok uyarıları\n• Raporlama ve analiz\n• POS entegrasyonu\n\nERP sistemleri ile senkronizasyon sağlanabilir.";
            quickReplies = ['Stok takibi', 'Barkod sistemi', 'Multi-depo desteği']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "E-ticaret projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: ali@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nSektörünüzü ve ihtiyaçlarınızı anlatırsanız size özel teklif hazırlayabilirim.";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Projemi anlatmak istiyorum']
          } else {
            botResponse = "E-ticaret çözümleri konusunda uzmanlaşmış bir danışman olarak size yardımcı olabilirim. Hangi platformu düşünüyorsunuz?";
            quickReplies = ['Shopify e-ticaret', 'WooCommerce e-ticaret', 'Özel e-ticaret çözümü']
          }
        } else if (currentAgent.id === 'zeynep') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "SEO ve dijital pazarlama hizmetlerimiz:\n\n• Aylık SEO paketi: 3.000-10.000 TL\n• Google Ads yönetimi: %10-15 bütçe + 2.000-5.000 TL yönetim\n• Sosyal medya yönetimi: 2.000-8.000 TL/ay\n• Content pazarlama: 1.500-5.000 TL/ay\n• Influencer marketing: Kampanya bazlı\n• E-mail pazarlama: 1.000-5.000 TL/ay\n• Analytics ve raporlama: 1.500-3.000 TL/ay\n\nHedeflerinizi belirtirseniz daha özel fiyat verebilirim.";
            quickReplies = ['Aylık SEO paketi', 'Google Ads yönetimi', 'Sosyal medya yönetimi']
          } else if (userInput.includes('süre') || userInput.includes('zaman') || userInput.includes('sonuç')) {
            botResponse = "Dijital pazarlama sonuç süreleri:\n\n• SEO: İlk sonuçlar 2-3 ay, önemli sonuçlar 6-12 ay\n• Google Ads: Anında sonuç, optimizasyon 1-2 ay\n• Sosyal medya: 1-2 ayda görünür sonuçlar\n• E-mail pazarlama: 1-2 ayda ilk dönüşümler\n• Content pazarlama: 2-3 ayda etki\n• Influencer marketing: Kampanya süresince\n\nHedef kitlenizi ve sektörünüzü söyler misiniz?";
            quickReplies = ['SEO sonuç süresi', 'Google Ads optimizasyonu', 'Sosyal medya etkisi']
          } else if (userInput.includes('kanal') || userInput.includes('platform')) {
            botResponse = "Dijital pazarlama kanallarımız:\n\n• Google Search (SEO/SEM)\n• Google Display Network\n• YouTube Reklamları\n• Facebook & Instagram\n• LinkedIn\n• Twitter\n• TikTok\n• Pinterest\n• E-mail pazarlama\n• WhatsApp pazarlama\n\nHedef kitlenize göre en uygun kanallar seçilir.";
            quickReplies = ['Google Search', 'Facebook & Instagram', 'YouTube Reklamları']
          } else if (userInput.includes('içerik') || userInput.includes('content')) {
            botResponse = "Content strateji hizmetlerimiz:\n\n• Blog yazısı üretimi\n• Sosyal medya içeriği\n• Video senaryosu\n• Infographic tasarımı\n• E-mail template\n• Whitepaper ve case study\n• Landing page içerikleri\n• Ürün açıklamaları\n\nAylık 10-50 adet içerik üretimi yapılabilir.";
            quickReplies = ['Blog yazısı', 'Sosyal medya içeriği', 'Video senaryosu']
          } else if (userInput.includes('rapor') || userInput.includes('analytics') || userInput.includes('ölçüm')) {
            botResponse = "Performans raporlama ve analiz:\n\n• Google Analytics 4 entegrasyonu\n• Conversion tracking\n• Heatmap analizi\n• A/B testing\n• ROI hesaplama\n• Weekly/monthly raporlar\n• Dashboard oluşturma\n• Custom raporlama\n\nTüm veriler Google Data Studio ile görselleştirilir.";
            quickReplies = ['Google Analytics', 'Conversion tracking', 'Heatmap analizi']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Dijital pazarlama projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: zeynep@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nMevcut dijital varlıklarınızı ve hedeflerinizi anlatırsanız size özel strateji sunabilirim.";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Projemi anlatmak istiyorum']
          } else {
            botResponse = "SEO ve dijital pazarlama konularında size nasıl yardımcı olabilirim? Hangi hizmeti öğrenmek istiyorsunuz?";
            quickReplies = ['SEO hizmeti', 'Google Ads yönetimi', 'Sosyal medya yönetimi']
          }
        } else if (currentAgent.id === 'emre') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "UI/UX tasarım hizmetlerimiz:\n\n• Web sitesi tasarımı: 8.000-25.000 TL\n• Mobil uygulama tasarımı: 12.000-35.000 TL\n• Prototipleme: 3.000-10.000 TL\n• Kullanıcı araştırması: 5.000-15.000 TL\n• Tasarım sistemi oluşturma: 15.000-40.000 TL\n• Animasyon tasarımı: 5.000-20.000 TL\n• Re-design hizmeti: 10.000-30.000 TL\n\nProje kapsamını anlatırsanız daha net fiyat verebilirim.";
            quickReplies = ['Web sitesi tasarımı', 'Mobil uygulama tasarımı', 'Prototipleme']
          } else if (userInput.includes('süreç') || userInput.includes('aşama')) {
            botResponse = "Tasarım sürecimiz şu aşamalardan oluşur:\n\n1. Araştırma ve analiz (1-2 hafta)\n   - Hedef kitle analizi\n   - Rakip analizi\n   - Kullanıcı ihtiyaç araştırması\n2. Kullanıcı persona ve journey map (1 hafta)\n3. Wireframe ve prototipleme (2-3 hafta)\n4. Görsel tasarım (2-4 hafta)\n5. Test ve iterasyon (1-2 hafta)\n6. Teslim ve dokümantasyon (1 hafta)\n\nToplam süreç: 8-15 hafta";
            quickReplies = ['Kullanıcı araştırması', 'Wireframe', 'Görsel tasarım']
          } else if (userInput.includes('araç') || userInput.includes('tool') || userInput.includes('software')) {
            botResponse = "Kullandığımız tasarım araçları:\n\n• Figma (Ana tasarım aracı)\n• Adobe Creative Suite (Photoshop, Illustrator)\n• Sketch\n• InVision (Prototipleme)\n• Principle (Animasyon)\n• Zeplin (Developer handoff)\n• Miro (Beyin fırtınası)\n• UserTesting (Kullanıcı testi)\n\nTüm ekip Figma üzerinde senkron çalışır.";
            quickReplies = ['Figma', 'Adobe Creative Suite', 'Sketch']
          } else if (userInput.includes('prensip') || userInput.includes('yaklaşım')) {
            botResponse = "Tasarım prensiplerimiz:\n\n• Kullanıcı merkezli tasarım (User-Centered Design)\n• Erişilebilirlik (Accessibility)\n• Responsive tasarım\n• Hız ve performans odaklı\n• Marka tutarlılığı\n• Test edilmiş kullanıcı deneyimi\n• Modern ve minimalist yaklaşım\n• Platform özel tasarım\n\nHer proje için özel tasarım rehberi oluşturulur.";
            quickReplies = ['Kullanıcı merkezli tasarım', 'Responsive tasarım', 'Erişilebilirlik']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Tasarım projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: emre@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nReferans çalışmalarımızı ve portföyümüzü görmek ister misiniz?";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Referans çalışmaları']
          } else {
            botResponse = "UI/UX tasarım konularında size nasıl yardımcı olabilirim? Hangi tür bir tasarım ihtiyacınız var?";
            quickReplies = ['Web sitesi tasarımı', 'Mobil uygulama tasarımı', 'UI redesign']
          }
        } else if (currentAgent.id === 'elif') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Yapay zeka çözümlerimiz:\n\n• Chatbot geliştirme: 15.000-50.000 TL\n• Tahmine dayalı analiz: 25.000-100.000 TL\n• Görüntü işleme: 30.000-150.000 TL\n• NLP çözümleri: 20.000-80.000 TL\n• Makine öğrenmesi danışmanlığı: 10.000-30.000 TL\n• Otomasyon çözümleri: 20.000-80.000 TL\n• Veri analizi ve görselleştirme: 15.000-50.000 TL\n\nİhtiyaçlarınızı detaylandırırsanız özel fiyat verebilirim.";
            quickReplies = ['Chatbot geliştirme', 'Tahmine dayalı analiz', 'Görüntü işleme']
          } else if (userInput.includes('alan') || userInput.includes('kullanım')) {
            botResponse = "Yapay zeka uygulama alanlarımız:\n\n• Müşteri hizmetleri chatbotları\n• Satış tahminleri ve analiz\n• Görüntü ve ses işleme\n• Otomasyon çözümleri\n• Veri analizi ve görselleştirme\n• Anomali tespiti\n• Öneri sistemleri\n• Doğal dil işleme\n• Tahmine dayalı bakım\n\nHangi alanda bir çözüm düşünüyorsunuz?";
            quickReplies = ['Müşteri hizmetleri chatbotu', 'Satış tahmini', 'Görüntü işleme']
          } else if (userInput.includes('teknoloji') || userInput.includes('framework')) {
            botResponse = "Kullandığımız AI/ML teknolojileri:\n\n• Python (Ana dil)\n• TensorFlow ve PyTorch\n• Scikit-learn\n• OpenCV\n• NLTK ve spaCy\n• Hugging Face Transformers\n• AWS SageMaker\n• Google AI Platform\n• Azure Machine Learning\n• Jupyter Notebooks\n\nTüm çözümler bulut veya lokal olarak dağıtılabilir.";
            quickReplies = ['TensorFlow', 'PyTorch', 'Scikit-learn']
          } else if (userInput.includes('veri') || userInput.includes('data')) {
            botResponse = "Veri işleme ve analiz:\n\n• Veri toplama ve temizleme\n• Özellik mühendisliği\n• Model eğitimi ve testi\n• Performans optimizasyonu\n• Gerçek zamanlı işleme\n• Batch processing\n• Veri gizliliği (GDPR uyumlu)\n• Etik AI uygulamaları\n\nMinimum 1000 veri satırı ile anlamlı modeller oluşturulabilir.";
            quickReplies = ['Veri toplama', 'Model eğitimi', 'Performans optimizasyonu']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Yapay zeka projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: elif@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nMevcut veri altyapınızı ve hedeflerinizi anlatırsanız size özel çözüm önerisi sunabilirim.";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Projemi anlatmak istiyorum']
          } else {
            botResponse = "Yapay zeka çözümleri konusunda size nasıl yardımcı olabilirim? Hangi alanda bir uygulama düşünüyorsunuz?";
            quickReplies = ['Chatbot geliştirme', 'Tahmine dayalı analiz', 'Veri analizi']
          }
        } else if (currentAgent.id === 'can') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Artırılmış gerçeklik çözümlerimiz:\n\n• Eğitim uygulamaları: 30.000-100.000 TL\n• Perakende deneyimi: 50.000-150.000 TL\n• Sanal try-on: 40.000-120.000 TL\n• Endüstriyel uygulamalar: 80.000-250.000 TL\n• AR SDK entegrasyonu: 20.000-60.000 TL\n• 3D modelleme: 10.000-50.000 TL\n• Markerless tracking: 30.000-80.000 TL\n\nSektörünüzü belirtirseniz özel fiyat verebilirim.";
            quickReplies = ['Eğitim uygulaması', 'Perakende deneyimi', 'Sanal try-on']
          } else if (userInput.includes('kullanım') || userInput.includes('uygulama')) {
            botResponse = "AR kullanım alanlarımız:\n\n• Eğitim ve simulasyon\n• Perakende ve e-ticaret\n• Mimari görselleştirme\n• Sanayi ve bakım\n• Oyun ve eğlence\n• Turizm ve kültür-sanat\n• Sağlık ve tıbbi eğitim\n• Reklam ve marka deneyimi\n\nHangi sektörde AR düşünüyorsunuz?";
            quickReplies = ['Eğitim ve simulasyon', 'Perakende', 'Mimari görselleştirme']
          } else if (userInput.includes('teknoloji') || userInput.includes('platform')) {
            botResponse = "Kullandığımız AR teknolojileri:\n\n• Unity 3D (Ana geliştirme platformu)\n• ARKit (iOS)\n• ARCore (Android)\n• Vuforia\n• Wikitude\n• 8th Wall (Web AR)\n• Spark AR (Facebook/Meta)\n• Blender (3D modelleme)\n• Adobe Aero\n\nTüm çözümler mobil ve web platformlarında çalışabilir.";
            quickReplies = ['Unity 3D', 'ARKit', 'ARCore']
          } else if (userInput.includes('marker') || userInput.includes('tracking')) {
            botResponse = "AR tracking yöntemlerimiz:\n\n• Marker-based tracking (QR kod benzeri)\n• Markerless tracking (Görüntü bazlı)\n• SLAM (Simultaneous Localization and Mapping)\n• GPS tabanlı konumlandırma\n• Surface tracking (Yüzey tanıma)\n• Object recognition (Nesne tanıma)\n• Face tracking (Yüz takibi)\n• Hand tracking (El takibi)\n\nProje gereksinimlerinize göre en uygun yöntem seçilir.";
            quickReplies = ['Marker-based tracking', 'Markerless tracking', 'SLAM']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "AR projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: can@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nHedef kitlenizi ve kullanım senaryonuzu anlatırsanız size özel demo hazırlayabilirim.";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Demo istiyorum']
          } else {
            botResponse = "Artırılmış gerçeklik çözümleri konusunda size nasıl yardımcı olabilirim? Hangi sektör için düşünüyorsunuz?";
            quickReplies = ['Eğitim AR uygulaması', 'Perakende AR', 'Mimari AR']
          }
        } else if (currentAgent.id === 'berk') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Blockchain çözümlerimiz:\n\n• Akıllı sözleşme geliştirme: 20.000-80.000 TL\n• Token oluşturma: 15.000-50.000 TL\n• DApp geliştirme: 50.000-200.000 TL\n• Kripto ödeme entegrasyonu: 10.000-30.000 TL\n• Blockchain danışmanlığı: 15.000-40.000 TL\n• NFT platformu: 40.000-150.000 TL\n• DeFi çözümü: 80.000-300.000 TL\n• Private blockchain: 100.000-500.000 TL\n\nProjeyi detaylandırırsanız özel fiyat verebilirim.";
            quickReplies = ['Akıllı sözleşme', 'Token oluşturma', 'DApp geliştirme']
          } else if (userInput.includes('kullanım') || userInput.includes('uygulama')) {
            botResponse = "Blockchain kullanım alanlarımız:\n\n• Tedarik zinciri şeffaflığı\n• Dijital kimlik doğrulama\n• Akıllı sözleşmeler\n• NFT ve dijital varlıklar\n• Kripto ödeme sistemleri\n• Oy verme sistemleri\n• Sağlık kayıtları\n• Gayrimenkul belgeleri\n• Eğitim sertifikaları\n\nHangi uygulama alanını düşünüyorsunuz?";
            quickReplies = ['Tedarik zinciri', 'Akıllı sözleşmeler', 'NFT platformu']
          } else if (userInput.includes('teknoloji') || userInput.includes('platform')) {
            botResponse = "Kullandığımız blockchain teknolojileri:\n\n• Ethereum (Smart contracts)\n• Polygon (Düşük ücretli işlemler)\n• Binance Smart Chain\n• Solana (Yüksek performans)\n• Hyperledger Fabric (Kurumsal)\n• Corda (Finansal)\n• IPFS (Dağıtık depolama)\n• Truffle ve Hardhat (Geliştirme)\n• Web3.js ve Ethers.js\n\nProje gereksinimlerinize göre en uygun platform seçilir.";
            quickReplies = ['Ethereum', 'Polygon', 'Solana']
          } else if (userInput.includes('güvenlik') || userInput.includes('security')) {
            botResponse = "Blockchain güvenlik önlemlerimiz:\n\n• Akıllı sözleşme denetimi\n• Penetrasyon testi\n• Zero-knowledge proofs\n• Multi-signature cüzdanlar\n• KYC/AML entegrasyonu\n• GDPR uyumlu veri işleme\n• Şifreleme standartları\n• Node güvenliği\n• API koruma\n\nTüm çözümler OWASP ve blockchain güvenlik standartlarına uygun geliştirilir.";
            quickReplies = ['Akıllı sözleşme denetimi', 'Penetrasyon testi', 'Zero-knowledge proofs']
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Blockchain projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: berk@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nTeknik gereksinimlerinizi ve hedeflerinizi anlatırsanız size özel çözüm önerisi sunabilirim.";
            quickReplies = ['WhatsApp ile ulaşmak istiyorum', 'E-posta göndermek istiyorum', 'Teknik danışmanlık']
          } else {
            botResponse = "Blockchain teknolojileri konusunda size nasıl yardımcı olabilirim? Hangi uygulama alanını düşünüyorsunuz?";
            quickReplies = ['Akıllı sözleşme geliştirme', 'Token oluşturma', 'NFT platformu']
          }
        }
      }
    
    const botMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: botResponse,
      isBot: true,
      timestamp: new Date(),
      agentName: currentAgent?.name,
      agentTitle: currentAgent?.title,
      agentAvatar: currentAgent?.avatar,
      hasQuickReplies: !!quickReplies,
      quickReplies: quickReplies,
      showRating: true,
      rating: null
    }
    setMessages(prev => [...prev, botMessage])
  }, 2000)

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle quick reply selection
  const handleQuickReply = (reply: string) => {
    setInputText(reply)
    // Auto-send after a short delay to improve UX
    setTimeout(() => {
      handleSendMessage()
    }, 300)
  }

  // Handle message rating
  const handleMessageRating = (messageId: string, rating: 'positive' | 'negative') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating, showRating: false } : msg
    ))
  }

  // Start a new conversation
  const startNewConversation = () => {
    // Clear current conversation from localStorage
    localStorage.removeItem(`chatbot_messages_${conversationId}`)
    localStorage.removeItem(`chatbot_agent_${conversationId}`)
    
    // Generate new conversation ID
    const newId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setConversationId(newId)
    
    // Reset state
    setMessages([])
    setCurrentAgent(agents.default)
    
    // Add initial greeting message
    const greetingMessage: Message = {
      id: '1',
      text: agents.default.greeting,
      isBot: true,
      timestamp: new Date(),
      agentName: agents.default.name,
      agentTitle: agents.default.title,
      agentAvatar: agents.default.avatar,
      hasQuickReplies: true,
      quickReplies: ['Fiyat teklifi almak istiyorum', 'Projemi anlatmak istiyorum', 'Referans projelerinizi görmek istiyorum']
    }
    setMessages([greetingMessage])
  }

  return (
    <>
      {/* Apple-Style Floating Chat Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={openChat}
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
        {isChatOpen && (
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
                        <Image 
                          src={currentAgent?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80'} 
                          alt={`${currentAgent?.name} - HMZ Solutions Uzmanı`}
                          width={48}
                          height={48}
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
                  
                  {/* Control buttons with Apple-style design */}
                  <div className="flex space-x-2">
                    {/* New conversation button */}
                    <motion.button
                      onClick={startNewConversation}
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
                      <ArrowPathIcon className="w-4 h-4 text-white drop-shadow-sm" />
                    </motion.button>
                    
                    {/* Close button */}
                    <motion.button
                      onClick={closeChat}
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
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
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
                            <p className={`text-sm leading-relaxed whitespace-pre-line ${
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
                          
                          {/* Quick replies */}
                          {message.hasQuickReplies && message.quickReplies && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {message.quickReplies.map((reply, index) => (
                                <motion.button
                                  key={index}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleQuickReply(reply)}
                                  className="text-xs px-3 py-1.5 rounded-full"
                                  style={{
                                    background: message.isBot 
                                      ? 'rgba(175, 160, 98, 0.1)'
                                      : 'rgba(255, 255, 255, 0.2)',
                                    color: message.isBot 
                                      ? 'rgb(120, 113, 108)'
                                      : 'rgba(255, 255, 255, 0.9)',
                                    border: message.isBot 
                                      ? '1px solid rgba(175, 160, 98, 0.2)'
                                      : '1px solid rgba(255, 255, 255, 0.3)'
                                  }}
                                >
                                  {reply}
                                </motion.button>
                              ))}
                            </div>
                          )}
                          
                          {/* Message rating */}
                          {message.showRating && !message.rating && (
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Bu yanıt yardımcı oldu mu?</span>
                              <div className="flex space-x-1">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleMessageRating(message.id, 'positive')}
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{
                                    background: 'rgba(175, 160, 98, 0.1)',
                                    border: '1px solid rgba(175, 160, 98, 0.2)'
                                  }}
                                >
                                  <HandThumbUpIcon className="w-3 h-3 text-green-600" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleMessageRating(message.id, 'negative')}
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{
                                    background: 'rgba(175, 160, 98, 0.1)',
                                    border: '1px solid rgba(175, 160, 98, 0.2)'
                                  }}
                                >
                                  <HandThumbDownIcon className="w-3 h-3 text-red-600" />
                                </motion.button>
                              </div>
                            </div>
                          )}
                          
                          {/* Rating feedback */}
                          {message.rating && (
                            <div className="mt-2 flex items-center space-x-2">
                              {message.rating === 'positive' ? (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <HandThumbUpIcon className="w-4 h-4" />
                                  <span className="text-xs">Teşekkürler!</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1 text-red-600">
                                  <HandThumbDownIcon className="w-4 h-4" />
                                  <span className="text-xs">Geri bildiriminiz için teşekkürler</span>
                                </div>
                              )}
                            </div>
                          )}
                          
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
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200/50 bg-white/50 backdrop-blur-xl">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`${currentAgent?.name || 'Uzman'}a sorunuzu yazın...`}
                    className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 text-sm text-gray-900 placeholder:text-gray-500 bg-white/80 backdrop-blur-sm border border-gray-300/50 shadow-sm"
                    style={{
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgba(175, 160, 98, 0.95) 0%, rgba(195, 180, 118, 0.95) 50%, rgba(175, 160, 98, 0.95) 100%)',
                      boxShadow: '0 4px 16px rgba(175, 160, 98, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </motion.button>
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