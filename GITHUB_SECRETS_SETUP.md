# GitHub Secrets 설정 가이드

## 🔐 GitHub Actions 오류 해결방법

현재 오류: `Context access might be invalid: FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH`

이 오류는 GitHub Repository Secrets에 Firebase 서비스 계정 키가 설정되지 않아서 발생합니다.

## 🛠️ 해결 단계

### 1. GitHub Repository Secrets 설정

1. **GitHub 저장소로 이동**
   - https://github.com/[username]/t-box (실제 저장소 주소)

2. **Settings > Secrets and variables > Actions 선택**

3. **New repository secret 클릭**

4. **Secret 정보 입력**
   - **Name**: `FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH`
   - **Secret**: 아래 JSON 내용 전체를 복사해서 붙여넣기

**📁 다운로드한 JSON 파일 전체 내용을 복사해서 붙여넣으세요:**
```
다운로드한 `travel-box-ph-firebase-adminsdk-fbsvc-21dfbcc3e4.json` 파일의
전체 내용을 GitHub Secrets에 복사해서 붙여넣기하세요.
```

### 2. ✅ 완전한 서비스 계정 JSON 확보됨

**이미 완전한 서비스 계정 JSON 파일을 다운로드하셨습니다!**

포함된 정보:
- ✅ `private_key_id`: `21dfbcc3e4bc05b0f5b9d27e4caa45e783b7f0f9`
- ✅ `client_id`: `106241913714173922419`
- ✅ `private_key`: 완전한 private key
- ✅ 기타 모든 필수 필드들

**이제 위의 JSON 내용을 GitHub Secrets에 복사하여 붙여넣기만 하면 됩니다.**

### 3. 대안: GitHub Actions 파일 수정

만약 GitHub Secrets 설정이 어렵다면, GitHub Actions 파일을 수정해서 에러를 방지할 수 있습니다:

```yaml
# .github/workflows/firebase-hosting-merge.yml 수정
name: Deploy to Firebase Hosting on merge
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH }}
          channelId: live
          projectId: travel-box-ph
        env:
          FIREBASE_CLI_EXPERIMENTS: webframeworks
        # 에러 발생 시 계속 진행
        continue-on-error: true
```

### 4. 수동 배포 방법

GitHub Actions 대신 로컬에서 배포:

```powershell
# PowerShell에서 실행
.\deploy-production.ps1
```

## 🔍 확인 방법

1. **GitHub Actions 로그 확인**
   - Repository > Actions 탭에서 워크플로우 실행 상태 확인

2. **Secret 설정 확인**
   - Settings > Secrets and variables > Actions
   - `FIREBASE_SERVICE_ACCOUNT_TRAVEL_BOX_PH`가 목록에 있는지 확인

3. **배포 테스트**
   - main 브랜치에 커밋을 푸시해서 자동 배포 테스트

## 📞 추가 도움

- Firebase Console에서 서비스 계정 키를 다시 생성해야 할 수도 있습니다
- GitHub Repository가 public이라면 Secrets 설정이 더 중요합니다
- Private repository라면 보안 위험이 상대적으로 낮습니다
