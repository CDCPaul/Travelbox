# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소의 코드 작업 시 따를 가이드라인을 제공합니다.

## 프로젝트 개요

TypeScript와 Firebase로 구축된 Next.js 14 여행 예약 플랫폼 "Travel Box"입니다. 투어 예약을 위한 공개 웹사이트와 투어 및 예약 관리를 위한 관리자 대시보드를 제공합니다.

## 개발 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 린팅 실행
npm run lint

# 타입 체크
npm run type-check
```

## 아키텍처

### 인증 및 권한 관리
- 사용자 로그인/회원가입을 위한 Firebase Authentication
- 세션 쿠키를 확인하는 미들웨어(`src/middleware.ts`)로 보호되는 관리자 라우트
- 서버 사이드 작업을 위한 Admin Firebase SDK 설정 (`src/lib/firebase-admin.ts`)
- 브라우저 작업을 위한 Client Firebase SDK (`src/lib/firebase.ts`)

### 데이터 레이어
- TypeScript 인터페이스와 함께 `src/lib/products.ts`에서 관리되는 상품/투어 데이터
- 지속적인 데이터 저장을 위한 Firestore
- 이미지 자산을 위한 Firebase Storage
- 가격, 일정, 예약 조건을 포함한 상세한 상품 정보를 가진 정적 투어 데이터

### 프론트엔드 구조
- 레이아웃 컴포넌트(`src/app/layout.tsx`)를 사용한 App Router 아키텍처
- `/admin` 하위의 보호된 관리자 라우트
- `/auth` 하위의 인증 페이지
- `/tours/[id]`의 동적 투어 상세 페이지
- 예약 위젯, 갤러리, 네비게이션을 포함한 `src/components/` 내 재사용 가능한 컴포넌트

### 스타일링 및 UI
- 스타일링을 위한 Tailwind CSS
- `@/components`, `@/lib`, `@/types`에 대해 구성된 커스텀 경로 매핑
- 모바일 우선 접근 방식의 반응형 디자인
- Firebase Storage 도메인에 대해 구성된 이미지 최적화

## 환경 설정

`.env.local`에 필요한 환경 변수:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` 
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

관리자 작업용:
- `FIREBASE_ADMIN_PROJECT_ID` (또는 공개 버전으로 폴백)
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`

## Firebase 구성

- Asia Southeast 지역으로 구성된 Next.js용 Hosting
- 각각의 `.rules` 파일에 정의된 Firestore 및 Storage 규칙
- 프로덕션 배포를 위해 Firebase secrets로 관리되는 관리자 자격 증명

## 주요 기능

- 투어 탐색 및 상세 상품 페이지
- 다양한 방 구성(트윈/싱글/트리플)과의 가격 비교
- 날짜 선택이 가능한 예약 위젯
- 투어 관리를 위한 관리자 대시보드
- 인증으로 보호되는 관리자 라우트
- Firebase 배포 준비 완료