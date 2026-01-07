'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import { ChatbotProvider } from '@/context/ChatbotContext'
import dynamic from 'next/dynamic'

// Lazy load heavy components for better performance
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px]" />
})

const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => null
})

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), {
  ssr: false,
  loading: () => null
})

export default function Home() {
  return (
    <ChatbotProvider>
      <main className="min-h-screen bg-black">
        <Navigation />
        <Hero />
        <Services />
        <About />
        <Contact />
        <Footer />
        <Chatbot />
        <WhatsAppButton />
      </main>
    </ChatbotProvider>
  )
}