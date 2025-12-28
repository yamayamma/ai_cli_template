# Claude Code Instructions

This file provides instructions for Claude Code (Anthropic's AI coding assistant) when working with this repository.

## Project Overview

This is a **GitHub CLI Template** for building CLI tools with Python and TypeScript in a Dev Container environment. The template is designed to work with:
- VS Code Dev Containers
- GitHub Codespaces
- Local development with Docker

## Key Tools

- **Python**: uv (package manager), ruff (linter/formatter), pyright (type checker)
- **TypeScript**: pnpm (package manager), eslint (linter), prettier (formatter), tsc (compiler)
- **GitHub**: gh (GitHub CLI)
- **Shell**: zsh (default terminal)

## Project Structure

```
├── .devcontainer/       # Dev Container configuration
├── .github/             # GitHub Actions and Copilot instructions
├── docs/                # Documentation
├── scripts/             # Helper scripts
├── src/
│   ├── py/             # Python CLI tools
│   └── ts/             # TypeScript CLI tools
├── LICENSE             # MIT License
├── README.md           # Main documentation
└── CLAUDE.md           # This file
```

## Working with Python Code

### Commands
```bash
cd src/py
uv sync                  # Install dependencies
uv run ruff check .      # Lint
uv run ruff format .     # Format
uv run pyright           # Type check
uv run pytest            # Test
uv run ghcli-tools       # Run CLI
```

### Conventions
- Use type hints for all functions
- Follow PEP 8 style guide (enforced by ruff)
- Write docstrings for public APIs (Google style)
- Test coverage should be high (aim for 80%+)
- Use Click for CLI commands

### Adding Dependencies
```bash
uv add package-name        # Add runtime dependency
uv add --dev package-name  # Add dev dependency
```

## Working with TypeScript Code

### Commands
```bash
cd src/ts
pnpm install             # Install dependencies
pnpm run lint            # Lint
pnpm run format          # Format
pnpm run typecheck       # Type check
pnpm run build           # Build
pnpm run cli             # Run CLI
```

### Conventions
- Use explicit type annotations
- Enable all strict TypeScript options
- Prefer const over let, never use var
- Use ES modules (import/export)
- Use async/await for asynchronous code

### Adding Dependencies
```bash
pnpm add package-name      # Add runtime dependency
pnpm add -D package-name   # Add dev dependency
```

## Helper Scripts

Located in `scripts/` directory:
- `bootstrap.sh` - Set up development environment
- `format.sh` - Format all code
- `lint.sh` - Lint all code
- `test.sh` - Run all tests
- `gh-auth-check.sh` - Check GitHub CLI authentication

Run with: `./scripts/script-name.sh`

## GitHub CLI Integration

This template is designed for GitHub CLI integration. Example usage:

```python
# Python
import subprocess
result = subprocess.run(["gh", "repo", "view"], capture_output=True, text=True)
```

```typescript
// TypeScript
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
const { stdout } = await execAsync("gh repo view");
```

## Testing Strategy

### Python
- Use pytest for unit tests
- Place tests in `src/py/tests/`
- Run with: `uv run pytest`
- Include coverage reports

### TypeScript
- TypeScript compilation serves as a form of testing
- Add proper test framework if needed (vitest/jest)
- Run with: `pnpm run build` (for now)

## Code Quality Checks

Before committing, ensure all checks pass:

```bash
# Format code
./scripts/format.sh

# Lint code
./scripts/lint.sh

# Run tests
./scripts/test.sh
```

Or individually:
```bash
# Python
cd src/py
uv run ruff format . && uv run ruff check . && uv run pyright && uv run pytest

# TypeScript
cd src/ts
pnpm run format && pnpm run lint && pnpm run typecheck && pnpm run build
```

## Git Workflow

### Branch Naming
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test changes

### Commit Messages
Follow Conventional Commits:
```
feat(cli): add new command
fix(auth): handle token expiration
docs: update README with examples
```

## Documentation

Update documentation when making changes:
- **README.md** - Overview and quick start
- **docs/devcontainer.md** - Dev Container guide
- **docs/toolchain.md** - Tool usage
- **docs/gh-cli-usage.md** - GitHub CLI examples
- **docs/conventions.md** - Coding conventions
- **Code docstrings/comments** - Inline documentation

## Security

- Never commit secrets (use `.env` files)
- Use GitHub Secrets for CI/CD
- Keep dependencies updated
- Review security advisories

## Common Tasks

### Adding a New Python Command
1. Edit `src/py/ghcli_tools/cli.py`
2. Add new Click command
3. Write tests
4. Update documentation

### Adding a New TypeScript Command
1. Edit `src/ts/src/index.ts`
2. Add new command handler
3. Update help text
4. Update documentation

### Adding a New Dependency
1. Add with package manager (uv/pnpm)
2. Test that it works
3. Update lock file (automatic)
4. Document if it's a major addition

### Updating Dependencies
```bash
# Python
cd src/py && uv lock --upgrade

# TypeScript
cd src/ts && pnpm update
```

## CI/CD

GitHub Actions workflows in `.github/workflows/`:
- `ci-python.yml` - Python tests (3.12, 3.13)
- `ci-typescript.yml` - TypeScript checks
- `lint.yml` - Code quality checks

All checks must pass before merging.

## Troubleshooting

### Python Issues
```bash
# Recreate virtual environment
rm -rf src/py/.venv
cd src/py && uv sync
```

### TypeScript Issues
```bash
# Clean and reinstall
rm -rf src/ts/node_modules src/ts/pnpm-lock.yaml
cd src/ts && pnpm install
```

### Dev Container Issues
- Rebuild container: F1 → "Dev Containers: Rebuild Container"
- Check Docker is running
- Review logs in Dev Container output

## Important Notes

1. **Preserve existing files**: AI_agent.md, samplemcp.py, .python-version should be kept
2. **No Claude-specific devcontainer**: This template is for general use (VS Code/Codespaces)
3. **Use the toolchain**: Always use uv for Python, pnpm for TypeScript
4. **Test thoroughly**: Run all checks before committing
5. **Document changes**: Keep docs in sync with code

## Resources

- [uv documentation](https://docs.astral.sh/uv/)
- [pnpm documentation](https://pnpm.io/)
- [GitHub CLI documentation](https://cli.github.com/)
- [Dev Containers documentation](https://containers.dev/)
- See `.github/copilot-instructions.md` for Copilot-specific instructions
- See `.github/instructions/` for language-specific conventions

## Getting Help

- Check documentation in `docs/`
- Review GitHub Copilot instructions in `.github/`
- Read inline code comments
- Check tool documentation (links above)

## Working Efficiently

When Claude Code is working on this repository:
1. **Understand the context** from this file
2. **Use the right tools** (uv, pnpm, ruff, eslint, etc.)
3. **Follow conventions** in `.github/instructions/`
4. **Test changes** with linters and formatters
5. **Update documentation** when needed
6. **Keep it simple** - make minimal, focused changes
7. **Verify your work** before marking tasks complete

Remember: This is a template repository meant to be cloned and used as a starting point for CLI tool development. Keep it clean, well-documented, and easy to use.
