#!/bin/bash
set -euo pipefail

# Cleanup unnecessary files and caches to reduce image size

echo "Cleaning up unnecessary files..."

# Clean apt cache
apt-get clean
rm -rf /var/lib/apt/lists/*

# Clean npm cache
npm cache clean --force || true

# Clean temporary files
rm -rf /tmp/*
rm -rf /var/tmp/*

echo "Cleanup completed"
