import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ko', 'en']
const defaultLocale = 'ko'

// Locale 감지 함수
function getLocale(request: NextRequest): string {
  // URL에서 locale 추출
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return pathname.split('/')[1]
  }

  // Accept-Language 헤더에서 locale 감지
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang.split('-')[0]))
    
    if (preferredLocale) {
      return preferredLocale.split('-')[0]
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Static 파일, API, Next.js 내부 파일들은 건너뛰기
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // 🔴 Admin 페이지 인증 체크
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
    if (!finalSessionCookie.includes('.')) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      const redirectResponse = NextResponse.redirect(url)
      redirectResponse.headers.set('x-debug-reason', 'invalid-jwt-structure')
      return redirectResponse
    }
    
    // Pass through with debug headers
    return response
  }

  // 🔴 Auth 페이지는 다국어 처리 안함
  if (pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  // 🟢 Public 페이지 - 다국어 처리
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    // locale이 없으면 리디렉션
    const locale = getLocale(request)
    const url = request.nextUrl.clone()
    
    // 루트 경로면 locale만 추가
    if (pathname === '/') {
      url.pathname = `/${locale}`
    } else {
      url.pathname = `/${locale}${pathname}`
    }
    
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}