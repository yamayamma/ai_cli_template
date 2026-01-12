# Contributing to TypeScript Web App Development Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🎯 Core Values

This project follows the principles defined in our [Constitution](.specify/memory/constitution.md):

- **Test-First Development (TDD)** - Write tests before implementation
- **TypeScript Strict Mode** - No `any` types without explanation
- **ESM-First** - All imports use ESM syntax with explicit extensions
- **Quality Gates** - Maintain 80%+ test coverage
- **Documentation Through Tests** - Tests serve as specifications

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Docker Desktop installed and running
- ✅ VS Code with Dev Containers extension
- ✅ GitHub account with git configured
- ✅ SSH keys or Personal Access Token set up for GitHub

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:yamayamma/ai_cli_template.git
cd ai_cli_template
```

### 2. Open in Devcontainer

1. Open the repository in VS Code
2. Press `F1` to open Command Palette
3. Select "Dev Containers: Reopen in Container"
4. Wait for the container to build (first time takes ~5 minutes)

### 3. Verify Setup

```bash
# Check Node.js version (should be 22.x)
node --version

# Check pnpm version (should be 9.x)
pnpm --version

# Run tests
pnpm test:run

# Run linter
pnpm check
```

All commands should complete successfully.

## 🔄 Development Workflow

### Test-Driven Development (TDD) Cycle

1. **Write Test First** - Before writing any code, write a failing test
2. **Get Approval** - Discuss the test with maintainers if needed
3. **Red Phase** - Run tests, verify the new test fails
4. **Green Phase** - Implement minimal code to make the test pass
5. **Refactor** - Improve code quality while keeping tests green
6. **Verify Coverage** - Ensure coverage remains ≥ 80%

### Example TDD Flow

```bash
# 1. Create a test file
touch tests/new-feature.test.ts

# 2. Write failing test
# ... write test code ...

# 3. Run tests (should fail)
pnpm test:run

# 4. Implement feature
# ... write implementation ...

# 5. Run tests (should pass)
pnpm test:run

# 6. Check coverage
pnpm test:coverage
```

## 📝 Code Quality Standards

### Biome Linting and Formatting

```bash
# Check code quality
pnpm check

# Fix automatically
pnpm check --write

# Format only
pnpm format

# Lint only
pnpm lint
```

### TypeScript Strict Mode Rules

- ❌ No `any` types without explanation
- ❌ No type assertions (`as`) without comments
- ✅ Explicit return types for public functions
- ✅ Proper error handling with typed errors

### Test Coverage Requirements

- Minimum 80% coverage for all files
- 100% coverage for critical paths
- Use `pnpm test:coverage` to verify

## 📦 Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for semantic versioning:

### Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat:` - New feature (minor version bump)
- `fix:` - Bug fix (patch version bump)
- `chore:` - Maintenance tasks (no version bump)
- `docs:` - Documentation only
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

### Examples

```bash
# Feature
feat: add user authentication

# Bug fix
fix: resolve memory leak in data processing

# Breaking change
feat!: redesign API endpoints

BREAKING CHANGE: API endpoints now require authentication
```

## 🔍 Pull Request Process

### Before Submitting

1. ✅ Verify Constitution compliance
2. ✅ All tests pass (`pnpm test:run`)
3. ✅ Coverage ≥ 80% (`pnpm test:coverage`)
4. ✅ No linting errors (`pnpm check`)
5. ✅ Build succeeds (`pnpm build`)

### CI Requirements

All pull requests must pass:

- **Test Job** - All tests pass with coverage reporting
- **Lint Job** - Biome checks pass
- **Build Job** - TypeScript compilation succeeds

### Review Expectations

- Maintainers will review within 48 hours
- Address feedback promptly
- Be open to suggestions and improvements
- Keep PRs focused and atomic

## 🤝 Code of Conduct

### Be Respectful

- Treat all contributors with respect
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Be collaborative and supportive

### Communication

- Use clear, concise language
- Provide context for your changes
- Ask questions if uncertain
- Document decisions in code comments

## 📚 Additional Resources

- [Constitution](.specify/memory/constitution.md) - Project principles
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
- [GitHub Flow](https://guides.github.com/introduction/flow/) - Git workflow

## ❓ Getting Help

- Open an issue for bug reports
- Start a discussion for questions
- Tag maintainers for urgent matters
- Check existing issues before creating new ones

Thank you for contributing! 🎉
