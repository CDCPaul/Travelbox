'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translate } from './index'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  initialLocale?: string
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    initialLocale === 'ko' || initialLocale === 'en' ? initialLocale : 'ko'
  )

  // 초기 언어 설정 (서버에서 받은 locale을 우선으로)
  useEffect(() => {
    // 서버에서 받은 initialLocale이 있으면 그것을 사용
    if (initialLocale && (initialLocale === 'ko' || initialLocale === 'en')) {
      setLanguageState(initialLocale as Language)
      localStorage.setItem('travel-box-language', initialLocale)
      return
    }

    // 그렇지 않으면 기존 로직 사용
    const savedLanguage = localStorage.getItem('travel-box-language') as Language
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    } else {
      // 브라우저 언어 감지
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('ko')) {
        setLanguageState('ko')
      } else {
        setLanguageState('en')
      }
    }
  }, [initialLocale])

  // 언어 변경 함수
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('travel-box-language', lang)
  }

  // 번역 함수
  const t = (key: string) => translate(language, key)

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}



