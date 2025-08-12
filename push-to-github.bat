@echo off
echo Pushing Subscription Manager to GitHub...

REM Initialize git repository
git init

REM Add all files
git add .

REM Create first commit
git commit -m "Initial commit: Subscription Manager with Node.js backend and HTML frontend"

REM Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/subscription-manager.git

REM Push to GitHub
git branch -M main
git push -u origin main

echo Project pushed to GitHub successfully!
pause