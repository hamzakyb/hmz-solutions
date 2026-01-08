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
const knowledgeBase = {
  greetings: {
    keywords: ['merhaba', 'selam', 'hey', 'günaydın', 'iyi günler', 'sa', 'slm'],
    responses: [
      "Merhaba! HMZ Solutions'a hoş geldiniz. Size nasıl yardımcı olabilirim?",
      "Selamlar! Dijital dönüşüm yolculuğunuzda size nasıl destek olabilirim?",
      "Merhaba, ben dijital asistanınız. Projeniz hakkında konuşmaya hazır mısınız?"
    ]
  },
  services: {
    keywords: ['hizmet', 'neler yapıyorsunuz', 'servis', 'yazılım', 'web', 'mobil', 'seo', 'tasarım', 'neler var'],
    response: "HMZ Solutions olarak uçtan uca dijital hizmetler sunuyoruz:\n\n1. **Web Geliştirme:** Modern, hızlı ve SEO uyumlu kurumsal web siteleri.\n2. **Mobil Uygulama:** iOS ve Android için native performanslı uygulamalar.\n3. **Özel Yazılım:** İş süreçlerinizi optimize eden size özel yazılım çözümleri.\n4. **E-Ticaret:** Global ölçekte satış yapmanızı sağlayan güvenli altyapılar.\n5. **SEO & Dijital Pazarlama:** Markanızın görünürlüğünü artıran stratejik çalışmalar.\n\nHangi alanda desteğe ihtiyacınız var?"
  },
  contact: {
    keywords: ['iletişim', 'telefon', 'mail', 'adres', 'nerede', 'ulaşım', 'konum', 'ofis'],
    response: "Bize dilediğiniz kanaldan ulaşabilirsiniz:\n\n📍 **Adres:** Güzelyurt Mah. Zübeyde Hanım Cad., Nevşehir/Merkez\n📧 **E-posta:** info@hmzsolutions.com\n📞 **Telefon:** +90 (505) 095 99 50\n\nAyrıca hemen sayfanın altındaki iletişim formunu doldurarak hızlıca teklif alabilirsiniz."
  },
  about: {
    keywords: ['hakkınızda', 'kimsiniz', 'biz kimiz', 'firma', 'şirket', 'ekip', 'hmz'],
    response: "HMZ Solutions, Nevşehir merkezli olup global vizyona sahip bir teknoloji şirketidir. İşletmelerin dijital dönüşüm süreçlerine liderlik ediyor, karmaşık iş problemlerini 'Sanat ve Teknoloji'yi birleştirerek çözüyoruz. Amacımız sadece bir web sitesi yapmak değil, markanız için sürdürülebilir bir dijital miras inşa etmektir."
  },
  pricing: {
    keywords: ['fiyat', 'ücret', 'kaç para', 'maliyet', 'teklif', 'ne kadar'],
    response: "Her projenin gereksinimleri ve ölçeği farklı olduğu için standart bir fiyatlandırmamız bulunmamaktadır. Size en uygun ve stratejik teklifi sunabilmemiz için projenizin detaylarını öğrenmek isteriz. Dilerseniz iletişim formunu doldurun, dilerseniz kısaca projenizden bahsedin, sizi hemen arayalım."
  },
  location: {
    keywords: ['nevşehir', 'kapadokya', 'yerel', 'bölge'],
    response: "Merkezimiz Nevşehir'de bulunmakla birlikte, Kapadokya'nın yaratıcı atmosferinden ilham alarak tüm Türkiye'ye ve global müşterilere hizmet veriyoruz. Dijital dünyada sınır tanımıyoruz."
  },
  tech: {
    keywords: ['teknoloji', 'react', 'next', 'node', 'yazılım dili', 'altyapı'],
    response: "Projelerimizde endüstri standardı olan en güncel teknolojileri kullanıyoruz: React, Next.js, Node.js, TypeScript, MongoDB ve Cloud altyapıları. Bu sayede projeleriniz her zaman hızlı, güvenli ve ölçeklenebilir olur."
  },
  default: {
    response: "Anladım. Bu konu hakkında daha detaylı bilgi verebilmem veya size özel bir çözüm sunabilmemiz için iletişim bilgilerinizi bırakabilir veya doğrudan **info@hmzsolutions.com** adresine yazabilirsiniz. Uzman ekibimiz konuyu inceleyip size dönüş yapacaktır."
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

    // 1. Check Greetings
    if (knowledgeBase.greetings.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.greetings.responses[Math.floor(Math.random() * knowledgeBase.greetings.responses.length)]
    }

    // 2. Check Services
    if (knowledgeBase.services.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.services.response
    }

    // 3. Check Contact
    if (knowledgeBase.contact.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.contact.response
    }

    // 4. Check About
    if (knowledgeBase.about.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.about.response
    }

    // 5. Check Pricing
    if (knowledgeBase.pricing.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.pricing.response
    }

    // 6. Check Location
    if (knowledgeBase.location.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.location.response
    }

    // 7. Check Tech
    if (knowledgeBase.tech.keywords.some(k => lowerInput.includes(k))) {
      return knowledgeBase.tech.response
    }

    // Default Fallback
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