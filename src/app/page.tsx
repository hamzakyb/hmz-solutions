import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
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
  )
}
