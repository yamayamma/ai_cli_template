# Project Structure

## Organization Philosophy

機能別分離: ソースコード、テスト、SPA、ドキュメントを明確に分離。各ディレクトリは単一責務を持つ。

## Directory Patterns

### Source Code
**Location**: `/src/`  
**Purpose**: ライブラリ/アプリケーションのメインソースコード  
**Example**: `index.ts` にエクスポート関数を定義

### Tests
**Location**: `/tests/`  
**Purpose**: ユニットテスト（ソースと1対1対応）  
**Example**: `src/index.ts` → `tests/index.test.ts`

### SPA Application
**Location**: `/spa/`  
**Purpose**: シングルページアプリケーション（独立したビルド対象）  
**Example**: `spa/src/` にReactコンポーネント

### Documentation
**Location**: `/docs/`  
**Purpose**: 生成されたAPIドキュメント、アーカイブ  
**Example**: TypeDocによる自動生成HTML

### Spec-Driven Development
**Location**: `.kiro/specs/`  
**Purpose**: 機能別の仕様書（requirements, design, tasks）  
**Example**: `.kiro/specs/feature-name/requirements.md`

**Location**: `.kiro/steering/`  
**Purpose**: プロジェクト全体のルール・コンテキスト  
**Example**: `product.md`, `tech.md`, `structure.md`

## Naming Conventions

- **Files**: kebab-case（`my-component.ts`）
- **Components**: PascalCase（`MyComponent`）
- **Functions**: camelCase（`myFunction`）
- **Constants**: UPPER_SNAKE_CASE（`MAX_RETRY_COUNT`）
- **Test Files**: `*.test.ts`

## Import Organization

```typescript
// 1. Node built-ins
import { resolve } from 'node:path';

// 2. External packages
import { defineConfig } from 'vite';

// 3. Path alias imports
import { something } from '@/utils';

// 4. Relative imports
import { Local } from './local';
```

**Path Aliases**:
- `@/`: Maps to `src/`

## Code Organization Principles

- ソースとテストは1対1対応を維持
- 公開APIは明示的にexport
- 内部実装は非公開（exportしない）
- JSDocコメントで公開関数を文書化

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
