'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { sessionManager } from '@/lib/auth/session-manager'
import { SessionInfo, SessionStatus } from '@/lib/auth/types'

export interface UseSessionReturn {
  sessionInfo: SessionInfo | null
  status: SessionStatus
  loading: boolean
  refreshSession: () => Promise<boolean>
  logout: () => Promise<void>
  timeToExpiry: number | null
  isExpiringSoon: boolean // 2시간 이내
  minutesLeft: number | null
}

export function useSession(): UseSessionReturn {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
  const [status, setStatus] = useState<SessionStatus>('loading')
  const [loading, setLoading] = useState(true)
  const isInitialized = useRef(false)

  // 세션 정보에서 파생된 값들
  const timeToExpiry = sessionInfo?.timeToExpiry ?? null
  const isExpiringSoon = timeToExpiry ? timeToExpiry < 2 * 60 * 60 : false // 2시간
  const minutesLeft = timeToExpiry ? Math.floor(timeToExpiry / 60) : null

  // 세션 갱신 함수
  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const result = await sessionManager.refreshSession({ forceRefresh: true })
      return result !== null
    } catch (error) {
      console.error('❌ Session refresh failed in hook:', error)
      return false
    }
  }, [])

  // 로그아웃 함수
  const logout = useCallback(async (): Promise<void> => {
    await sessionManager.logout()
  }, [])

  // SessionManager 이벤트 핸들러 설정
  useEffect(() => {
    const handleSessionRefreshed = (newSessionInfo: SessionInfo) => {
      console.log('🔄 Session refreshed in hook')
      setSessionInfo(newSessionInfo)
      setStatus('authenticated')
    }

    const handleSessionError = (error: string) => {
      console.error('❌ Session error in hook:', error)
      setSessionInfo(null)
      setStatus('error')
    }

    const handleSessionExpired = () => {
      console.warn('⏰ Session expired in hook')
      setSessionInfo(null)
      setStatus('unauthenticated')
    }

    // 이벤트 핸들러 등록
    sessionManager.on('onSessionRefreshed', handleSessionRefreshed)
    sessionManager.on('onSessionError', handleSessionError)
    sessionManager.on('onSessionExpired', handleSessionExpired)

    return () => {
      // 정리 함수에서는 이벤트 핸들러 제거가 필요하지만
      // 현재 SessionManager에서 removeEventListener가 없으므로 스킵
      // 실제 프로덕션에서는 구현 필요
    }
  }, [])

  // 초기 세션 체크 및 자동 모니터링 시작
  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    const initializeSession = async () => {
      try {
        setLoading(true)
        setStatus('loading')
        
        console.log('🔍 Initializing session in hook...')
        
        // 초기 세션 체크
        const initialSession = await sessionManager.checkSession()
        
        if (initialSession) {
          setSessionInfo(initialSession)
          setStatus('authenticated')
          console.log('✅ Initial session check successful')
        } else {
          setSessionInfo(null)
          setStatus('unauthenticated')
          console.log('❌ No valid session found')
        }
        
        // 자동 모니터링 시작
        sessionManager.startAutoCheck()
        
      } catch (error) {
        console.error('❌ Session initialization error:', error)
        setSessionInfo(null)
        setStatus('error')
      } finally {
        setLoading(false)
      }
    }

    initializeSession()

    // 컴포넌트 언마운트 시 정리
    return () => {
      sessionManager.stopAutoCheck()
    }
  }, [])

  return {
    sessionInfo,
    status,
    loading,
    refreshSession,
    logout,
    timeToExpiry,
    isExpiringSoon,
    minutesLeft
  }
}
