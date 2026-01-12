# CONTRIBUTING.md Outline

**Purpose**: Define structure and content for contribution guidelines  
**File Location**: `CONTRIBUTING.md` (repository root)  
**Target Audience**: New and existing contributors

## Document Structure

---

## 1. Welcome & Overview

**Content**:
- Brief welcome message
- Link to Constitution (.specify/memory/constitution.md)
- Project values (TDD, strict typing, ESM-first)

**Example**:
```markdown
# Contributing to TypeScript Web App Development Template

Thank you for your interest in contributing! This project follows strict principles defined in our [Constitution](.specify/memory/constitution.md).

**Core Values**:
- 🧪 Test-First Development (TDD) is mandatory
- 🔒 TypeScript Strict Mode enforced
- 📦 ESM-only module system
- ✅ 80%+ test coverage required
```

---

## 2. Prerequisites

**Content**:
- Software requirements
- Account requirements
- Recommended tools

**Checklist Format**:
```markdown
## Prerequisites

Before contributing, ensure you have:

- [ ] Docker Desktop or Docker Engine installed
- [ ] VS Code with Dev Containers extension
- [ ] GitHub account with:
  - [ ] Git configured (`git config user.name` and `user.email`)
  - [ ] SSH key or PAT for GitHub authentication
- [ ] (Optional) GitHub Copilot subscription
```

---

## 3. Getting Started

**Content**:
- Clone repository
- Open in devcontainer
- Verify setup

**Step-by-step format**:
```markdown
## Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yamayamma/ai_cli_template.git
cd ai_cli_template
\`\`\`

### 2. Open in Dev Container

1. Open the project in VS Code
2. Press `F1` → "Dev Containers: Reopen in Container"
3. Wait for container build (first time: ~2-3 minutes)

### 3. Verify Setup

\`\`\`bash
# Check Node and pnpm versions
node --version  # Should be v22.x
pnpm --version  # Should be 9.x

# Run tests to verify environment
pnpm test:run

# Run linter
pnpm check
\`\`\`

Expected output: ✅ All checks pass
```

---

## 4. Development Workflow (TDD Cycle)

**Content**:
- Complete TDD cycle as per Constitution
- User review requirement
- Examples of test-first development

**Format**:
```markdown
## Development Workflow

This project strictly follows **Test-Driven Development (TDD)**. You MUST write tests before implementation.

### TDD Cycle

1. **Write Test** 📝
   \`\`\`typescript
   // tests/feature.test.ts
   import { describe, expect, it } from 'vitest';
   import { myNewFeature } from '../src/feature';

   describe('myNewFeature', () => {
     it('should return expected output for given input', () => {
       expect(myNewFeature('input')).toBe('expected output');
     });
   });
   \`\`\`

2. **Get Approval** ✅
   - Commit test to feature branch
   - Request review from maintainer
   - Wait for test approval before proceeding

3. **Red Phase** 🔴
   \`\`\`bash
   pnpm test:run
   # Expected: Test fails with clear error
   \`\`\`

4. **Green Phase** 🟢
   - Implement minimal code to pass test
   \`\`\`bash
   pnpm test:run
   # Expected: Test passes
   \`\`\`

5. **Refactor** ♻️
   - Clean up code while keeping tests green
   - Run `pnpm check` to format and lint

6. **Verify Coverage** 📊
   \`\`\`bash
   pnpm test:coverage
   # Required: ≥ 80% coverage
   \`\`\`

### Why User Review is Required

Tests serve as executable specifications. Approving tests = approving behavior.
```

---

## 5. Code Quality Standards

**Content**:
- Linting rules
- Formatting standards
- Coverage requirements
- Available commands

**Format**:
```markdown
## Code Quality Standards

### Linting & Formatting

This project uses **Biome** for both linting and formatting.

\`\`\`bash
# Check for issues (no auto-fix)
pnpm lint

# Format code
pnpm format

# Check + Format (recommended before commit)
pnpm check
\`\`\`

All PRs must pass `pnpm check` without errors.

### TypeScript Strict Mode

All code must compile with TypeScript strict mode enabled.

**Forbidden**:
- ❌ `any` type (unless justified with comment)
- ❌ Type assertions (`as`) without explanation
- ❌ `@ts-ignore` or `@ts-expect-error`

### Test Coverage

**Requirement**: ≥ 80% code coverage

\`\`\`bash
pnpm test:coverage
\`\`\`

Coverage report shows:
- Statements
- Branches
- Functions
- Lines

Critical paths (if any) require 100% coverage.
```

---

## 6. Commit Guidelines

**Content**:
- Conventional Commits format
- Examples for each type
- What triggers releases

**Format**:
```markdown
## Commit Guidelines

We use **Conventional Commits** for automated versioning.

### Format

\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer]
\`\`\`

### Types

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | Minor (1.0.0 → 1.1.0) |
| `fix` | Bug fix | Patch (1.1.0 → 1.1.1) |
| `docs` | Documentation only | None |
| `style` | Code style (formatting) | None |
| `refactor` | Code refactoring | None |
| `perf` | Performance improvement | None |
| `test` | Adding tests | None |
| `chore` | Maintenance | None |

### Examples

**Feature** (triggers minor release):
\`\`\`
feat: add support for custom greetings
\`\`\`

**Bug Fix** (triggers patch release):
\`\`\`
fix: resolve null pointer in greet function
\`\`\`

**Breaking Change** (triggers major release):
\`\`\`
feat!: redesign API

BREAKING CHANGE: greet() now requires name parameter
\`\`\`

**No Release**:
\`\`\`
docs: fix typo in README
chore: update devcontainer configuration
\`\`\`

### Scope (Optional)

Add scope for clarity:
\`\`\`
feat(ci): add coverage badge
fix(tests): correct timeout value
\`\`\`
```

---

## 7. Pull Request Process

**Content**:
- Branch naming
- PR checklist
- Review expectations
- Merge requirements

**Format**:
```markdown
## Pull Request Process

### 1. Create Feature Branch

\`\`\`bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/bug-description
\`\`\`

### 2. Make Changes (Following TDD)

1. Write tests
2. Get test approval
3. Implement feature
4. Verify coverage

### 3. Before Submitting PR

Run all checks locally:

\`\`\`bash
# Tests
pnpm test:run

# Coverage
pnpm test:coverage

# Linting & Formatting
pnpm check

# Build
pnpm build
\`\`\`

All commands must pass ✅

### 4. Submit Pull Request

**PR Title**: Use conventional commit format
\`\`\`
feat: add user authentication
fix: resolve memory leak in cache
\`\`\`

**PR Description Template**:
\`\`\`markdown
## Description
[What does this PR do?]

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

## Checklist
- [ ] Tests written and approved
- [ ] All tests passing (`pnpm test:run`)
- [ ] Coverage ≥ 80% (`pnpm test:coverage`)
- [ ] Linting passes (`pnpm check`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Commit messages follow Conventional Commits
- [ ] Documentation updated (if applicable)
\`\`\`

### 5. Code Review

**What Reviewers Check**:
- ✅ Tests accurately specify expected behavior
- ✅ Implementation matches test specifications
- ✅ No unexplained `any` types or type assertions
- ✅ Code follows Constitution principles
- ✅ Coverage requirement met (≥ 80%)

**Timeline**: Reviews typically completed within 2 business days

### 6. Merge Requirements

Before merge, the following must be true:
- ✅ All CI checks pass (test, lint, build)
- ✅ Code review approved by maintainer
- ✅ Conflicts resolved
- ✅ Branch up-to-date with `main`
```

---

## 8. Testing Guidelines

**Content**:
- Where to put tests
- Test structure (describe/it)
- Mocking guidelines
- Coverage requirements

**Format**:
```markdown
## Testing Guidelines

### Test Location

\`\`\`
tests/
├── unit/           # Unit tests (isolated functions)
├── integration/    # Integration tests (multiple components)
└── *.test.ts       # All test files end with .test.ts
\`\`\`

### Test Structure

Use `describe` for grouping, `it` for individual tests:

\`\`\`typescript
import { describe, expect, it } from 'vitest';

describe('myFunction', () => {
  it('should handle valid input', () => {
    expect(myFunction('valid')).toBe('result');
  });

  it('should throw on invalid input', () => {
    expect(() => myFunction('invalid')).toThrow('Error message');
  });
});
\`\`\`

### Test Naming

Tests should read as specifications:
- ✅ "should return greeting with name"
- ✅ "should throw error when name is empty"
- ❌ "test1", "works", "testGreet"

### Running Tests

\`\`\`bash
# Watch mode (during development)
pnpm test

# Single run (before commit)
pnpm test:run

# With coverage
pnpm test:coverage
\`\`\`
```

---

## 9. Documentation Standards

**Content**:
- Code comments (when to use)
- JSDoc for public APIs
- README updates

**Format**:
```markdown
## Documentation Standards

### Code Comments

**When to Comment**:
- ✅ Why (rationale), not what (code is self-explanatory)
- ✅ Complex algorithms
- ✅ Workarounds or non-obvious solutions

**When NOT to Comment**:
- ❌ Obvious code (`i++` doesn't need explanation)
- ❌ Redundant comments that repeat code

### JSDoc for Public APIs

All exported functions/classes require JSDoc:

\`\`\`typescript
/**
 * Greets a person by name.
 * 
 * @param name - The person's name
 * @returns A greeting message
 * @throws {Error} If name is empty
 * 
 * @example
 * \`\`\`typescript
 * greet('Alice') // Returns: "Hello, Alice!"
 * \`\`\`
 */
export function greet(name: string): string {
  if (!name) throw new Error('Name is required');
  return \`Hello, \${name}!\`;
}
\`\`\`

### README Updates

Update README.md if your PR:
- Adds new features (update "Features" section)
- Changes setup process
- Modifies API
```

---

## 10. Getting Help

**Content**:
- Where to ask questions
- How to report bugs
- Feature requests

**Format**:
```markdown
## Getting Help

### Questions

Have a question? Check these resources first:

1. [README](README.md) - Setup and usage
2. [Constitution](.specify/memory/constitution.md) - Project principles
3. [Existing Issues](https://github.com/yamayamma/ai_cli_template/issues) - Known issues

Still need help? [Open a discussion](https://github.com/yamayamma/ai_cli_template/discussions)

### Bug Reports

[Open an issue](https://github.com/yamayamma/ai_cli_template/issues/new) with:
- Clear title describing the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, etc.)

### Feature Requests

[Open an issue](https://github.com/yamayamma/ai_cli_template/issues/new) with:
- Clear description of the feature
- Use case / problem it solves
- Proposed solution (optional)

Maintainers will label and prioritize requests.
```

---

## 11. Code of Conduct

**Content**:
- Link to CODE_OF_CONDUCT.md (if exists)
- Or inline basic conduct expectations

**Format**:
```markdown
## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors.

**Expected Behavior**:
- Be respectful and considerate
- Focus on what's best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

**Unacceptable Behavior**:
- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

**Enforcement**: Violations may result in removal from the project.

For more details, see our [Code of Conduct](CODE_OF_CONDUCT.md) (if applicable).
```

---

## 12. Attribution & Thanks

**Content**:
- Thank contributors
- Link to contributors page

**Format**:
```markdown
## Contributors

Thank you to all our contributors! 🎉

See [Contributors](https://github.com/yamayamma/ai_cli_template/graphs/contributors)

---

**License**: MIT  
**Maintained by**: @yamayamma
```

---

## Validation Checklist

Before finalizing CONTRIBUTING.md:
- [ ] All sections present and complete
- [ ] Code examples are accurate
- [ ] Commands tested and work
- [ ] Links resolve (no 404s)
- [ ] Follows Constitution principles
- [ ] Clear and concise language
- [ ] Examples for all commit types
- [ ] TDD cycle clearly explained

---

**Contract Version**: 1.0  
**Last Updated**: 2026-01-12  
**Status**: ✅ Ready for Implementation
