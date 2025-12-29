#!/bin/bash
set -euo pipefail

# onCreateCommand.sh - Run once when the container is first created

echo "Running onCreateCommand..."

# Set proper permissions for scripts
chmod +x /workspaces/*/scripts/*.sh 2>/dev/null || true

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

echo "onCreateCommand completed"
