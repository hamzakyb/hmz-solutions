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
    console.log('JWT_SECRET from env:', jwtSecret ? 'SET' : 'NOT SET')
    
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured')
      throw new Error('JWT_SECRET not configured')
    }

    const decoded = jwt.verify(token, jwtSecret) as AdminUser
    console.log('Token decoded successfully:', { email: decoded.email, role: decoded.role, exp: decoded.exp })
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  console.log('Authorization header:', authHeader ? 'PRESENT' : 'MISSING')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No valid authorization header found')
    return null
  }
  
  const token = authHeader.replace('Bearer ', '')
  console.log('Extracted token length:', token.length)
  return token
}

export function requireAuth(request: NextRequest): AdminUser | null {
  const token = getTokenFromRequest(request)
  console.log('Token extracted from request:', token ? 'FOUND' : 'NOT FOUND')
  
  if (!token) {
    console.log('No token found, returning null')
    return null
  }
  
  const verified = verifyToken(token)
  console.log('Token verification result:', verified ? 'SUCCESS' : 'FAILED')
  return verified
}