'use client'

import { AuthUser, SessionInfo } from '@/lib/auth/types'

interface AdminHeaderProps {
  user: AuthUser
  sessionInfo: SessionInfo | null
  onRefresh: () => Promise<boolean>
  onLogout: () => Promise<void>
  isExpiringSoon: boolean
  minutesLeft: number | null
}

export default function AdminHeader({ 
  user, 
  sessionInfo, 
  onRefresh, 
  onLogout, 
  isExpiringSoon,
  minutesLeft 
}: AdminHeaderProps) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* 사용자 정보 및 세션 표시 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Welcome, {user.email}</span>
              {sessionInfo && minutesLeft !== null && (
                <div className={`text-xs ${isExpiringSoon ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                  (Session: {minutesLeft}min left)
                </div>
              )}
            </div>
            
            {/* 세션 연장 버튼 - 2시간 이내일 때만 표시 */}
            {isExpiringSoon && (
              <button
                onClick={onRefresh}
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                title="Extend your session"
              >
                Extend Session
              </button>
            )}
            
            {/* 로그아웃 버튼 */}
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
