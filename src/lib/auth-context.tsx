'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '@/lib/auth/types'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

/**
 * 🔴 Auth Provider - Admin 전용
 * 
 * 특징:
 * - Client Component로만 동작
 * - Firebase Auth 통합 (향후 구현)
 * - Admin Layout에서만 사용
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 🔄 TODO: Firebase Auth 상태 감지 구현
    // 현재는 모의 데이터로 테스트
    const checkAuthState = async () => {
      try {
        // 임시: localStorage에서 사용자 정보 확인
        const savedUser = localStorage.getItem('auth_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Auth state check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthState()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // 🔄 TODO: Firebase Auth 로그인 구현
      // 현재는 모의 로그인
      if (email === 'admin@travelbox.com' && password === 'admin123') {
        const mockUser: User = {
          id: '1',
          email,
          displayName: 'Admin User',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setUser(mockUser)
        localStorage.setItem('auth_user', JSON.stringify(mockUser))
      } else {
        throw new Error('Invalid credentials')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // 🔄 TODO: Firebase Auth 로그아웃 구현
      setUser(null)
      localStorage.removeItem('auth_user')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return
    
    try {
      // 🔄 TODO: Firebase Auth 프로필 업데이트 구현
      const updatedUser = { ...user, ...data, updatedAt: new Date() }
      setUser(updatedUser)
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
    } catch (error) {
      console.error('Profile update failed:', error)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// 🔴 Admin 전용 인증 확인 훅
export function useRequireAuth() {
  const { user, isLoading } = useAuth()
  
  useEffect(() => {
    if (!isLoading && !user) {
      // 🔄 TODO: 로그인 페이지로 리다이렉트
      window.location.href = '/login'
    }
  }, [user, isLoading])

  return { user, isLoading }
}
