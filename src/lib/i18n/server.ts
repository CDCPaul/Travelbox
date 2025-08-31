// 서버 사이드에서 사용할 i18n 유틸리티
import { translations, type Language, getNestedTranslation } from './index'

// 지원하는 언어 목록
export const locales = ['ko', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'ko'

// 서버에서 번역 함수 사용
export function getTranslations(locale: string): (key: string) => string {
  const lang = (locales.includes(locale as Locale) ? locale : defaultLocale) as Language
  
  return (key: string) => getNestedTranslation(translations[lang], key)
}

// 유효한 locale인지 확인
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

// locale에 따른 메타데이터 생성
export function getLocalizedMetadata(locale: Locale, key: string) {
  const t = getTranslations(locale)
  
  const baseMetadata = {
    ko: {
      siteName: 'Travel Box',
      defaultTitle: 'Travel Box | 투어, 항공권, 크루즈',
      defaultDescription: '한국, 일본, 유럽, 중동 등 전 세계 투어, 항공권, 크루즈 등을 발견하고 예약하세요.',
    },
    en: {
      siteName: 'Travel Box',
      defaultTitle: 'Travel Box | Tours, Flights, Cruises',
      defaultDescription: 'Discover and book tours, flights, cruises, and more across Korea, Japan, Europe, Middle East, and beyond.',
    }
  }
  
  return baseMetadata[locale]
}

