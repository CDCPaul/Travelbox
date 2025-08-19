'use client'

import { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { AuthUser } from '@/lib/auth/types'

export interface UseAuthReturn {
  user: AuthUser | null
  firebaseUser: User | null
  loading: boolean
  isAuthenticated: boolean
}

export function useAuth(): UseAuthReturn {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔍 Setting up Firebase Auth listener...')
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔄 Firebase Auth state changed:', user?.email || 'null')
      setFirebaseUser(user)
      setLoading(false)
    })

    return () => {
      console.log('🧹 Cleaning up Firebase Auth listener')
      unsubscribe()
    }
  }, [])

  // Firebase User를 우리 앱의 AuthUser 타입으로 변환
  const user: AuthUser | null = firebaseUser ? {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified
  } : null

  const isAuthenticated = !!user

  return {
    user,
    firebaseUser,
    loading,
    isAuthenticated
  }
}
