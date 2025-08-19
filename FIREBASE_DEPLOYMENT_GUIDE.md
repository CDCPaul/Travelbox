# Firebase 배포 환경변수 설정 가이드

## 🔥 현재 문제점 및 해결방안

### 문제 1: Firebase Hosting vs App Hosting
현재 프로젝트는 Firebase Hosting을 사용하고 있지만, Context7 최신 문서에 따르면 **Firebase App Hosting**이 환경변수 관리에 더 적합합니다.

### 문제 2: 환경변수 설정 불일치
- 개발환경: placeholder 값들 사용
- 프로덕션: 실제 값들 필요

## 🚀 해결방안

### 1. Firebase App Hosting으로 전환 (권장)

#### 1-1. apphosting.yaml 파일 사용
```yaml
# apphosting.yaml 파일이 생성되었습니다
# 환경변수가 BUILD와 RUNTIME에 모두 적용되도록 설정
```

#### 1-2. Firebase Secret Manager 설정
민감한 정보 (Private Key)를 안전하게 저장:

```powershell
# Secret Manager에 private key 저장
firebase functions:secrets:set firebase-admin-private-key
# 프롬프트에서 private key 내용 붙여넣기

# Secret 확인
firebase functions:secrets:access firebase-admin-private-key
```

#### 1-3. 배포 명령어
```powershell
# App Hosting으로 배포
firebase deploy --only hosting

# 또는 전체 배포
firebase deploy
```

### 2. 현재 Firebase Hosting 유지하는 경우

#### 2-1. 환경변수를 빌드 시점에 주입
```powershell
# 환경변수 설정 후 빌드
$env:NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyDsqqxnrCMNG5tXlp2-j6D-ZLWvIP6XSkI"
$env:NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="travel-box-ph.firebaseapp.com"
# ... 기타 환경변수들

npm run build
firebase deploy --only hosting
```

#### 2-2. firebase.json에서 환경변수 설정
```json
{
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "asia-southeast1",
      "dotenv": ".env.production"
    }
  }
}
```

## 🔧 미들웨어 테스트 방법

### 방법 1: 미들웨어 임시 비활성화
```powershell
# 현재 미들웨어 백업
mv src/middleware.ts src/middleware.backup.ts

# 비활성화된 미들웨어로 교체
mv src/middleware.disabled.ts src/middleware.ts

# 테스트 후 원복
mv src/middleware.ts src/middleware.disabled.ts
mv src/middleware.backup.ts src/middleware.ts
```

### 방법 2: 미들웨어 매칭 규칙 수정
```typescript
// src/middleware.ts에서 config 부분만 수정
export const config = {
  matcher: [] // 빈 배열로 설정하여 미들웨어 비활성화
}
```

## 🚨 주의사항

### 1. 보안
- Private Key는 반드시 Secret Manager 사용
- GitHub에 실제 키 값들이 커밋되지 않도록 주의
- .env.local은 .gitignore에 추가

### 2. 환경변수 우선순위
Next.js에서의 환경변수 로딩 순서:
1. `.env.production.local` (프로덕션에서만)
2. `.env.production`
3. `.env.local`
4. `.env`

### 3. NEXT_PUBLIC_ 접두사
- 브라우저에서 접근 가능한 환경변수에만 사용
- 민감한 정보에는 절대 사용하지 말 것

## 📋 체크리스트

- [ ] apphosting.yaml 파일 설정 완료
- [ ] Firebase Secret Manager에 private key 저장
- [ ] .env.production 파일 확인
- [ ] 미들웨어 테스트 준비 완료
- [ ] Firebase CLI 최신 버전 확인
- [ ] 배포 전 로컬 테스트 완료

## 🔍 디버깅 방법

### 1. 로그 확인
```powershell
# Firebase 함수 로그 확인
firebase functions:log

# 실시간 로그 확인
firebase functions:log --follow
```

### 2. 환경변수 확인
브라우저 개발자 도구에서:
```javascript
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});
```

## 📞 추가 도움이 필요한 경우

1. Firebase 콘솔에서 Authentication 설정 확인
2. Google Cloud Console에서 OAuth 2.0 클라이언트 ID 설정 확인
3. 도메인 승인 목록 확인 (Authorized domains)
