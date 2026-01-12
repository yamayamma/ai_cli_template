# TypeScript Web App Development Template

![CI](https://img.shields.io/github/actions/workflow/status/yamayamma/ai_cli_template/ci.yml?branch=main&label=CI&logo=github)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?logo=vitest)
![Release](https://img.shields.io/github/v/release/yamayamma/ai_cli_template?logo=github)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-22.x-brightgreen?logo=node.js)
![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm)

TypeScript + GitHub Copilot を使用したWebアプリケーション開発のためのdevcontainerテンプレートです。

## 📋 Constitution（プロジェクト原則）

本プロジェクトは [Constitution](.specify/memory/constitution.md) に従って開発されます。

**主要原則**:
1. **Test-First Development (TDD)** - テスト駆動開発必須
2. **TypeScript Strict Mode** - 厳格な型チェック
3. **ESM-First** - ES Modules標準
4. **Quality Gates** - 80%以上のテストカバレッジ
5. **Documentation Through Tests** - テストが仕様書

## 🚀 クイックスタート

### 1. devcontainerで開く

```bash
# VS Code でこのリポジトリを開く
code .

# コマンドパレット (F1) → "Dev Containers: Reopen in Container"
```

初回起動時に自動で以下がインストールされます：
- Node.js 22 LTS
- pnpm 9
- 全依存関係

### 2. 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# テスト実行
pnpm test              # Watch mode
pnpm test:run          # 1回実行
pnpm test:coverage     # カバレッジレポート付き

# コード品質
pnpm lint              # リントチェック
pnpm format            # フォーマット実行
pnpm check             # リント + フォーマット（自動修正）

# ビルド
pnpm build             # プロダクションビルド
pnpm preview           # ビルド結果のプレビュー

# ドキュメント
pnpm docs:generate     # API ドキュメント生成
```

## 🔄 CI/CD & Automation

This project uses automated workflows for quality assurance and releases:

### Continuous Integration (CI)

Every pull request and push to `main` triggers:

- ✅ **Test Job** - Runs all unit tests with coverage reporting
- ✅ **Lint Job** - Checks code quality with Biome
- ✅ **Build Job** - Verifies TypeScript compilation

Status: ![CI](https://img.shields.io/github/actions/workflow/status/yamayamma/ai_cli_template/ci.yml?branch=main&label=CI&logo=github)

### Automated Releases

Commits to `main` with [conventional commit](https://www.conventionalcommits.org/) messages automatically:

1. **Analyze commits** - Determines version bump (major/minor/patch)
2. **Update version** - Updates `package.json` and `CHANGELOG.md`
3. **Create release** - Publishes GitHub Release with release notes
4. **Update badges** - Reflects latest version in README

**Commit examples**:
- `feat: add new feature` → Minor version bump (1.0.0 → 1.1.0)
- `fix: resolve bug` → Patch version bump (1.1.0 → 1.1.1)
- `feat!: breaking change` → Major version bump (1.1.1 → 2.0.0)

## 📚 Documentation

### API Documentation

Generate HTML documentation from TypeScript code:

```bash
pnpm docs:generate
```

Output: [docs/api/index.html](docs/api/index.html)

### Project Documentation

- **[Constitution](.specify/memory/constitution.md)** - Project principles and standards
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[docs/archive/](docs/archive/)** - Archived design documents

## 📦 技術スタック

| カテゴリ | ツール | バージョン | 理由 |
|---------|--------|-----------|------|
| 言語 | TypeScript | 5.x | 厳格な型付け、モダン機能 |
| ランタイム | Node.js | 22.x LTS | 最新安定版、ESMサポート |
| パッケージマネージャ | pnpm | 9.x | 高速、ディスク効率的 |
| バンドラー | Vite | 6.x | 高速HMR、ESMネイティブ |
| テスト | Vitest | 2.x | Viteネイティブ、高速 |
| リンター/フォーマッター | Biome | 1.9.x | 単一ツール、Rust製で高速 |

## 🏗️ プロジェクト構造

```
ai_cli_template/
├── .devcontainer/          # Dev Container設定
│   ├── devcontainer.json   # コンテナ設定
│   └── scripts/            # セットアップスクリプト
├── .github/                # GitHub設定
├── .specify/               # Speckit（開発プロセス管理）
│   ├── memory/
│   │   └── constitution.md # プロジェクト原則
│   └── templates/          # 仕様・計画テンプレート
├── .vscode/                # VS Code設定
├── src/                    # ソースコード
│   └── index.ts
├── tests/                  # テストコード
│   └── index.test.ts
├── docs/                   # ドキュメント
│   └── archive/            # アーカイブされた作業文書
├── package.json            # 依存関係
├── tsconfig.json           # TypeScript設定
├── biome.json              # Biome設定
├── vite.config.ts          # Vite設定
└── vitest.config.ts        # Vitest設定
```

## 🔄 開発ワークフロー（TDD）

### 1. テスト作成
```typescript
// tests/feature.test.ts
import { describe, expect, it } from 'vitest';
import { myFunction } from '../src/feature';

describe('myFunction', () => {
  it('should do something specific', () => {
    expect(myFunction('input')).toBe('expected output');
  });
});
```

### 2. ユーザーレビュー
テストをコミットし、ユーザーに仕様として承認してもらう。

### 3. Red → Green → Refactor
```bash
# テストが失敗することを確認（Red）
pnpm test:run

# 実装（Green）
# src/feature.ts を実装

# テストが通ることを確認
pnpm test:run

# リファクタリング
pnpm check  # コード整形
```

### 4. カバレッジ確認
```bash
pnpm test:coverage
# 80%以上であることを確認
```

## 📚 Speckitワークフロー

このプロジェクトは [Speckit](https://github.com/your-org/speckit) を使用した仕様駆動開発をサポートします。

```bash
/speckit.constitution  # プロジェクト原則の確立（完了✅）
/speckit.specify       # 機能仕様の作成
/speckit.plan          # 実装計画の作成
/speckit.tasks         # タスクリストの生成
/speckit.implement     # 実装の実行
```

詳細は [.specify/memory/constitution.md](.specify/memory/constitution.md) を参照してください。

## 🤖 GitHub Copilot CLI

コンテナ内で以下のコマンドが使用できます：

```bash
# GitHub認証（初回のみ）
gh auth login

# コマンドの提案
gh copilot suggest "find all TypeScript files with TODO"

# コマンドの説明
gh copilot explain "pnpm test:coverage"
```

## 📖 Constitution（プロジェクト憲法）

このプロジェクトは [.specify/memory/constitution.md](.specify/memory/constitution.md) に定義された原則に従います。

**Version**: 1.0.0 | **Ratified**: 2026-01-11

主要な決定事項：
- TDD必須（テスト → ユーザー承認 → 実装）
- TypeScript Strict Mode必須
- ESMのみ使用
- 80%以上のカバレッジ必須
- テストが生きたドキュメント

## 🔧 Troubleshooting

### pnpm: command not found

**Solution**: Enable corepack to use pnpm

```bash
corepack enable
```

If that doesn't work, restart the devcontainer:
- Press `F1` → "Dev Containers: Rebuild Container"

### Node.js version mismatch

**Solution**: Verify you're using Node.js 22.x

```bash
node --version  # Should show v22.x.x
```

**Fixes**:
- Use the devcontainer (recommended) - Node version is managed automatically
- Use nvm: `nvm install 22 && nvm use 22`
- Check your PATH if multiple Node versions are installed

### Devcontainer build failures

**Common causes and solutions**:

1. **Docker not running**
   ```bash
   # Verify Docker is running
   docker ps
   ```
   If it fails, start Docker Desktop

2. **Insufficient memory**
   - Open Docker Desktop → Settings → Resources
   - Increase memory allocation to at least 4GB
   - Click "Apply & Restart"

3. **Corrupted image cache**
   ```bash
   # Clean up Docker system
   docker system prune -a
   ```
   Then rebuild: `F1` → "Dev Containers: Rebuild Container"

### Tests fail locally but pass in CI

**Common causes**:

1. **Environment differences**
   ```bash
   # Check versions match CI
   node --version    # Should be v22.x.x
   pnpm --version    # Should be 9.x.x
   ```

2. **Dependency issues**
   ```bash
   # Clean install dependencies
   rm -rf node_modules
   pnpm install --frozen-lockfile
   ```

3. **Cached test results**
   ```bash
   # Clear Vitest cache
   rm -rf node_modules/.vitest
   pnpm test:run
   ```

4. **File system case sensitivity**
   - CI uses Linux (case-sensitive)
   - Ensure import paths match exact file names

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

Quick checklist:
- ✅ Follow TDD workflow (test first)
- ✅ Maintain 80%+ coverage
- ✅ Use conventional commits
- ✅ Pass all CI checks

## 📄 ライセンス

MIT
