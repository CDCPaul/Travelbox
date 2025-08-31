'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import LanguageToggle from './LanguageToggle'

interface NavbarProps {
  locale?: string
}

export default function Navbar({ locale = 'ko' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white shadow-sm border-b border-gray-200'
        : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 🏷️ Travel BOX 로고 - 심플 버전 */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-sm">TB</div>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
              }`}>Travel BOX</span>
            </Link>
          </div>

          {/* 🧭 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href={`/${locale}`} 
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                pathname === `/${locale}`
                  ? isScrolled 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-white bg-white/20 drop-shadow-md'
                  : isScrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
              } ${pathname === `/${locale}` ? 'border-b-2 border-blue-600' : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              href={`/${locale}/destinations`} 
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                pathname === `/${locale}/destinations`
                  ? isScrolled 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-white bg-white/20 drop-shadow-md'
                  : isScrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
              } ${pathname === `/${locale}/destinations` ? 'border-b-2 border-blue-600' : ''}`}
            >
              {t('nav.destinations')}
            </Link>
            <Link 
              href={`/${locale}/stories`} 
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                pathname === `/${locale}/stories`
                  ? isScrolled 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-white bg-white/20 drop-shadow-md'
                  : isScrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
              } ${pathname === `/${locale}/stories` ? 'border-b-2 border-blue-600' : ''}`}
            >
              {t('nav.stories')}
            </Link>
            <Link 
              href={`/${locale}/guides`} 
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                pathname === `/${locale}/guides`
                  ? isScrolled 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-white bg-white/20 drop-shadow-md'
                  : isScrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
              } ${pathname === `/${locale}/guides` ? 'border-b-2 border-blue-600' : ''}`}
            >
              {t('nav.guides')}
            </Link>
            <Link 
              href={`/${locale}/about`} 
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                pathname === `/${locale}/about`
                  ? isScrolled 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-white bg-white/20 drop-shadow-md'
                  : isScrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
              } ${pathname === `/${locale}/about` ? 'border-b-2 border-blue-600' : ''}`}
            >
              {t('nav.about')}
            </Link>
          </nav>

          {/* 🔧 우측 액션 버튼들 */}
          <div className="flex items-center space-x-3">
            {/* Contact 버튼 - 데스크톱만 */}
            <Link 
              href={`/${locale}/contact`} 
              className={`hidden lg:block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isScrolled
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-transparent text-white border border-white/50 hover:bg-white/10 drop-shadow-md'
              }`}
            >
              {t('nav.contact')}
            </Link>

            {/* 🌐 언어 토글 */}
            <LanguageToggle isScrolled={isScrolled} locale={locale} />

            {/* 📱 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-lg'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 📱 모바일 메뉴 */}
        {isMenuOpen && (
          <div className={`lg:hidden border-t py-3 ${
            isScrolled 
              ? 'border-gray-200 bg-white' 
              : 'border-white/20 bg-transparent'
          }`}>
            <div className="space-y-1 px-2">
              <Link 
                href={`/${locale}`} 
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === `/${locale}`
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : isScrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href={`/${locale}/destinations`} 
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === `/${locale}/destinations`
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : isScrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.destinations')}
              </Link>
              <Link 
                href={`/${locale}/stories`} 
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === `/${locale}/stories`
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : isScrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.stories')}
              </Link>
              <Link 
                href={`/${locale}/guides`} 
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === `/${locale}/guides`
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : isScrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.guides')}
              </Link>
              <Link 
                href={`/${locale}/about`} 
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === `/${locale}/about`
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                    : isScrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                href={`/${locale}/contact`} 
                className={`block mx-1 mt-3 px-4 py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                  isScrolled 
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}