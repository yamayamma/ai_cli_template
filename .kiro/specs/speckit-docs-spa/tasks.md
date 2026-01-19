# Implementation Plan

## Task Overview
Spec Kit ドキュメント SPA の実装タスク。React + TypeScript + Vite による静的ドキュメントサイトを構築する。

---

## Tasks

- [ ] 1. プロジェクト基盤セットアップ
- [x] 1.1 SPA用Vite設定とReact依存関係の追加
  - spa/ディレクトリにVite + React + TypeScriptの設定を追加
  - package.jsonにspa用のスクリプトを追加（dev:spa, build:spa）
  - 既存のtsconfig.jsonを拡張してspa/src対応
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 1.2 (P) CSS Modulesとグローバルスタイルの設定
  - CSS変数によるデザイントークン定義（色、フォント、スペーシング）
  - レスポンシブブレークポイントの設定
  - リセットCSSとベーススタイルの適用
  - _Requirements: 5.3_

- [ ] 2. データ層の実装
- [x] 2.1 (P) コンテンツデータの型定義と構造作成
  - Phase, Command, Parameter, CodeExample, EarsPattern, Section型の定義
  - 型の整合性を保証する構造体の作成
  - _Requirements: 1.1, 1.2, 2.1, 6.1_

- [x] 2.2 (P) SDDフェーズコンテンツデータの作成
  - Requirements, Design, Tasksの3フェーズ情報を定義
  - 各フェーズの目的、成果物、アイコンを記述
  - _Requirements: 1.1, 1.2_

- [x] 2.3 (P) Spec Kitコマンドリファレンスデータの作成
  - 主要コマンド（init, requirements, design, tasks, impl）の情報を定義
  - 各コマンドのパラメータ、構文、使用例を記述
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 2.4 (P) EARSパターンデータの作成
  - 5つのEARSパターン（Event-Driven, State-Driven, Unwanted Behavior, Optional Feature, Ubiquitous）を定義
  - 各パターンのテンプレートと実例を記述
  - _Requirements: 6.1, 6.2_

- [ ] 2.5 (P) Steering/Specs概念説明データの作成
  - Steeringの役割と用途を定義
  - Specsの役割と用途を定義
  - 比較表用のデータ構造を作成
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 3. 共通コンポーネントの実装
- [ ] 3.1 CodeBlockコンポーネントの実装
  - コード表示領域とコピーボタンのレイアウト
  - Clipboard APIを使用したコピー機能の実装
  - コピー成功/失敗のフィードバック表示
  - _Requirements: 2.3_

- [ ] 3.2 (P) useActiveSectionフックの実装
  - Intersection Observerによるセクション可視性監視
  - アクティブセクションの状態管理
  - scrollToSection関数によるスムーズスクロール
  - _Requirements: 1.3, 5.2_

- [ ] 4. レイアウトコンポーネントの実装
- [ ] 4.1 Headerコンポーネントの実装
  - 固定ヘッダーのレイアウト
  - ロゴとナビゲーションの配置
  - モバイル時のハンバーガーメニューボタン
  - _Requirements: 5.1, 5.3_

- [ ] 4.2 Navigationコンポーネントの実装
  - セクションリンクの一覧表示
  - アクティブセクションのハイライト表示
  - クリック時のスムーズスクロール連携
  - モバイルメニューの開閉状態管理
  - _Requirements: 1.3, 5.1, 5.2, 5.3_

- [ ] 5. コンテンツセクションの実装
- [ ] 5.1 (P) WorkflowSectionとPhaseCardの実装
  - SDDの3フェーズを視覚的に表示するセクション
  - 各フェーズを表すカードコンポーネント
  - フェーズ間の矢印/接続表示
  - _Requirements: 1.1, 1.2_

- [ ] 5.2 (P) CommandSectionとCommandCardの実装
  - コマンド一覧を表示するセクション
  - 各コマンドの詳細を表示するカード
  - ホバー時の詳細説明表示
  - CodeBlockを使用したコード例表示
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 5.3 (P) ApprovalSectionの実装
  - 承認ワークフローの図解表示
  - 各フェーズでのレビュー必要性の説明
  - -yオプションの使用方法と注意点の説明
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 5.4 (P) ConceptSectionの実装
  - SteeringとSpecsの比較表表示
  - Steeringの役割説明
  - Specsの役割説明
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 5.5 (P) EarsSectionとPatternCardの実装
  - EARS形式の概要説明
  - 5つのパターンを表示するカード
  - パターン選択時のテンプレートと実例表示
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 6. アプリケーション統合
- [ ] 6.1 Appコンポーネントの実装とセクション統合
  - 全セクションの配置と順序設定
  - Headerとメインコンテンツのレイアウト
  - セクションIDの設定とナビゲーション連携
  - _Requirements: 1.1, 1.3, 5.1, 5.2_

- [ ] 6.2 エントリーポイントとHTMLテンプレートの設定
  - main.tsxでのReactアプリケーションマウント
  - index.htmlのメタ情報とビューポート設定
  - ファビコンとOGP設定
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 7. レスポンシブ対応とスタイル調整
- [ ] 7.1 モバイルレスポンシブ対応の実装
  - モバイルブレークポイントでのレイアウト調整
  - ハンバーガーメニューの動作実装
  - タッチデバイス対応のインタラクション調整
  - _Requirements: 5.3_

- [ ] 8. テストとビルド検証
- [ ] 8.1 useActiveSectionフックのユニットテスト
  - Intersection Observerのモック設定
  - セクション切り替えの動作検証
  - scrollToSection関数の動作検証
  - _Requirements: 5.2_

- [ ] 8.2 (P) CodeBlockコンポーネントのユニットテスト
  - Clipboard APIのモック設定
  - コピー成功時の動作検証
  - コピー失敗時のエラー表示検証
  - _Requirements: 2.3_

- [ ] 8.3 ビルドとリントの検証
  - pnpm build:spaの実行と成功確認
  - Biomeによるリント・フォーマットチェック
  - TypeScript型チェックの通過確認
  - _Requirements: 7.1, 7.2, 7.4_

---

## Requirements Coverage

| Requirement | Tasks |
|-------------|-------|
| 1.1 | 2.1, 2.2, 5.1, 6.1 |
| 1.2 | 2.1, 2.2, 5.1 |
| 1.3 | 3.2, 4.2, 6.1 |
| 2.1 | 2.1, 2.3, 5.2 |
| 2.2 | 2.3, 5.2 |
| 2.3 | 2.3, 3.1, 5.2, 8.2 |
| 3.1 | 5.3 |
| 3.2 | 5.3 |
| 3.3 | 5.3 |
| 4.1 | 2.5, 5.4 |
| 4.2 | 2.5, 5.4 |
| 4.3 | 2.5, 5.4 |
| 5.1 | 4.1, 4.2, 6.1 |
| 5.2 | 3.2, 4.2, 6.1, 8.1 |
| 5.3 | 1.2, 4.1, 4.2, 7.1 |
| 6.1 | 2.1, 2.4, 5.5 |
| 6.2 | 2.4, 5.5 |
| 6.3 | 5.5 |
| 7.1 | 1.1, 6.2, 8.3 |
| 7.2 | 1.1, 6.2, 8.3 |
| 7.3 | 1.1, 6.2 |
| 7.4 | 1.1, 8.3 |
