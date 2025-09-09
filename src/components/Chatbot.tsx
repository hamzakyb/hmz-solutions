'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon
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
    if (!currentAgent && isChatOpen) {
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
  }, [agents.default, currentAgent, isChatOpen])

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
    
    // Update conversation context
    setInputText('')
    setIsTyping(true)

    // Check if agent transfer is needed based on keywords
    const userInput = inputText.toLowerCase();
    let bestAgent = agents.default;
    
    // Find the most appropriate agent based on user input
    for (const [agentKey, agent] of Object.entries(agents)) {
      if (agentKey === 'default') continue;
      
      // Check if any specialization keywords match
      const hasMatchingKeyword = agent.specialization.some(keyword => 
        userInput.includes(keyword)
      );
      
      if (hasMatchingKeyword) {
        bestAgent = agent;
        break;
      }
    }

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
          isTransferMessage: true
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
      
      // Response logic based on current agent with realistic information
      if (currentAgent) {
        if (currentAgent.id === 'hamza') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Projelerin maliyeti, kapsam ve karmaşıklığa göre değişir. Genel olarak:\n\n• Kurumsal web sitesi: 15.000-50.000 TL\n• E-ticaret sitesi: 25.000-100.000 TL\n• Mobil uygulama: 30.000-150.000 TL\n\nDetaylı bilgi için projenizi anlatır mısınız?";
          } else if (userInput.includes('süre') || userInput.includes('zaman') || userInput.includes('teslim')) {
            botResponse = "Projelerin süresi ihtiyaçlara göre değişir:\n\n• Kurumsal web sitesi: 2-4 hafta\n• E-ticaret sitesi: 4-8 hafta\n• Mobil uygulama: 6-12 hafta\n\nDaha spesifik bir süre için projenizi detaylandırabilir misiniz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Bize aşağıdaki yollarla ulaşabilirsiniz:\n\n• WhatsApp: +90 505 095 99 50\n• E-posta: info@hmzsolutions.com\n• Telefon: +90 384 212 12 12\n\nAyrıca sizi daha iyi tanımam için projenizi kısaca anlatır mısınız?";
          } else {
            botResponse = "Bu konuda size nasıl yardımcı olabilirim? Daha fazla detay verebilir misiniz?";
          }
        } else if (currentAgent.id === 'mehmet') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Web geliştirme projelerimizin fiyat aralığı:\n\n• Landing page: 8.000-15.000 TL\n• Kurumsal web sitesi: 15.000-50.000 TL\n• Özel web uygulaması: 30.000-150.000 TL\n• E-ticaret entegrasyonu: 10.000-40.000 TL\n\nProjeyi detaylandırırsanız daha net bir fiyat verebilirim.";
          } else if (userInput.includes('teknoloji') || userInput.includes('framework') || userInput.includes('stack')) {
            botResponse = "Kullandığımız teknolojiler:\n\n• Frontend: React, Next.js, TypeScript, Tailwind CSS\n• Backend: Node.js, Express, MongoDB, PostgreSQL\n• Deployment: Vercel, AWS, Docker\n• Diğer: REST API, GraphQL, CI/CD\n\nHangi teknoloji hakkında daha fazla bilgi istersiniz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Web geliştirme projeleriniz için bana doğrudan ulaşabilirsiniz:\n\n• E-posta: mehmet@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nVeya şirket genel hatları üzerinden de ulaşabilirsiniz. Projeyi anlatır mısınız?";
          } else {
            botResponse = "Web geliştirme konusunda uzmanlaşmış bir teknik danışman olarak size yardımcı olabilirim. Hangi teknolojiyi kullanmak istiyorsunuz?";
          }
        } else if (currentAgent.id === 'ayse') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Mobil uygulama geliştirme fiyatlarımız:\n\n• Basit iOS/Android uygulaması: 25.000-50.000 TL\n• Karmaşık mobil uygulama: 50.000-150.000 TL\n• Cross-platform (React Native): 30.000-100.000 TL\n• Uygulama bakım: Aylık 5.000-15.000 TL\n\nDetaylı fiyat için projeyi anlatır mısınız?";
          } else if (userInput.includes('platform') || userInput.includes('ios') || userInput.includes('android')) {
            botResponse = "Mobil uygulama geliştirme seçeneklerimiz:\n\n• Native iOS (Swift)\n• Native Android (Kotlin)\n• Cross-platform (React Native, Flutter)\n\nHer platformun avantajları farklıdır. Hangi platformu tercih etmek istersiniz ve neden?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Mobil uygulama projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: ayse@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nProjeyi kısaca anlatırsanız size en uygun çözümü sunabilirim.";
          } else {
            botResponse = "Mobil uygulama geliştirme konusunda size nasıl yardımcı olabilirim? iOS mu Android mi düşünüyorsunuz?";
          }
        } else if (currentAgent.id === 'ali') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "E-ticaret çözümlerimizin fiyat aralığı:\n\n• Shopify temelli e-ticaret: 15.000-40.000 TL\n• WooCommerce e-ticaret: 20.000-50.000 TL\n• Özel e-ticaret çözümü: 50.000-200.000 TL\n• Ürün entegrasyonu (1000 ürün): 10.000-25.000 TL\n\nDetaylı fiyat için mağaza tipinizi söyler misiniz?";
          } else if (userInput.includes('platform') || userInput.includes('sistem')) {
            botResponse = "E-ticaret platform önerilerimiz:\n\n• Shopify: Kolay kullanım, hızlı kurulum\n• WooCommerce: Esneklik, WordPress entegrasyonu\n• Magento: Kurumsal çözümler için\n• Özel çözüm: Tam özelleştirme\n\nHangi sektörde e-ticaret düşünüyorsunuz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "E-ticaret projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: ali@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nSektörünüzü ve ihtiyaçlarınızı anlatırsanız size özel teklif hazırlayabilirim.";
          } else {
            botResponse = "E-ticaret çözümleri konusunda uzmanlaşmış bir danışman olarak size yardımcı olabilirim. Hangi platformu düşünüyorsunuz?";
          }
        } else if (currentAgent.id === 'zeynep') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "SEO ve dijital pazarlama hizmetlerimiz:\n\n• Aylık SEO paketi: 3.000-10.000 TL\n• Google Ads yönetimi: %10-15 bütçe + 2.000-5.000 TL yönetim\n• Sosyal medya yönetimi: 2.000-8.000 TL/ay\n• Content pazarlama: 1.500-5.000 TL/ay\n\nHedeflerinizi belirtirseniz daha özel fiyat verebilirim.";
          } else if (userInput.includes('süre') || userInput.includes('zaman') || userInput.includes('sonuç')) {
            botResponse = "Dijital pazarlama sonuç süreleri:\n\n• SEO: İlk sonuçlar 2-3 ay, önemli sonuçlar 6-12 ay\n• Google Ads: Anında sonuç, optimizasyon 1-2 ay\n• Sosyal medya: 1-2 ayda görünür sonuçlar\n• E-mail pazarlama: 1-2 ayda ilk dönüşümler\n\nHedef kitlenizi ve sektörünüzü söyler misiniz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Dijital pazarlama projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: zeynep@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nMevcut dijital varlıklarınızı ve hedeflerinizi anlatırsanız size özel strateji sunabilirim.";
          } else {
            botResponse = "SEO ve dijital pazarlama konularında size nasıl yardımcı olabilirim? Hangi hizmeti öğrenmek istiyorsunuz?";
          }
        } else if (currentAgent.id === 'emre') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "UI/UX tasarım hizmetlerimiz:\n\n• Web sitesi tasarımı: 8.000-25.000 TL\n• Mobil uygulama tasarımı: 12.000-35.000 TL\n• Prototipleme: 3.000-10.000 TL\n• Kullanıcı araştırması: 5.000-15.000 TL\n• Tasarım sistemi oluşturma: 15.000-40.000 TL\n\nProje kapsamını anlatırsanız daha net fiyat verebilirim.";
          } else if (userInput.includes('süreç') || userInput.includes('aşama')) {
            botResponse = "Tasarım sürecimiz şu aşamalardan oluşur:\n\n1. Araştırma ve analiz (1-2 hafta)\n2. Kullanıcı persona ve journey map (1 hafta)\n3. Wireframe ve prototipleme (2-3 hafta)\n4. Görsel tasarım (2-4 hafta)\n5. Test ve iterasyon (1-2 hafta)\n6. Teslim ve dokümantasyon (1 hafta)\n\nProjeniz hangi aşamada?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Tasarım projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: emre@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nReferans çalışmalarımızı ve portföyümüzü görmek ister misiniz?";
          } else {
            botResponse = "UI/UX tasarım konularında size nasıl yardımcı olabilirim? Hangi tür bir tasarım ihtiyacınız var?";
          }
        } else if (currentAgent.id === 'elif') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Yapay zeka çözümlerimiz:\n\n• Chatbot geliştirme: 15.000-50.000 TL\n• Tahmine dayalı analiz: 25.000-100.000 TL\n• Görüntü işleme: 30.000-150.000 TL\n• NLP çözümleri: 20.000-80.000 TL\n• Makine öğrenmesi danışmanlığı: 10.000-30.000 TL\n\nİhtiyaçlarınızı detaylandırırsanız özel fiyat verebilirim.";
          } else if (userInput.includes('alan') || userInput.includes('kullanım')) {
            botResponse = "Yapay zeka uygulama alanlarımız:\n\n• Müşteri hizmetleri chatbotları\n• Satış tahminleri ve analiz\n• Görüntü ve ses işleme\n• Otomasyon çözümleri\n• Veri analizi ve görselleştirme\n\nHangi alanda bir çözüm düşünüyorsunuz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Yapay zeka projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: elif@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nMevcut veri altyapınızı ve hedeflerinizi anlatırsanız size özel çözüm önerisi sunabilirim.";
          } else {
            botResponse = "Yapay zeka çözümleri konusunda size nasıl yardımcı olabilirim? Hangi alanda bir uygulama düşünüyorsunuz?";
          }
        } else if (currentAgent.id === 'can') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Artırılmış gerçeklik çözümlerimiz:\n\n• Eğitim uygulamaları: 30.000-100.000 TL\n• Perakende deneyimi: 50.000-150.000 TL\n• Sanal try-on: 40.000-120.000 TL\n• Endüstriyel uygulamalar: 80.000-250.000 TL\n• AR SDK entegrasyonu: 20.000-60.000 TL\n\nSektörünüzü belirtirseniz özel fiyat verebilirim.";
          } else if (userInput.includes('kullanım') || userInput.includes('uygulama')) {
            botResponse = "AR kullanım alanlarımız:\n\n• Eğitim ve simulasyon\n• Perakende ve e-ticaret\n• Mimari görselleştirme\n• Sanayi ve bakım\n• Oyun ve eğlence\n\nHangi sektörde AR düşünüyorsunuz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "AR projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: can@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nHedef kitlenizi ve kullanım senaryonuzu anlatırsanız size özel demo hazırlayabilirim.";
          } else {
            botResponse = "Artırılmış gerçeklik çözümleri konusunda size nasıl yardımcı olabilirim? Hangi sektör için düşünüyorsunuz?";
          }
        } else if (currentAgent.id === 'berk') {
          if (userInput.includes('fiyat') || userInput.includes('ücret') || userInput.includes('maliyet')) {
            botResponse = "Blockchain çözümlerimiz:\n\n• Akıllı sözleşme geliştirme: 20.000-80.000 TL\n• Token oluşturma: 15.000-50.000 TL\n• DApp geliştirme: 50.000-200.000 TL\n• Kripto ödeme entegrasyonu: 10.000-30.000 TL\n• Blockchain danışmanlığı: 15.000-40.000 TL\n\nProjeyi detaylandırırsanız özel fiyat verebilirim.";
          } else if (userInput.includes('kullanım') || userInput.includes('uygulama')) {
            botResponse = "Blockchain kullanım alanlarımız:\n\n• Tedarik zinciri şeffaflığı\n• Dijital kimlik doğrulama\n• Akıllı sözleşmeler\n• NFT ve dijital varlıklar\n• Kripto ödeme sistemleri\n\nHangi uygulama alanını düşünüyorsunuz?";
          } else if (userInput.includes('iletişim') || userInput.includes('ulaş') || userInput.includes('görüş')) {
            botResponse = "Blockchain projeleriniz için bana ulaşabilirsiniz:\n\n• E-posta: berk@hmzsolutions.com\n• WhatsApp: +90 505 095 99 50\n\nTeknik gereksinimlerinizi ve hedeflerinizi anlatırsanız size özel çözüm önerisi sunabilirim.";
          } else {
            botResponse = "Blockchain teknolojileri konusunda size nasıl yardımcı olabilirim? Hangi uygulama alanını düşünüyorsunuz?";
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
        agentAvatar: currentAgent?.avatar
      }
      setMessages(prev => [...prev, botMessage])
    }, 2000)
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
                  
                  {/* Close button with Apple-style design */}
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