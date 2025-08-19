import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  console.log('🔍 Session API called')
  
  const { action, idToken } = await request.json().catch(() => ({ action: 'set' }))
  const res = NextResponse.json({ ok: true })

  if (action === 'clear') {
    console.log('🔍 Clearing session')
    const response = NextResponse.json({ ok: true })
    response.headers.set('Set-Cookie', 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax')
    return response
  }

  try {
    console.log('🔍 Verifying ID token...')
    if (!idToken) throw new Error('Missing idToken')
    
    const decoded = await adminAuth.verifyIdToken(idToken)
    console.log('✅ ID token verified for user:', decoded.email)
    
    console.log('🔍 Creating session cookie...')
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
    console.log('✅ Session cookie created')
    
    const secure = process.env.NODE_ENV === 'production'
    const maxAge = Math.floor(expiresIn / 1000)
    const host = request.headers.get('host') || 'localhost'
    
    console.log('🔍 Setting cookie with secure:', secure, 'host:', host)
    
    // Set cookie using Set-Cookie header directly for better control
    const cookieValue = `session=${sessionCookie}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`
    
    console.log('🔍 Cookie header:', cookieValue.substring(0, 100) + '...')
    
    const response = NextResponse.json({ ok: true })
    response.headers.set('Set-Cookie', cookieValue)
    
    console.log('✅ Session cookie set with direct header')
    return response
  } catch (e: any) {
    console.error('❌ Session API error:', e?.message || e)
    return NextResponse.json({ ok: false, error: e?.message || 'INVALID_TOKEN' }, { status: 401 })
  }
}
