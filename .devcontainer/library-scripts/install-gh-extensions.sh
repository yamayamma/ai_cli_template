#!/bin/bash
set -euo pipefail

# Install useful GitHub CLI extensions

echo "Installing GitHub CLI extensions..."

# GitHub Copilot CLI extension
gh extension install github/gh-copilot || echo "gh-copilot extension already installed or failed"

echo "GitHub CLI extensions installed successfully"
