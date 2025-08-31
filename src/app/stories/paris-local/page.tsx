'use client'

import Link from 'next/link'

export default function ParisLocalStory() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🎨 히어로 섹션 - 매거진 스타일 */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1520637836862-4d197d17c79a?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
          </div>
        </div>

        {/* 히어로 컨텐츠 */}
        <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 pb-20 max-w-4xl mx-auto">
          {/* 카테고리 배지 */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Paris Story</span>
            </div>
            <div className="text-sm text-white/70">📍 파리, 프랑스</div>
            <div className="text-sm text-white/70">📅 2024.01.20-27</div>
            <div className="text-sm text-white/70">⏰ 10분 읽기</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            파리 뒷골목에서<br />찾은 진짜 프랑스
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl">
            관광지가 아닌 현지인의 삶 속에서 발견한 파리의 진면목
          </p>

          {/* 작성자 정보 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">클</span>
            </div>
            <div>
              <div className="font-semibold">클레어</div>
              <div className="text-white/70 text-sm">Travel BOX 인증 여행자 • 프랑스 거주 2년</div>
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
          <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">🗼 여행 요약</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">🗼</span>
                </div>
                <div className="text-sm text-gray-500">위치</div>
                <div className="font-semibold">파리, 프랑스</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">🥐</span>
                </div>
                <div className="text-sm text-gray-500">기간</div>
                <div className="font-semibold">7박 8일</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">💰</span>
                </div>
                <div className="text-sm text-gray-500">예산</div>
                <div className="font-semibold">약 200만원</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">🍷</span>
                </div>
                <div className="text-sm text-gray-500">여행타입</div>
                <div className="font-semibold">로컬 체험</div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#현지인생활</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#파리지앵</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#마르셰투어</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#와인바</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#뒷골목탐험</span>
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
              파리하면 누구나 에펠탑, 루브르, 샹젤리제를 떠올리죠. 하지만 2년간 파리에서 살면서 알게 된 건, 
              진짜 파리의 매력은 관광지가 아닌 일상 속에 숨어있다는 것이었어요. 
              이번 스토리에서는 파리지앵들의 진짜 일상 속으로 여러분을 안내해드릴게요.
            </div>

            {/* Day 1 - 마르셰 투어 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-3xl font-bold text-gray-900">마르셰 데 앙팡 루즈에서의 아침</h2>
              </div>
              
              <div className="mb-8">
                <div className="h-80 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7997?ixlib=rb-4.0.3')] bg-cover bg-center rounded-2xl mb-4"></div>
                <p className="text-sm text-gray-500 text-center italic">파리 전통 시장 마르셰에서의 아침 풍경</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                토요일 오전 8시, 마르셰 데 앙팡 루즈(Marché des Enfants Rouges)는 이미 활기로 가득했어요. 
                1628년에 문을 연 파리에서 가장 오래된 시장인 이곳에서 파리지앵들의 진짜 일상을 엿볼 수 있었습니다. 
                치즈 가게 주인 장 피에르 씨는 제게 30년 넘게 숙성시킨 콩테 치즈를 맛보게 해주셨는데, 
                그 깊고 진한 맛은 정말 잊을 수가 없어요.
              </p>

              {/* 꿀팁 박스 */}
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-red-600">🥐</span>
                  <h4 className="font-bold text-red-800">마르셰 방문 꿀팁</h4>
                </div>
                <p className="text-red-700">
                  전통 시장은 토요일 오전이 가장 활기차요! 평일에는 문을 열지 않는 가게들도 많고, 
                  일요일 오후가 되면 대부분 일찍 문을 닫습니다. 그리고 현금을 꼭 준비해가세요 - 
                  작은 가게들은 카드를 받지 않는 곳이 많아요.
                </p>
              </div>
            </div>

            {/* Day 2 - 동네 카페 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-3xl font-bold text-gray-900">11구의 작은 카페에서</h2>
              </div>
              
              <div className="mb-8">
                <div className="h-80 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3')] bg-cover bg-center rounded-2xl mb-4"></div>
                <p className="text-sm text-gray-500 text-center italic">현지인들이 사랑하는 동네 카페의 모습</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                관광객들로 붐비는 1구를 벗어나 11구로 향했어요. 여기서 발견한 작은 카페 'Le Petit Grain'에서는 
                할머니 마들렌(Madeleine)이 직접 만든 크루아상을 맛볼 수 있었어요. 
                50년 넘게 이 동네에 살아온 할머니는 "진짜 파리는 바로 이런 곳에 있다"며 
                동네 곳곳의 숨겨진 이야기들을 들려주셨습니다.
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                특히 인상 깊었던 건, 매일 오후 3시에 이 카페에 모이는 동네 할아버지들이었어요. 
                체스를 두며 정치 이야기를 나누는 그들의 모습에서 파리의 진짜 일상을 볼 수 있었습니다.
              </p>
            </div>

            {/* 사진 갤러리 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📸 파리지앵의 일상</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-60 bg-[url('https://images.unsplash.com/photo-1558618047-3c8c76ca7997?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
                <div className="h-60 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
                <div className="h-60 bg-[url('https://images.unsplash.com/photo-1544986581-efac024faf62?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
              </div>
            </div>

            {/* Day 3 - 와인바 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-3xl font-bold text-gray-900">생제르맹의 와인바에서 만난 사람들</h2>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                저녁에는 생제르맹 데 프레의 작은 와인바 'Le Mary Celeste'를 찾았어요. 
                이곳에서 만난 건축가 폴과 화가 소피아는 "진짜 파리를 알려면 와인과 치즈를 이해해야 한다"며 
                3시간 동안 프랑스 와인의 역사부터 각 지역별 특징까지 열정적으로 설명해주었습니다.
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                특히 부르고뉴 지역의 피노 누아와 함께 먹은 생 마르셀랭 치즈의 조합은 정말 환상적이었어요. 
                "맛이 입안에서 춤을 춘다"는 표현이 정확히 맞더라구요!
              </p>
            </div>

            {/* 마무리 */}
            <div className="text-xl leading-relaxed text-gray-700 bg-gradient-to-r from-red-50 to-yellow-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🍷 여행을 마치며</h3>
              <p className="mb-4">
                파리에서의 8일은 관광이 아닌 진짜 '살기'를 체험하는 시간이었어요. 
                에펠탑보다 동네 마르셰가, 루브르보다 작은 카페가 더 특별한 기억으로 남았습니다.
              </p>
              <p className="mb-4">
                파리지앵들은 일상 속에서 아름다움을 찾는 데 정말 탁월해요. 
                간단한 아침식사도, 동네 카페에서의 커피 한 잔도 그들에게는 하나의 예술이더라구요.
              </p>
              <p className="font-semibold text-red-700">
                다음에 파리에 오신다면, 관광지도 좋지만 꼭 현지인처럼 살아보세요. 
                진짜 파리의 매력을 발견하실 수 있을 거예요! 🥐✨
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
              👍 좋아요 (42)
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
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">클</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">클레어 (Travel BOX 인증 여행자)</h4>
                <p className="text-gray-600 mb-3">
                  파리에서 2년간 거주하며 프랑스 문화에 푹 빠진 여행자입니다. 
                  관광지보다는 현지인들의 일상 속에서 진짜 여행의 맛을 찾아다니고 있어요.
                </p>
                <div className="flex space-x-2">
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">프랑스 거주 경험</span>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">로컬 라이프 전문가</span>
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
            <Link href="/stories/seoul-hidden-gems" className="group">
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Seoul Story</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    한국의 숨겨진 보석 같은 장소들
                  </h4>
                  <p className="text-gray-600 text-sm">현지인만 아는 서울의 특별한 명소들과 그곳에서 만난 소중한 경험들...</p>
                </div>
              </article>
            </Link>

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
          </div>
        </div>
      </section>
    </main>
  )
}


