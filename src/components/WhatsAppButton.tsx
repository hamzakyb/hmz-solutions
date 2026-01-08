import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatbot } from '@/context/ChatbotContext'

const WhatsAppButton = () => {
  const { isChatOpen } = useChatbot()
  const [settings, setSettings] = useState({
    whatsapp: {
      phoneNumber: '905050959950',
      welcomeMessage: 'Merhaba! HMZ Solutions hizmetleri hakkında bilgi almak istiyorum.'
    }
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/content?section=settings')
        const result = await response.json()
        if (result.content?.data?.whatsapp) {
          setSettings(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch whatsapp settings:', error)
      }
    }
    fetchSettings()
  }, [])

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(settings.whatsapp.welcomeMessage)
    const whatsappUrl = `https://wa.me/${settings.whatsapp.phoneNumber.replace(/\+/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <AnimatePresence>
      {!isChatOpen && (
        <motion.button
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={handleWhatsAppClick}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex items-center group cursor-pointer"
        >
          {/* The Tab/Pill */}
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border-r border-t border-b border-white/10 shadow-2xl rounded-r-2xl py-6 px-3 flex flex-col items-center gap-4 transition-all duration-300 group-hover:border-green-500/50 group-hover:bg-black">
            {/* Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white group-hover:text-green-500 transition-colors relative z-10"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
              </svg>
              {/* Status Dot */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>

            {/* Vertical Text */}
            <span className="text-xs text-white/80 font-medium tracking-[0.2em] uppercase writing-vertical-rl group-hover:text-white transition-colors">
              WhatsApp
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppButton