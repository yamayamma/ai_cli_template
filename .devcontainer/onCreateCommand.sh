#!/bin/bash
set -euo pipefail

# onCreateCommand.sh - Run once when the container is first created

echo "Running onCreateCommand..."

# Get the workspace folder
WORKSPACE_DIR="${PWD}"
echo "Workspace directory: ${WORKSPACE_DIR}"

# Set proper permissions for scripts
if [ -d "${WORKSPACE_DIR}/scripts" ]; then
    echo "Setting executable permissions for scripts..."
    chmod +x "${WORKSPACE_DIR}"/scripts/*.sh 2>/dev/null || true
fi

# Set proper permissions for devcontainer scripts
if [ -d "${WORKSPACE_DIR}/.devcontainer" ]; then
    chmod +x "${WORKSPACE_DIR}"/.devcontainer/*.sh 2>/dev/null || true
fi

# Create .env file if it doesn't exist
if [ -f "${WORKSPACE_DIR}/.env.example" ] && [ ! -f "${WORKSPACE_DIR}/.env" ]; then
    echo "Creating .env file from .env.example..."
    cp "${WORKSPACE_DIR}/.env.example" "${WORKSPACE_DIR}/.env"
fi

echo "onCreateCommand completed"
