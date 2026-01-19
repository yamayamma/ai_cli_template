# Research & Design Decisions

---
**Purpose**: Spec-Driven Development ドキュメントSPAのディスカバリー結果と設計判断の根拠を記録。

---

## Summary
- **Feature**: `speckit-docs-spa`
- **Discovery Scope**: New Feature（グリーンフィールド - 既存の`spa/`ディレクトリは空）
- **Key Findings**:
  - 既存プロジェクトはVite + TypeScript strict modeを使用しており、SPAもこれに準拠
  - React 19が最新安定版で、Hooks（useState, useEffect）による状態管理が推奨
  - シンプルなドキュメントSPAなので外部状態管理ライブラリは不要

## Research Log

### React アーキテクチャパターン
- **Context**: ドキュメント表示SPAに適したReactアーキテクチャの選定
- **Sources Consulted**: React公式ドキュメント（react.dev/learn）
- **Findings**:
  - React 19では関数コンポーネント + Hooksが標準
  - 状態のリフトアップパターンで親子間データ共有
  - コンポーネント分割は機能単位（ナビゲーション、セクション、カード等）
- **Implications**: シンプルなuseState/useEffectで十分、Context APIは必要に応じて導入

### ナビゲーションパターン
- **Context**: 固定ヘッダー + スクロール連動ハイライトの実装方式
- **Sources Consulted**: Intersection Observer API、scroll-spy実装パターン
- **Findings**:
  - Intersection Observer APIによるセクション可視性検出が最適
  - smooth scrollはCSS `scroll-behavior: smooth` または `scrollIntoView`で実現
  - アンカーリンクによるSPA内ナビゲーション
- **Implications**: カスタムフックでスクロール状態を管理

### レスポンシブデザイン
- **Context**: モバイル対応の実装方式
- **Sources Consulted**: CSS Grid/Flexbox、メディアクエリパターン
- **Findings**:
  - CSS変数 + メディアクエリでブレークポイント管理
  - モバイルではハンバーガーメニュー
  - Tailwind等のCSSフレームワークは導入せず、純粋なCSSで軽量化
- **Implications**: CSS Modulesまたはスコープ付きCSSで管理

### コードコピー機能
- **Context**: コマンド例のクリップボードコピー機能
- **Sources Consulted**: Clipboard API
- **Findings**:
  - `navigator.clipboard.writeText()` が標準API
  - HTTPS/localhost以外では制限あり（開発環境は問題なし）
- **Implications**: コピーボタン付きコードブロックコンポーネントを作成

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Plain React + Hooks | 標準のReact関数コンポーネント | シンプル、学習コスト低 | 大規模化で複雑化 | ドキュメントSPAに最適 |
| React + Context API | グローバル状態管理 | 状態共有が容易 | 過剰設計の可能性 | 必要時のみ導入 |
| React + Redux | 外部状態管理 | スケーラブル | 設定が複雑 | 今回は不要 |

**選定**: Plain React + Hooks（必要に応じてContext追加）

## Design Decisions

### Decision: コンポーネント構成
- **Context**: ドキュメントSPAのコンポーネント分割方針
- **Alternatives Considered**:
  1. ページ単位分割 - 単一ページなので不適
  2. 機能単位分割 - ナビゲーション、セクション、カード等
- **Selected Approach**: 機能単位分割
- **Rationale**: 再利用性と保守性のバランス
- **Trade-offs**: 初期ファイル数は増えるが、変更影響範囲が限定的
- **Follow-up**: 実装時にコンポーネント粒度を調整

### Decision: スタイリング方式
- **Context**: CSSの管理方式
- **Alternatives Considered**:
  1. CSS Modules - スコープ付き、ビルド時解決
  2. Tailwind CSS - ユーティリティファースト
  3. Plain CSS - シンプル、追加依存なし
- **Selected Approach**: CSS Modules（既存プロジェクトとの一貫性を優先）
- **Rationale**: TypeScript strictモードとの相性、依存追加なし
- **Trade-offs**: Tailwindほど開発速度は上がらないが、軽量
- **Follow-up**: Vite設定でCSS Modulesサポート確認

### Decision: データ管理
- **Context**: ドキュメントコンテンツの管理方式
- **Alternatives Considered**:
  1. ハードコード - 変更時に再ビルド必要
  2. JSONファイル - 分離可能、型定義可能
  3. Markdown + パーサー - 柔軟、追加依存
- **Selected Approach**: TypeScript定数ファイル（型安全なJSONライク）
- **Rationale**: 型チェック可能、追加依存なし、IDE補完
- **Trade-offs**: 非開発者の編集は困難だが、開発者向けドキュメントなので問題なし
- **Follow-up**: コンテンツ構造の型定義を設計

## Risks & Mitigations
- **リスク1**: スクロール連動の複雑化 → Intersection Observer APIで標準化
- **リスク2**: モバイルUI複雑化 → 初期実装はシンプルに、段階的拡張
- **リスク3**: コンテンツ更新の手間 → 型定義で変更箇所を明確化

## References
- [React Learn](https://react.dev/learn) — React公式チュートリアル
- [Intersection Observer API](https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API) — スクロール検出
- [Clipboard API](https://developer.mozilla.org/ja/docs/Web/API/Clipboard_API) — コピー機能
