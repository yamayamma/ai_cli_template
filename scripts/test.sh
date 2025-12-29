#!/bin/bash
set -euo pipefail

# Run tests for all languages

echo "=== Running Tests ==="
echo ""

exit_code=0

# Test Python code
if [ -d "src/py" ]; then
    echo "Running Python tests with pytest..."
    cd src/py
    if uv run pytest --cov=ghcli_tools --cov-report=term-missing; then
        echo "✓ Python tests passed"
    else
        echo "✗ Python tests failed"
        exit_code=1
    fi
    cd ../..
    echo ""
fi

# Test TypeScript code (if tests exist)
if [ -d "src/ts" ]; then
    echo "Building TypeScript code..."
    cd src/ts
    if pnpm run build; then
        echo "✓ TypeScript build successful"
    else
        echo "✗ TypeScript build failed"
        exit_code=1
    fi
    cd ../..
    echo ""
fi

if [ $exit_code -eq 0 ]; then
    echo "=== All Tests Passed ==="
else
    echo "=== Tests Failed ==="
fi

exit $exit_code
