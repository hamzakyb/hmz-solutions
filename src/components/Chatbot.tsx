'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  agentName?: string
  agentTitle?: string
  agentAvatar?: string
}

interface Agent {
  id: string
  name: string
  title: string
  avatar: string
  greeting: string
}

/* 
  KNOWLEDGE BASE SECTION
  Defines the intelligence of the chatbot based on site content.
*/
/* 
  KNOWLEDGE BASE SECTION
  Defines the intelligence of the chatbot based on site content.
  Expanded to cover comprehensive agency questions.
*/
const knowledgeBase = {
  greetings: {
    keywords: ['merhaba', 'selam', 'hey', 'günaydın', 'iyi günler', 'sa', 'slm', 'alo'],
    responses: [
      "Merhaba! HMZ Solutions'a hoş geldiniz. Size nasıl yardımcı olabilirim?",
      "Selamlar! Dijital dönüşüm yolculuğunuzda size nasıl destek olabilirim?",
      "Merhaba, ben kurumsal asistanınız. Projeniz hakkında konuşmaya hazır mısınız?"
    ]
  },
  process: {
    keywords: ['süreç', 'nasıl çalışıyorsunuz', 'aşamalar', 'nasıl başlarız', 'yöntem', 'adım adım', 'işleyiş'],
    response: "Çalışma sürecimiz 4 temel adımdan oluşur:\n\n1. **Analiz & Keşif:** İhtiyaçlarınızı ve hedeflerinizi dinler, stratejiyi belirleriz.\n2. **Tasarım & Prototip:** Kullanıcı deneyimini (UX) ve arayüzü (UI) tasarlar, onayınıza sunarız.\n3. **Geliştirme:** Onaylanan tasarımı en güncel teknolojilerle kodlarız.\n4. **Test & Yayın:** Tüm fonksiyonları test eder ve projeyi canlıya alırız."
  },
  timeline: {
    keywords: ['ne kadar sürer', 'kaç gün', 'zaman', 'teslim süresi', 'ne zaman biter', 'vakit'],
    response: "Proje süresi, kapsam ve özelliklere göre değişmektedir. Standart bir kurumsal web sitesi ortalama **2-4 hafta**, kapsamlı e-ticaret veya özel yazılım projeleri ise **6-12 hafta** sürebilir. Net bir takvim için proje detaylarını görüşmemiz gerekir."
  },
  pricing: {
    keywords: ['fiyat', 'ücret', 'kaç para', 'maliyet', 'teklif', 'ne kadar', 'bütçe', 'pahalı', 'ucuz'],
    response: "Fiyatlandırmamız 'paket' usulü değil, **proje bazlıdır**. İhtiyacınız olmayan özelliklere ödeme yapmanızı istemeyiz. Bütçenize ve hedeflerinize en uygun teklifi sunabilmemiz için projenizi kısaca anlatırsanız, size özel bir çalışma yapabiliriz."
  },
  maintenance: {
    keywords: ['destek', 'bakım', 'güncelleme', 'bozulursa', 'hata', 'garanti', 'sonrası', 'teknik destek'],
    response: "Proje tesliminden sonra sizi yalnız bırakmıyoruz. Tüm projelerimiz **1 yıl ücretsiz teknik destek ve bakım garantisi** altındadır. Ayrıca, uzun vadeli bakım anlaşmalarıyla sisteminizin her zaman güncel ve güvenli kalmasını sağlıyoruz."
  },
  ecommerce: {
    keywords: ['e-ticaret', 'satış', 'mağaza', 'ödeme', 'sanal pos', 'online satış', 'sepet'],
    response: "Global standartlarda e-ticaret çözümleri sunuyoruz:\n- Güvenli Ödeme Altyapıları (Iyzico, Stripe vb.)\n- Gelişmiş Stok ve Sipariş Yönetimi\n- Hızlı ve Mobil Uyumlu Arayüzler\n- Pazaryeri Entegrasyonları (Trendyol, Hepsiburada vb.)"
  },
  seo: {
    keywords: ['seo', 'google', 'arama motoru', 'birinci sayfa', 'görünürlük', 'reklam', 'hit'],
    response: "Sadece 'güzel' değil, 'bulunabilir' siteler yapıyoruz. Tüm projelerimiz teknik SEO (Hız, Mobil Uyum, Schema Yapısı) standartlarına uygun geliştirilir. Ayrıca içerik stratejisi ve backlink çalışmalarıyla Google sıralamanızı yükseltecek özel SEO danışmanlığı da veriyoruz."
  },
  mobile: {
    keywords: ['mobil', 'app', 'uygulama', 'ios', 'android', 'telefon'],
    response: "Mobil dünyada var olmanız için Native (Swift/Kotlin) veya Cross-Platform (React Native/Flutter) teknolojileriyle yüksek performanslı iOS ve Android uygulamalar geliştiriyoruz."
  },
  technologies: {
    keywords: ['teknoloji', 'hangi dil', 'altyapı', 'react', 'next', 'node', 'php', 'wordpress', 'yazılım dili'],
    response: "Projenin doğasına göre en doğru teknolojiyi seçiyoruz. Genellikle yüksek performans ve güvenlik için **React, Next.js, Node.js ve cloud altyapılarını** tercih ediyoruz. Ancak içerik odaklı basit projeler için modern Headless CMS çözümleri de kullanıyoruz."
  },
  wordpress_vs_custom: {
    keywords: ['wordpress', 'hazır', 'özel yazılım', 'fark', 'neden özel'],
    response: "WordPress hızlı bir başlangıç için iyidir ancak **Özel Yazılım (Custom Development)** size sınırsız özgürlük, yüksek güvenlik ve maksimum performans sağlar. İşletmeniz büyüdükçe WordPress hantallaşabilir, özel yazılım ise sizinle birlikte ölçeklenir."
  },
  contact: {
    keywords: ['iletişim', 'telefon', 'mail', 'adres', 'nerede', 'ulaşım', 'konum', 'ofis', 'yeriniz'],
    response: "Nevşehir merkez ofisimize kahveye bekleriz! ☕\n\n📍 **Adres:** Bekdik, Millet Cd. No:38, 50040 Nevşehir Merkez/Nevşehir\n📞 **Tel:** +90 (505) 095 99 50\n📧 **Mail:** info@hmzsolutions.com"
  },
  meeting: {
    keywords: ['toplantı', 'görüşme', 'randevu', 'yüz yüze', 'ziyaret', 'zoom', 'online'],
    response: "Memnuniyetle! İster Nevşehir'deki ofisimizde yüz yüze, ister Zoom/Google Meet üzerinden online bir toplantı planlayabiliriz. Size uygun zamanı belirtmeniz yeterli."
  },
  references: {
    keywords: ['referans', 'örnek', 'kimlerle', 'portföy', 'yaptığınız işler', 'müşteri'],
    response: "Bugüne kadar birçok farklı sektörden (Turizm, E-ticaret, Sağlık, Kurumsal) markayla çalıştık. Gizlilik sözleşmeleri gereği bazılarını burada paylaşamasak da, 'Projeler' sayfamızdan seçkileri inceleyebilir veya size özel sunum talep edebilirsiniz."
  },
  career: {
    keywords: ['iş', 'staj', 'kariyer', 'başvuru', 'çalışma', 'ilan', 'personel'],
    response: "HMZ Solutions ailesini büyütmekten heyecan duyarız. Güncel açık pozisyonlar ve staj imkanları için CV'nizi ve portfolyonuzu **kariyer@hmzsolutions.com** adresine gönderebilirsiniz."
  },
  about: {
    keywords: ['hakkınızda', 'kimsiniz', 'biz kimiz', 'firma', 'şirket', 'vizyon', 'misyon', 'hmz'],
    response: "HMZ Solutions, teknolojiyi sanatla birleştiren yeni nesil bir dijital ajanstaır. Nevşehir'den dünyaya açılan vizyonumuzla, markalar için sadece yazılım değil, 'dijital miras' üretiyoruz."
  },
  default: {
    response: "Bu konuyu detaylandırmak için bir insan uzmanımızın devreye girmesi daha sağlıklı olur. 👇\n\nLütfen iletişim bilgilerinizi bırakın veya **info@hmzsolutions.com** adresine yazın. Sizinle hemen iletişime geçelim."
  }
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)

  // World-Class Corporate Identity
  const agents: { [key: string]: Agent } = {
    default: {
      id: 'hmz',
      name: 'HMZ Solutions',
      title: 'Digital Concierge',
      avatar: '', // No personal avatar
      greeting: 'HMZ Solutions Digital Concierge servisine hoş geldiniz. İşletmenizin dijital altyapısını global ölçekte nasıl güçlendirebileceğimizi konuşmak için buradayım.'
    }
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Default Agent
    if (!currentAgent) {
      setCurrentAgent(agents.default)
      setMessages([{
        id: 'init',
        text: agents.default.greeting,
        isBot: true,
        timestamp: new Date(),
        agentName: agents.default.name,
        agentTitle: agents.default.title,
        agentAvatar: agents.default.avatar
      }])
    }
  }, [currentAgent])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // 1. Check Greetings first (Specific logic for arrays)
    if (knowledgeBase.greetings.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.greetings.responses[Math.floor(Math.random() * knowledgeBase.greetings.responses.length)]
    }

    // 2. Dynamic Check for all other categories
    // We iterate through keys to find the first matching category
    for (const [key, category] of Object.entries(knowledgeBase)) {
      if (key === 'greetings' || key === 'default') continue;

      // Type guard to access properties safely
      const cat = category as { keywords: string[], response: string };

      if (cat.keywords.some(k => lowerInput.includes(k))) {
        return cat.response;
      }
    }

    // 3. Default Fallback
    return knowledgeBase.default.response
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputText.trim()) return

    const userText = inputText
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Analyze intent and generate response
    const responseText = generateResponse(userText)

    // Calculate realistic typing delay based on response length (min 1s, max 3s)
    const typingDelay = Math.min(Math.max(responseText.length * 20, 1000), 3000)

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isBot: true,
        timestamp: new Date(),
        agentName: currentAgent?.name,
        agentTitle: currentAgent?.title,
        agentAvatar: currentAgent?.avatar
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, typingDelay)
  }

  return (
    <>
      {/* 
        PREMIUM TRIGGER 
        Position: Vertically centered on the Right Edge.
        Shape: Rounded Rectangle (Pill/Tab).
      */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center group cursor-pointer"
          >
            {/* The Tab/Pill */}
            <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border-l border-t border-b border-white/10 shadow-2xl rounded-l-2xl py-6 px-3 flex flex-col items-center gap-4 transition-all duration-300 group-hover:border-[#AF9C64]/50 group-hover:bg-black">
              {/* Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#AF9C64] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-white group-hover:text-[#AF9C64] transition-colors relative z-10" />
                {/* Status Dot */}
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#AF9C64] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#AF9C64]"></span>
                </span>
              </div>

              {/* Vertical Text */}
              <span className="text-xs text-white/80 font-medium tracking-[0.2em] uppercase writing-vertical-rl group-hover:text-white transition-colors">
                İletişim
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 
        PREMIUM CHAT WINDOW 
        Style: Glassmorphic Dark Mode, "Concierge" feel.
      */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
            />

            <motion.div
              initial={{ x: "100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 sm:top-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] sm:max-h-[700px] sm:rounded-3xl bg-[#0a0a0a] border-l sm:border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header: Corporate Brand */}
              <div className="relative p-6 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Modern Brand Icon */}
                  <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-[#AF9C64] opacity-0 group-hover:opacity-20 transition-opacity" />
                    <SparklesIcon className="w-6 h-6 text-[#AF9C64]" />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white tracking-wide">HMZ Solutions</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-[#AF9C64] text-[10px] uppercase tracking-widest font-bold">Kurumsal Asistan</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-black to-[#0a0a0a]">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] ${msg.isBot ? 'mr-auto' : 'ml-auto'}`}>
                      {msg.isBot && msg.agentName && (
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 block ml-1">
                          {msg.agentName}
                        </span>
                      )}
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.isBot
                        ? 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                        : 'bg-[#AF9C64] text-black font-medium rounded-tr-none'
                        }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-600 mt-2 block w-full text-right px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="mr-auto">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <CpuChipIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Kurumsal bir mesaj yazın..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#AF9C64]/50 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#AF9C64] text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C5B37F] transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p className="text-[10px] text-gray-600">
                    HMZ Solutions © 2026 • AI Supported Concierge
                  </p>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot