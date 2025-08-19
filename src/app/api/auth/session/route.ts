import { NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  console.log('🔍 Session API called')
  
  const { action, idToken } = await request.json().catch(() => ({ action: 'set' }))
  const res = NextResponse.json({ ok: true })

  if (action === 'clear') {
    console.log('🔍 Clearing session')
    const response = NextResponse.json({ ok: true })
    response.headers.set('Set-Cookie', '__session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax')
    return response
  }

  // 세션 갱신은 클라이언트에서 새로운 ID 토큰으로 처리하므로 refresh 액션 제거

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
    const cookieValue = `__session=${sessionCookie}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`
    
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

// GET: 현재 세션 상태 확인
export async function GET(request: Request) {
  console.log('🔍 Checking session status')
  
  try {
    const sessionCookie = request.headers.get('cookie')?.match(/__session=([^;]+)/)?.[1]
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false, error: 'NO_SESSION' }, { status: 401 })
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie)
    const now = Math.floor(Date.now() / 1000)
    const timeToExpiry = decodedClaims.exp - now
    
    console.log('✅ Session valid for user:', decodedClaims.email, 'expires in:', timeToExpiry, 'seconds')

    return NextResponse.json({ 
      authenticated: true, 
      user: { 
        email: decodedClaims.email, 
        uid: decodedClaims.uid,
        exp: decodedClaims.exp,
        timeToExpiry: timeToExpiry
      } 
    })
  } catch (e: any) {
    console.error('❌ Session check error:', e?.message || e)
    return NextResponse.json({ authenticated: false, error: 'INVALID_SESSION' }, { status: 401 })
  }
}
