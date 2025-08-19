# Firebase 프로덕션 배포 스크립트 (PowerShell)
# Windows 환경에서 사용

Write-Host "🔥 Firebase 프로덕션 배포 시작..." -ForegroundColor Green

# 1. 환경변수 확인
Write-Host "`n1. 환경변수 확인..." -ForegroundColor Yellow
$envVars = @(
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", 
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID"
)

foreach ($env in $envVars) {
    $value = [Environment]::GetEnvironmentVariable($env)
    if ($value) {
        Write-Host "✅ $env = $($value.Substring(0, [Math]::Min(20, $value.Length)))..." -ForegroundColor Green
    } else {
        Write-Host "❌ $env 환경변수가 설정되지 않았습니다" -ForegroundColor Red
    }
}

# 2. .env.production 파일 확인
Write-Host "`n2. .env.production 파일 확인..." -ForegroundColor Yellow
if (Test-Path ".env.production") {
    Write-Host "✅ .env.production 파일이 존재합니다" -ForegroundColor Green
    $content = Get-Content ".env.production" | Select-Object -First 5
    Write-Host "파일 내용 (첫 5줄):" -ForegroundColor Gray
    $content | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} else {
    Write-Host "❌ .env.production 파일이 없습니다" -ForegroundColor Red
    Write-Host "   .env.local을 .env.production으로 복사하시겠습니까? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "Y" -or $response -eq "y") {
        Copy-Item ".env.local" ".env.production"
        Write-Host "✅ .env.production 파일이 생성되었습니다" -ForegroundColor Green
    }
}

# 3. Firebase 로그인 확인
Write-Host "`n3. Firebase 로그인 확인..." -ForegroundColor Yellow
try {
    $firebaseUser = firebase auth:export --help 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Firebase CLI 인증 완료" -ForegroundColor Green
    } else {
        throw "Not authenticated"
    }
} catch {
    Write-Host "❌ Firebase CLI 인증이 필요합니다" -ForegroundColor Red
    Write-Host "firebase login 명령어를 실행하세요" -ForegroundColor Yellow
    Read-Host "로그인 후 Enter를 누르세요"
}

# 4. 프로젝트 설정 확인
Write-Host "`n4. Firebase 프로젝트 확인..." -ForegroundColor Yellow
try {
    firebase projects:list | Out-Null
    $currentProject = firebase use --current 2>$null
    Write-Host "✅ 현재 Firebase 프로젝트: $currentProject" -ForegroundColor Green
} catch {
    Write-Host "❌ Firebase 프로젝트 설정 오류" -ForegroundColor Red
    Write-Host "firebase use <project-id> 명령어로 프로젝트를 선택하세요" -ForegroundColor Yellow
    return
}

# 5. 빌드 실행
Write-Host "`n5. Next.js 애플리케이션 빌드..." -ForegroundColor Yellow
$env:NODE_ENV = "production"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 빌드 실패" -ForegroundColor Red
    return
}
Write-Host "✅ 빌드 완료" -ForegroundColor Green

# 6. Firebase Functions 배포 (있는 경우)
if (Test-Path "functions") {
    Write-Host "`n6. Firebase Functions 배포..." -ForegroundColor Yellow
    firebase deploy --only functions
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Functions 배포 실패, 계속 진행합니다" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Functions 배포 완료" -ForegroundColor Green
    }
}

# 7. Hosting 배포
Write-Host "`n7. Firebase Hosting 배포..." -ForegroundColor Yellow
firebase deploy --only hosting
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Hosting 배포 실패" -ForegroundColor Red
    return
}

Write-Host "`n🎉 배포 완료!" -ForegroundColor Green
Write-Host "배포된 사이트: https://travel-box-ph.web.app" -ForegroundColor Cyan
Write-Host "`n배포 후 확인사항:" -ForegroundColor Yellow
Write-Host "1. 사이트에 접속하여 로그인 테스트" -ForegroundColor White
Write-Host "2. 구글 로그인 기능 확인" -ForegroundColor White  
Write-Host "3. 관리자 페이지 접근 확인" -ForegroundColor White
Write-Host "`n문제 발생 시:" -ForegroundColor Yellow
Write-Host "firebase functions:log --follow   # 실시간 로그 확인" -ForegroundColor Gray
