#!/bin/bash
set -e

echo "🔄 Running post-start tasks..."

# GitHub認証状態の確認
if gh auth status &> /dev/null; then
    echo "✅ GitHub CLI is authenticated"

    # Copilot拡張機能の確認と更新
    if gh extension list | grep -q "gh-copilot"; then
        echo "✅ GitHub Copilot CLI extension is installed"
        echo "🔄 Checking for updates..."
        gh extension upgrade github/gh-copilot 2>/dev/null || true
    else
        echo "📦 Installing GitHub Copilot CLI extension..."
        gh extension install github/gh-copilot 2>/dev/null || echo "⚠️  Could not install Copilot extension"
    fi
else
    echo "⚠️  GitHub CLI is not authenticated."
    echo "   Run: gh auth login"
fi

echo ""
echo "🎉 Ready to use Copilot CLI!"
echo "   Try: gh copilot suggest 'list all docker containers'"
echo ""
