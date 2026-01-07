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
  const [isOpen, setIsOpen] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)
  
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
    }
  }
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
  }, [agents.default, currentAgent])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
            
            {/* Button */}
            <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              
              {/* Notification badge */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
              >
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full" 
                />
              </motion.div>
              
              {/* Floating message preview */}
              <motion.div
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [-100, -10, -10, -100],
                  scale: [0.8, 1, 1, 0.8]
                }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.3, 0.7, 1],
                  repeat: Infinity,
                  repeatDelay: 8
                }}
                className="absolute right-20 top-0 bg-white rounded-lg shadow-xl p-3 border border-gray-200 max-w-48"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-700" />
                  <span className="text-xs font-medium text-gray-800">HMZ Solutions</span>
                </div>
                <p className="text-xs text-gray-600">Merhaba! Size nasıl yardımcı olabilirim? 🚀</p>
                
                {/* Chat bubble tail */}
                <div className="absolute right-0 top-4 transform translate-x-1">
                  <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45" />
                </div>
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Will be rendered as a simple version due to complexity */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                    <Image 
                      src={currentAgent?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80'} 
                      alt={`${currentAgent?.name} - HMZ Solutions Uzmanı`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full">
                    <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold">{currentAgent?.name || 'Uzman'}</h3>
                  <p className="text-yellow-100 text-xs flex items-center">
                    <span className="w-2 h-2 rounded-full mr-1 animate-pulse bg-green-400" />
                    Şu anda çevrimiçi • {currentAgent?.title || 'Dijital Çözüm Uzmanı'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      message.isBot ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 border-2 border-white' : 'bg-gray-600'
                    }`}>
                      {message.isBot ? (
                        <SparklesIcon className="w-4 h-4 text-white" />
                      ) : (
                        <UserIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.isBot ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-yellow-100'}`}>
                        {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`${currentAgent?.name || 'Uzman'}a sorunuzu yazın...`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600/50 text-sm text-gray-900 placeholder:text-gray-500 bg-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center text-white hover:from-yellow-700 hover:to-yellow-800 transition-all"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot