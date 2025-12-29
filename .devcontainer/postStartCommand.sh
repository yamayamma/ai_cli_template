#!/bin/bash
set -euo pipefail

# postStartCommand.sh - Run every time the container starts

echo "Running postStartCommand..."

# Check gh auth status
echo ""
echo "=== GitHub CLI Authentication ==="
echo "To authenticate with GitHub CLI, run:"
echo "  gh auth login"
echo ""
echo "Current auth status:"
gh auth status || echo "Not authenticated. Please run 'gh auth login'"
echo "================================="

echo "postStartCommand completed"
