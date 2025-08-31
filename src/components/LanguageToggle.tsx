'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Language } from '@/lib/i18n'
import { useRouter, usePathname } from 'next/navigation'

interface LanguageToggleProps {
  isScrolled?: boolean
  locale?: string
}

export default function LanguageToggle({ isScrolled = false, locale = 'ko' }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: Language) => {
    // Context 업데이트
    setLanguage(newLocale)
    
    // URL 변경
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '') || '/' // 현재 locale 제거
    const newPath = `/${newLocale}${currentPath === '/' ? '' : currentPath}`
    router.push(newPath)
  }

  return (
    <div className={`flex items-center rounded-lg ${
      isScrolled ? 'bg-gray-200 p-1' : 'bg-transparent p-0'
    }`}>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          language === 'en'
            ? isScrolled
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-white border border-white/50 drop-shadow-md'
            : isScrolled
              ? 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              : 'text-white/80 hover:text-white hover:bg-white/20 drop-shadow-md'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ko')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
          language === 'ko'
            ? isScrolled
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-transparent text-white border border-white/50 drop-shadow-md'
            : isScrolled
              ? 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              : 'text-white/80 hover:text-white hover:bg-white/20 drop-shadow-md'
        }`}
      >
        한국어
      </button>
    </div>
  )
}
