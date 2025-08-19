# 미들웨어 테스트 스크립트 (PowerShell)
# Windows 환경에서 사용

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("disable", "enable", "status")]
    [string]$Action = "status"
)

Write-Host "🔧 미들웨어 테스트 도구" -ForegroundColor Green

function Show-MiddlewareStatus {
    Write-Host "`n현재 미들웨어 상태:" -ForegroundColor Yellow
    
    if (Test-Path "src/middleware.ts") {
        $content = Get-Content "src/middleware.ts" -Raw
        if ($content -match "matcher:\s*\[\]") {
            Write-Host "❌ 미들웨어가 비활성화되어 있습니다 (빈 matcher)" -ForegroundColor Red
        } elseif ($content -match "allowing all requests") {
            Write-Host "❌ 미들웨어가 비활성화되어 있습니다 (disabled 버전)" -ForegroundColor Red
        } else {
            Write-Host "✅ 미들웨어가 활성화되어 있습니다" -ForegroundColor Green
        }
        
        # 매칭 규칙 표시
        if ($content -match "matcher:\s*\[(.*?)\]") {
            $matcher = $matches[1].Trim()
            Write-Host "매칭 규칙: $matcher" -ForegroundColor Gray
        }
    } else {
        Write-Host "❌ middleware.ts 파일이 없습니다" -ForegroundColor Red
    }
    
    # 백업 파일들 확인
    Write-Host "`n백업 파일들:" -ForegroundColor Yellow
    @("src/middleware.backup.ts", "src/middleware.disabled.ts") | ForEach-Object {
        if (Test-Path $_) {
            Write-Host "✅ $_ 존재" -ForegroundColor Green
        } else {
            Write-Host "❌ $_ 없음" -ForegroundColor Red
        }
    }
}

function Disable-Middleware {
    Write-Host "`n미들웨어 비활성화 중..." -ForegroundColor Yellow
    
    # 1. 현재 미들웨어를 백업
    if (Test-Path "src/middleware.ts") {
        if (!(Test-Path "src/middleware.backup.ts")) {
            Copy-Item "src/middleware.ts" "src/middleware.backup.ts"
            Write-Host "✅ 현재 미들웨어를 backup으로 저장했습니다" -ForegroundColor Green
        } else {
            Write-Host "⚠️  백업 파일이 이미 존재합니다" -ForegroundColor Yellow
        }
    }
    
    # 2. 비활성화된 미들웨어로 교체
    if (Test-Path "src/middleware.disabled.ts") {
        Copy-Item "src/middleware.disabled.ts" "src/middleware.ts"
        Write-Host "✅ 미들웨어가 비활성화되었습니다" -ForegroundColor Green
    } else {
        Write-Host "❌ middleware.disabled.ts 파일이 없습니다" -ForegroundColor Red
        return
    }
    
    Write-Host "`n테스트 방법:" -ForegroundColor Cyan
    Write-Host "1. npm run dev" -ForegroundColor White
    Write-Host "2. http://localhost:3000/admin 직접 접근" -ForegroundColor White
    Write-Host "3. 로그인 없이 접근 가능한지 확인" -ForegroundColor White
}

function Enable-Middleware {
    Write-Host "`n미들웨어 활성화 중..." -ForegroundColor Yellow
    
    if (Test-Path "src/middleware.backup.ts") {
        Copy-Item "src/middleware.backup.ts" "src/middleware.ts"
        Write-Host "✅ 원본 미들웨어가 복원되었습니다" -ForegroundColor Green
        
        # 백업 파일 정리 여부 묻기
        Write-Host "백업 파일을 삭제하시겠습니까? (Y/N)" -ForegroundColor Yellow
        $response = Read-Host
        if ($response -eq "Y" -or $response -eq "y") {
            Remove-Item "src/middleware.backup.ts"
            Write-Host "✅ 백업 파일이 삭제되었습니다" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ 백업 파일 (middleware.backup.ts)이 없습니다" -ForegroundColor Red
        Write-Host "   수동으로 미들웨어를 복원해야 합니다" -ForegroundColor Yellow
    }
}

# 메인 로직
switch ($Action) {
    "disable" { 
        Disable-Middleware 
        Show-MiddlewareStatus
    }
    "enable" { 
        Enable-Middleware 
        Show-MiddlewareStatus
    }
    "status" { 
        Show-MiddlewareStatus 
    }
}

Write-Host "`n사용법:" -ForegroundColor Cyan
Write-Host ".\test-middleware.ps1 disable   # 미들웨어 비활성화" -ForegroundColor White
Write-Host ".\test-middleware.ps1 enable    # 미들웨어 활성화" -ForegroundColor White
Write-Host ".\test-middleware.ps1 status    # 현재 상태 확인" -ForegroundColor White

Write-Host "`n주의사항:" -ForegroundColor Yellow
Write-Host "• 미들웨어 변경 후에는 개발 서버를 재시작하세요" -ForegroundColor White
Write-Host "• 테스트 완료 후 반드시 미들웨어를 다시 활성화하세요" -ForegroundColor White
