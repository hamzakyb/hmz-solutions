import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { requireAuth } from '@/lib/auth'

// Function to get client IP address
function getClientIP(request: NextRequest): string {
  // Check for common headers that might contain the IP
  const xForwardedFor = request.headers.get('x-forwarded-for')
  const xRealIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  const trueClientIP = request.headers.get('true-client-ip')
  
  // Return the first available IP or 'unknown'
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }
  
  if (cfConnectingIP) return cfConnectingIP
  if (xRealIP) return xRealIP
  if (trueClientIP) return trueClientIP
  
  // Fallback to remote address if available
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json()
    
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'İsim, email ve mesaj alanları zorunludur' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collection = db.collection('contact_messages')
    
    // Mesajı veritabanına kaydet
    const result = await collection.insertOne({
      name,
      email,
      company: company || '',
      message,
      createdAt: new Date(),
      status: 'new', // new, read, replied
      ip: getClientIP(request)
    })

    return NextResponse.json({
      success: true,
      messageId: result.insertedId,
      message: 'Mesajınız başarıyla gönderildi!'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/contact called')
    
    // JWT token kontrolü
    const admin = requireAuth(request)
    
    console.log('Admin user from token:', admin ? 'AUTHORIZED' : 'UNAUTHORIZED')
    
    if (!admin) {
      console.log('Unauthorized access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      const db = await getDatabase()
      console.log('Database connection established')
      
      const collection = db.collection('contact_messages')
      console.log('Collection accessed')
      
      const messages = await collection
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray()
      
      console.log('Messages found:', messages.length)
      return NextResponse.json({ messages })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı bağlantı hatası: ' + (dbError as Error).message },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Mesajlar getirilirken hata oluştu: ' + (error as Error).message },
      { status: 500 }
    )
  }
}