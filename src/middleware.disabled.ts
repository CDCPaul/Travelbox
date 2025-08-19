// 미들웨어 비활성화 버전 - 테스트용
// 이 파일을 middleware.ts로 이름을 바꾸면 미들웨어가 비활성화됩니다

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('🔍 Middleware DISABLED - allowing all requests:', pathname)
  
  // 모든 요청을 허용 (미들웨어 비활성화)
  return NextResponse.next()
}

// 매칭 규칙을 비어있게 하여 미들웨어를 실질적으로 비활성화
export const config = {
  matcher: []
}
