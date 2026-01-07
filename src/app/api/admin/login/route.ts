import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Environment'dan admin bilgilerini al
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const jwtSecret = process.env.JWT_SECRET
    
    if (!adminEmail || !adminPassword || !jwtSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Basit admin kontrolü (daha sonra database'den alınabilir)
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      )
    }

    // JWT token oluştur
    const token = jwt.sign(
      { 
        email: adminEmail,
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 saat
      },
      jwtSecret
    )

    return NextResponse.json({
      success: true,
      token,
      admin: {
        email: adminEmail,
        role: 'admin'
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login işlemi sırasında hata oluştu' },
      { status: 500 }
    )
  }
}