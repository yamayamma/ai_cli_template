# Toolchain Guide

This guide explains the tools used in this project and how to use them effectively.

## Python Toolchain

### uv - Package Manager

**uv** is a modern, fast Python package manager written in Rust.

#### Installation
Installed automatically in the Dev Container.

Manual installation:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

#### Common Commands

```bash
# Create a new project
uv init

# Install dependencies from pyproject.toml
uv sync

# Add a dependency
uv add requests

# Add a dev dependency
uv add --dev pytest

# Remove a dependency
uv remove requests

# Update dependencies
uv lock --upgrade

# Run a command in the virtual environment
uv run python script.py
uv run pytest

# Show installed packages
uv pip list

# Create a virtual environment manually
uv venv

# Activate the virtual environment (if needed)
source .venv/bin/activate
```

#### Configuration

Dependencies are defined in `pyproject.toml`:

```toml
[project]
dependencies = [
    "click>=8.1.0",
]

[tool.uv]
dev-dependencies = [
    "pytest>=8.0.0",
    "ruff>=0.8.0",
]
```

### Ruff - Linter and Formatter

**Ruff** is an extremely fast Python linter and formatter.

#### Common Commands

```bash
# Check for linting issues
uv run ruff check .

# Auto-fix issues
uv run ruff check --fix .

# Format code
uv run ruff format .

# Check formatting without changing files
uv run ruff format --check .

# Check a specific file
uv run ruff check src/py/ghcli_tools/cli.py
```

#### Configuration

Configured in `ruff.toml`:

```toml
[lint]
select = ["E", "W", "F", "I", "N", "UP", "B", "C4", "SIM"]
ignore = ["E501"]  # Line too long

[format]
quote-style = "double"
indent-style = "space"
line-ending = "lf"
```

### Pyright - Type Checker

**Pyright** is a static type checker for Python.

#### Common Commands

```bash
# Type check the project
uv run pyright

# Type check specific files
uv run pyright src/py/ghcli_tools/cli.py

# Show configuration
uv run pyright --help
```

#### Configuration

Configured in `pyrightconfig.json`:

```json
{
  "include": ["src/py/**/*.py"],
  "typeCheckingMode": "basic",
  "pythonVersion": "3.12"
}
```

### pytest - Testing Framework

**pytest** is a popular Python testing framework.

#### Common Commands

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=ghcli_tools --cov-report=term-missing

# Run specific test file
uv run pytest tests/test_cli.py

# Run specific test function
uv run pytest tests/test_cli.py::test_hello

# Run with verbose output
uv run pytest -v

# Run and stop at first failure
uv run pytest -x

# Run last failed tests
uv run pytest --lf
```

## TypeScript Toolchain

### pnpm - Package Manager

**pnpm** is a fast, disk space efficient package manager.

#### Installation
Installed automatically via corepack in the Dev Container.

Manual installation:
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

#### Common Commands

```bash
# Install dependencies from package.json
pnpm install

# Add a dependency
pnpm add package-name

# Add a dev dependency
pnpm add -D package-name

# Remove a dependency
pnpm remove package-name

# Update dependencies
pnpm update

# Update specific package
pnpm update package-name

# List installed packages
pnpm list

# Run a script from package.json
pnpm run build
pnpm run test

# Check for outdated packages
pnpm outdated
```

#### Configuration

Dependencies are defined in `package.json`:

```json
{
  "dependencies": {
    "some-package": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

### TypeScript - Compiler

**TypeScript** is a typed superset of JavaScript.

#### Common Commands

```bash
# Compile TypeScript to JavaScript
pnpm run build
# or directly
tsc

# Type check without emitting files
pnpm run typecheck
# or directly
tsc --noEmit

# Watch mode (recompile on changes)
pnpm run dev
# or directly
tsc --watch

# Show compiler version
tsc --version

# Show configuration
tsc --showConfig
```

#### Configuration

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### ESLint - Linter

**ESLint** is a pluggable linting utility for JavaScript and TypeScript.

#### Common Commands

```bash
# Lint code
pnpm run lint
# or directly
eslint src/

# Auto-fix issues
pnpm run lint:fix
# or directly
eslint src/ --fix

# Lint specific file
eslint src/index.ts

# Show rule documentation
eslint --help
```

#### Configuration

Configured in `eslint.config.js` (flat config):

```javascript
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended
);
```

### Prettier - Formatter

**Prettier** is an opinionated code formatter.

#### Common Commands

```bash
# Format all files
pnpm run format
# or directly
prettier --write .

# Check formatting without changing files
pnpm run format:check
# or directly
prettier --check .

# Format specific files
prettier --write src/index.ts

# Format specific file types
prettier --write "**/*.{ts,json,md}"
```

#### Configuration

Configured in `prettier.config.js`:

```javascript
export default {
  semi: true,
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
};
```

## GitHub CLI

### gh - GitHub CLI

**gh** is GitHub's official command-line tool.

#### Authentication

```bash
# Login to GitHub
gh auth login

# Check authentication status
gh auth status

# Logout
gh auth logout

# Refresh authentication
gh auth refresh
```

#### Common Commands

See `docs/gh-cli-usage.md` for detailed examples.

## Shell Tools

### zsh - Shell

**zsh** is the default shell in the Dev Container.

#### Configuration

Edit `~/.zshrc` for customization:

```bash
# Aliases
alias ll='ls -la'
alias gs='git status'

# Functions
mkcd() {
  mkdir -p "$1" && cd "$1"
}

# Environment variables
export EDITOR=vim
```

### jq - JSON Processor

**jq** is a lightweight command-line JSON processor.

#### Common Commands

```bash
# Pretty-print JSON
echo '{"name":"John","age":30}' | jq .

# Extract a field
echo '{"name":"John","age":30}' | jq '.name'

# Filter array
echo '[{"name":"John"},{"name":"Jane"}]' | jq '.[0]'

# Parse gh output
gh repo view --json name,owner | jq '.name'
```

## Workflow Integration

### Complete Development Cycle

```bash
# 1. Make changes to code
vim src/py/ghcli_tools/cli.py

# 2. Format
cd src/py
uv run ruff format .

# 3. Lint
uv run ruff check .

# 4. Type check
uv run pyright

# 5. Test
uv run pytest

# 6. Commit
git add .
git commit -m "feat: add new feature"
git push
```

### Using Helper Scripts

The `scripts/` directory contains helper scripts:

```bash
# Run all formatters
./scripts/format.sh

# Run all linters
./scripts/lint.sh

# Run all tests
./scripts/test.sh

# Bootstrap development environment
./scripts/bootstrap.sh
```

## Tips and Best Practices

### Python
- Use `uv run` to ensure commands run in the correct virtual environment
- Run `uv sync` after pulling changes to update dependencies
- Use `uv add --dev` for development-only dependencies
- Run formatters before linters (formatters fix more issues)

### TypeScript
- Use `pnpm` instead of `npm` or `yarn`
- Run `pnpm install` after pulling changes
- Use `pnpm run typecheck` frequently during development
- Enable watch mode (`pnpm run dev`) for faster feedback

### General
- Commit `uv.lock` and `pnpm-lock.yaml` to version control
- Run linters in CI/CD pipelines
- Use pre-commit hooks for automatic linting
- Keep dependencies up to date regularly

## Troubleshooting

### uv issues
```bash
# Reinstall uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Clear cache
rm -rf ~/.cache/uv

# Recreate virtual environment
rm -rf .venv
uv sync
```

### pnpm issues
```bash
# Reinstall pnpm
corepack prepare pnpm@latest --activate

# Clear cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### General issues
```bash
# Check tool versions
uv --version
pnpm --version
tsc --version
gh --version

# Verify PATH
echo $PATH

# Reload shell
exec zsh
```

## Resources

- [uv documentation](https://docs.astral.sh/uv/)
- [Ruff documentation](https://docs.astral.sh/ruff/)
- [Pyright documentation](https://github.com/microsoft/pyright)
- [pnpm documentation](https://pnpm.io/)
- [TypeScript documentation](https://www.typescriptlang.org/)
- [ESLint documentation](https://eslint.org/)
- [Prettier documentation](https://prettier.io/)
- [GitHub CLI documentation](https://cli.github.com/manual/)
