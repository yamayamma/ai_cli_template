# GitHub Copilot Instructions

This repository is a **GitHub CLI Template** for building CLI tools with Python and TypeScript in a Dev Container environment.

## Repository Purpose

This template provides:
- **Dev Container setup** for VS Code / GitHub Codespaces
- **Python CLI development** with `uv` package manager
- **TypeScript CLI development** with `pnpm` package manager
- **GitHub CLI (gh)** integration for GitHub operations
- **Linting, formatting, and type checking** for both languages
- **CI/CD workflows** with GitHub Actions
- **Multi-architecture support** - Works on arm64 (Apple Silicon) and amd64 (x86_64)

## Toolchain

### Python
- **Package Manager**: `uv` (modern Python package manager)
- **Python Version**: 3.12+ (installed via `uv python install 3.12`)
- **Linter/Formatter**: `ruff` (fast Python linter and formatter)
- **Type Checker**: `pyright` (static type checker)
- **Testing**: `pytest` with coverage
- **CLI Framework**: `click`

### TypeScript
- **Package Manager**: `pnpm` (via corepack)
- **Linter**: `eslint` with typescript-eslint (flat config)
- **Formatter**: `prettier`
- **Type Checker**: `tsc` (TypeScript compiler)
- **Runtime**: Node.js 20+ (LTS)

### Other Tools
- **Version Control**: `git`
- **GitHub CLI**: `gh` for GitHub operations
- **Shell**: `zsh` (default terminal)
- **Editor**: VS Code with Dev Containers
- **Base Image**: Ubuntu 22.04 (multi-arch: arm64 and amd64)

## Coding Conventions

### General
- Use **EditorConfig** settings for consistent formatting
- Follow **language-specific conventions** (see instructions files)
- Write **clear commit messages** (conventional commits preferred)
- Keep **code modular and testable**
- Add **type annotations** (Python) and **types** (TypeScript)

### File Organization
- Python code: `src/py/`
- TypeScript code: `src/ts/`
- Scripts: `scripts/`
- Documentation: `docs/`
- Dev Container config: `.devcontainer/`

### Scripts
- All shell scripts use `set -euo pipefail`
- Scripts are executable (`chmod +x`)
- Use existing scripts in `scripts/` for common tasks

## Development Workflow

1. **Setup**: Dev Container handles installation automatically
2. **Python**: Use `uv` commands in `src/py/`
3. **TypeScript**: Use `pnpm` commands in `src/ts/`
4. **Linting**: Run `./scripts/lint.sh` or language-specific linters
5. **Formatting**: Run `./scripts/format.sh` or language-specific formatters
6. **Testing**: Run `./scripts/test.sh` or language-specific test commands

## GitHub CLI Usage

This template is designed for GitHub CLI (`gh`) integration:
- Authenticate with `gh auth login`
- Use `gh` commands in Python/TypeScript code
- Run subprocess calls to `gh` for GitHub operations
- See `docs/gh-cli-usage.md` for examples

## AI Assistant Guidelines

When helping with this repository:

1. **Maintain consistency** with existing code style
2. **Use the toolchain** defined above (uv, pnpm, ruff, etc.)
3. **Follow conventions** in language-specific instructions
4. **Test changes** with linters, formatters, and type checkers
5. **Update documentation** when changing functionality
6. **Preserve structure** - don't reorganize without reason
7. **Use shell scripts** in `scripts/` for common tasks

## Language-Specific Instructions

For detailed conventions, see:
- Python: `.github/instructions/python.instructions.md`
- TypeScript: `.github/instructions/typescript.instructions.md`

## References

- [uv documentation](https://docs.astral.sh/uv/)
- [pnpm documentation](https://pnpm.io/)
- [GitHub CLI documentation](https://cli.github.com/)
- [Ruff documentation](https://docs.astral.sh/ruff/)
- [Dev Containers documentation](https://containers.dev/)
