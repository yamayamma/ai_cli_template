# Python Coding Instructions

Guidelines for Python development in this repository.

## Package Manager: uv

Always use `uv` for Python package management:

```bash
# Install dependencies
uv sync

# Add a package
uv add package-name

# Add a dev dependency
uv add --dev package-name

# Run a command in the virtual environment
uv run command

# Update dependencies
uv lock --upgrade
```

## Code Style

### Formatting: Ruff

- Use `ruff format` for code formatting
- Configuration in `ruff.toml`
- Use double quotes for strings
- 4 spaces for indentation
- Maximum line length: handled by formatter

```bash
# Format code
uv run ruff format .

# Check formatting
uv run ruff format --check .
```

### Linting: Ruff

- Use `ruff check` for linting
- Configuration in `ruff.toml`
- Follows PEP 8, pyflakes, isort, and more

```bash
# Lint code
uv run ruff check .

# Auto-fix issues
uv run ruff check --fix .
```

### Type Checking: Pyright

- Use `pyright` for static type checking
- Configuration in `pyrightconfig.json`
- Add type annotations to all functions
- Use `typing` module for complex types

```bash
# Type check
uv run pyright
```

## Code Conventions

### Imports

- Use absolute imports from package root
- Group imports: standard library, third-party, local
- Use `ruff` to sort imports automatically

```python
# Standard library
import os
import sys

# Third-party
import click

# Local
from ghcli_tools import something
```

### Type Annotations

Always add type annotations:

```python
def greet(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"

def process_items(items: list[str]) -> dict[str, int]:
    """Process a list of items."""
    return {item: len(item) for item in items}
```

### Docstrings

Use Google-style docstrings:

```python
def function_name(param1: str, param2: int) -> bool:
    """Brief description.

    Longer description if needed.

    Args:
        param1: Description of param1
        param2: Description of param2

    Returns:
        Description of return value

    Raises:
        ValueError: When param2 is negative
    """
    pass
```

### Error Handling

Be explicit with exceptions:

```python
# Good
try:
    result = risky_operation()
except ValueError as e:
    click.echo(f"Invalid value: {e}", err=True)
    raise

# Avoid bare except
try:
    result = risky_operation()
except:  # Bad!
    pass
```

### CLI Commands (Click)

Use Click decorators consistently:

```python
@cli.command()
@click.option("--name", required=True, help="User name")
@click.option("--verbose", is_flag=True, help="Enable verbose output")
def command(name: str, verbose: bool) -> None:
    """Command description."""
    if verbose:
        click.echo(f"Processing {name}...")
    # Implementation
```

## Testing

### Pytest

- Write tests for all public functions
- Use fixtures for common setup
- Name test files `test_*.py`
- Name test functions `test_*`

```python
import pytest
from ghcli_tools.cli import greet

def test_greet():
    """Test greeting function."""
    assert greet("World") == "Hello, World!"

def test_greet_with_empty_string():
    """Test greeting with empty string."""
    assert greet("") == "Hello, !"

@pytest.fixture
def sample_data():
    """Provide sample data for tests."""
    return {"key": "value"}

def test_with_fixture(sample_data):
    """Test using a fixture."""
    assert sample_data["key"] == "value"
```

### Running Tests

```bash
# Run all tests
uv run pytest

# Run with coverage
uv run pytest --cov=ghcli_tools --cov-report=term-missing

# Run specific test
uv run pytest tests/test_file.py::test_function
```

## Project Structure

```
src/py/
├── pyproject.toml          # Project configuration
├── uv.lock                 # Dependency lock file
└── ghcli_tools/
    ├── __init__.py         # Package initialization
    ├── cli.py              # CLI entry point
    ├── __main__.py         # Module entry point
    └── utils/              # Utility modules
        └── __init__.py
```

## Best Practices

1. **Use virtual environments**: `uv` manages this automatically
2. **Pin dependencies**: `uv.lock` tracks exact versions
3. **Type everything**: Add type hints to all functions
4. **Test thoroughly**: Aim for high test coverage
5. **Document well**: Use docstrings and comments
6. **Lint before commit**: Run ruff check and format
7. **Check types**: Run pyright before committing

## Common Commands

```bash
# Development workflow
cd src/py
uv sync                          # Install dependencies
uv run ruff check .              # Lint
uv run ruff format .             # Format
uv run pyright                   # Type check
uv run pytest                    # Test

# Run the CLI
uv run ghcli-tools --help
uv run ghcli-tools command --option value

# Add dependencies
uv add requests
uv add --dev pytest-mock
```

## GitHub CLI Integration

When using `gh` commands:

```python
import subprocess
from typing import Any

def run_gh(args: list[str]) -> str:
    """Run a gh command and return output.

    Args:
        args: Command arguments (e.g., ["repo", "view"])

    Returns:
        Command output as string

    Raises:
        subprocess.CalledProcessError: If command fails
    """
    result = subprocess.run(
        ["gh"] + args,
        capture_output=True,
        text=True,
        check=True
    )
    return result.stdout.strip()
```

## References

- [uv documentation](https://docs.astral.sh/uv/)
- [Ruff documentation](https://docs.astral.sh/ruff/)
- [Pyright documentation](https://github.com/microsoft/pyright)
- [Click documentation](https://click.palletsprojects.com/)
- [pytest documentation](https://docs.pytest.org/)
