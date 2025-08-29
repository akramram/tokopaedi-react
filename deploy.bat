@echo off
setlocal enabledelayedexpansion

REM Deployment script for Tokopaedi Full-Stack Application (Windows)
REM This script helps deploy both frontend and backend components

echo ======================================
echo   Tokopaedi Deployment Script
echo ======================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [INFO] Checking dependencies...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Vercel CLI is not installed. Installing...
    npm install -g vercel
    if errorlevel 1 (
        echo [ERROR] Failed to install Vercel CLI.
        pause
        exit /b 1
    )
)

echo [INFO] All dependencies are available.
echo.

REM Deploy backend to Vercel
echo [INFO] Deploying backend to Vercel...
cd backend
vercel --prod
if errorlevel 1 (
    echo [ERROR] Backend deployment failed!
    pause
    exit /b 1
)
echo [INFO] Backend deployed successfully!
echo [WARNING] Please note the deployment URL and update frontend\.env.production
cd ..
echo.

REM Build frontend
echo [INFO] Building frontend for GitHub Pages...
cd frontend

REM Install dependencies
npm ci
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies!
    pause
    exit /b 1
)

REM Build the application
npm run export
if errorlevel 1 (
    echo [ERROR] Frontend build failed!
    pause
    exit /b 1
)

REM Add .nojekyll file
echo. > dist\.nojekyll

echo [INFO] Frontend built successfully!
echo [INFO] Built files are in frontend\dist\
cd ..
echo.

echo ======================================
echo [INFO] Deployment process completed!
echo ======================================
echo.
echo [WARNING] Next steps:
echo   Backend:
echo     1. Note the Vercel deployment URL
echo     2. Update frontend\.env.production with the backend URL
echo.
echo   Frontend:
echo     1. Commit and push changes to GitHub
echo     2. Enable GitHub Pages in repository settings
echo     3. Select 'GitHub Actions' as the source
echo     4. Your app will be available at: https://your-username.github.io/tokopaedi-react/
echo.
echo [INFO] For detailed instructions, see DEPLOYMENT.md
echo.
pause