'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/Button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
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

  const navItems = [
    { label: 'Ana Sayfa', href: '#home', id: 'home' },
    { label: 'Hizmetler', href: '#services', id: 'services' },
    { label: 'Hakkımızda', href: '#about', id: 'about' },
    { label: 'İletişim', href: '#contact', id: 'contact' },
  ]

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id)
    setIsMobileMenuOpen(false)
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
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
            ? 'bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl' 
            : 'bg-white/5 backdrop-blur-xl border border-white/20'
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
              <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden p-1.5 sm:p-2">
                    {/* Logo with better sizing and padding */}
                    <img 
                      src="/logo.png" 
                      alt="HMZ Solutions Logo" 
                      className="w-full h-full object-contain max-w-none"
                      onError={(e) => {
                        // Fallback to letter H if logo image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                    <span className="text-white font-semibold text-sm sm:text-lg tracking-tight hidden">
                      H
                    </span>
                  </div>
                </div>
                <span className={cn(
                  "text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 truncate",
                  isScrolled ? "text-white" : "text-white"
                )}>
                  <span className="hidden sm:inline">HMZ Solutions</span>
                  <span className="sm:hidden">HMZ</span>
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
                        handleNavClick(item.href, item.id)
                      }}
                      className={cn(
                        "relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                        isActive 
                          ? "text-white" 
                          : isScrolled 
                            ? "text-white/70 hover:text-white" 
                            : "text-white/70 hover:text-white"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <Button 
                  size="sm"
                  className="relative bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium px-4 xl:px-6 py-2 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300 text-sm"
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
                  "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
                )}
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
                      <X className="block h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="block h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
            <div className="bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-3 sm:space-y-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href, item.id)
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 cursor-pointer",
                        isActive
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </motion.a>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-4 border-t border-white/10"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300"
                    size="sm"
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