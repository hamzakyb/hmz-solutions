import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AdminUser {
  email: string
  role: string
  exp: number
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not configured')
    }

    const decoded = jwt.verify(token, jwtSecret) as AdminUser
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  return authHeader.replace('Bearer ', '')
}

export function requireAuth(request: NextRequest): AdminUser | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  
  return verifyToken(token)
}