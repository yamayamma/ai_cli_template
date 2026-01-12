# Local Testing Guide (Quickstart)

**Purpose**: Enable developers to test CI workflows locally before pushing  
**Target Audience**: Contributors who want to verify changes work correctly

## Overview

Testing workflows locally reduces feedback cycles and prevents broken CI runs.

**Tools Used**:
- `act` - Run GitHub Actions locally
- `semantic-release` (dry-run mode) - Test versioning logic
- Native pnpm commands - Replicate CI environment

---

## Prerequisites

### 1. Install act

**macOS**:
```bash
brew install act
```

**Linux**:
```bash
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

**Windows**:
```bash
choco install act-cli
# or
scoop install act
```

**Verify Installation**:
```bash
act --version
# Expected: act version 0.2.x or later
```

### 2. Docker Running

`act` requires Docker to create runner environments:

```bash
docker --version
# Expected: Docker version 20.x or later

docker ps
# Should not error (Docker daemon running)
```

---

## Testing CI Workflow Locally

### Full CI Run (All Jobs)

Replicate exactly what runs on GitHub:

```bash
# From repository root
act pull_request

# Expected output:
# [CI/test] 🚀  Start image=catthehacker/ubuntu:act-latest
# [CI/lint] 🚀  Start image=catthehacker/ubuntu:act-latest
# [CI/build] 🚀  Start image=catthehacker/ubuntu:act-latest
# ...
# [CI/test] ✅  Success
# [CI/lint] ✅  Success
# [CI/build] ✅  Success
```

**Duration**: ~3-5 minutes (first run slower due to image pull)

### Test Job Only

Run a single job to save time:

```bash
# Test job
act pull_request -j test

# Lint job
act pull_request -j lint

# Build job
act pull_request -j build
```

**Duration**: ~1-2 minutes per job

### Workflow File Selection

If multiple workflows exist:

```bash
act pull_request -W .github/workflows/ci.yml
```

---

## Testing Semantic Release Locally

### Dry-Run Mode (No Changes)

Test versioning logic without creating releases:

```bash
# Install semantic-release (if not already)
pnpm add -D semantic-release @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/changelog @semantic-release/npm @semantic-release/github @semantic-release/git

# Dry-run
npx semantic-release --dry-run --no-ci
```

**What It Does**:
- ✅ Analyzes commits since last release
- ✅ Determines next version (major/minor/patch)
- ✅ Generates release notes
- ❌ Does NOT:
  - Create git tags
  - Update package.json
  - Push changes
  - Create GitHub Release

**Expected Output**:
```
[semantic-release] › ✔  Loaded plugin "commit-analyzer"
[semantic-release] › ✔  Loaded plugin "release-notes-generator"
...
[semantic-release] › ℹ  Analysis of 5 commits complete: minor release
[semantic-release] › ℹ  The next release version is 1.2.0
...
[semantic-release] › ℹ  Skip GitHub release publication in dry-run mode
```

### Test Specific Commit Types

Verify version bumps for different commit types:

**Test Minor Release** (feat):
```bash
git checkout -b test-minor
git commit --allow-empty -m "feat: add new feature"
npx semantic-release --dry-run --no-ci
# Expected: minor release (e.g., 1.0.0 → 1.1.0)
```

**Test Patch Release** (fix):
```bash
git checkout -b test-patch
git commit --allow-empty -m "fix: resolve bug"
npx semantic-release --dry-run --no-ci
# Expected: patch release (e.g., 1.0.0 → 1.0.1)
```

**Test Major Release** (BREAKING CHANGE):
```bash
git checkout -b test-major
git commit --allow-empty -m "feat!: redesign API

BREAKING CHANGE: API signature changed"
npx semantic-release --dry-run --no-ci
# Expected: major release (e.g., 1.0.0 → 2.0.0)
```

**Test No Release** (chore/docs):
```bash
git checkout -b test-no-release
git commit --allow-empty -m "chore: update dependencies"
npx semantic-release --dry-run --no-ci
# Expected: "No commits since last release"
```

**Clean Up**:
```bash
git checkout main
git branch -D test-minor test-patch test-major test-no-release
```

---

## Replicating CI Environment

Run the exact same commands as CI:

### 1. Install Dependencies (Frozen Lockfile)

```bash
pnpm install --frozen-lockfile
```

**Why**: CI uses `--frozen-lockfile` to ensure reproducibility  
**Expected**: No changes to pnpm-lock.yaml

### 2. Run Tests

```bash
pnpm test:run
```

**Expected**:
```
✓ tests/index.test.ts (1)
  ✓ greet (1)
    ✓ should return greeting with name

Test Files  1 passed (1)
Tests  1 passed (1)
```

### 3. Check Coverage

```bash
pnpm test:coverage
```

**Expected**:
```
Coverage:
  Statements   : 100%
  Branches     : 100%
  Functions    : 100%
  Lines        : 100%
```

**Requirement**: ≥ 80% (Constitution Principle IV)

### 4. Lint Code

```bash
pnpm lint
```

**Expected**: No errors or warnings

### 5. Format Code

```bash
pnpm format
```

**Expected**: All files formatted (or "No files changed")

### 6. Combined Check

```bash
pnpm check
```

**Expected**: Lint + Format both pass

### 7. Build

```bash
pnpm build
```

**Expected**:
```
vite v6.0.7 building for production...
✓ 1 modules transformed.
dist/index.js  0.xx kB │ gzip: 0.xx kB
✓ built in xxms
```

---

## Debugging Failed CI Runs

### Reproduce Failure Locally

1. **Identify failing job** from GitHub Actions UI
2. **Find failing command** in CI logs
3. **Run same command locally**:

```bash
# Example: Test failure
pnpm test:run

# Example: Lint failure
pnpm lint

# Example: Build failure
pnpm build
```

### Common Issues & Solutions

#### Issue: Tests Pass Locally, Fail in CI

**Possible Causes**:
- Timezone differences
- Environment variables
- File paths (Windows vs Linux)

**Solution**:
```bash
# Run act to replicate CI environment exactly
act pull_request -j test
```

#### Issue: Lint Passes Locally, Fails in CI

**Possible Causes**:
- Different Biome version
- Uncommitted files

**Solution**:
```bash
# Check Biome version
pnpm list @biomejs/biome
# Should match package.json

# Ensure all files committed
git status
```

#### Issue: Build Fails with "Module not found"

**Possible Causes**:
- Missing dependency
- Incorrect import path

**Solution**:
```bash
# Clean install
rm -rf node_modules
pnpm install --frozen-lockfile
pnpm build
```

---

## act Configuration

### Default Runner Image

`act` uses `catthehacker/ubuntu:act-latest` by default (close to GitHub's ubuntu-latest).

**Override** (if needed):
```bash
act pull_request -P ubuntu-latest=catthehacker/ubuntu:full-latest
```

### Using .actrc (Optional)

Create `.actrc` in repository root:

```bash
# .actrc
-P ubuntu-latest=catthehacker/ubuntu:act-latest
--artifact-server-path=/tmp/artifacts
```

**Benefits**:
- No need to specify `-P` every time
- Store artifacts locally

### Secrets and Environment Variables

If CI uses secrets (future enhancement):

```bash
# Create .secrets file
GITHUB_TOKEN=your_token_here

# Run with secrets
act pull_request -s GITHUB_TOKEN
```

**Security**: Add `.secrets` to `.gitignore`!

---

## Performance Tips

### 1. Skip pnpm Install (If Already Installed)

```bash
# After first successful run, cache is available
act pull_request --reuse
```

### 2. Run Only Changed Jobs

```bash
# If only tests changed
act pull_request -j test
```

### 3. Use Smaller Image (Faster Startup)

```bash
act pull_request -P ubuntu-latest=catthehacker/ubuntu:act-latest
# vs
act pull_request -P ubuntu-latest=catthehacker/ubuntu:full-latest
```

**Trade-off**: `act-latest` is smaller but may lack some tools

---

## Continuous Testing Workflow

### Recommended Workflow

1. **Write test** (TDD)
   ```bash
   pnpm test
   ```

2. **Implement feature**
   ```bash
   pnpm test:run
   ```

3. **Check coverage**
   ```bash
   pnpm test:coverage
   ```

4. **Lint & format**
   ```bash
   pnpm check
   ```

5. **Build**
   ```bash
   pnpm build
   ```

6. **Test CI locally** (before push)
   ```bash
   act pull_request
   ```

7. **Push** (confident CI will pass)
   ```bash
   git push
   ```

### Pre-Push Checklist

Run this script before every push:

```bash
#!/bin/bash
# pre-push-check.sh

set -e  # Exit on error

echo "Running pre-push checks..."

echo "1. Testing..."
pnpm test:run

echo "2. Checking coverage..."
pnpm test:coverage

echo "3. Linting..."
pnpm lint

echo "4. Formatting..."
pnpm format

echo "5. Building..."
pnpm build

echo "6. Simulating CI..."
act pull_request

echo "✅ All checks passed! Safe to push."
```

**Usage**:
```bash
chmod +x pre-push-check.sh
./pre-push-check.sh && git push
```

---

## Troubleshooting act

### Issue: "Docker daemon not running"

**Solution**:
```bash
# macOS
open -a Docker

# Linux
sudo systemctl start docker
```

### Issue: "No workflows found"

**Solution**:
```bash
# Check workflow file exists
ls .github/workflows/

# Check workflow syntax
act -l
# Should list available jobs
```

### Issue: "Job failed with exit code 1"

**Solution**:
```bash
# Run with verbose output
act pull_request -v

# Check specific job logs
act pull_request -j test -v
```

### Issue: "Out of disk space"

**Solution**:
```bash
# Clean up Docker images
docker system prune -a

# Remove act cache
rm -rf ~/.cache/act
```

---

## Validation Checklist

Before committing workflow changes:
- [ ] `act pull_request` completes successfully
- [ ] All jobs pass (test, lint, build)
- [ ] No errors in act output
- [ ] Native commands match CI commands
- [ ] `semantic-release --dry-run` works (if applicable)

---

## Resources

- [act Documentation](https://github.com/nektos/act)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**Contract Version**: 1.0  
**Last Updated**: 2026-01-12  
**Status**: ✅ Ready for Implementation
