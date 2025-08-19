# GitHub Secrets 설정 단계별 가이드

## 🔐 GitHub에서 Secret 설정하는 방법 (상세 단계)

### 1단계: GitHub 저장소 페이지로 이동
- 웹브라우저에서 GitHub에 로그인
- 본인의 `t-box` 저장소로 이동
- 주소: `https://github.com/[본인계정명]/t-box`

### 2단계: Settings 메뉴 찾기
- 저장소 페이지 상단에 탭들이 있습니다: `Code`, `Issues`, `Pull requests`, `Actions`, `Projects`, `Wiki`, `Security`, `Insights`, `Settings`
- **맨 오른쪽에 있는 `Settings` 탭 클릭**

### 3단계: Secrets 메뉴로 이동
- Settings 페이지 왼쪽 사이드바에서 아래로 스크롤
- **Security** 섹션 아래에 있는 **`Secrets and variables`** 클릭
- 드롭다운이 열리면 **`Actions`** 클릭

### 4단계: 새 Secret 생성
- "Repository secrets" 섹션에서 **`New repository secret`** 버튼 클릭 (녹색 버튼)

### 5단계: Secret 정보 입력
#### Name 필드:
```
FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH
```

#### Secret 필드 (아래 JSON 전체 복사해서 붙여넣기):
**📁 다운로드한 JSON 파일 전체 내용:**
```
Downloads 폴더에 있는 
travel-box-ph-firebase-adminsdk-fbsvc-21dfbcc3e4.json 
파일을 열어서 전체 내용을 복사해서 붙여넣으세요.
```

### 6단계: Secret 저장
- **`Add secret`** 버튼 클릭 (녹색 버튼)

### 7단계: 설정 확인
- Repository secrets 목록에서 `FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH`가 생성된 것을 확인
- Secret 내용은 보안상 보이지 않고 이름만 표시됩니다

## 🎯 완료 후 테스트

### 자동 배포 테스트:
```bash
git add .
git commit -m "GitHub Secrets 설정 완료"
git push origin main
```

### GitHub Actions 확인:
- GitHub 저장소 > Actions 탭
- 최근 워크플로우 실행 상태 확인
- 이제 Firebase 배포가 정상적으로 실행됩니다

## ⚠️ 주의사항

### 절대 하지 말아야 할 것:
- Secret 내용을 코드에 직접 작성하지 마세요
- Secret을 공개 채널에 공유하지 마세요
- GitHub Issues나 Pull Request에 Secret 내용 작성 금지

### 보안 팁:
- Secret은 한 번 저장되면 내용을 다시 볼 수 없습니다
- 필요시 Secret을 삭제하고 다시 생성해야 합니다
- Organization 레벨에서도 Secret 관리 가능합니다

## 🚨 문제 해결

### Secret이 작동하지 않는 경우:
1. Secret 이름 정확히 확인: `FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH`
2. JSON 형식이 올바른지 확인 (중괄호, 쉼표 등)
3. 권한 문제: Repository 소유자 또는 Admin 권한 필요
4. Branch protection: main 브랜치에 보호 규칙이 있는지 확인

### Actions 권한 문제:
- Settings > Actions > General
- "Allow all actions and reusable workflows" 선택
- "Allow GitHub Actions to create and approve pull requests" 체크

## 🔍 확인 방법

### 1. Secret 목록에서 확인:
- Settings > Secrets and variables > Actions
- `FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH` 존재 확인

### 2. Actions 로그에서 확인:
- Actions 탭에서 워크플로우 실행
- "Deploy to Firebase Hosting" 단계가 실행되는지 확인

### 3. 배포 결과 확인:
- https://travel-box-ph.web.app 접속
- 구글 로그인 테스트
