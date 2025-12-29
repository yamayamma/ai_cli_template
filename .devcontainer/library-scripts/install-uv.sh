#!/bin/bash
set -euo pipefail

# Install uv (Python package manager)
# https://github.com/astral-sh/uv

echo "Installing uv..."

# Install for root user (during Docker build)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Also install for vscode user
if [ -d /home/vscode ]; then
    echo "Installing uv for vscode user..."
    su - vscode -c 'curl -LsSf https://astral.sh/uv/install.sh | sh'
fi

# Make uv available globally
if [ -f /root/.local/bin/uv ]; then
    ln -sf /root/.local/bin/uv /usr/local/bin/uv || true
fi

echo "uv installed successfully"
/usr/local/bin/uv --version || /root/.local/bin/uv --version
