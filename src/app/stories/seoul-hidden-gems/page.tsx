'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function SeoulHiddenGemsStory() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🎨 히어로 섹션 - 매거진 스타일 */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
          </div>
        </div>

        {/* 히어로 컨텐츠 */}
        <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 pb-20 max-w-4xl mx-auto">
          {/* 카테고리 배지 */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Seoul Story</span>
            </div>
            <div className="text-sm text-white/70">📍 서울, 대한민국</div>
            <div className="text-sm text-white/70">📅 2024.03.15-20</div>
            <div className="text-sm text-white/70">⏰ 8분 읽기</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            한국의 숨겨진<br />보석 같은 장소들
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl">
            현지인만 아는 서울의 특별한 명소들과 그곳에서 만난 소중한 경험들
          </p>

          {/* 작성자 정보 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">김</span>
            </div>
            <div>
              <div className="font-semibold">김여행</div>
              <div className="text-white/70 text-sm">Travel BOX 인증 여행자 • 서울 거주 3년</div>
            </div>
          </div>
        </div>

        {/* 뒤로가기 버튼 */}
        <Link 
          href="/#stories"
          className="absolute top-8 left-8 z-20 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/40 transition-colors"
        >
          ← 돌아가기
        </Link>
      </section>

      {/* 📊 여행 요약 정보 */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">🗺️ 여행 요약</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">📍</span>
                </div>
                <div className="text-sm text-gray-500">위치</div>
                <div className="font-semibold">서울, 한국</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">📅</span>
                </div>
                <div className="text-sm text-gray-500">기간</div>
                <div className="font-semibold">5박 6일</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">💰</span>
                </div>
                <div className="text-sm text-gray-500">예산</div>
                <div className="font-semibold">약 50만원</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">👥</span>
                </div>
                <div className="text-sm text-gray-500">여행타입</div>
                <div className="font-semibold">혼자 여행</div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#현지맛집</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#숨은명소</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#문화체험</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#혼자여행</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#서울탐방</span>
            </div>
          </div>
        </div>
      </section>

      {/* 📖 스토리 본문 */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            {/* 인트로 */}
            <div className="text-xl leading-relaxed text-gray-700 mb-12">
              서울에서 3년을 살면서 발견한 것은, 관광 가이드북에는 없지만 정말 특별한 장소들이 곳곳에 숨어있다는 것이었습니다. 
              이번 여행에서는 그런 숨겨진 보석 같은 장소들을 여러분과 공유하고 싶어요.
            </div>

            {/* Day 1 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-3xl font-bold text-gray-900">을지로 골목 탐험</h2>
              </div>
              
              <div className="mb-8">
                <div className="h-80 bg-[url('https://images.unsplash.com/photo-1551501196-4cc6b56834b6?ixlib=rb-4.0.3')] bg-cover bg-center rounded-2xl mb-4"></div>
                <p className="text-sm text-gray-500 text-center italic">을지로3가역 근처의 작은 골목길</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                을지로는 서울의 진짜 모습을 볼 수 있는 곳입니다. 오래된 공구상가들 사이사이에 숨어있는 
                카페와 펍들은 정말 독특한 매력이 있어요. 특히 '커피 한잔 할래요?'라는 작은 카페는 
                공구점을 개조해서 만든 곳인데, 그 특유의 인더스트리얼한 분위기가 정말 멋있었습니다.
              </p>

              {/* 꿀팁 박스 */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-yellow-600">💡</span>
                  <h4 className="font-bold text-yellow-800">여행 꿀팁</h4>
                </div>
                <p className="text-yellow-700">
                  을지로는 평일 오후 2-5시가 가장 좋아요. 공구상가가 문을 열어서 활기차고, 
                  아직 저녁 시간대의 펍들이 붐비기 전이라 여유롭게 돌아볼 수 있어요.
                </p>
              </div>
            </div>

            {/* Day 2 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-3xl font-bold text-gray-900">성수동 카페 투어</h2>
              </div>
              
              <div className="mb-8">
                <div className="h-80 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3')] bg-cover bg-center rounded-2xl mb-4"></div>
                <p className="text-sm text-gray-500 text-center italic">성수동의 아늑한 카페 한 모습</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                성수동은 이제 서울의 핫플레이스로 유명하지만, 여전히 현지인들만 아는 조용한 카페들이 많아요. 
                특히 '대림창고'를 개조한 복합문화공간에서 발견한 작은 로스터리 카페는 정말 인상 깊었습니다. 
                직접 볶은 커피의 향과 넓은 창고 공간이 주는 개방감이 완벽한 조화를 이뤘어요.
              </p>
            </div>

            {/* 사진 갤러리 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📸 여행 갤러리</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-60 bg-[url('https://images.unsplash.com/photo-1551501196-4cc6b56834b6?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
                <div className="h-60 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
                <div className="h-60 bg-[url('https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
              </div>
            </div>

            {/* 마무리 */}
            <div className="text-xl leading-relaxed text-gray-700 bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌟 여행을 마치며</h3>
              <p className="mb-4">
                서울의 숨겨진 보석들을 찾아다니는 5일 동안 정말 많은 것을 배웠습니다. 
                관광명소도 좋지만, 이렇게 현지인의 일상 속에 스며든 여행이 때로는 더 특별한 기억을 만들어주는 것 같아요.
              </p>
              <p>
                다음에 서울을 방문하신다면, 꼭 이런 작은 골목길들도 탐험해보세요. 
                여러분만의 숨겨진 보석을 발견하실 수 있을 거예요! ✨
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* 💬 댓글 & 공유 섹션 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 공유 버튼 */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className="text-gray-600">이 스토리가 도움이 되었나요?</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
              👍 좋아요 (24)
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
              🔖 저장하기
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors">
              📤 공유하기
            </button>
          </div>

          {/* 작성자 소개 */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">✍️ 작성자 소개</h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">김</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">김여행 (Travel BOX 인증 여행자)</h4>
                <p className="text-gray-600 mb-3">
                  서울 거주 3년차, 숨겨진 명소 발굴을 좋아하는 여행 블로거입니다. 
                  현지인의 시선으로 바라본 진짜 서울의 매력을 전해드리고 싶어요.
                </p>
                <div className="flex space-x-2">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">여행 스토리 15개</span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">팔로워 1.2K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔗 관련 스토리 */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">📚 이런 스토리도 읽어보세요</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/stories/kyoto-tradition" className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Kyoto Story</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    교토에서 만난 일본의 전통미
                  </h4>
                  <p className="text-gray-600 text-sm">천년 고도 교토에서 경험한 일본 문화의 깊이와 아름다움...</p>
                </div>
              </article>
            </Link>

            <Link href="/stories/paris-local" className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1520637836862-4d197d17c79a?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Paris Story</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    파리 뒷골목에서 찾은 진짜 프랑스
                  </h4>
                  <p className="text-gray-600 text-sm">관광지가 아닌 현지인의 삶 속에서 발견한 파리의 진면목...</p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}


