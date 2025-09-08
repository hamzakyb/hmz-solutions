import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth'

// Define the settings interface
interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    instagram: string;
    facebook: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  analytics?: {
    googleAnalyticsId: string;
    facebookPixelId: string;
  };
  maintenance?: {
    enabled: boolean;
    message: string;
  };
  updatedAt?: Date;
  updatedBy?: string;
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const collection = db.collection<SiteSettings>('site_settings')
    
    const settings = await collection.findOne({ _id: 'global' })

    // Default settings if none exist
    const defaultSettings: SiteSettings = {
      _id: 'global',
      siteName: 'HMZ Solutions',
      siteDescription: 'Premium Digital Solutions & Consultation Services',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      socialLinks: {
        twitter: '',
        linkedin: '',
        instagram: '',
        facebook: ''
      },
      contactInfo: {
        email: 'info@hmzsolutions.com',
        phone: '+90 (555) 123-4567',
        address: 'İstanbul, Türkiye'
      },
      seo: {
        metaTitle: 'HMZ Solutions - Premium Digital Solutions',
        metaDescription: 'Professional web development, digital marketing, and technology consultation services.',
        keywords: 'web development, digital marketing, technology consultation'
      }
    }

    return NextResponse.json({ 
      settings: settings || defaultSettings
    })

  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { error: 'Ayarlar getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // JWT token kontrolü
    const admin = requireAuth(request)
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settingsData = await request.json()

    const db = await getDatabase()
    const collection = db.collection<SiteSettings>('site_settings')
    
    // Global settings'i upsert et
    const result = await collection.replaceOne(
      { _id: 'global' },
      {
        _id: 'global',
        ...settingsData,
        updatedAt: new Date(),
        updatedBy: admin.email
      },
      { upsert: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Site ayarları başarıyla güncellendi!'
    })

  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Ayarlar güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}