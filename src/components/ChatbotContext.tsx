'use client'

import { createContext, useContext, useState } from 'react'

type ChatbotContextType = {
  isChatOpen: boolean
  setIsChatOpen: (isOpen: boolean) => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <ChatbotContext.Provider value={{ isChatOpen, setIsChatOpen }}>
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbot() {
  const context = useContext(ChatbotContext)
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider')
  }
  return context
}