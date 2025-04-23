@echo off
setlocal EnableDelayedExpansion

REM Variables
set VERSION_FILE=version.txt
set DOCKER_USERNAME=deepubhai
set CLIENT_IMAGE_NAME=weather-app

REM Ensure version file exists
if not exist "%VERSION_FILE%" (
    echo 0.1.0 > "%VERSION_FILE%"
)

REM Read version from file
set /p VERSION=<"%VERSION_FILE%"
for /f "tokens=1-3 delims=." %%a in ("%VERSION%") do (
    set /a patch=%%c + 1
    set NEW_VERSION=%%a.%%b.!patch!
)

REM Update version file
echo %NEW_VERSION% > "%VERSION_FILE%"

REM Build Docker images
echo Building Docker images...
docker build -t %DOCKER_USERNAME%/%CLIENT_IMAGE_NAME%:latest -t %DOCKER_USERNAME%/%CLIENT_IMAGE_NAME%:%NEW_VERSION% .

REM Push Docker images to Docker Hub
echo Pushing Docker images to Docker Hub...
docker push %DOCKER_USERNAME%/%CLIENT_IMAGE_NAME%:latest
docker push %DOCKER_USERNAME%/%CLIENT_IMAGE_NAME%:%NEW_VERSION%

echo Docker images built and pushed successfully!
