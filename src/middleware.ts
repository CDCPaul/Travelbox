import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('🔍 Middleware checking:', pathname)

  if (pathname.startsWith('/auth') || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('session')?.value
    const cookieHeader = request.headers.get('cookie') || ''
    console.log('🔍 Cookie header:', cookieHeader.substring(0, 200) + '...')
    console.log('🔍 Session cookie exists:', !!sessionCookie)
    console.log('🔍 Session cookie length:', sessionCookie?.length || 0)
    
    if (!sessionCookie) {
      console.log('❌ No session cookie, redirecting to login')
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
    
    // Basic JWT validation (check if it's a valid JWT structure)
    try {
      const parts = sessionCookie.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT structure')
      }
      
      // Base64URL decode function
      const base64UrlDecode = (str: string) => {
        // Convert Base64URL to Base64
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        // Add padding if needed
        const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
        return atob(padded)
      }
      
      // Decode payload to check expiration
      const payload = JSON.parse(base64UrlDecode(parts[1]))
      const now = Math.floor(Date.now() / 1000)
      
      console.log('🔍 Token payload:', { exp: payload.exp, now, user: payload.email })
      
      if (payload.exp && payload.exp < now) {
        console.log('❌ Session expired, redirecting to login')
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        url.searchParams.set('next', pathname)
        return NextResponse.redirect(url)
      }
      
      console.log('✅ Session valid for user:', payload.email)
    } catch (e) {
      console.log('❌ Session validation failed:', e)
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
