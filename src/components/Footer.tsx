'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const [data, setData] = useState({
    footerDescription: 'Yenilikçi vizyon, profesyonel uygulama. Dijital dünyada ölçülebilir başarı hedefleyen markalar için güvenilir teknoloji ortağı.',
    socialLinks: {
      github: '#',
      linkedin: '#',
      instagram: '#'
    }
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/content?section=settings')
        const result = await response.json()
        if (result.content?.data) {
          setData(result.content.data)
        }
      } catch (error) {
        console.error('Failed to fetch footer settings:', error)
      }
    }
    fetchSettings()
  }, [])

  const footerLinks = {
    navigasyon: [
      { label: 'Ana Sayfa', href: '#home' },
      { label: 'Hizmetler', href: '#services' },
      { label: 'Hakkımızda', href: '#about' },
      { label: 'İletişim', href: '#contact' },
    ],
    cozumler: [
      { label: 'Web Geliştirme', href: '#services' },
      { label: 'Mobil Uygulamalar', href: '#services' },
      { label: 'Özel Yazılım', href: '#services' },
      { label: 'AI Entegrasyonu', href: '#services' },
    ],
    yasal: [
      { label: 'Gizlilik Politikası', href: '#' },
      { label: 'Hizmet Şartları', href: '#' },
      { label: 'Çerezler', href: '#' },
    ]
  }

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Subtle Abstract Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 uppercase border-b border-white/10 pb-24">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 grayscale opacity-90">
                <Image
                  src="/logo.png"
                  alt="HMZ Solutions"
                  fill
                  className="object-contain invert" // white logo
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-2xl font-bold tracking-tight">HMZ SOLUTIONS</span>
            </div>
            <p className="text-gray-400 font-light leading-relaxed max-w-md">
              {data.footerDescription}
            </p>
          </div>

          {/* Navigation - Editorial Style Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-8">Navigasyon</h4>
              <ul className="space-y-4">
                {footerLinks.navigasyon.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 font-light">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-8">Çözümler</h4>
              <ul className="space-y-4">
                {footerLinks.cozumler.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 font-light">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-8">İletişimde Kalın</h4>
              <div className="flex space-x-4">
                {/* Minimal Social Icons */}
                <a href={data.socialLinks.linkedin} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href={data.socialLinks.instagram} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light tracking-wide uppercase">
          <p>© {currentYear} HMZ Solutions. Tüm hakları saklıdır.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            {footerLinks.yasal.map((link, i) => (
              <a key={i} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer