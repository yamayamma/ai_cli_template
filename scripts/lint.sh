#!/bin/bash
set -euo pipefail

# Lint code in all languages

echo "=== Linting Code ==="
echo ""

exit_code=0

# Lint Python code
if [ -d "src/py" ]; then
    echo "Linting Python code with ruff..."
    cd src/py
    if uv run ruff check .; then
        echo "✓ Python linting passed"
    else
        echo "✗ Python linting failed"
        exit_code=1
    fi
    echo ""
    
    echo "Type checking Python code with pyright..."
    if uv run pyright; then
        echo "✓ Python type checking passed"
    else
        echo "✗ Python type checking failed"
        exit_code=1
    fi
    cd ../..
    echo ""
fi

# Lint TypeScript code
if [ -d "src/ts" ]; then
    echo "Linting TypeScript code with eslint..."
    cd src/ts
    if pnpm run lint; then
        echo "✓ TypeScript linting passed"
    else
        echo "✗ TypeScript linting failed"
        exit_code=1
    fi
    echo ""
    
    echo "Type checking TypeScript code..."
    if pnpm run typecheck; then
        echo "✓ TypeScript type checking passed"
    else
        echo "✗ TypeScript type checking failed"
        exit_code=1
    fi
    cd ../..
    echo ""
fi

if [ $exit_code -eq 0 ]; then
    echo "=== All Linting Passed ==="
else
    echo "=== Linting Failed ==="
fi

exit $exit_code
