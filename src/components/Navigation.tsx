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
      logoText: 'HMZ Solutions'
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
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'contact']
      const sectionElements = sections.map(id => document.getElementById(id))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition + 100) {
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

    if (external || href.startsWith('/')) {
      // Handle external links and route changes
      if (typeof window !== 'undefined') {
        window.location.href = href
      }
      return
    }

    // Handle anchor links on the same page
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '')
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // If element not found, navigate to homepage with hash
        if (typeof window !== 'undefined') {
          window.location.href = `/${href}`
        }
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed top-4 left-4 right-4 z-50 transition-all duration-700 ease-out',
          'max-w-7xl mx-auto rounded-2xl',
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl border border-gray-300 shadow-2xl shadow-gray-400/10'
            : 'bg-white/80 backdrop-blur-xl border border-gray-200'
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Premium Logo */}
            <motion.div
              className="flex-shrink-0 min-w-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer" onClick={() => handleNavClick('/', 'home', true)}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                    }}
                  />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden p-1.5 sm:p-2">
                    {/* Logo with better sizing and padding */}
                    <Image
                      src="/logo.png"
                      alt="HMZ Solutions Logo"
                      fill
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to letter H if logo image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                    <span className="text-gray-800 font-semibold text-sm sm:text-lg tracking-tight hidden">
                      H
                    </span>
                  </div>
                </div>
                <span className={cn(
                  "text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 truncate",
                  isScrolled ? "text-gray-900" : "text-gray-800"
                )}>
                  <span className="hidden sm:inline">{settings.navigation.logoText}</span>
                  <span className="sm:hidden">{settings.navigation.logoText.split(' ')[0]}</span>
                </span>
              </div>
            </motion.div>

            {/* Premium Navigation Menu */}
            <div className="hidden lg:block flex-1">
              <div className="flex items-center justify-center space-x-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href, item.id, item.external)
                      }}
                      className={cn(
                        "relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                        isActive
                          ? "text-gray-900"
                          : isScrolled
                            ? "text-gray-700 hover:text-gray-900"
                            : "text-gray-600 hover:text-gray-800"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 backdrop-blur-xl rounded-full border"
                          style={{
                            background: 'rgba(175, 160, 98, 0.1)',
                            borderColor: 'rgba(175, 160, 98, 0.2)'
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30
                          }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Premium CTA Button */}
            <div className="hidden lg:block flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => handleNavClick('/#contact', 'contact')}
                  className="relative backdrop-blur-xl border text-white font-medium px-4 xl:px-6 py-2 rounded-full shadow-lg transition-all duration-300 text-sm cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)',
                    borderColor: 'rgba(175, 160, 98, 0.25)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgb(195, 180, 118) 0%, rgb(175, 160, 98) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.25)'
                  }}
                >
                  <span className="hidden xl:inline">Teklif Al</span>
                  <span className="xl:hidden">Teklif</span>
                </Button>
              </motion.div>
            </div>

            {/* Premium Mobile Menu Button */}
            <div className="lg:hidden flex-shrink-0">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "inline-flex items-center justify-center p-2 rounded-full transition-all duration-300",
                  "bg-white/90 backdrop-blur-xl border hover:bg-white/95"
                )}
                style={{
                  borderColor: 'rgba(175, 160, 98, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(175, 160, 98, 0.2)'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XMarkIcon className="block h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bars3Icon className="block h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 left-4 right-4 z-40 max-w-md mx-auto lg:hidden"
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border shadow-2xl overflow-hidden"
              style={{
                borderColor: 'rgba(175, 160, 98, 0.2)'
              }}
            >
              <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-3 sm:space-y-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href, item.id, item.external)
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 cursor-pointer",
                        isActive
                          ? "text-gray-800 border"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                      style={{
                        background: isActive ? 'rgba(175, 160, 98, 0.15)' : undefined,
                        borderColor: isActive ? 'rgba(175, 160, 98, 0.25)' : undefined
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(175, 160, 98, 0.05)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      {item.label}
                    </motion.a>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-4 border-t border-gray-200"
                >
                  <Button
                    className="w-full text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgb(175, 160, 98) 0%, rgb(195, 180, 118) 100%)'
                    }}
                    size="sm"
                    onClick={() => handleNavClick('/#contact', 'contact')}
                  >
                    Teklif Al
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop blur overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation