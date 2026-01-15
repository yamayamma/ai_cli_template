# SpecKit Documentation SPA - 技術スタックリサーチ

**作成日**: 2026-01-15  
**ステータス**: 完了

---

## 1. SPAフレームワーク選定

### Decision: **React 19**

### Rationale:
1. **Viteとの優れた統合**: `@vitejs/plugin-react` により、高速なHMR（Hot Module Replacement）とビルドが実現
2. **エコシステムの充実**: ドキュメントサイト向けのライブラリ（MDX、React Flow等）が豊富
3. **React 19の新機能**:
   - Actions: 非同期処理の簡素化
   - `use` API: Promiseやコンテキストの条件付き読み取り
   - `useActionState`: フォーム処理の改善
   - Document Metadata: `<title>`, `<meta>`タグのネイティブサポート
   - Server Components対応（将来のSSG/SSR拡張に有利）
4. **学習リソースの豊富さ**: 日本語ドキュメントやチュートリアルが充実
5. **既存プロジェクトとの親和性**: TypeScriptベースの既存構成と相性良好

### Alternatives considered:
| フレームワーク | 長所 | 短所 |
|--------------|------|------|
| **Vue 3** | Composition API、SFC形式、学習曲線が緩やか | React Flowのようなインタラクティブ図表ライブラリの選択肢が少ない |
| **Svelte** | コンパイル時最適化、バンドルサイズ最小 | エコシステムがReactより小規模、Mermaid以外の図表ライブラリの統合情報が少ない |

---

## 2. Markdown処理ライブラリ

### Decision: **MDX 3.x + @mdx-js/rollup**

### Rationale:
1. **Reactコンポーネントの直接埋め込み**: Markdown内でReactコンポーネントを使用可能
   - インタラクティブ図表をMarkdown内に自然に配置できる
   - カスタムUIコンポーネント（コールアウト、タブ等）の実装が容易
2. **Vite統合**: `@mdx-js/rollup` プラグインによるシームレスな統合
3. **unified/remarkエコシステムとの互換性**: 
   - `remark-gfm`: GitHub Flavored Markdown対応
   - `rehype-highlight` / `shiki`: コードシンタックスハイライト
4. **型安全性**: TypeScript対応が良好

### Vite設定例:
```typescript
// vite.config.ts
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight]
    }),
    react()
  ]
})
```

### Alternatives considered:
| ライブラリ | 長所 | 短所 |
|----------|------|------|
| **unified/remark** | 高いカスタマイズ性、プラグインエコシステム | Reactコンポーネント統合に追加作業が必要 |
| **markdown-it** | 高速、867k以上のプロジェクトで使用 | React統合が手動、コンポーネント埋め込みが困難 |

---

## 3. インタラクティブ図表ライブラリ

### Decision: **React Flow** (プライマリ) + **Mermaid** (セカンダリ)

### Rationale:

#### React Flow（開発フロー図、インタラクティブ図表向け）
1. **フルカスタマイズ可能**: ノードはReactコンポーネントとして実装
2. **インタラクション対応**: 
   - ホバー時のツールチップ
   - クリックによる詳細表示
   - ドラッグ、ズーム、パン
3. **React 19対応**: v12.10.0でReact 19とTailwind CSS 4をサポート
4. **MITライセンス**: 商用利用可能
5. **実績**: Stripe、Typeformなど多くの企業で採用

#### Mermaid（比較図、シンプルな図表向け）
- Markdown内で宣言的に記述可能
- フローチャート、シーケンス図、比較表を簡単に生成
- メンテナンスコストが低い

### Alternatives considered:
| ライブラリ | 長所 | 短所 |
|----------|------|------|
| **D3.js** | 最も柔軟、カスタム可視化に最適 | 学習曲線が急、React統合に手間がかかる |
| **Excalidraw** | 手描き風のスケッチ、埋め込み可能 | 開発フロー図には過剰、カスタマイズ性が限定的 |

### 推奨構成:
- **SpecKit開発フロー図**: React Flow（5ステップの視覚化、各ステップにホバー/クリック機能）
- **SDD比較図**: Mermaid（アジャイル/ウォーターフォール比較表）
- **コマンドフロー図**: React Flow（入力→処理→出力の可視化）

---

## 4. クライアントサイドルーティング

### Decision: **React Router v7 (Declarativeモード) + HashRouter**

### Rationale:
1. **React Router v7の安定性**: React 18/19両対応のマルチストラテジールーター
2. **GitHub Pages対応のためHashRouterを使用**:
   - GitHub Pagesはサーバーサイドリダイレクトをサポートしない
   - `HashRouter`を使用することで`/#/path`形式のURLで確実に動作
   - 404.htmlハックが不要でシンプル

### 設定例:
```tsx
// src/main.tsx
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flow" element={<DevFlow />} />
        <Route path="/flow/:step" element={<FlowStep />} />
        <Route path="/sdd" element={<SddConcepts />} />
        <Route path="/commands" element={<CommandReference />} />
        <Route path="/commands/:command" element={<CommandDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  )
}
```

### BrowserRouterの代替案（より美しいURL）:
GitHub Pagesで`BrowserRouter`を使う場合、以下が必要:
1. `404.html`をルートに配置（`index.html`と同内容）
2. Viteの`base`設定を正しく設定

```html
<!-- 404.html -->
<!DOCTYPE html>
<html>
<head>
  <script>
    // SPA向けリダイレクトスクリプト
    var path = window.location.pathname;
    window.location.replace('/#' + path);
  </script>
</head>
</html>
```

### 推奨: 初期リリースは`HashRouter`を採用（シンプルさ優先）

### Alternatives considered:
| 方式 | 長所 | 短所 |
|-----|------|------|
| **BrowserRouter + 404.html** | クリーンなURL | 設定が複雑、SEOに影響なし（SPA） |
| **TanStack Router** | 型安全、新しいアプローチ | エコシステムがまだ成長中 |

---

## 5. Service Worker / PWA

### Decision: **vite-plugin-pwa**

### Rationale:
1. **ゼロコンフィグ**: 最小設定でPWA化が可能
2. **Workbox統合**: Google製のService Worker管理ライブラリを内蔵
3. **複数フレームワーク対応**: React、Vue、Svelte等をサポート
4. **豊富な機能**:
   - Web App Manifest自動生成
   - Service Worker自動登録
   - オフラインサポート
   - 新コンテンツ検出時のプロンプト

### キャッシュ戦略（閲覧済みページキャッシュ）:
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // 閲覧済みページをキャッシュ
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.github\.io\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'speckit-docs-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7日間
              }
            }
          }
        ],
        // 静的アセットのプリキャッシュ
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
      manifest: {
        name: 'SpecKit Documentation',
        short_name: 'SpecKit Docs',
        description: 'SpecKitの開発フローとSpec Driven Developmentを学ぶ',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

### Alternatives considered:
| 方式 | 長所 | 短所 |
|-----|------|------|
| **Workbox直接使用** | 完全なコントロール | 設定が複雑 |
| **手動Service Worker** | 最大の柔軟性 | 実装・保守コストが高い |

---

## 6. GitHub Pages デプロイ

### Decision: **GitHub Actions + actions/deploy-pages**

### Rationale:
1. **公式サポート**: GitHubが提供する公式デプロイ方式
2. **シンプルなワークフロー**: push時に自動ビルド・デプロイ
3. **Viteとの相性**: ビルド成果物（dist/）を直接デプロイ

### 必要な設定:

#### 1. vite.config.ts
```typescript
export default defineConfig({
  base: '/ai_cli_template/',  // リポジトリ名に合わせる
  // ... その他の設定
})
```

#### 2. .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 3. GitHub リポジトリ設定
1. Settings → Pages
2. Source: 「GitHub Actions」を選択

### Alternatives considered:
| 方式 | 長所 | 短所 |
|-----|------|------|
| **gh-pages ブランチ** | 従来の方式、情報が多い | 追加ブランチ管理、`gh-pages` npm パッケージが必要 |
| **Netlify/Vercel** | より高機能、プレビューデプロイ | 外部サービス依存、仕様に記載のGitHub Pagesと異なる |

---

## 技術スタック総括

| カテゴリ | 選定技術 | バージョン |
|---------|---------|-----------|
| **フレームワーク** | React | 19.x |
| **ビルドツール** | Vite | 6.x（既存） |
| **言語** | TypeScript | 5.x（既存） |
| **ルーティング** | react-router-dom | 7.x |
| **Markdown** | MDX + remark/rehype | 3.x |
| **図表** | React Flow + Mermaid | 12.x / 11.x |
| **PWA** | vite-plugin-pwa | 1.x |
| **コードハイライト** | Shiki or rehype-highlight | latest |
| **スタイリング** | Tailwind CSS（推奨） | 4.x |
| **デプロイ** | GitHub Actions + Pages | - |

---

## 次のステップ

1. [ ] 上記技術スタックの承認を得る
2. [ ] 開発環境のセットアップ
3. [ ] プロジェクト構造の設計
4. [ ] 実装計画の策定
