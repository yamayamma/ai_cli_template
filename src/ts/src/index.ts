#!/usr/bin/env node

/**
 * GitHub CLI Tools - TypeScript edition
 * A simple CLI tool for GitHub operations
 */

const args = process.argv.slice(2);

function showHelp(): void {
  console.log(`
ghcli-ts - GitHub CLI Tools (TypeScript)

Usage:
  ghcli-ts [command] [options]

Commands:
  hello [name]    Say hello to someone (default: World)
  version         Show version information
  help            Show this help message

Examples:
  ghcli-ts hello
  ghcli-ts hello Developer
  ghcli-ts version
`);
}

function showVersion(): void {
  console.log("ghcli-ts version 0.1.0");
}

function hello(name: string = "World"): void {
  console.log(`Hello, ${name}!`);
}

function main(): void {
  const command = args[0];

  switch (command) {
    case "hello":
      hello(args[1]);
      break;
    case "version":
      showVersion();
      break;
    case "help":
    case undefined:
      showHelp();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Run "ghcli-ts help" for usage information.');
      process.exit(1);
  }
}

main();
