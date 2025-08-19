import { auth } from '@/lib/firebase'
import { SessionInfo, SessionCheckResponse, SessionRefreshOptions, SessionManagerEvents } from './types'

class SessionManager {
  private static instance: SessionManager
  private refreshTimer: NodeJS.Timeout | null = null
  private checkTimer: NodeJS.Timeout | null = null
  private eventHandlers: Partial<SessionManagerEvents> = {}

  // 세션 체크 간격 (30분)
  private readonly CHECK_INTERVAL = 30 * 60 * 1000
  
  // 자동 갱신 임계값 (2시간)
  private readonly AUTO_REFRESH_THRESHOLD = 2 * 60 * 60

  private constructor() {
    console.log('🔧 SessionManager initialized')
  }

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  /**
   * 이벤트 핸들러 등록
   */
  on(event: keyof SessionManagerEvents, handler: Function): void {
    this.eventHandlers[event] = handler as any
  }

  /**
   * 현재 세션 상태 확인
   */
  async checkSession(): Promise<SessionInfo | null> {
    try {
      console.log('🔍 Checking session status...')
      
      const response = await fetch('/api/auth/session')
      const data: SessionCheckResponse = await response.json()
      
      if (data.authenticated && data.user) {
        const sessionInfo: SessionInfo = {
          exp: data.user.exp,
          timeToExpiry: data.user.timeToExpiry,
          user: {
            email: data.user.email,
            uid: data.user.uid
          }
        }

        console.log(`✅ Session valid - expires in ${Math.floor(data.user.timeToExpiry / 60)} minutes`)
        
        // 자동 갱신이 필요한지 확인
        if (data.user.timeToExpiry < this.AUTO_REFRESH_THRESHOLD) {
          console.log('⚡ Session expiring soon, auto-refreshing...')
          await this.refreshSession({ forceRefresh: true })
        }

        return sessionInfo
      } else {
        console.warn('❌ Session check failed:', data.error)
        this.eventHandlers.onSessionError?.(data.error || 'INVALID_SESSION')
        return null
      }
    } catch (error) {
      console.error('❌ Session check error:', error)
      this.eventHandlers.onSessionError?.('SESSION_CHECK_FAILED')
      return null
    }
  }

  /**
   * 세션 갱신 (새로운 ID 토큰으로)
   */
  async refreshSession(options: SessionRefreshOptions = {}): Promise<SessionInfo | null> {
    const { forceRefresh = false, redirectOnError = true } = options

    try {
      console.log('🔄 Refreshing session...')

      const currentUser = auth.currentUser
      if (!currentUser) {
        console.warn('❌ No current user for session refresh')
        if (redirectOnError) {
          window.location.href = '/auth/login?next=%2Fadmin'
        }
        return null
      }

      // Firebase에서 새로운 ID 토큰 가져오기
      console.log('🔄 Getting fresh ID token...')
      const freshIdToken = await currentUser.getIdToken(forceRefresh)
      
      // 새로운 세션 쿠키 생성
      console.log('🔄 Creating new session cookie...')
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: freshIdToken }),
      })
      
      const data = await response.json()
      if (data.ok) {
        console.log('✅ Session refreshed successfully!')
        
        // 갱신된 세션 정보 가져오기
        const newSessionInfo = await this.checkSession()
        if (newSessionInfo) {
          this.eventHandlers.onSessionRefreshed?.(newSessionInfo)
        }
        return newSessionInfo
      } else {
        console.warn('❌ Session refresh failed:', data.error)
        this.eventHandlers.onSessionError?.(data.error || 'REFRESH_FAILED')
        if (redirectOnError) {
          window.location.href = '/auth/login?next=%2Fadmin'
        }
        return null
      }
    } catch (error) {
      console.error('❌ Session refresh error:', error)
      this.eventHandlers.onSessionError?.('REFRESH_ERROR')
      if (redirectOnError) {
        window.location.href = '/auth/login?next=%2Fadmin'
      }
      return null
    }
  }

  /**
   * 자동 세션 체크 시작
   */
  startAutoCheck(): void {
    console.log(`🕐 Starting auto session check (every ${this.CHECK_INTERVAL / 1000 / 60} minutes)`)
    
    // 기존 타이머 정리
    this.stopAutoCheck()
    
    // 즉시 한 번 체크
    this.checkSession()
    
    // 정기적으로 체크
    this.checkTimer = setInterval(() => {
      this.checkSession()
    }, this.CHECK_INTERVAL)
  }

  /**
   * 자동 세션 체크 중지
   */
  stopAutoCheck(): void {
    if (this.checkTimer) {
      console.log('🛑 Stopping auto session check')
      clearInterval(this.checkTimer)
      this.checkTimer = null
    }
  }

  /**
   * 로그아웃 처리
   */
  async logout(): Promise<void> {
    try {
      console.log('🚪 Logging out...')
      
      // 자동 체크 중지
      this.stopAutoCheck()
      
      // 서버에서 세션 쿠키 삭제
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' }),
      })
      
      // Firebase 클라이언트에서 로그아웃
      await auth.signOut()
      
      console.log('✅ Logout successful')
      
      // 로그인 페이지로 리다이렉트
      window.location.href = '/auth/login?next=%2Fadmin'
    } catch (error) {
      console.error('❌ Logout error:', error)
      // 에러가 있어도 로그인 페이지로 이동
      window.location.href = '/auth/login?next=%2Fadmin'
    }
  }

  /**
   * SessionManager 정리
   */
  destroy(): void {
    console.log('🧹 Destroying SessionManager')
    this.stopAutoCheck()
    this.eventHandlers = {}
  }
}

// 싱글톤 인스턴스 내보내기
export const sessionManager = SessionManager.getInstance()
