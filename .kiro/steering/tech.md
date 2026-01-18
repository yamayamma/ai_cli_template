# Technology Stack

## Architecture

ES Modules (ESM) ファーストのライブラリ/アプリケーション構成。ViteによるバンドルとTypeScriptの厳格モードを基盤とする。

## Core Technologies

- **Language**: TypeScript 5.x（strict mode）
- **Runtime**: Node.js 22 LTS
- **Bundler**: Vite 6.x
- **Package Manager**: pnpm 9.x

## Key Libraries

- **Testing**: Vitest（v8カバレッジ）
- **Linting/Formatting**: Biome
- **Documentation**: TypeDoc
- **Release**: semantic-release

## Development Standards

### Type Safety
- TypeScript strict mode 全オプション有効
- `any` 禁止、unknown使用推奨
- exactOptionalPropertyTypes、noUncheckedIndexedAccess有効

### Code Quality
- Biome recommended rules
- 未使用import/変数はエラー
- 認知的複雑度の警告

### Testing
- Vitest（globals有効）
- カバレッジ目標: 80%以上
- テストファイル: `tests/**/*.test.ts`

## Development Environment

### Required Tools
- Node.js 22.x
- pnpm 9.x
- VS Code + Dev Containers拡張

### Common Commands
```bash
# Dev: pnpm dev
# Build: pnpm build
# Test: pnpm test / pnpm test:coverage
# Lint: pnpm check
# Docs: pnpm docs:generate
```

## Key Technical Decisions

- **ESM-only**: `"type": "module"` によるES Modules標準化
- **Biome over ESLint/Prettier**: 高速な統合ツール採用
- **Path Alias**: `@/` → `src/` でimport簡素化
- **semantic-release**: Conventional Commitsによる自動バージョニング

---
_Document standards and patterns, not every dependency_
