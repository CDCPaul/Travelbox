import { getApps, cert, initializeApp, App, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

let adminApp: App | undefined

export function getAdminApp(): App {
  if (!adminApp) {
    console.log('🔍 Initializing Firebase Admin SDK...')
    
    const projectId =
      process.env.FIREBASE_ADMIN_PROJECT_ID ||
      process.env.ADMIN_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.ADMIN_CLIENT_EMAIL
    const privateKey = (
      process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
      process.env.ADMIN_PRIVATE_KEY ||
      ''
    ).replace(/\\n/g, '\n')

    console.log('🔍 Admin SDK config check:', {
      hasProjectId: !!projectId,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey && privateKey.length > 0,
      projectId: projectId || 'not set'
    })

    // Google Cloud 환경이나 Application Default Credentials (ADC) 사용 시도
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.log('🔍 Using Application Default Credentials')
      adminApp = getApps()[0] || initializeApp({
        credential: applicationDefault(),
        projectId: projectId
      })
    } else if (!projectId || !clientEmail || !privateKey) {
      console.log('⚠️  Missing admin credentials, using default app (development mode)')
      // In dev without credentials, fall back to default app (emulators or metadata)
      adminApp = getApps()[0] || initializeApp()
    } else {
      console.log('🔍 Using Service Account credentials')
      try {
        adminApp = getApps()[0] || initializeApp({
          credential: cert({ projectId, clientEmail, privateKey })
        })
        console.log('✅ Firebase Admin SDK initialized successfully')
      } catch (error) {
        console.error('❌ Failed to initialize Firebase Admin SDK:', error)
        // Fallback to default initialization
        adminApp = getApps()[0] || initializeApp()
      }
    }
  }
  return adminApp!
}

export const adminAuth = getAuth(getAdminApp())
