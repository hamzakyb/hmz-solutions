'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'dark'
  className?: string
}

const Logo = ({ size = 'md', variant = 'white', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-16 sm:h-16',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  }

  const logoSrc = variant === 'white' ? '/logo-white.png' : '/logo.png'

  return (
    <img 
      src={logoSrc}
      alt="HMZ Solutions Logo" 
      className={cn(
        'object-contain transition-all duration-300',
        sizeClasses[size],
        variant === 'white' && 'filter brightness-0 invert',
        className
      )}
      onError={(e) => {
        // Fallback to letter H if logo image fails to load
        const target = e.currentTarget
        target.style.display = 'none'
        const fallback = target.nextElementSibling as HTMLElement
        if (fallback) fallback.style.display = 'block'
      }}
    />
  )
}

export default Logo