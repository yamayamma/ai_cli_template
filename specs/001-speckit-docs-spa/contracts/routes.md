# URL Routes Contract

**Version**: 1.0.0  
**Date**: 2026-01-15

## Base URL

```
https://yamayamma.github.io/ai_cli_template/
```

## Route Definitions

### HashRouter Format

全てのルートは `/#/path` 形式です。

| Route | Component | Description |
|-------|-----------|-------------|
| `/#/` | `<Home />` | ホームページ（概要と学習パス） |
| `/#/workflow` | `<Workflow />` | 開発フロー概要（インタラクティブ図表） |
| `/#/workflow/:stepId` | `<WorkflowStep />` | 各ステップの詳細ページ |
| `/#/sdd` | `<SDD />` | Spec Driven Development概要 |
| `/#/sdd/concepts` | `<SDDConcepts />` | SDD基本概念 |
| `/#/sdd/comparison` | `<SDDComparison />` | 他手法との比較 |
| `/#/sdd/benefits` | `<SDDBenefits />` | メリット・デメリット |
| `/#/commands` | `<Commands />` | コマンドリファレンス一覧 |
| `/#/commands/:commandId` | `<CommandDetail />` | コマンド詳細ページ |
| `/#/*` | `<NotFound />` | 404エラーページ |

## Route Parameters

### `/workflow/:stepId`

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `stepId` | string | `specify`, `clarify`, `plan`, `execute`, `verify` | ステップ識別子 |

### `/commands/:commandId`

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `commandId` | string | `specify`, `clarify`, `plan`, `execute`, `verify` | コマンド識別子 |

## Query Parameters

### `/commands` (コマンドリファレンス)

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | 検索クエリ（コマンド名、説明、タグで検索） |

**Example**: `/#/commands?q=specify`

## Navigation Structure

```
Home
├── 開発フロー (Workflow)
│   ├── Specify（仕様作成）
│   ├── Clarify（明確化）
│   ├── Plan（計画）
│   ├── Execute（実行）
│   └── Verify（検証）
├── Spec Driven Development
│   ├── 基本概念
│   ├── 他手法との比較
│   └── メリット・デメリット
└── コマンドリファレンス
    ├── /speckit.specify
    ├── /speckit.clarify
    ├── /speckit.plan
    ├── /speckit.execute
    └── /speckit.verify
```

## Breadcrumb Format

各ページのパンくずリスト形式:

| Route | Breadcrumbs |
|-------|-------------|
| `/#/` | Home |
| `/#/workflow` | Home > 開発フロー |
| `/#/workflow/specify` | Home > 開発フロー > Specify |
| `/#/sdd` | Home > Spec Driven Development |
| `/#/sdd/comparison` | Home > Spec Driven Development > 比較 |
| `/#/commands` | Home > コマンドリファレンス |
| `/#/commands/specify` | Home > コマンドリファレンス > /speckit.specify |

## Response Codes

SPAのため、全てのルートは200 OKを返します。クライアントサイドで404ページを表示します。

| Status | Condition |
|--------|-----------|
| 200 | 全てのリクエスト（SPA） |
| 404 (client-side) | 未定義のルートパターン |
