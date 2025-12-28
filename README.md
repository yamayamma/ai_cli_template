# GitHub CLI Template

A comprehensive development template for building CLI tools with Python and TypeScript, powered by GitHub CLI and optimized for Dev Containers.

[![CI - Python](https://github.com/yamayamma/ai_cli_template/workflows/CI%20-%20Python/badge.svg)](https://github.com/yamayamma/ai_cli_template/actions)
[![CI - TypeScript](https://github.com/yamayamma/ai_cli_template/workflows/CI%20-%20TypeScript/badge.svg)](https://github.com/yamayamma/ai_cli_template/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- 🐍 **Python CLI** with `uv` package manager, `ruff` linter/formatter, and `pyright` type checker
- 📘 **TypeScript CLI** with `pnpm`, `eslint`, `prettier`, and full type safety
- 🚀 **Dev Container** ready for VS Code and GitHub Codespaces
- 🔧 **GitHub CLI** (`gh`) integration for GitHub operations
- 🤖 **GitHub Copilot** optimized with custom instructions
- ✅ **CI/CD** with GitHub Actions for both languages
- 📚 **Comprehensive documentation** and best practices

## Quick Start

### Option 1: GitHub Codespaces (Easiest)

1. Click the **Code** button on GitHub
2. Select **Codespaces** tab
3. Click **Create codespace on main**
4. Wait for the environment to set up (2-3 minutes)

### Option 2: Local with VS Code

#### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Steps
```bash
# Clone the repository
git clone https://github.com/yamayamma/ai_cli_template.git
cd ai_cli_template

# Open in VS Code
code .

# Reopen in container
# Press F1, type "Dev Containers: Reopen in Container"
```

### Option 3: Local without Dev Container

#### Prerequisites
- Python 3.12+
- Node.js 20+ (LTS)
- Git
- GitHub CLI (`gh`)

#### Setup
```bash
# Clone the repository
git clone https://github.com/yamayamma/ai_cli_template.git
cd ai_cli_template

# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install pnpm (via corepack)
corepack enable
corepack prepare pnpm@latest --activate

# Run bootstrap script
./scripts/bootstrap.sh
```

## Authentication

Authenticate with GitHub CLI for full functionality:

```bash
gh auth login
```

Follow the prompts to authenticate via web browser or token.

Verify authentication:
```bash
gh auth status
```

## Project Structure

```
├── .devcontainer/       # Dev Container configuration
│   ├── Dockerfile
│   ├── devcontainer.json
│   ├── library-scripts/
│   └── *.sh             # Lifecycle scripts
├── .github/             # GitHub Actions and Copilot instructions
│   ├── workflows/       # CI/CD workflows
│   ├── instructions/    # Language-specific guidelines
│   └── copilot-instructions.md
├── docs/                # Documentation
│   ├── devcontainer.md  # Dev Container guide
│   ├── toolchain.md     # Tool usage
│   ├── gh-cli-usage.md  # GitHub CLI examples
│   └── conventions.md   # Best practices
├── scripts/             # Helper scripts
│   ├── bootstrap.sh
│   ├── format.sh
│   ├── lint.sh
│   └── test.sh
├── src/
│   ├── py/             # Python CLI tools
│   │   ├── pyproject.toml
│   │   ├── ghcli_tools/
│   │   └── README.md
│   └── ts/             # TypeScript CLI tools
│       ├── package.json
│       ├── src/
│       └── README.md
├── CLAUDE.md           # Claude Code instructions
├── LICENSE             # MIT License
└── README.md           # This file
```

## Python CLI

### Usage

```bash
cd src/py

# Install dependencies
uv sync

# Run the CLI
uv run ghcli-tools --help
uv run ghcli-tools hello --name "Developer"
uv run ghcli-tools version

# Development
uv run ruff format .     # Format
uv run ruff check .      # Lint
uv run pyright           # Type check
uv run pytest            # Test
```

### Adding Dependencies

```bash
cd src/py
uv add requests          # Add runtime dependency
uv add --dev pytest-mock # Add dev dependency
```

## TypeScript CLI

### Usage

```bash
cd src/ts

# Install dependencies
pnpm install

# Build
pnpm run build

# Run the CLI
pnpm run cli
pnpm run cli hello Developer
pnpm run cli version

# Development
pnpm run format          # Format
pnpm run lint            # Lint
pnpm run typecheck       # Type check
pnpm run dev             # Watch mode
```

### Adding Dependencies

```bash
cd src/ts
pnpm add axios           # Add runtime dependency
pnpm add -D @types/node  # Add dev dependency
```

## Development Workflow

### Quick Commands

```bash
# Format all code
./scripts/format.sh

# Lint all code
./scripts/lint.sh

# Run all tests
./scripts/test.sh

# Check GitHub auth
./scripts/gh-auth-check.sh
```

### Pre-commit Checklist

- [ ] Format code: `./scripts/format.sh`
- [ ] Lint code: `./scripts/lint.sh`
- [ ] Run tests: `./scripts/test.sh`
- [ ] Update documentation if needed
- [ ] Write descriptive commit message

## GitHub CLI Integration

This template is designed for GitHub CLI integration. Examples:

### Python
```python
import subprocess
import json

def run_gh(args: list[str]) -> dict:
    result = subprocess.run(
        ["gh"] + args,
        capture_output=True,
        text=True,
        check=True
    )
    return json.loads(result.stdout)

# Get repository info
repo = run_gh(["repo", "view", "--json", "name,owner"])
print(f"Repository: {repo['name']}")
```

### TypeScript
```typescript
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runGh(args: string[]): Promise<any> {
  const { stdout } = await execAsync(`gh ${args.join(" ")}`);
  return JSON.parse(stdout);
}

// Get repository info
const repo = await runGh(["repo", "view", "--json", "name,owner"]);
console.log(`Repository: ${repo.name}`);
```

See [docs/gh-cli-usage.md](docs/gh-cli-usage.md) for more examples.

## Toolchain

### Python
- **uv** - Fast Python package manager
- **ruff** - Fast linter and formatter
- **pyright** - Static type checker
- **pytest** - Testing framework
- **click** - CLI framework

### TypeScript
- **pnpm** - Fast, disk space efficient package manager
- **typescript** - TypeScript compiler
- **eslint** - Linter with TypeScript support
- **prettier** - Code formatter
- **Node.js 20+** - JavaScript runtime

### Other
- **gh** - GitHub CLI for GitHub operations
- **git** - Version control
- **zsh** - Default shell
- **jq** - JSON processor

See [docs/toolchain.md](docs/toolchain.md) for detailed usage.

## Documentation

- [Dev Container Guide](docs/devcontainer.md) - Setup and troubleshooting
- [Toolchain Guide](docs/toolchain.md) - Tool usage and configuration
- [GitHub CLI Usage](docs/gh-cli-usage.md) - Examples and best practices
- [Conventions](docs/conventions.md) - Coding standards and workflow

## CI/CD

Three GitHub Actions workflows:

1. **CI - Python** ([.github/workflows/ci-python.yml](.github/workflows/ci-python.yml))
   - Tests on Python 3.12 and 3.13
   - Runs linter, formatter, type checker, and tests

2. **CI - TypeScript** ([.github/workflows/ci-typescript.yml](.github/workflows/ci-typescript.yml))
   - Runs linter, formatter, type checker, and build

3. **Lint** ([.github/workflows/lint.yml](.github/workflows/lint.yml))
   - Global formatting checks
   - ShellCheck for shell scripts
   - EditorConfig validation

## GitHub Copilot

This template includes GitHub Copilot instructions:
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - General guidelines
- [.github/instructions/python.instructions.md](.github/instructions/python.instructions.md) - Python conventions
- [.github/instructions/typescript.instructions.md](.github/instructions/typescript.instructions.md) - TypeScript conventions

## Contributing

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes
3. Run checks: `./scripts/format.sh && ./scripts/lint.sh && ./scripts/test.sh`
4. Commit: `git commit -m "feat: add my feature"`
5. Push: `git push origin feat/my-feature`
6. Open a Pull Request

See [docs/conventions.md](docs/conventions.md) for detailed guidelines.

## Troubleshooting

### Dev Container Issues

**Problem**: Container fails to build
```bash
# Rebuild without cache
F1 → "Dev Containers: Rebuild Container Without Cache"
```

**Problem**: Dependencies fail to install
```bash
# Python
cd src/py && uv sync

# TypeScript
cd src/ts && pnpm install
```

### Authentication Issues

**Problem**: GitHub CLI not authenticated
```bash
gh auth login
gh auth status
```

See [docs/devcontainer.md](docs/devcontainer.md) for more troubleshooting.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [uv documentation](https://docs.astral.sh/uv/)
- [pnpm documentation](https://pnpm.io/)
- [GitHub CLI documentation](https://cli.github.com/)
- [Dev Containers documentation](https://containers.dev/)
- [Ruff documentation](https://docs.astral.sh/ruff/)
- [TypeScript documentation](https://www.typescriptlang.org/)

## Acknowledgments

This template is designed for:
- VS Code Dev Containers
- GitHub Codespaces
- Local development with Docker
- CI/CD with GitHub Actions

Optimized for building CLI tools that integrate with GitHub via the `gh` CLI.

---

**Note**: This is a template repository. Use the "Use this template" button on GitHub to create your own repository based on this template.