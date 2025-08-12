@echo off
echo Running SonarQube Analysis...

REM Download SonarScanner if not exists
if not exist sonar-scanner (
    echo Downloading SonarScanner...
    curl -L -o sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-windows.zip
    powershell -command "Expand-Archive sonar-scanner.zip -DestinationPath ."
    ren sonar-scanner-4.8.0.2856-windows sonar-scanner
)

REM Run analysis
sonar-scanner\bin\sonar-scanner.bat -Dsonar.login=YOUR_SONAR_TOKEN

pause