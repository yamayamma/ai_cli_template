#!/bin/bash
set -e

echo "🚀 Setting up TypeScript Web App development environment..."

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

# Node.jsの確認
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
else
    echo "❌ Node.js not found!"
    exit 1
fi

# pnpmのインストール
if command -v pnpm &> /dev/null; then
    echo "✅ pnpm is already installed: $(pnpm --version)"
else
    echo "📦 Installing pnpm..."
    corepack enable
    corepack prepare pnpm@latest --activate
fi

# 依存関係のインストール
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies with pnpm..."
    pnpm install
fi

# GitHub Copilot CLIのインストール
echo "📦 Installing GitHub Copilot CLI..."
curl -fsSL https://gh.io/copilot-install | bash 2>/dev/null || true

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
echo "Available commands:"
echo "  pnpm dev       - Start development server"
echo "  pnpm test      - Run tests with Vitest"
echo "  pnpm lint      - Lint with Biome"
echo "  pnpm format    - Format with Biome"
echo "  pnpm check     - Lint + Format with Biome"
echo ""
echo "3. Start using Copilot CLI:"
echo "   - copilot suggest 'your command description'"
echo "   - copilot explain 'command to explain'"
echo ""
