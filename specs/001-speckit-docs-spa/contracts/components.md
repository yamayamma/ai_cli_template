# Component Contracts

**Version**: 1.0.0  
**Date**: 2026-01-15

## Layout Components

### `<AppLayout />`

アプリケーション全体のレイアウトラッパー。

```typescript
interface AppLayoutProps {
  children: React.ReactNode;
}
```

**Responsibilities**:
- グローバルナビゲーションヘッダーの表示
- フッターの表示
- メインコンテンツエリアの提供
- レスポンシブ対応

### `<Navigation />`

グローバルナビゲーションコンポーネント。

```typescript
interface NavigationProps {
  currentPath: string;
}
```

**Behaviors**:
- デスクトップ: 水平メニュー
- モバイル: ハンバーガーメニュー展開
- 現在のセクションをハイライト

### `<Breadcrumbs />`

パンくずリストナビゲーション。

```typescript
interface BreadcrumbsProps {
  items: { label: string; path: string }[];
}
```

## Page Components

### `<Home />`

ホームページ。

**Features**:
- SpecKit概要紹介
- 推奨学習パス表示
- 各セクションへのCTAボタン

### `<Workflow />`

開発フロー概要ページ。

**Features**:
- インタラクティブなフロー図（React Flow）
- 5ステップの概要カード
- 各ステップへのリンク

### `<WorkflowStep />`

個別ステップ詳細ページ。

```typescript
interface WorkflowStepProps {
  stepId: 'specify' | 'clarify' | 'plan' | 'execute' | 'verify';
}
```

**Features**:
- ステップ詳細説明（MDX）
- 具体例
- 前/次ステップナビゲーション
- 関連コマンドへのリンク

### `<SDD />`

Spec Driven Development概要ページ。

**Features**:
- SDDの定義と基本原則
- サブセクションへのナビゲーション

### `<SDDComparison />`

開発手法比較ページ。

**Features**:
- 比較表（インタラクティブ）
- 各手法の詳細モーダル

### `<Commands />`

コマンドリファレンス一覧ページ。

```typescript
interface CommandsProps {
  searchQuery?: string;
}
```

**Features**:
- コマンド一覧表示
- 検索/フィルタリング機能
- カード形式での表示

### `<CommandDetail />`

コマンド詳細ページ。

```typescript
interface CommandDetailProps {
  commandId: string;
}
```

**Features**:
- コマンド説明
- 使用方法
- オプション一覧
- 実行例
- 関連ステップへのリンク

### `<NotFound />`

404エラーページ。

**Features**:
- エラーメッセージ
- ホームへのリンク
- 検索提案

## Interactive Components

### `<FlowDiagram />`

インタラクティブな開発フロー図（React Flow）。

```typescript
interface FlowDiagramProps {
  onStepHover?: (stepId: string | null) => void;
  onStepClick?: (stepId: string) => void;
  highlightedStep?: string;
}
```

**Behaviors**:
- ホバー時: ツールチップ表示
- クリック時: ステップ詳細へ遷移
- ズーム/パン対応

### `<ComparisonChart />`

手法比較チャート。

```typescript
interface ComparisonChartProps {
  methodologies: Methodology[];
  dimensions: ComparisonDimension[];
  onMethodologyClick?: (id: string) => void;
}
```

**Behaviors**:
- 手法クリック時: 詳細モーダル表示

### `<CommandSearch />`

コマンド検索コンポーネント。

```typescript
interface CommandSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

**Behaviors**:
- リアルタイムフィルタリング
- デバウンス処理（300ms）

## UI Components

### `<StepCard />`

ステップ概要カード。

```typescript
interface StepCardProps {
  step: Step;
  isActive?: boolean;
  onClick?: () => void;
}
```

### `<CommandCard />`

コマンド概要カード。

```typescript
interface CommandCardProps {
  command: Command;
  onClick?: () => void;
  searchHighlight?: string;
}
```

### `<CodeBlock />`

コードブロック表示。

```typescript
interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}
```

### `<Tooltip />`

ツールチップ。

```typescript
interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
```

### `<Modal />`

モーダルダイアログ。

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

### `<LearningPath />`

推奨学習パスコンポーネント。

```typescript
interface LearningPathProps {
  currentStep?: number;
}
```

**Features**:
- ステップバイステップの学習ガイド
- 進捗表示（将来的な拡張）

## Accessibility Requirements

全てのコンポーネントは以下を満たす必要があります:

- **キーボードナビゲーション**: Tab, Enter, Escape
- **ARIAラベル**: 適切なaria-label属性
- **フォーカス表示**: 可視的なフォーカスインジケーター
- **色コントラスト**: WCAG 2.1 AA準拠（4.5:1以上）
- **スクリーンリーダー対応**: 適切なセマンティックHTML

## Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '0px',      // 0-639px
  tablet: '640px',    // 640-1023px
  desktop: '1024px',  // 1024px+
};
```
