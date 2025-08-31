'use client'

import Link from 'next/link'

export default function KyotoTraditionStory() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🎨 히어로 섹션 - 매거진 스타일 */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
          </div>
        </div>

        {/* 히어로 컨텐츠 */}
        <div className="relative z-10 text-white px-4 sm:px-6 lg:px-8 pb-20 max-w-4xl mx-auto">
          {/* 카테고리 배지 */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Kyoto Story</span>
            </div>
            <div className="text-sm text-white/70">📍 교토, 일본</div>
            <div className="text-sm text-white/70">📅 2024.02.10-16</div>
            <div className="text-sm text-white/70">⏰ 12분 읽기</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            교토에서 만난<br />일본의 전통미
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light max-w-2xl">
            천년 고도 교토에서 경험한 일본 문화의 깊이와 아름다움
          </p>

          {/* 작성자 정보 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">미</span>
            </div>
            <div>
              <div className="font-semibold">미야코</div>
              <div className="text-white/70 text-sm">Travel BOX 인증 여행자 • 일본 문화 애호가</div>
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
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">🏯 여행 요약</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">🏯</span>
                </div>
                <div className="text-sm text-gray-500">위치</div>
                <div className="font-semibold">교토, 일본</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">🌸</span>
                </div>
                <div className="text-sm text-gray-500">기간</div>
                <div className="font-semibold">6박 7일</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">💰</span>
                </div>
                <div className="text-sm text-gray-500">예산</div>
                <div className="font-semibold">약 120만원</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white">👘</span>
                </div>
                <div className="text-sm text-gray-500">여행타입</div>
                <div className="font-semibold">문화 체험</div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#전통문화</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#기모노체험</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#다도수업</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#템플스테이</span>
              <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">#정원산책</span>
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
              교토는 단순한 관광지가 아니라, 살아있는 역사 박물관입니다. 
              1000년이 넘는 시간 동안 일본의 수도였던 이곳에서는 지금도 전통이 일상 속에 자연스럽게 스며들어 있어요. 
              이번 여행에서는 그런 교토의 진짜 모습을 깊이 체험해보았습니다.
            </div>

            {/* Day 1 - 기모노 체험 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-3xl font-bold text-gray-900">기모노 입고 걷는 교토</h2>
              </div>
              
              <div className="mb-8">
                <div className="h-80 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3')] bg-cover bg-center rounded-2xl mb-4"></div>
                <p className="text-sm text-gray-500 text-center italic">기온 거리를 걷는 기모노 입은 모습</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                교토 여행의 첫날, 기온 거리 근처의 작은 기모노 대여점에서 전통 기모노를 입어보았습니다. 
                처음엔 어색했지만, 기모노를 입고 교토의 돌길을 걸으면서 마치 시간을 거슬러 올라간 것 같은 
                신기한 기분을 느꼈어요. 특히 기요미즈데라로 이어지는 산넨자카, 니넨자카 계단길에서는 
                정말 많은 사람들이 사진을 찍어달라고 하더라구요.
              </p>

              {/* 꿀팁 박스 */}
              <div className="bg-pink-50 border-l-4 border-pink-400 p-6 rounded-r-lg mb-8">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-pink-600">👘</span>
                  <h4 className="font-bold text-pink-800">기모노 체험 꿀팁</h4>
                </div>
                <p className="text-pink-700">
                  기모노는 오전 일찍 대여하세요! 오후가 되면 인기 있는 디자인은 다 나가고, 
                  사진 명소들도 사람이 너무 많아져서 예쁜 사진 찍기가 어려워요. 
                  그리고 편한 신발을 꼭 챙겨가세요 - 게타(일본 전통신발)는 생각보다 불편해요!
                </p>
              </div>
            </div>

            {/* Day 2 - 다도 수업 */}
            <div className="mb-16">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-3xl font-bold text-gray-900">다도 선생님과의 만남</h2>
              </div>
              
              <div className="mb-8">
                <div className="h-80 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3')] bg-cover bg-center rounded-2xl mb-4"></div>
                <p className="text-sm text-gray-500 text-center italic">전통 다실에서의 다도 수업 모습</p>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                둘째 날에는 우라센케 차도회관에서 정식 다도 수업을 받았습니다. 
                70대의 다도 선생님께서 한 동작 한 동작 정성스럽게 가르쳐주셨는데, 
                단순히 차를 우리는 것이 아니라 상대방을 존중하고 정성을 다하는 마음가짐을 
                배우는 시간이었어요. "이치고 이치에(一期一会)" - 일생에 한 번뿐인 만남이라는 뜻으로, 
                매 순간을 소중히 여기라는 가르침이 특히 인상 깊었습니다.
              </p>
            </div>

            {/* 사진 갤러리 */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📸 교토의 사계절</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="h-72 bg-[url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
                <div className="h-72 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
              </div>
              <div className="h-60 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3')] bg-cover bg-center rounded-xl"></div>
            </div>

            {/* 마무리 */}
            <div className="text-xl leading-relaxed text-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌸 여행을 마치며</h3>
              <p className="mb-4">
                교토에서의 일주일은 단순한 여행이 아니라 일본 전통 문화에 대한 깊은 이해의 시간이었습니다. 
                특히 다도 선생님께서 해주신 "마음을 비우고 현재에 집중하라"는 말씀이 아직도 기억에 남아있어요.
              </p>
              <p className="mb-4">
                교토는 빠르게 변화하는 현대 사회에서 잊혀져가는 '느림의 미학'과 '정성의 가치'를 
                일깨워주는 특별한 도시였습니다.
              </p>
              <p className="font-semibold text-purple-700">
                "이치고 이치에" - 여러분도 교토에서 평생 잊지 못할 특별한 만남을 경험해보세요. 🏯
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
              👍 좋아요 (31)
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
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">미</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">미야코 (Travel BOX 인증 여행자)</h4>
                <p className="text-gray-600 mb-3">
                  일본 전통 문화를 사랑하는 여행자입니다. 다도와 꽃꽂이를 배우며 
                  일본의 정신문화에 매료되어 매년 교토를 방문하고 있어요.
                </p>
                <div className="flex space-x-2">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">일본 전문가</span>
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">문화 체험 러버</span>
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


