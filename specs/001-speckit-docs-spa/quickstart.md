# Quickstart Guide: SpecKit Documentation SPA

**Version**: 1.0.0  
**Date**: 2026-01-15

## Prerequisites

- Node.js 22.x LTS
- pnpm 9.x
- Git

## Quick Setup

```bash
# 1. 既存のリポジトリをクローン（既にある場合はスキップ）
cd /workspaces/ai_cli_template

# 2. SPAディレクトリを作成
mkdir -p spa
cd spa

# 3. Vite + React + TypeScriptプロジェクトを初期化
pnpm create vite . --template react-ts

# 4. 依存関係をインストール
pnpm add react-router-dom @types/react-router-dom
pnpm add @mdx-js/rollup @mdx-js/react
pnpm add remark-gfm rehype-highlight
pnpm add @xyflow/react
pnpm add mermaid

# 5. 開発用依存関係
pnpm add -D vite-plugin-pwa
pnpm add -D @playwright/test
```

## Project Structure

```
spa/
├── public/
│   ├── pwa-192x192.png
│   └── pwa-512x512.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   ├── interactive/
│   │   │   ├── FlowDiagram.tsx
│   │   │   └── ComparisonChart.tsx
│   │   └── ui/
│   │       ├── StepCard.tsx
│   │       ├── CommandCard.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── Tooltip.tsx
│   │       └── Modal.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Workflow.tsx
│   │   ├── WorkflowStep.tsx
│   │   ├── SDD.tsx
│   │   ├── SDDComparison.tsx
│   │   ├── Commands.tsx
│   │   ├── CommandDetail.tsx
│   │   └── NotFound.tsx
│   ├── content/          # MDXコンテンツ
│   ├── data/             # 静的データ
│   ├── types/            # TypeScript型定義
│   ├── hooks/            # カスタムフック
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tests/
│   ├── e2e/              # Playwrightテスト
│   └── unit/             # Vitestテスト
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Configuration Files

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/ai_cli_template/',
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.github\.io\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'speckit-docs-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'SpecKit Documentation',
        short_name: 'SpecKit Docs',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
      },
    }),
  ],
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "*.ts"]
}
```

## Development Commands

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# プレビュー
pnpm preview

# テスト実行
pnpm test

# E2Eテスト
pnpm test:e2e

# Lint
pnpm lint
```

## Local Development

1. **開発サーバー起動**:
   ```bash
   pnpm dev
   ```
   `http://localhost:5173/ai_cli_template/` でアクセス

2. **MDXコンテンツ編集**:
   `src/content/` 配下のMDXファイルを編集
   ホットリロードで即座に反映

3. **コンポーネント開発**:
   `src/components/` 配下にコンポーネントを追加

## Testing

### Unit Tests (Vitest)

```bash
pnpm test
```

### E2E Tests (Playwright)

```bash
# Playwrightをインストール
pnpm exec playwright install

# E2Eテスト実行
pnpm test:e2e
```

## Deployment

### GitHub Actions (自動)

mainブランチへのpushで自動デプロイ:

1. `.github/workflows/deploy-spa.yml` を作成
2. GitHub Settings → Pages → Source: GitHub Actions

### Manual Build

```bash
pnpm build
# dist/ ディレクトリにビルド成果物が生成
```

## Next Steps

1. [ ] SPAディレクトリ構造の作成
2. [ ] 基本コンポーネントの実装
3. [ ] ルーティング設定
4. [ ] MDXコンテンツの作成
5. [ ] インタラクティブ図表の実装
6. [ ] テスト作成
7. [ ] PWA設定
8. [ ] GitHub Actionsワークフロー作成
