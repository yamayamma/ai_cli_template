# Dev Container README

This directory contains the Dev Container configuration for the GitHub CLI Template project.

## Overview

This Dev Container provides a complete development environment for building CLI tools with:
- **Python 3.12+** with `uv` package manager (installed via uv python install)
- **Node.js 20+ (LTS)** with `pnpm` via corepack
- **GitHub CLI (gh)** for GitHub operations
- **VS Code extensions** for Python, TypeScript, and GitHub Copilot
- **Multi-architecture support** - Works on both amd64 (x86_64) and arm64 (Apple Silicon M1/M2/M3)

## Architecture Support

This Dev Container is based on `mcr.microsoft.com/devcontainers/base:ubuntu-22.04`, which supports multiple architectures:
- **amd64** (x86_64) - Intel/AMD processors
- **arm64** (aarch64) - Apple Silicon (M1/M2/M3), AWS Graviton, etc.

The container will automatically detect the host architecture and install the appropriate binaries.

## Structure

```
.devcontainer/
├── Dockerfile              # Container image definition (Ubuntu 22.04 base)
├── devcontainer.json       # VS Code Dev Container configuration
├── onCreateCommand.sh      # Runs once on container creation
├── postCreateCommand.sh    # Runs after container creation (installs Python 3.12)
├── postStartCommand.sh     # Runs on every container start
├── library-scripts/        # Helper scripts for container setup
│   ├── install-uv.sh       # Install uv package manager
│   ├── install-gh.sh       # Install GitHub CLI
│   ├── install-node.sh     # Install Node.js 20 LTS
│   ├── install-gh-extensions.sh  # Install gh extensions
│   └── cleanup-unneeded.sh # Clean up build artifacts
└── README.md              # This file
```

## Usage

### Opening in VS Code

1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Open this repository in VS Code
3. Press `F1` and select "Dev Containers: Reopen in Container"

### Opening in GitHub Codespaces

1. Click the "Code" button on the GitHub repository
2. Select "Codespaces" tab
3. Click "Create codespace on main"

## What Happens During Setup

### onCreateCommand (once)
- Sets executable permissions for scripts
- Creates `.env` file from `.env.example`

### postCreateCommand (after creation)
- Installs Python dependencies with `uv sync` in `src/py`
- Installs TypeScript dependencies with `pnpm install` in `src/ts`
- Displays installed tool versions

### postStartCommand (every start)
- Checks GitHub CLI authentication status
- Provides instructions for `gh auth login`

## Customization

### Adding VS Code Extensions

Edit `devcontainer.json` and add extension IDs to the `extensions` array:

```json
"extensions": [
  "publisher.extension-name"
]
```

### Adding System Packages

Edit `Dockerfile` and add packages to the `apt-get install` command:

```dockerfile
RUN apt-get update && apt-get install -y \
    your-package \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
```

### Modifying Setup Scripts

Edit the command scripts (`onCreateCommand.sh`, `postCreateCommand.sh`, etc.) to customize the setup process.

## Troubleshooting

### Container fails to build

1. Check Docker daemon is running
2. Try rebuilding without cache: `F1` → "Dev Containers: Rebuild Container"
3. Check Dockerfile for syntax errors

### Python dependencies fail to install

1. Ensure `src/py/pyproject.toml` exists and is valid
2. Try manual install: `cd src/py && uv sync`
3. Check uv installation: `uv --version`

### TypeScript dependencies fail to install

1. Ensure `src/ts/package.json` exists and is valid
2. Try manual install: `cd src/ts && pnpm install`
3. Check pnpm installation: `pnpm --version`

### GitHub CLI authentication issues

1. Run `gh auth login` in the terminal
2. Follow the authentication flow
3. Verify with `gh auth status`

## Persistent Volumes

The following volumes are mounted to preserve data across container rebuilds:

- `/home/vscode/.cache/` - Package manager caches (uv, pip, npm)
- `/home/vscode/.config/github-copilot` - GitHub Copilot settings

## Security Notes

- Never commit `.env` files with secrets to version control
- Use GitHub Codespaces secrets for sensitive environment variables
- Authenticate GitHub CLI using personal access tokens or OAuth

## References

- [Dev Containers documentation](https://containers.dev/)
- [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers)
- [GitHub Codespaces](https://github.com/features/codespaces)
