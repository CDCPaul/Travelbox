import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import LayoutManager from '@/components/LayoutManager'
import { getLocalizedMetadata, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n/server'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale
  const metadata = getLocalizedMetadata(locale, 'default')
  
  return {
    title: {
      template: `%s | ${metadata.siteName}`,
      default: metadata.defaultTitle,
    },
    description: metadata.defaultDescription,
    openGraph: {
      title: metadata.defaultTitle,
      description: metadata.defaultDescription,
      siteName: metadata.siteName,
      locale: locale,
      alternateLocale: locale === 'ko' ? 'en' : 'ko',
      type: 'website',
    },
    alternates: {
      languages: {
        ko: '/ko',
        en: '/en',
      },
    },
  }
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // 유효하지 않은 locale이면 404
  if (!isValidLocale(params.locale)) {
    notFound()
  }

  return (
    <LayoutManager locale={params.locale}>
      {children}
    </LayoutManager>
  )
}

// 정적 생성할 locale 목록
export function generateStaticParams() {
  return [
    { locale: 'ko' },
    { locale: 'en' },
  ]
}
