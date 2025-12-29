# GitHub CLI Tools - Python

Python-based CLI tools for GitHub operations using the `gh` CLI.

## Setup

Install dependencies using `uv`:

```bash
cd src/py
uv sync
```

This will create a virtual environment and install all dependencies.

## Usage

### Running the CLI

Activate the virtual environment and run the CLI:

```bash
# Activate virtual environment
source .venv/bin/activate

# Run the CLI
ghcli-tools --help
ghcli-tools hello --name "Developer"
ghcli-tools version
```

Or run directly with uv:

```bash
uv run ghcli-tools --help
```

### Development

#### Installing in development mode

```bash
uv sync
```

#### Running tests

```bash
uv run pytest
```

#### Running linter

```bash
uv run ruff check .
```

#### Running formatter

```bash
uv run ruff format .
```

#### Type checking

```bash
uv run pyright
```

## Project Structure

```
src/py/
├── pyproject.toml           # Project configuration
├── uv.lock                  # Dependency lock file
├── README.md                # This file
└── ghcli_tools/
    ├── __init__.py          # Package initialization
    ├── cli.py               # Main CLI entry point
    └── __main__.py          # Module entry point
```

## Dependencies

- **click**: Command-line interface creation
- **pytest**: Testing framework (dev)
- **ruff**: Linter and formatter (dev)
- **pyright**: Type checker (dev)

## Adding Commands

Add new commands to `ghcli_tools/cli.py`:

```python
@cli.command()
@click.option("--option", help="Option description")
def new_command(option: str) -> None:
    """Command description."""
    # Implementation
    pass
```

## GitHub CLI Integration

This package is designed to work with the GitHub CLI (`gh`). Example:

```python
import subprocess

def run_gh_command(args: list[str]) -> str:
    """Run a gh command and return output."""
    result = subprocess.run(
        ["gh"] + args,
        capture_output=True,
        text=True,
        check=True
    )
    return result.stdout
```

## Contributing

1. Add your feature or fix
2. Run tests: `uv run pytest`
3. Run linter: `uv run ruff check .`
4. Run formatter: `uv run ruff format .`
5. Run type checker: `uv run pyright`
