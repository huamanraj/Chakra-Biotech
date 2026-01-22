# Quick Setup Script for Chakra Biotech

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Chakra Biotech - Database Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Navigate to backend directory
Set-Location -Path "backend"

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "`n🌱 Seeding database..." -ForegroundColor Yellow
node scripts/seedDatabase.js

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Start backend: npm run dev" -ForegroundColor White
Write-Host "   2. Start admin panel: cd ../admin-frontend && npm run dev" -ForegroundColor White
Write-Host "   3. Start frontend: cd ../frontend && npm run dev" -ForegroundColor White
Write-Host "`n🔑 Login credentials will be shown in the seed output above`n" -ForegroundColor Cyan

# Return to root
Set-Location -Path ".."
