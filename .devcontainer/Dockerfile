FROM mcr.microsoft.com/devcontainers/universal:2-linux

# Install additional tools
RUN apt-get update && apt-get install -y \
    jq \
    curl \
    ca-certificates \
    zsh \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set zsh as default shell
RUN chsh -s /bin/zsh vscode || true

# Copy and run library scripts
COPY library-scripts/*.sh /tmp/library-scripts/
RUN chmod +x /tmp/library-scripts/*.sh

# Install uv (Python package manager)
RUN /tmp/library-scripts/install-uv.sh

# Set PATH for uv
ENV PATH="/root/.local/bin:/home/vscode/.local/bin:$PATH"

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Cleanup
RUN /tmp/library-scripts/cleanup-unneeded.sh && rm -rf /tmp/library-scripts

# Verify installations
RUN echo "=== Verifying installations ===" \
    && python3 --version \
    && node --version \
    && pnpm --version \
    && uv --version \
    && git --version \
    && zsh --version
