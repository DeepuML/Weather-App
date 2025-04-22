#!/bin/bash

# Variables
VERSION_FILE="version.txt"
DOCKER_USERNAME="deepubahi"
API_IMAGE_NAME="weather-app"

# Ensure version file exists
if [ ! -f "$VERSION_FILE" ]; then
    echo "0.1.0" > "$VERSION_FILE"
fi

# Read version from file
VERSION=$(cat "$VERSION_FILE")

# Increment version (simple patch increment)
IFS='.' read -r major minor patch <<< "$VERSION"
patch=$((patch + 1))
NEW_VERSION="$major.$minor.$patch"

# Update version file
echo "$NEW_VERSION" > "$VERSION_FILE"

# Build Docker images
echo "Building Docker images..."
docker build -t "$DOCKER_USERNAME/$API_IMAGE_NAME:latest" -t "$DOCKER_USERNAME/$API_IMAGE_NAME:$NEW_VERSION" ./api

# Push Docker images to Docker Hub
echo "Pushing Docker images to Docker Hub..."
docker push "$DOCKER_USERNAME/$API_IMAGE_NAME:latest"
docker push "$DOCKER_USERNAME/$API_IMAGE_NAME:$NEW_VERSION"

echo "Docker images built and pushed successfully!"