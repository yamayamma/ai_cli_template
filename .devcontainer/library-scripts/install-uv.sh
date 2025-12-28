#!/bin/bash
set -euo pipefail

# Install uv (Python package manager)
# https://github.com/astral-sh/uv

echo "Installing uv..."

curl -LsSf https://astral.sh/uv/install.sh | sh

# Make uv available for the current user
export PATH="/root/.local/bin:/home/vscode/.local/bin:$PATH"

echo "uv installed successfully"
uv --version
