// 다국어 지원 시스템
export type Language = 'ko' | 'en'

export interface Translation {
  [key: string]: string | Translation
}

export interface Translations {
  ko: Translation
  en: Translation
}

// 번역 데이터
export const translations: Translations = {
  ko: {
    // 공통
    common: {
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      confirm: '확인',
      cancel: '취소',
      save: '저장',
      edit: '수정',
      delete: '삭제',
      search: '검색',
      filter: '필터',
      reset: '초기화',
      next: '다음',
      previous: '이전',
      home: '홈',
      about: '소개',
      contact: '연락처'
    },
    // 네비게이션
    nav: {
      home: '홈',
      destinations: '여행지',
      stories: '여행기',
      guides: '가이드',
      about: '소개',
      contact: '문의하기',
      language: '언어'
    },
    // 메인 페이지
    home: {
      hero: {
        title: '꿈꾸던 여행이 시작됩니다',
        subtitle: '세상을 탐험하는 새로운 방법',
        description: '특별한 순간들로 가득한 여행, Travel BOX와 함께 떠나보세요',
        cta: '여행 시작하기'
      },
      featured: {
        title: 'Travel BOX 추천 여행지',
        subtitle: '전문가가 직접 다녀온 인증된 여행지들'
      },
      destinations: {
        title: '인기 여행 목적지',
        korea: {
          name: '대한민국',
          description: 'K-culture의 본고장에서 느끼는 특별함'
        },
        japan: {
          name: '일본',
          description: '전통과 현대가 공존하는 매력적인 섬나라'
        },
        europe: {
          name: '유럽',
          description: '역사와 문화가 살아 숨쉬는 대륙'
        },
        asia: {
          name: '아시아',
          description: '다양성과 활력이 넘치는 아시아 여행'
        }
      },
      stories: {
        title: '여행 스토리',
        subtitle: 'Travel BOX 여행자들의 생생한 이야기',
        readMore: '더 읽기',
        seoul: {
          title: '한국의 숨겨진 보석 같은 장소들',
          description: '현지인만 아는 서울의 특별한 명소들과 그곳에서 만난 소중한 경험들...'
        },
        kyoto: {
          title: '교토에서 만난 일본의 전통미',
          description: '천년 고도 교토에서 경험한 일본 문화의 깊이와 아름다움...'
        },
        paris: {
          title: '파리 뒷골목에서 찾은 진짜 프랑스',
          description: '관광지가 아닌 현지인의 삶 속에서 발견한 파리의 진면목...'
        }
      },
      certification: {
        title: 'Travel BOX 인증',
        description: '전문가가 직접 검증한 진짜 여행지만을 소개합니다',
        learnMore: '더 알아보기'
      }
    },
    // 푸터
    footer: {
      description: 'Travel BOX와 함께 세계를 탐험하세요',
      quickLinks: '빠른 링크',
      destinations: '여행지',
      support: '고객지원',
      company: '회사 소개',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      rights: '모든 권리 보유'
    }
  },
  en: {
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      reset: 'Reset',
      next: 'Next',
      previous: 'Previous',
      home: 'Home',
      about: 'About',
      contact: 'Contact'
    },
    // Navigation
    nav: {
      home: 'Home',
      destinations: 'Destinations',
      stories: 'Stories',
      guides: 'Guides',
      about: 'About',
      contact: 'Contact',
      language: 'Language'
    },
    // Home Page
    home: {
      hero: {
        title: 'Your Adventure Awaits',
        subtitle: 'Explore the World in Style',
        description: 'Create unforgettable memories with carefully curated travel experiences',
        cta: 'Start Your Journey'
      },
      featured: {
        title: 'Travel BOX Recommended Destinations',
        subtitle: 'Certified destinations personally visited by our experts'
      },
      destinations: {
        title: 'Popular Travel Destinations',
        korea: {
          name: 'South Korea',
          description: 'Experience the unique charm of K-culture homeland'
        },
        japan: {
          name: 'Japan',
          description: 'Fascinating island nation where tradition meets modernity'
        },
        europe: {
          name: 'Europe',
          description: 'A continent where history and culture come alive'
        },
        asia: {
          name: 'Asia',
          description: 'Diverse and vibrant Asian travel experiences'
        }
      },
      stories: {
        title: 'Travel Stories',
        subtitle: 'Real stories from Travel BOX travelers',
        readMore: 'Read More',
        seoul: {
          title: 'Hidden Gems of Korea',
          description: 'Special places in Seoul known only to locals and the precious experiences we found there...'
        },
        kyoto: {
          title: 'Traditional Beauty of Japan in Kyoto',
          description: 'The depth and beauty of Japanese culture experienced in the thousand-year-old capital of Kyoto...'
        },
        paris: {
          title: 'Real France Found in Paris Back Alleys',
          description: 'The true face of Paris discovered in the lives of locals, not tourist attractions...'
        }
      },
      certification: {
        title: 'Travel BOX Certification',
        description: 'We introduce only authentic destinations verified by our experts',
        learnMore: 'Learn More'
      }
    },
    // Footer
    footer: {
      description: 'Explore the world with Travel BOX',
      quickLinks: 'Quick Links',
      destinations: 'Destinations',
      support: 'Support',
      company: 'Company',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: 'All rights reserved'
    }
  }
}

// 번역 함수
export function getNestedTranslation(obj: Translation, path: string): string {
  const keys = path.split('.')
  let current: any = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return path // 번역이 없으면 키 반환
    }
  }
  
  return typeof current === 'string' ? current : path
}

export function translate(language: Language, key: string): string {
  return getNestedTranslation(translations[language], key)
}


