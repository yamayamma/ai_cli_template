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

## 🔄 CI/CD と自動化

本プロジェクトでは品質保証とリリースのための自動化ワークフローを使用しています。

### 継続的インテグレーション（CI）

すべてのプルリクエストと `main` へのプッシュで以下が実行されます：

- ✅ **Test ジョブ** - カバレッジレポート付きで全ユニットテストを実行
- ✅ **Lint ジョブ** - Biomeによるコード品質チェック
- ✅ **Build ジョブ** - TypeScriptコンパイルの検証

ステータス: ![CI](https://img.shields.io/github/actions/workflow/status/yamayamma/ai_cli_template/ci.yml?branch=main&label=CI&logo=github)

### 自動リリース

[Conventional Commit](https://www.conventionalcommits.org/) 形式のコミットが `main` にマージされると自動的に：

1. **コミット解析** - バージョン更新の種類を判定（major/minor/patch）
2. **バージョン更新** - `package.json` と `CHANGELOG.md` を更新
3. **リリース作成** - リリースノート付きでGitHubリリースを公開
4. **バッジ更新** - READMEに最新バージョンを反映

**コミット例**：
- `feat: add new feature` → マイナーバージョン更新 (1.0.0 → 1.1.0)
- `fix: resolve bug` → パッチバージョン更新 (1.1.0 → 1.1.1)
- `feat!: breaking change` → メジャーバージョン更新 (1.1.1 → 2.0.0)

## 📚 ドキュメント

### APIドキュメント

TypeScriptコードからHTMLドキュメントを生成：

```bash
pnpm docs:generate
```

出力先: [docs/api/index.html](docs/api/index.html)

### プロジェクトドキュメント

- **[Constitution](.specify/memory/constitution.md)** - プロジェクト原則と基準
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - 貢献ガイドライン
- **[docs/archive/](docs/archive/)** - アーカイブされた設計ドキュメント

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

このプロジェクトは [Speckit](https://github.com/github/spec-kit) を使用した仕様駆動開発をサポートします。

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

## 🔧 トラブルシューティング

### pnpm: command not found

**解決方法**: corepackを有効にしてpnpmを使用可能にする

```bash
corepack enable
```

それでも動作しない場合は、devcontainerを再構築してください：
- `F1` を押して → "Dev Containers: Rebuild Container" を選択

### Node.jsバージョンの不一致

**解決方法**: Node.js 22.xを使用していることを確認

```bash
node --version  # v22.x.x と表示されるはず
```

**対処法**:
- devcontainerを使用（推奨） - Nodeバージョンは自動管理されます
- nvmを使用: `nvm install 22 && nvm use 22`
- 複数のNodeバージョンがインストールされている場合はPATHを確認

### devcontainerのビルド失敗

**よくある原因と解決方法**:

1. **Dockerが起動していない**
   ```bash
   # Dockerが実行中か確認
   docker ps
   ```
   失敗する場合は、Docker Desktopを起動してください

2. **メモリ不足**
   - Docker Desktop を開く → Settings → Resources
   - メモリ割り当てを少なくとも4GBに増やす
   - "Apply & Restart" をクリック

3. **イメージキャッシュの破損**
   ```bash
   # Dockerシステムをクリーンアップ
   docker system prune -a
   ```
   その後、再構築: `F1` → "Dev Containers: Rebuild Container"

### ローカルでテストが失敗するがCIでは成功する

**よくある原因**:

1. **環境の差異**
   ```bash
   # バージョンがCIと一致しているか確認
   node --version    # v22.x.x であるべき
   pnpm --version    # 9.x.x であるべき
   ```

2. **依存関係の問題**
   ```bash
   # 依存関係をクリーンインストール
   rm -rf node_modules
   pnpm install --frozen-lockfile
   ```

3. **テスト結果のキャッシュ**
   ```bash
   # Vitestキャッシュをクリア
   rm -rf node_modules/.vitest
   pnpm test:run
   ```

4. **ファイルシステムの大文字小文字の区別**
   - CIはLinuxを使用（大文字小文字を区別）
   - importパスがファイル名と完全に一致していることを確認

## 🤝 貢献

詳細な貢献ガイドラインは [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

クイックチェックリスト:
- ✅ TDDワークフローに従う（テストファースト）
- ✅ 80%以上のカバレッジを維持
- ✅ Conventional Commitsを使用
- ✅ すべてのCIチェックをパス

## 📄 ライセンス

MIT
