# Dev Container Guide

This guide explains how to use the Dev Container setup for this project.

## What is a Dev Container?

A Dev Container is a Docker container configured specifically for development. It includes:
- All required tools and dependencies
- VS Code extensions
- Environment configuration
- Shell setup

## Prerequisites

### For VS Code (Local)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### For GitHub Codespaces
- GitHub account
- Sufficient Codespaces hours (free tier available)

## Getting Started

### Option 1: Local with VS Code

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yamayamma/ai_cli_template.git
   cd ai_cli_template
   ```

2. **Open in VS Code**:
   ```bash
   code .
   ```

3. **Reopen in Container**:
   - Press `F1` (or `Cmd+Shift+P` on Mac)
   - Type "Dev Containers: Reopen in Container"
   - Select it and wait for the container to build

4. **First-time setup** (automatic):
   - Dependencies will be installed automatically
   - This may take a few minutes

### Option 2: GitHub Codespaces

1. **Go to the repository** on GitHub

2. **Create a Codespace**:
   - Click the "Code" button (green)
   - Select the "Codespaces" tab
   - Click "Create codespace on main"

3. **Wait for setup**:
   - The Codespace will initialize automatically
   - Dependencies will be installed

## Container Lifecycle

### Initial Creation (onCreateCommand)
Runs once when the container is first created:
- Sets script permissions
- Creates `.env` from `.env.example`

### After Creation (postCreateCommand)
Runs after the container is created:
- Installs Python 3.12 with `uv python install 3.12`
- Creates virtual environment and installs Python dependencies with `uv sync`
- Installs TypeScript dependencies with `pnpm install`
- Shows installed tool versions

### Every Start (postStartCommand)
Runs every time the container starts:
- Checks GitHub CLI authentication status
- Reminds you to run `gh auth login` if needed

## Authenticating with GitHub CLI

After the container starts, authenticate with GitHub CLI:

```bash
gh auth login
```

Follow the prompts to authenticate. Choose:
- **GitHub.com** (unless using GitHub Enterprise)
- **HTTPS** protocol (recommended)
- **Login with a web browser** (easiest)

Verify authentication:
```bash
gh auth status
```

## Container Features

### Architecture Support

This Dev Container supports multiple architectures:
- **arm64** (Apple Silicon M1/M2/M3, AWS Graviton)
- **amd64** (Intel/AMD x86_64)

The container automatically detects your host architecture and installs the appropriate binaries. Ubuntu 22.04 base image is used for multi-arch compatibility.

### Installed Tools

- **Python 3.12+** with `uv` package manager (installed via `uv python install 3.12`)
- **Node.js 20+** (LTS) with `pnpm`
- **GitHub CLI** (`gh`)
- **Git** for version control
- **zsh** as default shell
- **jq** for JSON processing
- **curl** for HTTP requests

### VS Code Extensions

Automatically installed:
- GitHub Copilot & Copilot Chat
- Python & Pylance
- Ruff (Python linter/formatter)
- ESLint (TypeScript linter)
- Prettier (formatter)
- GitHub Pull Requests
- EditorConfig

### Terminal

Default shell is **zsh**. Open a new terminal in VS Code:
- Menu: `Terminal > New Terminal`
- Shortcut: `` Ctrl+` `` (backtick)

## Persistent Data

The following directories persist across container rebuilds:

- `/home/vscode/.cache/` - Package manager caches
- `/home/vscode/.config/github-copilot` - GitHub Copilot settings

Your code in the workspace is always persisted.

## Rebuilding the Container

Sometimes you need to rebuild the container:

### Full Rebuild
1. Press `F1`
2. Type "Dev Containers: Rebuild Container"
3. Select it and wait

### Rebuild Without Cache
1. Press `F1`
2. Type "Dev Containers: Rebuild Container Without Cache"
3. Use this when having issues with cached layers

## Common Issues

### Container fails to start

**Symptoms**: Container build fails or hangs

**Solutions**:
1. Ensure Docker is running: `docker ps`
2. Try rebuilding without cache
3. Check Docker Desktop settings (increase memory/CPU if needed)
4. Check `.devcontainer/Dockerfile` for syntax errors

### Python dependencies fail to install

**Symptoms**: `uv sync` fails during postCreateCommand

**Solutions**:
1. Check `src/py/pyproject.toml` for syntax errors
2. Try manual install:
   ```bash
   cd src/py
   uv sync
   ```
3. Check uv version: `uv --version`

### TypeScript dependencies fail to install

**Symptoms**: `pnpm install` fails during postCreateCommand

**Solutions**:
1. Check `src/ts/package.json` for syntax errors
2. Try manual install:
   ```bash
   cd src/ts
   pnpm install
   ```
3. Check pnpm version: `pnpm --version`

### GitHub CLI authentication issues

**Symptoms**: `gh` commands fail with authentication errors

**Solutions**:
1. Run `gh auth login` in the terminal
2. Use browser-based authentication (easiest)
3. Check status: `gh auth status`
4. If using a token, ensure it has correct scopes

### Extensions not working

**Symptoms**: VS Code extensions don't activate

**Solutions**:
1. Reload VS Code: `F1` → "Developer: Reload Window"
2. Check extensions are installed: `F1` → "Extensions: Show Installed Extensions"
3. Rebuild container

### Out of disk space

**Symptoms**: Container operations fail with disk space errors

**Solutions**:
1. Clean Docker images: `docker system prune -a`
2. Remove unused volumes: `docker volume prune`
3. Increase Docker Desktop disk allocation

## Advanced Configuration

### Adding System Packages

Edit `.devcontainer/Dockerfile`:

```dockerfile
RUN apt-get update && apt-get install -y \
    your-package-name \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
```

### Adding VS Code Extensions

Edit `.devcontainer/devcontainer.json`:

```json
"extensions": [
  "existing.extension",
  "new.extension-id"
]
```

### Adding Environment Variables

Edit `.env` (not committed to git):

```bash
GITHUB_TOKEN=your_token_here
CUSTOM_VAR=value
```

Or edit `.devcontainer/devcontainer.json` for container-level variables:

```json
"containerEnv": {
  "MY_VAR": "value"
}
```

### Customizing Shell

Edit your `.zshrc` in the container:

```bash
# In the container terminal
nano ~/.zshrc
```

Changes persist in the mounted volume.

## Working with Git

### Configuring Git

Set your Git identity (persists in the container):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### SSH Keys

If using SSH for Git operations:

1. Generate key in the container:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. Add to GitHub:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy output and add to GitHub → Settings → SSH Keys
   ```

## Tips

- **Use integrated terminal**: Better integration with VS Code
- **Use GitHub Copilot**: Installed and ready to use
- **Run scripts**: Use scripts in `scripts/` for common tasks
- **Check tool versions**: Run `./scripts/bootstrap.sh` (when created)
- **Format on save**: Enabled by default for Python and TypeScript
- **Use command palette**: Press `F1` for quick access to commands

## Resources

- [Dev Containers documentation](https://containers.dev/)
- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- [GitHub Codespaces docs](https://docs.github.com/en/codespaces)
- [Docker documentation](https://docs.docker.com/)
