#!/bin/bash
set -euo pipefail

# postCreateCommand.sh - Run after the container is created

echo "Running postCreateCommand..."

# Install Python dependencies with uv
if [ -d "src/py" ]; then
    echo "Installing Python 3.12 and dependencies with uv..."
    cd src/py
    
    # Install Python 3.12 if not already available
    echo "Installing Python 3.12..."
    uv python install 3.12
    
    # Create virtual environment and install dependencies
    echo "Creating virtual environment and installing dependencies..."
    uv sync
    
    cd ../..
    echo "Python setup complete"
fi

# Install TypeScript dependencies with pnpm
if [ -d "src/ts" ]; then
    echo "Installing TypeScript dependencies with pnpm..."
    cd src/ts
    pnpm install
    cd ../..
    echo "TypeScript setup complete"
fi

# Display versions
echo ""
echo "=== Installed Tool Versions ==="
echo "Python (system): $(python3 --version 2>&1 || echo 'not available')"
echo "Python (uv managed): $(src/py/.venv/bin/python --version 2>&1 || echo 'not yet installed')"
echo "uv: $(uv --version)"
echo "Node.js: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "gh: $(gh --version | head -n 1)"
echo "git: $(git --version)"
echo "================================"

echo "postCreateCommand completed successfully"
