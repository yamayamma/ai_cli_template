#!/bin/bash
set -euo pipefail

# Install Node.js 20 LTS
# https://github.com/nodesource/distributions

echo "Installing Node.js 20 LTS..."

# Detect architecture
ARCH=$(dpkg --print-architecture)
echo "Detected architecture: $ARCH"

if [ "$ARCH" = "arm64" ]; then
    NODE_ARCH="arm64"
elif [ "$ARCH" = "amd64" ]; then
    NODE_ARCH="x64"
else
    echo "Unsupported architecture: $ARCH"
    exit 1
fi

# Download and install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
apt-get clean
rm -rf /var/lib/apt/lists/*

echo "Node.js installed successfully"
node --version
npm --version
