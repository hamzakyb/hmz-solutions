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

export async function GET() {
  try {
    console.log('GET /api/settings called')
    
    try {
      const db = await getDatabase()
      console.log('Database connection established for settings')
      
      const collection = db.collection<SiteSettings>('site_settings')
      console.log('Settings collection accessed')
      
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
    } catch (dbError) {
      console.error('Database error in settings API:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı bağlantı hatası: ' + (dbError as Error).message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Settings fetch error:', error)
    return NextResponse.json(
      { error: 'Ayarlar getirilirken hata oluştu: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/settings called')
    
    // JWT token kontrolü
    const admin = requireAuth(request)
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await request.json()

    try {
      const db = await getDatabase()
      console.log('Database connection established for settings update')
      
      const collection = db.collection<SiteSettings>('site_settings')
      console.log('Settings collection accessed for update')
      
      // Global settings'i upsert et
      await collection.replaceOne(
        { _id: 'global' },
        {
          _id: 'global',
          ...settings
        },
        { upsert: true }
      )

      return NextResponse.json({
        success: true,
        message: 'Site ayarları başarıyla güncellendi!'
      })
    } catch (dbError) {
      console.error('Database error in settings update:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı bağlantı hatası: ' + (dbError as Error).message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Ayarlar güncellenirken hata oluştu: ' + (error as Error).message },
      { status: 500 }
    )
  }
}