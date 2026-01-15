# Data Model: SpecKit Documentation SPA

**Date**: 2026-01-15  
**Phase**: 1 - Design & Contracts  
**Status**: Complete

## Overview

このSPAは静的コンテンツを提供するため、永続化ストレージは不要です。データモデルはMarkdownファイルとTypeScript型定義として表現されます。

## Entities

### 1. Section（セクション）

SPAの主要なコンテンツ領域を表します。

```typescript
interface Section {
  id: string;                    // URL識別子（例: "workflow", "sdd", "commands"）
  title: string;                 // 表示タイトル（例: "開発フロー"）
  description: string;           // 簡潔な説明
  icon?: string;                 // アイコン識別子
  order: number;                 // ナビゲーション順序
  subsections?: SubSection[];    // サブセクション
}

interface SubSection {
  id: string;
  title: string;
  path: string;                  // ルートパス
}
```

**インスタンス例**:
- Home（ホーム）: 概要と学習パス
- Workflow（開発フロー）: 5ステップの説明
- SDD（Spec Driven Development）: 概念と比較
- Commands（コマンドリファレンス）: CLIコマンド一覧

### 2. Step（ステップ）

SpecKit開発フローの各段階を表します。

```typescript
interface Step {
  id: string;                    // ステップ識別子（例: "specify", "clarify"）
  name: string;                  // 表示名（例: "Specify"）
  title: string;                 // 日本語タイトル（例: "仕様作成"）
  description: string;           // 詳細説明
  shortDescription: string;      // ツールチップ用短い説明
  order: number;                 // 順序（1-5）
  icon: string;                  // アイコン
  color: string;                 // テーマカラー
  examples: Example[];           // 具体例
  relatedCommands: string[];     // 関連コマンドID
  previousStep?: string;         // 前のステップID
  nextStep?: string;             // 次のステップID
}

interface Example {
  title: string;
  description: string;
  codeSnippet?: string;          // コード例
}
```

**インスタンス**:
1. specify（仕様作成）: ユーザー要求を仕様書に変換
2. clarify（明確化）: 曖昧点を質問で解消
3. plan（計画）: 実装計画と技術選定
4. execute（実行）: TDDによる実装
5. verify（検証）: テストと品質確認

### 3. Command（コマンド）

SpecKitのCLIコマンドを表します。

```typescript
interface Command {
  id: string;                    // コマンド識別子（例: "specify"）
  name: string;                  // コマンド名（例: "/speckit.specify"）
  description: string;           // コマンドの説明
  usage: string;                 // 使用方法
  options: CommandOption[];      // オプション
  examples: CommandExample[];    // 実行例
  relatedSteps: string[];        // 関連ステップID
  tags: string[];                // 検索用タグ
}

interface CommandOption {
  name: string;                  // オプション名（例: "--json"）
  shortName?: string;            // 短縮名（例: "-j"）
  description: string;           // 説明
  required: boolean;             // 必須かどうか
  defaultValue?: string;         // デフォルト値
}

interface CommandExample {
  title: string;                 // 例のタイトル
  command: string;               // 実行コマンド
  description: string;           // 説明
  output?: string;               // 出力例
}
```

**インスタンス例**:
- /speckit.specify: 新しい仕様を作成
- /speckit.clarify: 仕様の曖昧点を解消
- /speckit.plan: 実装計画を生成
- /speckit.execute: タスクを実行
- /speckit.verify: 実装を検証

### 4. Comparison（比較）

SDDと他の開発手法の比較情報を表します。

```typescript
interface Comparison {
  id: string;                    // 比較識別子
  methodologies: Methodology[];  // 比較対象の開発手法
  dimensions: ComparisonDimension[]; // 比較軸
}

interface Methodology {
  id: string;                    // 手法ID（例: "sdd", "agile", "waterfall"）
  name: string;                  // 表示名
  description: string;           // 概要
  pros: string[];                // メリット
  cons: string[];                // デメリット
  bestFor: string[];             // 適したプロジェクト
}

interface ComparisonDimension {
  name: string;                  // 比較軸名（例: "要件定義", "変更対応"）
  values: Record<string, string>; // 各手法の値
}
```

### 5. NavigationState（ナビゲーション状態）

SPAのナビゲーション状態を表します（クライアントサイド）。

```typescript
interface NavigationState {
  currentSection: string;        // 現在のセクションID
  currentPath: string;           // 現在のパス
  breadcrumbs: Breadcrumb[];     // パンくずリスト
  searchQuery?: string;          // 検索クエリ（コマンドリファレンス）
}

interface Breadcrumb {
  label: string;
  path: string;
}
```

## Relationships

```
Section 1──* SubSection
    │
    └──────────────────────> Step (workflow section)
    └──────────────────────> Command (commands section)
    └──────────────────────> Comparison (sdd section)

Step *──* Command (relatedCommands / relatedSteps)

Step 1──1 Step (previousStep / nextStep - linked list)
```

## Content Structure

Markdownファイルの配置構造:

```
spa/
├── content/
│   ├── home.mdx                 # ホームページコンテンツ
│   ├── workflow/
│   │   ├── index.mdx            # 開発フロー概要
│   │   ├── specify.mdx          # Step 1
│   │   ├── clarify.mdx          # Step 2
│   │   ├── plan.mdx             # Step 3
│   │   ├── execute.mdx          # Step 4
│   │   └── verify.mdx           # Step 5
│   ├── sdd/
│   │   ├── index.mdx            # SDD概要
│   │   ├── concepts.mdx         # 基本概念
│   │   ├── comparison.mdx       # 他手法との比較
│   │   └── benefits.mdx         # メリット・デメリット
│   └── commands/
│       ├── index.mdx            # コマンド一覧
│       ├── specify.mdx          # コマンド詳細
│       ├── clarify.mdx
│       ├── plan.mdx
│       ├── execute.mdx
│       └── verify.mdx
├── data/
│   ├── sections.ts              # セクションメタデータ
│   ├── steps.ts                 # ステップメタデータ
│   ├── commands.ts              # コマンドメタデータ
│   └── comparisons.ts           # 比較データ
└── types/
    └── index.ts                 # TypeScript型定義
```

## Validation Rules

1. **Section**:
   - `id` は一意でURL-safe
   - `order` は正の整数

2. **Step**:
   - `order` は1-5の範囲
   - `previousStep` と `nextStep` は循環しない
   - 最初のステップは `previousStep` が undefined
   - 最後のステップは `nextStep` が undefined

3. **Command**:
   - `name` は "/speckit." で始まる
   - `usage` は Markdown形式

4. **Comparison**:
   - 少なくとも2つの `methodologies` を含む
   - `dimensions` の `values` は全ての methodology ID をキーとして持つ

## State Transitions

このSPAは静的コンテンツを提供するため、複雑な状態遷移はありません。ナビゲーション状態のみが変化します:

```
[Initial Load] → [Home]
                    │
                    ├──→ [Workflow] ──→ [Step Detail]
                    │                        ↓
                    │                   [Next Step]
                    │
                    ├──→ [SDD] ──→ [Concepts | Comparison | Benefits]
                    │
                    └──→ [Commands] ──→ [Command Detail]
                              ↓
                         [Search/Filter]
```
