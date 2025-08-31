import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutManagerProps {
  children: React.ReactNode
  locale?: string
}

export default function LayoutManager({ children, locale }: LayoutManagerProps) {
  // locale이 없으면 (admin/auth/api 페이지) 기본 레이아웃만
  if (!locale) {
    return <>{children}</>
  }

  // 🟢 Public 페이지 - Navbar/Footer 포함 + 다국어 지원
  return (
    <LanguageProvider initialLocale={locale}>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </LanguageProvider>
  )
}
