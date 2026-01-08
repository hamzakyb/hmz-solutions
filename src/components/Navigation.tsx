'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/Button'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface NavItem {
  label: string
  href: string
  id: string
  external?: boolean
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [settings, setSettings] = useState({
    navigation: {
      logoText: 'HMZ Solutions',
      logoImage: '/logo.png'
    }
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/content?section=settings')
        const result = await response.json()
        if (result.content?.data?.navigation) {
          setSettings(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch navigation settings:', error)
      }
    }
    fetchSettings()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ['home', 'services', 'about', 'contact']
      const sectionElements = sections.map(id => document.getElementById(id))
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= window.scrollY + 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { label: 'Ana Sayfa', href: '/', id: 'home', external: true },
    { label: 'Hizmetler', href: '/#services', id: 'services' },
    { label: 'Hakkımızda', href: '/#about', id: 'about' },
    { label: 'Blog', href: '/blog', id: 'blog', external: true },
    { label: 'İletişim', href: '/#contact', id: 'contact' },
  ]

  const handleNavClick = (href: string, id: string, external?: boolean) => {
    setActiveSection(id)
    setIsMobileMenuOpen(false)
    if (external || href.startsWith('/') && !href.startsWith('/#')) {
      if (typeof window !== 'undefined') window.location.href = href
      return
    }
    const element = document.getElementById(href.replace('/#', ''))
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled ? 'py-4 bg-black/50 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('/', 'home', true)}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10 opacity-90 transition-opacity group-hover:opacity-100">
                <Image
                  src={settings.navigation.logoImage}
                  alt="HMZ"
                  fill
                  className="object-contain invert"
                  priority
                />
              </div>
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent transform origin-left transition-transform duration-300">
                {settings.navigation.logoText}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href, item.id, item.external) }}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 relative group",
                    activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {item.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-px bg-white transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                    activeSection === item.id && "scale-x-100"
                  )} />
                </a>
              ))}
              <Button
                size="sm"
                onClick={() => handleNavClick('/#contact', 'contact')}
                className="bg-white text-black hover:bg-gray-200 border-none rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Teklif Al
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col space-y-8 text-center"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href, item.id, item.external) }}
                  className="text-2xl font-light text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-8">
                <Button
                  onClick={() => handleNavClick('/#contact', 'contact')}
                  className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
                >
                  Teklif Al
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation