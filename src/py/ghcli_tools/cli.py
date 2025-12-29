"""Main CLI entry point for ghcli-tools."""

import click


@click.group()
@click.version_option(version="0.1.0", prog_name="ghcli-tools")
def cli() -> None:
    """GitHub CLI Tools - A collection of gh utilities."""
    pass


@cli.command()
@click.option("--name", default="World", help="Name to greet")
def hello(name: str) -> None:
    """Say hello to someone."""
    click.echo(f"Hello, {name}!")


@cli.command()
def version() -> None:
    """Show the version."""
    click.echo("ghcli-tools version 0.1.0")


if __name__ == "__main__":
    cli()
