'use client'

import { Suspense, useEffect, useState } from 'react'
import { auth, googleProvider } from '@/lib/firebase'
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginInner() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/admin'

  useEffect(() => {
    // Handle redirect result if popup was blocked and we fell back to redirect
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          try {
            const idToken = await result.user.getIdToken()
            await fetch('/api/auth/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken }),
            })
            router.push(next)
          } catch (err: any) {
            console.error('Session exchange error:', err)
            setError('Failed to start session')
          }
        }
      })
      .catch((e: any) => {
        console.error('Google redirect error:', e)
        setError(e?.code || e?.message || 'Google redirect failed')
      })
  }, [router, next])

  const startSessionAndRedirect = async (idToken: string) => {
    console.log('🔍 Calling /api/auth/session...')
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    console.log('📡 Session API response status:', res.status)
    
    if (!res.ok) {
      const data = await res.json().catch(() => ({} as any))
      console.error('❌ Session API failed:', data)
      throw new Error(data?.error || 'SESSION_EXCHANGE_FAILED')
    }
    
    console.log('✅ Session created successfully, redirecting to:', next)
    console.log('🔄 Using window.location.href for reliable redirect')
    
    // Use window.location.href for immediate redirect after session is created
    // This ensures the browser makes a fresh request with the new session cookie
    window.location.href = next
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await cred.user.getIdToken()
      await startSessionAndRedirect(idToken)
    } catch (e: any) {
      console.error('Email sign-in error:', e)
      setError(e?.code || e?.message || 'Email sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    console.log('🔍 Google sign-in started')

    try {
      console.log('🔍 Attempting popup sign-in...')
      const result = await signInWithPopup(auth, googleProvider)
      console.log('✅ Popup sign-in successful:', result.user.email)
      
      console.log('🔍 Getting ID token...')
      const idToken = await result.user.getIdToken()
      console.log('✅ ID token obtained')
      
      console.log('🔍 Starting session exchange...')
      await startSessionAndRedirect(idToken)
    } catch (e: any) {
      console.error('Google popup error:', e)
      const code = e?.code || ''
      // Common popup failure cases → fallback to redirect
      if (
        code === 'auth/popup-blocked' ||
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/operation-not-supported-in-this-environment' ||
        code === 'auth/unauthorized-domain'
      ) {
        try {
          await signInWithRedirect(auth, googleProvider)
          return
        } catch (re: any) {
          console.error('Google redirect start error:', re)
          setError(re?.code || re?.message || 'Google redirect start failed')
        }
      } else {
        setError(code || e?.message || 'Google sign-in failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in with Email'}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginInner />
    </Suspense>
  )
}
