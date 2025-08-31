import { getTranslations, type Locale } from '@/lib/i18n/server'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

// 동적 메타데이터 생성
export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = getTranslations(params.locale)
  
  return {
    title: t('home.hero.title'),
    description: t('home.hero.description'),
    openGraph: {
      title: t('home.hero.title'),
      description: t('home.hero.description'),
    },
  }
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const t = getTranslations(params.locale)

  return (
    <main>
      {/* 🌟 히어로 섹션 - 대형 이미지 중심 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-blue-900/70 to-purple-900/70">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay opacity-90"></div>
          </div>
        </div>

        {/* 히어로 컨텐츠 */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Travel BOX 인증 배지 */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-medium">{t('home.certification.title')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 font-light">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
              {t('home.hero.description')}
            </p>

            <Link
              href={`/${params.locale}#destinations`}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {t('home.hero.cta')}
            </Link>
          </div>
        </div>

        {/* 스크롤 표시 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 🌍 지역별 인기 여행지 섹션 */}
      <section id="destinations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.destinations.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.featured.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 한국 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="h-80 bg-gradient-to-b from-transparent to-black/60">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1570059171863-1d12e09f4ab0?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Travel BOX 인증</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('home.destinations.korea.name')}</h3>
                <p className="text-white/90 text-sm">{t('home.destinations.korea.description')}</p>
              </div>
            </div>

            {/* 일본 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="h-80 bg-gradient-to-b from-transparent to-black/60">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Travel BOX 인증</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('home.destinations.japan.name')}</h3>
                <p className="text-white/90 text-sm">{t('home.destinations.japan.description')}</p>
              </div>
            </div>

            {/* 유럽 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="h-80 bg-gradient-to-b from-transparent to-black/60">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Travel BOX 인증</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('home.destinations.europe.name')}</h3>
                <p className="text-white/90 text-sm">{t('home.destinations.europe.description')}</p>
              </div>
            </div>

            {/* 아시아 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="h-80 bg-gradient-to-b from-transparent to-black/60">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1552832230-c0197ba8c8b6?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">Travel BOX 인증</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('home.destinations.asia.name')}</h3>
                <p className="text-white/90 text-sm">{t('home.destinations.asia.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📖 여행 스토리 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.stories.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('home.stories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 스토리 1 */}
            <Link href={`/${params.locale}/stories/seoul-hidden-gems`} className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 cursor-pointer">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Seoul Story</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{t('home.stories.seoul.title')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('home.stories.seoul.description')}</p>
                  <div className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    {t('home.stories.readMore')} →
                  </div>
                </div>
              </article>
            </Link>

            {/* 스토리 2 */}
            <Link href={`/${params.locale}/stories/kyoto-tradition`} className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 cursor-pointer">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Kyoto Story</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{t('home.stories.kyoto.title')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('home.stories.kyoto.description')}</p>
                  <div className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    {t('home.stories.readMore')} →
                  </div>
                </div>
              </article>
            </Link>

            {/* 스토리 3 */}
            <Link href={`/${params.locale}/stories/paris-local`} className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 cursor-pointer">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1520637836862-4d197d17c79a?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Paris Story</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{t('home.stories.paris.title')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('home.stories.paris.description')}</p>
                  <div className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    {t('home.stories.readMore')} →
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* 🏷️ Travel BOX 인증 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t('home.certification.title')}</h2>
            </div>
          </div>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {t('home.certification.description')}
          </p>
          <Link
            href={`/${params.locale}/about`}
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors duration-300"
          >
            {t('home.certification.learnMore')}
          </Link>
        </div>
      </section>
    </main>
  )
}
