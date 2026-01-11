#!/bin/bash
set -e

echo "🚀 Setting up Copilot CLI development environment..."

# GitHub CLIの確認
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI is installed: $(gh --version | head -1)"
else
    echo "❌ GitHub CLI not found. Installing..."
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    sudo apt update
    sudo apt install gh -y
fi

# uvのインストール
if command -v uv &> /dev/null; then
    echo "✅ uv is already installed: $(uv --version)"
else
    echo "📦 Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
fi

# Python 3.12のインストール
echo "🐍 Installing Python 3.12 with uv..."
uv python install 3.12

# GitHub Copilot CLIのインストール
echo "📦 Installing GitHub Copilot CLI..."
curl -fsSL https://gh.io/copilot-install | bash

# Gitの初期設定（未設定の場合）
if [ -z "$(git config --global user.name)" ]; then
    echo "ℹ️  Git user.name not set. Please run: git config --global user.name 'Your Name'"
fi

if [ -z "$(git config --global user.email)" ]; then
    echo "ℹ️  Git user.email not set. Please run: git config --global user.email 'your@email.com'"
fi

echo ""
echo "=========================================="
echo "📋 Post-create setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Authenticate with GitHub: gh auth login"
echo "2. Verify Copilot CLI: copilot --version"
echo "3. Start using Copilot CLI:"
echo "   - copilot suggest 'your command description'"
echo "   - copilot explain 'command to explain'"
echo ""
