// Firebase Auth 관련 타입 정의

export interface SessionInfo {
  exp: number
  timeToExpiry: number
  user: {
    email: string
    uid: string
  }
}

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
}

export interface SessionCheckResponse {
  authenticated: boolean
  user?: {
    email: string
    uid: string
    exp: number
    timeToExpiry: number
  }
  error?: string
}

export interface SessionRefreshOptions {
  forceRefresh?: boolean
  redirectOnError?: boolean
}

export interface SessionManagerEvents {
  onSessionExpired: () => void
  onSessionRefreshed: (sessionInfo: SessionInfo) => void
  onSessionError: (error: string) => void
}

export type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'error'

// Admin 사용자 정의 (auth-context.tsx에서 사용)
export interface User {
  id: string
  email: string
  displayName: string
  role: string
  createdAt: Date
  updatedAt: Date
}