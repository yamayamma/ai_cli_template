# Implementation Plan: SpecKit Documentation SPA

**Branch**: `001-speckit-docs-spa` | **Date**: 2026-01-15 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-speckit-docs-spa/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

SpecKitの開発フロー（specify, clarify, plan, execute, verify）とSpec Driven Developmentの概念を説明するシングルページアプリケーションを構築する。Viteベースのフロントエンドで、Markdownコンテンツを静的に組み込み、インタラクティブな図表とレスポンシブデザインを提供する。GitHub Pagesにデプロイし、Service Workerによる基本的なオフラインキャッシュをサポートする。

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Vite 6.x, React 19.x（または類似のSPAフレームワーク）, react-router-dom 7.x（クライアントサイドルーティング）, @mdx-js/rollup（Markdown処理）, D3.js or React Flow（インタラクティブ図表）  
**Storage**: N/A（静的コンテンツのみ）  
**Testing**: Vitest 2.x, Playwright（E2Eテスト）  
**Target Platform**: Web（モダンブラウザ: Chrome, Firefox, Safari, Edge 最新2バージョン）  
**Project Type**: web（frontend SPA）  
**Performance Goals**: LCP < 3秒、ページ間遷移 < 0.5秒、Lighthouse Performance 90+  
**Constraints**: GitHub Pages対応（静的ファイルのみ）、オフライン閲覧済みページキャッシュ  
**Scale/Scope**: 5セクション、5ステップ説明、約10コマンドリファレンス、推定20ページ相当のコンテンツ

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Evaluation (Phase 0)

- [x] **Test-First Development**: テスト仕様をユーザー承認後に実装を開始する。Vitestでユニットテスト、PlaywrightでE2Eテストを実施
- [x] **TypeScript Strict Mode**: tsconfig.jsonで`strict: true`を設定、全コードで厳格な型付けを使用
- [x] **ESM-First**: Viteはネイティブでesmをサポート、全インポートでESM構文と明示的拡張子を使用
- [x] **Quality Gates**: 80%+カバレッジ、ビルド時間<30秒、テスト<5秒、Lint<2秒を遵守
- [x] **Documentation Through Tests**: テストが仕様として機能、設計ドキュメントはマージ時にarchiveへ移動

**Pre-Design Gate Status**: ✅ PASSED

### Post-Design Evaluation (Phase 1)

- [x] **Test-First Development**: contracts/components.mdでコンポーネントインターフェースを定義済み。テスト作成→実装の順序で進行可能
- [x] **TypeScript Strict Mode**: data-model.mdで全てのエンティティにTypeScript型定義を提供。strict: trueを使用
- [x] **ESM-First**: Vite 6.x + React 19.xはESMネイティブ。package.jsonに"type": "module"を設定
- [x] **Quality Gates**: quickstart.mdにテスト・ビルドコマンドを定義。CI/CDワークフローで自動検証
- [x] **Documentation Through Tests**: MDXコンテンツは静的、テストが振る舞いを検証。設計ドキュメントはマージ時にarchive

**Post-Design Gate Status**: ✅ PASSED - 設計が全ての原則に準拠していることを確認

## Project Structure

### Documentation (this feature)

```text
specs/001-speckit-docs-spa/
├── plan.md              # 実装計画（本ファイル）
├── research.md          # Phase 0: 技術スタックリサーチ
├── data-model.md        # Phase 1: データモデル定義
├── quickstart.md        # Phase 1: クイックスタートガイド
├── contracts/           # Phase 1: コントラクト
│   ├── routes.md        # URLルート定義
│   └── components.md    # コンポーネントインターフェース
├── checklists/          # 品質チェックリスト
│   └── requirements.md  # 要件チェックリスト
└── tasks.md             # Phase 2: タスク（/speckit.tasksで生成）
```

### Source Code (repository root)

```text
spa/                      # SPAプロジェクトルート
├── public/
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/
│   │   ├── layout/       # レイアウトコンポーネント
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   ├── interactive/  # インタラクティブコンポーネント
│   │   │   ├── FlowDiagram.tsx
│   │   │   └── ComparisonChart.tsx
│   │   └── ui/           # UIコンポーネント
│   │       ├── StepCard.tsx
│   │       ├── CommandCard.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── Tooltip.tsx
│   │       └── Modal.tsx
│   ├── pages/            # ページコンポーネント
│   │   ├── Home.tsx
│   │   ├── Workflow.tsx
│   │   ├── WorkflowStep.tsx
│   │   ├── SDD.tsx
│   │   ├── SDDComparison.tsx
│   │   ├── Commands.tsx
│   │   ├── CommandDetail.tsx
│   │   └── NotFound.tsx
│   ├── content/          # MDXコンテンツ
│   │   ├── home.mdx
│   │   ├── workflow/
│   │   ├── sdd/
│   │   └── commands/
│   ├── data/             # 静的データ
│   │   ├── sections.ts
│   │   ├── steps.ts
│   │   ├── commands.ts
│   │   └── comparisons.ts
│   ├── types/            # TypeScript型定義
│   │   └── index.ts
│   ├── hooks/            # カスタムフック
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── e2e/              # Playwright E2Eテスト
│   └── unit/             # Vitest ユニットテスト
├── vite.config.ts
├── tsconfig.json
└── package.json

.github/
└── workflows/
    └── deploy-spa.yml    # GitHub Pagesデプロイワークフロー
```

**Structure Decision**: Webアプリケーション（フロントエンドSPA）構造を採用。既存の`src/`（ライブラリコード）と分離するため、`spa/`ディレクトリに配置。これにより既存のTypeScriptライブラリプロジェクトとの共存が可能。

## Complexity Tracking

> Constitution Check違反なし。追加の複雑性はありません。

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | - | - |
