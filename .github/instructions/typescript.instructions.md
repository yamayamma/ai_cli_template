# TypeScript Coding Instructions

Guidelines for TypeScript development in this repository.

## Package Manager: pnpm

Always use `pnpm` for Node.js package management:

```bash
# Install dependencies
pnpm install

# Add a package
pnpm add package-name

# Add a dev dependency
pnpm add -D package-name

# Run a script
pnpm run script-name

# Update dependencies
pnpm update
```

## Code Style

### Formatting: Prettier

- Use `prettier` for code formatting
- Configuration in `prettier.config.js`
- Use double quotes for strings
- 2 spaces for indentation
- Semicolons required
- Trailing commas in ES5

```bash
# Format code
pnpm run format

# Check formatting
pnpm run format:check
```

### Linting: ESLint

- Use `eslint` with typescript-eslint
- Configuration in `eslint.config.js` (flat config)
- Extends recommended TypeScript rules

```bash
# Lint code
pnpm run lint

# Auto-fix issues
pnpm run lint:fix
```

### Type Checking: TypeScript

- Use `tsc` for type checking
- Configuration in `tsconfig.json`
- Strict mode enabled
- Add types to all functions

```bash
# Type check
pnpm run typecheck

# Build
pnpm run build
```

## Code Conventions

### Imports

- Use ES modules (`import`/`export`)
- Group imports: external packages, then internal modules
- Use named exports for utilities, default for main components

```typescript
// External packages
import { exec } from "child_process";
import { promisify } from "util";

// Internal modules
import { helper } from "./utils";

// Named exports
export function utilityFunction(): void {}

// Default export
export default function main(): void {}
```

### Type Annotations

Always add explicit types:

```typescript
// Functions
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Async functions
async function fetchData(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

// Arrays and objects
const names: string[] = ["Alice", "Bob"];
const user: { name: string; age: number } = { name: "Alice", age: 30 };

// Type aliases
type User = {
  name: string;
  age: number;
};

// Interfaces
interface Repository {
  name: string;
  owner: string;
  stars: number;
}
```

### Functions

Prefer explicit return types:

```typescript
// Good
function add(a: number, b: number): number {
  return a + b;
}

// Async
async function loadFile(path: string): Promise<string> {
  // Implementation
  return "";
}

// Void return
function logMessage(msg: string): void {
  console.log(msg);
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b;
```

### Error Handling

Be explicit with error types:

```typescript
// Try-catch with error typing
try {
  const result = riskyOperation();
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error("Unknown error occurred");
  }
}

// Custom error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validate(input: string): void {
  if (!input) {
    throw new ValidationError("Input cannot be empty");
  }
}
```

### CLI Development

Structure CLI with clear command handling:

```typescript
#!/usr/bin/env node

type Command = "help" | "version" | "create";

function parseArgs(): { command: Command; args: string[] } {
  const [, , command, ...args] = process.argv;
  return { command: (command as Command) || "help", args };
}

function showHelp(): void {
  console.log(`
Usage: cli-name [command] [options]

Commands:
  help      Show help
  version   Show version
  create    Create something
  `);
}

function main(): void {
  const { command, args } = parseArgs();

  switch (command) {
    case "help":
      showHelp();
      break;
    case "version":
      console.log("1.0.0");
      break;
    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}

main();
```

## Project Structure

```
src/ts/
├── package.json            # Project configuration
├── pnpm-lock.yaml         # Dependency lock file
├── tsconfig.json          # TypeScript configuration
└── src/
    ├── index.ts           # Main entry point
    ├── commands/          # CLI commands
    │   └── create.ts
    └── utils/             # Utility functions
        └── helpers.ts
```

## Best Practices

1. **Use strict TypeScript**: Enable all strict options in `tsconfig.json`
2. **Explicit types**: Add return types to all functions
3. **No `any`**: Avoid `any` type, use `unknown` if needed
4. **Use `const`**: Prefer `const` over `let`, avoid `var`
5. **Arrow functions**: Use arrow functions for callbacks
6. **Async/await**: Prefer async/await over promises
7. **ES modules**: Use `import`/`export`, not `require`
8. **Error handling**: Always handle errors properly

## Common Commands

```bash
# Development workflow
cd src/ts
pnpm install                 # Install dependencies
pnpm run lint                # Lint
pnpm run format              # Format
pnpm run typecheck           # Type check
pnpm run build               # Build

# Development mode
pnpm run dev                 # Watch and rebuild

# Run the CLI
pnpm run cli
pnpm run cli command --option value
node dist/index.js
```

## TypeScript Configuration

Key settings in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Testing

Use Node.js built-in test runner or add a test framework:

```typescript
// Example with assertions
import assert from "assert";

function add(a: number, b: number): number {
  return a + b;
}

// Simple test
assert.strictEqual(add(2, 3), 5);
```

For larger projects, consider adding:
- `vitest` or `jest` for testing
- `@types/jest` for type definitions

## GitHub CLI Integration

When using `gh` commands:

```typescript
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runGh(args: string[]): Promise<string> {
  /**
   * Run a gh command and return output.
   * @param args - Command arguments
   * @returns Command output
   * @throws Error if command fails
   */
  const { stdout, stderr } = await execAsync(`gh ${args.join(" ")}`);
  if (stderr) {
    throw new Error(stderr);
  }
  return stdout.trim();
}

// Usage
async function getRepoInfo(repo: string): Promise<string> {
  return await runGh(["repo", "view", repo, "--json", "name"]);
}
```

## Module System

This project uses ES modules:

```typescript
// package.json must have
{
  "type": "module"
}

// Use .js extension in imports (TypeScript will resolve)
import { helper } from "./utils/helper.js";

// For CommonJS modules
import pkg from "commonjs-package";

// Dynamic imports
const module = await import("./dynamic-module.js");
```

## References

- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [pnpm documentation](https://pnpm.io/)
- [ESLint documentation](https://eslint.org/)
- [Prettier documentation](https://prettier.io/)
- [Node.js documentation](https://nodejs.org/docs/)
