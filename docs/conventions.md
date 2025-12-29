# Conventions and Best Practices

This document outlines the conventions and best practices for this project.

## Git Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `chore/` - Maintenance tasks

Examples:
```
feat/add-repo-search
fix/authentication-error
docs/update-readme
refactor/cli-structure
test/add-integration-tests
chore/update-dependencies
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, CI, etc.)
- `perf`: Performance improvements
- `ci`: CI/CD changes

Examples:
```
feat(cli): add repo search command
fix(auth): handle expired tokens correctly
docs: update installation guide
chore(deps): update Python dependencies
test(cli): add tests for hello command
```

Good commit messages:
- Start with lowercase (except proper nouns)
- Use imperative mood ("add" not "added")
- Be specific and clear
- Keep subject line under 72 characters
- Add body for complex changes

### Pull Requests

#### PR Title
Follow the same convention as commit messages:
```
feat: add repository search functionality
fix: resolve authentication timeout issue
```

#### PR Description
Include:
1. **What**: What changes were made
2. **Why**: Why these changes were necessary
3. **How**: How the changes work (if complex)
4. **Testing**: How you tested the changes
5. **Screenshots**: For UI changes (if applicable)

Template:
```markdown
## Description
Brief description of changes.

## Changes
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Related Issues
Fixes #123
Relates to #456
```

#### PR Review Process
1. **Self-review**: Review your own PR first
2. **Check CI**: Ensure all checks pass
3. **Request review**: Assign reviewers
4. **Address feedback**: Make requested changes
5. **Merge**: Use appropriate merge strategy

### Merge Strategy

- **Squash and merge**: For feature branches (default)
- **Merge commit**: For release branches
- **Rebase**: When updating feature branches with main

## Code Organization

### File Structure

Keep files organized by purpose:

```
src/
  py/                    # Python code
    ghcli_tools/
      __init__.py
      cli.py            # CLI entry point
      commands/         # Command implementations
      utils/            # Utility functions
  ts/                   # TypeScript code
    src/
      index.ts          # Entry point
      commands/         # Command implementations
      utils/            # Utility functions
docs/                   # Documentation
scripts/                # Shell scripts
.github/                # GitHub-specific files
  workflows/            # GitHub Actions
  instructions/         # Copilot instructions
```

### Naming Conventions

#### Python
- Files: `snake_case.py`
- Classes: `PascalCase`
- Functions: `snake_case()`
- Variables: `snake_case`
- Constants: `UPPER_SNAKE_CASE`
- Private: `_leading_underscore`

```python
class RepoManager:
    MAX_RETRIES = 3
    
    def __init__(self, token: str):
        self._token = token
    
    def get_repo(self, name: str) -> dict:
        return {}
```

#### TypeScript
- Files: `kebab-case.ts`
- Classes: `PascalCase`
- Functions: `camelCase()`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Interfaces: `PascalCase` (no `I` prefix)
- Types: `PascalCase`

```typescript
interface Repository {
  name: string;
  owner: string;
}

class RepoManager {
  private readonly MAX_RETRIES = 3;
  private token: string;
  
  constructor(token: string) {
    this.token = token;
  }
  
  getRepo(name: string): Repository {
    return { name: "", owner: "" };
  }
}
```

#### Shell Scripts
- Files: `kebab-case.sh`
- Functions: `snake_case()`
- Variables: `snake_case`
- Environment variables: `UPPER_SNAKE_CASE`

```bash
#!/bin/bash
set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

function check_dependencies() {
    command -v gh >/dev/null 2>&1 || {
        echo "Error: gh is not installed" >&2
        exit 1
    }
}
```

## Documentation

### Code Comments

Use comments sparingly and wisely:

#### When to Comment
- Complex algorithms
- Non-obvious business logic
- Workarounds for bugs
- Public API documentation

#### When NOT to Comment
- Obvious code
- Redundant descriptions
- Code that can be improved instead

Good comments:
```python
# Calculate tax using 2024 tax brackets
tax = calculate_tax(income)

# HACK: GitHub API sometimes returns 502, retry with backoff
# TODO: Remove when GitHub fixes their API
result = retry_with_backoff(gh_api_call)
```

Bad comments:
```python
# Increment counter
counter += 1  # Bad: obvious

# Get the user name
name = user.name  # Bad: redundant

# This function adds two numbers
def add(a, b):  # Bad: use docstring instead
    return a + b
```

### Documentation Files

Keep documentation up to date:

- **README.md**: Overview and quick start
- **docs/**: Detailed guides
- **Code comments**: Inline explanations
- **Docstrings**: API documentation

Update documentation when:
- Adding new features
- Changing behavior
- Fixing bugs that affect usage
- Adding dependencies

## Testing

### Test Organization

```
src/py/
  tests/
    __init__.py
    test_cli.py
    test_utils.py
    fixtures/
      __init__.py
      data.py

src/ts/
  src/
    __tests__/
      index.test.ts
      utils.test.ts
```

### Test Naming

Python:
```python
def test_function_with_valid_input():
    """Test function returns correct result with valid input."""
    pass

def test_function_raises_error_with_invalid_input():
    """Test function raises ValueError with invalid input."""
    pass
```

TypeScript:
```typescript
describe("functionName", () => {
  test("returns correct result with valid input", () => {
    // Test
  });
  
  test("throws error with invalid input", () => {
    // Test
  });
});
```

### Test Coverage

Aim for:
- **80%+ overall coverage**: Good target
- **100% for critical paths**: Authentication, data processing
- **Test edge cases**: Empty inputs, null values, errors

## Code Review

### As a Reviewer

- Be constructive and polite
- Explain the "why" behind suggestions
- Distinguish between blocking and non-blocking comments
- Test the changes if possible
- Approve when satisfied

### As an Author

- Respond to all comments
- Ask for clarification if needed
- Make requested changes promptly
- Mark conversations as resolved
- Thank reviewers

### Review Checklist

- [ ] Code follows conventions
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No obvious bugs
- [ ] No security issues
- [ ] Performance is acceptable
- [ ] Error handling is proper

## Security

### Secrets Management

- **Never commit secrets**: Use `.env` files (gitignored)
- **Use environment variables**: For tokens and keys
- **Use GitHub Secrets**: For CI/CD
- **Rotate tokens regularly**: Update periodically

### Dependencies

- **Keep updated**: Regular dependency updates
- **Review security advisories**: Check for vulnerabilities
- **Pin versions**: Use lock files (`uv.lock`, `pnpm-lock.yaml`)
- **Audit dependencies**: Run security scans

## Performance

### Python
- Use list comprehensions over loops
- Cache expensive computations
- Use generators for large datasets
- Profile before optimizing

### TypeScript
- Avoid unnecessary async/await
- Use appropriate data structures
- Minimize I/O operations
- Profile with proper tools

## Accessibility

### CLI Design
- Provide `--help` for all commands
- Use consistent flag naming
- Show progress for long operations
- Provide clear error messages
- Support piping and scripting

### Error Messages

Good error messages:
```
Error: GitHub token not found
Help: Set GITHUB_TOKEN environment variable or run 'gh auth login'
```

Bad error messages:
```
Error: Token missing
```

## Continuous Improvement

### Regular Tasks

- **Weekly**: Review open PRs and issues
- **Monthly**: Update dependencies
- **Quarterly**: Review and update documentation
- **As needed**: Refactor problematic code

### Learning

- Read project documentation
- Review others' code
- Ask questions
- Share knowledge

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Git Best Practices](https://git-scm.com/book/en/v2)
