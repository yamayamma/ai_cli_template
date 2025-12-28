#!/bin/bash
set -euo pipefail

# postCreateCommand.sh - Run after the container is created

echo "Running postCreateCommand..."

# Install Python dependencies with uv
if [ -d "src/py" ]; then
    echo "Installing Python dependencies with uv..."
    cd src/py
    uv sync
    cd ../..
fi

# Install TypeScript dependencies with pnpm
if [ -d "src/ts" ]; then
    echo "Installing TypeScript dependencies with pnpm..."
    cd src/ts
    pnpm install
    cd ../..
fi

# Display versions
echo ""
echo "=== Installed Tool Versions ==="
echo "Python: $(python --version)"
echo "uv: $(uv --version)"
echo "Node.js: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "gh: $(gh --version | head -n 1)"
echo "git: $(git --version)"
echo "================================"

echo "postCreateCommand completed"
