import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname.startsWith('/auth') || pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    // Next.js 쿠키 파서와 원시 헤더 모두 확인
    const sessionCookie = request.cookies.get('__session')?.value
    const rawCookieHeader = request.headers.get('cookie') || ''
    
    // 원시 쿠키 헤더에서 __session 쿠키 직접 추출
    const sessionMatch = rawCookieHeader.match(/__session=([^;]+)/)
    const rawSessionCookie = sessionMatch ? sessionMatch[1] : null
    
    // 디버그 정보를 담을 응답 생성
    const response = NextResponse.next()
    response.headers.set('x-debug-middleware', 'active')
    response.headers.set('x-debug-nextjs-cookie', String(!!sessionCookie))
    response.headers.set('x-debug-raw-cookie', String(!!rawSessionCookie))
    response.headers.set('x-debug-cookie-length', String(sessionCookie?.length || rawSessionCookie?.length || 0))
    response.headers.set('x-debug-raw-header-length', String(rawCookieHeader.length))
    
    // 실제 사용할 세션 쿠키 (원시에서 추출한 것 우선)
    const finalSessionCookie = rawSessionCookie || sessionCookie
    
    if (!finalSessionCookie) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      const redirectResponse = NextResponse.redirect(url)
      redirectResponse.headers.set('x-debug-reason', 'no-cookie')
      return redirectResponse
    }
    
    // Basic JWT validation (check if it's a valid JWT structure)
    try {
      const parts = finalSessionCookie.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT structure')
      }
      
      response.headers.set('x-debug-jwt-parts', String(parts.length))
      
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
      
      response.headers.set('x-debug-token-valid', 'true')
      response.headers.set('x-debug-token-exp', String(payload.exp))
      response.headers.set('x-debug-now', String(now))
      response.headers.set('x-debug-user', payload.email || 'unknown')
      
      if (payload.exp && payload.exp < now) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        url.searchParams.set('next', pathname)
        const redirectResponse = NextResponse.redirect(url)
        redirectResponse.headers.set('x-debug-reason', 'token-expired')
        redirectResponse.headers.set('x-debug-token-exp', String(payload.exp))
        redirectResponse.headers.set('x-debug-now', String(now))
        return redirectResponse
      }
      
      response.headers.set('x-debug-status', 'success')
      return response
      
    } catch (e) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      const redirectResponse = NextResponse.redirect(url)
      redirectResponse.headers.set('x-debug-reason', 'token-invalid')
      redirectResponse.headers.set('x-debug-error', String(e))
      return redirectResponse
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
