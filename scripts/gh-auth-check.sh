#!/bin/bash
set -euo pipefail

# Check GitHub CLI authentication status

echo "=== GitHub CLI Authentication Check ==="
echo ""

if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

echo "Checking authentication status..."
echo ""

if gh auth status 2>&1; then
    echo ""
    echo "✓ GitHub CLI is authenticated"
    exit 0
else
    echo ""
    echo "✗ GitHub CLI is not authenticated"
    echo ""
    echo "To authenticate, run:"
    echo "  gh auth login"
    echo ""
    exit 1
fi
