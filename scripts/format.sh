#!/bin/bash
set -euo pipefail

# Format code in all languages

echo "=== Formatting Code ==="
echo ""

exit_code=0

# Format Python code
if [ -d "src/py" ]; then
    echo "Formatting Python code with ruff..."
    cd src/py
    if uv run ruff format .; then
        echo "✓ Python code formatted"
    else
        echo "✗ Python formatting failed"
        exit_code=1
    fi
    cd ../..
    echo ""
fi

# Format TypeScript code
if [ -d "src/ts" ]; then
    echo "Formatting TypeScript code with prettier..."
    cd src/ts
    if pnpm run format; then
        echo "✓ TypeScript code formatted"
    else
        echo "✗ TypeScript formatting failed"
        exit_code=1
    fi
    cd ../..
    echo ""
fi

if [ $exit_code -eq 0 ]; then
    echo "=== All Code Formatted Successfully ==="
else
    echo "=== Formatting Failed ==="
fi

exit $exit_code
