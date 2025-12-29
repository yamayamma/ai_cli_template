#!/bin/bash
set -euo pipefail

# Bootstrap script - Set up development environment

echo "=== Bootstrapping Development Environment ==="
echo ""

# Check required tools
echo "Checking required tools..."
required_tools=("git" "gh" "python3" "node" "pnpm" "uv")
missing_tools=()

for tool in "${required_tools[@]}"; do
    if ! command -v "$tool" &> /dev/null; then
        missing_tools+=("$tool")
        echo "✗ $tool is not installed"
    else
        echo "✓ $tool is installed"
    fi
done

if [ ${#missing_tools[@]} -ne 0 ]; then
    echo ""
    echo "Error: Missing required tools: ${missing_tools[*]}"
    echo "Please install the missing tools and try again."
    exit 1
fi

echo ""
echo "=== Tool Versions ==="
echo "Git: $(git --version)"
echo "GitHub CLI: $(gh --version | head -n 1)"
echo "Python: $(python3 --version)"
echo "Node.js: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "uv: $(uv --version)"

echo ""
echo "=== Installing Python Dependencies ==="
if [ -d "src/py" ]; then
    cd src/py
    echo "Running uv sync..."
    uv sync
    echo "✓ Python dependencies installed"
    cd ../..
else
    echo "⚠ src/py directory not found, skipping Python dependencies"
fi

echo ""
echo "=== Installing TypeScript Dependencies ==="
if [ -d "src/ts" ]; then
    cd src/ts
    echo "Running pnpm install..."
    pnpm install
    echo "✓ TypeScript dependencies installed"
    cd ../..
else
    echo "⚠ src/ts directory not found, skipping TypeScript dependencies"
fi

echo ""
echo "=== Setting Up Environment ==="
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✓ Created .env from .env.example"
    else
        echo "⚠ .env.example not found, skipping .env creation"
    fi
else
    echo "✓ .env file already exists"
fi

echo ""
echo "=== Checking GitHub CLI Authentication ==="
if gh auth status &> /dev/null; then
    echo "✓ GitHub CLI is authenticated"
else
    echo "⚠ GitHub CLI is not authenticated"
    echo "  Run 'gh auth login' to authenticate"
fi

echo ""
echo "=== Bootstrap Complete ==="
echo "You're ready to start developing!"
echo ""
echo "Next steps:"
echo "  - Run './scripts/lint.sh' to check code quality"
echo "  - Run './scripts/test.sh' to run tests"
echo "  - Run './scripts/format.sh' to format code"
echo ""
