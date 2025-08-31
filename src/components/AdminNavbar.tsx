'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthUser, SessionInfo } from '@/lib/auth/types'

interface AdminNavbarProps {
  user: AuthUser
  sessionInfo: SessionInfo | null
  onRefresh: () => Promise<boolean>
  onLogout: () => Promise<void>
  isExpiringSoon: boolean
  minutesLeft: number | null
}

export default function AdminNavbar({ 
  user, 
  sessionInfo, 
  onRefresh, 
  onLogout, 
  isExpiringSoon,
  minutesLeft 
}: AdminNavbarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/tours', label: 'Tours' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/bookings', label: 'Bookings' },
    { href: '/admin/settings', label: 'Settings' },
  ]

  return (
    <nav className="bg-slate-800 text-white shadow-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 브랜드 */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center space-x-3">
              <span className="text-xl font-bold">Travel Box</span>
              <span className="text-sm text-slate-400 font-normal">Admin</span>
            </Link>

            {/* 네비게이션 메뉴 */}
            <div className="hidden md:flex space-x-0">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white border-b-2 border-blue-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 사용자 정보 및 액션 */}
          <div className="flex items-center space-x-4">
            {/* 공개 사이트로 이동 */}
            <Link
              href="/"
              className="hidden sm:block px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              Public Site
            </Link>

            {/* 세션 정보 */}
            {sessionInfo && minutesLeft !== null && (
              <div className="hidden lg:flex items-center space-x-3 text-sm">
                <span className={`${isExpiringSoon ? 'text-orange-400' : 'text-slate-400'}`}>
                  {minutesLeft}분 남음
                </span>
                {isExpiringSoon && (
                  <button
                    onClick={onRefresh}
                    className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-xs font-medium transition-colors"
                  >
                    연장
                  </button>
                )}
              </div>
            )}

            {/* 사용자 정보 */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-300">{user.email}</span>
              
              <button
                onClick={onLogout}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className="md:hidden border-t border-slate-700 pt-3 pb-3">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
