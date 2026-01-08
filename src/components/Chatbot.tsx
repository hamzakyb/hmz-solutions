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

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null)

  // World-Class Corporate Agents
  const agents: { [key: string]: Agent } = {
    default: {
      id: 'hamza',
      name: 'Hamza',
      title: 'Senior Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
      greeting: 'HMZ Solutions Digital Concierge servisine hoş geldiniz. İşletmenizin dijital altyapısını global ölçekte nasıl güçlendirebileceğimizi konuşmak için buradayım.'
    }
  }

  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
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
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputText.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')

    // Simulate Corporate AI Response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Mesajınız iletildi. Projenizin detaylarını analiz ederek size en stratejik yol haritasını sunmak üzere, uzman ekibimiz en kısa sürede dönüş sağlayacaktır.",
        isBot: true,
        timestamp: new Date(),
        agentName: currentAgent?.name,
        agentTitle: currentAgent?.title,
        agentAvatar: currentAgent?.avatar
      }
      setMessages(prev => [...prev, botMsg])
    }, 1500)
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
              {/* Header: Executive Profile */}
              <div className="relative p-6 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-[#AF9C64] rounded-full blur-md opacity-20" />
                    <Image
                      src={currentAgent?.avatar || ''}
                      alt="Agent"
                      width={64}
                      height={64}
                      className="rounded-full object-cover border border-white/20 relative z-10"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full z-20" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white tracking-wide">{currentAgent?.name}</h3>
                    <p className="text-[#AF9C64] text-xs uppercase tracking-widest font-medium">{currentAgent?.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-gray-500 text-xs">Çevrimiçi</span>
                    </div>
                  </div>
                </div>
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