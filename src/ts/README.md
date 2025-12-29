# GitHub CLI Tools - TypeScript

TypeScript-based CLI tools for GitHub operations using the `gh` CLI.

## Setup

Install dependencies using `pnpm`:

```bash
cd src/ts
pnpm install
```

## Usage

### Building the CLI

Compile TypeScript to JavaScript:

```bash
pnpm run build
```

### Running the CLI

After building, run the CLI:

```bash
pnpm run cli
pnpm run cli hello Developer
pnpm run cli version
```

Or run directly with Node:

```bash
node dist/index.js
```

### Development

#### Watch mode for development

```bash
pnpm run dev
```

This will watch for file changes and recompile automatically.

#### Running linter

```bash
pnpm run lint
```

#### Auto-fix linting issues

```bash
pnpm run lint:fix
```

#### Running formatter

```bash
pnpm run format
```

#### Check formatting

```bash
pnpm run format:check
```

#### Type checking

```bash
pnpm run typecheck
```

## Project Structure

```
src/ts/
├── package.json             # Project configuration
├── pnpm-lock.yaml          # Dependency lock file
├── tsconfig.json           # TypeScript configuration
├── README.md               # This file
└── src/
    └── index.ts            # Main CLI entry point
```

## Dependencies

### Development

- **typescript**: TypeScript compiler
- **@types/node**: Node.js type definitions
- **eslint**: JavaScript/TypeScript linter
- **prettier**: Code formatter
- **typescript-eslint**: TypeScript support for ESLint

## Adding Commands

Add new commands to `src/index.ts`:

```typescript
function newCommand(arg: string): void {
  console.log(`Executing new command with: ${arg}`);
}

// In the switch statement:
case "new-command":
  newCommand(args[1]);
  break;
```

## GitHub CLI Integration

This package is designed to work with the GitHub CLI (`gh`). Example:

```typescript
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runGhCommand(args: string[]): Promise<string> {
  const { stdout } = await execAsync(`gh ${args.join(" ")}`);
  return stdout;
}
```

## Scripts

- `build`: Compile TypeScript to JavaScript
- `dev`: Watch mode for development
- `cli`: Run the compiled CLI
- `lint`: Run ESLint
- `lint:fix`: Auto-fix ESLint issues
- `format`: Format code with Prettier
- `format:check`: Check code formatting
- `typecheck`: Run TypeScript type checker

## Contributing

1. Add your feature or fix
2. Run type checker: `pnpm run typecheck`
3. Run linter: `pnpm run lint`
4. Run formatter: `pnpm run format`
5. Build: `pnpm run build`
6. Test: `pnpm run cli`
