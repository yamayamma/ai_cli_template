#!/bin/bash
set -euo pipefail

# Install GitHub CLI from official apt repository
# https://github.com/cli/cli/blob/trunk/docs/install_linux.md

echo "Installing GitHub CLI..."

# Detect architecture
ARCH=$(dpkg --print-architecture)
echo "Detected architecture: $ARCH"

# Add GitHub CLI repository
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$ARCH signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# Update and install gh
apt-get update
apt-get install -y gh
apt-get clean
rm -rf /var/lib/apt/lists/*

echo "GitHub CLI installed successfully"
gh --version
