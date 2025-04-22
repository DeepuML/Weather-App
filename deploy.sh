#!/bin/bash

# Variables
STACK_NAME="my_stack"
COMPOSE_FILE="docker-compose.yml"

# Function to clean up existing stack and swarm
cleanup() {
    echo "Cleaning up existing stack and swarm..."
    
    # Remove existing stack if it exists
    if docker stack ls | grep -q "$STACK_NAME"; then
        echo "Removing existing stack..."
        docker stack rm "$STACK_NAME"
        sleep 10
    fi

    # Leave swarm if part of one
    if docker info | grep -q "Swarm: active"; then
        echo "Leaving existing swarm..."
        docker swarm leave --force
        sleep 5
    fi
}

# Main deployment process
echo "Starting deployment process..."

# Clean up existing deployment
cleanup

# Initialize new swarm
echo "Initializing new swarm..."
docker swarm init

# Deploy stack
echo "Deploying stack '$STACK_NAME'..."
docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"

echo "Deployment completed successfully!"