/**
 * Entry Point Tests
 * Task 6.2: エントリーポイントとHTMLテンプレートの設定
 * Requirements: 7.1, 7.2, 7.3
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// HTMLファイルを読み込む
const htmlPath = resolve(__dirname, '../../spa/index.html');
const htmlContent = readFileSync(htmlPath, 'utf-8');

describe('index.html', () => {
  describe('基本メタ情報（Requirement 7.2）', () => {
    it('正しい言語属性が設定されている', () => {
      expect(htmlContent).toContain('lang="ja"');
    });

    it('正しい文字エンコーディングが設定されている', () => {
      expect(htmlContent).toContain('charset="UTF-8"');
    });

    it('ビューポートが正しく設定されている', () => {
      expect(htmlContent).toContain('name="viewport"');
      expect(htmlContent).toContain('width=device-width');
      expect(htmlContent).toContain('initial-scale=1.0');
    });

    it('タイトルが設定されている', () => {
      expect(htmlContent).toMatch(/<title>.*Spec Kit.*<\/title>/);
    });

    it('descriptionメタタグが設定されている', () => {
      expect(htmlContent).toContain('name="description"');
      expect(htmlContent).toContain('content="');
    });
  });

  describe('OGPメタタグ（Requirement 7.3）', () => {
    it('og:titleが設定されている', () => {
      expect(htmlContent).toContain('property="og:title"');
    });

    it('og:descriptionが設定されている', () => {
      expect(htmlContent).toContain('property="og:description"');
    });

    it('og:typeが設定されている', () => {
      expect(htmlContent).toContain('property="og:type"');
      expect(htmlContent).toContain('content="website"');
    });

    it('og:localeが設定されている', () => {
      expect(htmlContent).toContain('property="og:locale"');
      expect(htmlContent).toContain('content="ja_JP"');
    });
  });

  describe('ファビコン（Requirement 7.3）', () => {
    it('ファビコンリンクが設定されている', () => {
      expect(htmlContent).toContain('rel="icon"');
    });
  });

  describe('アプリケーションマウント（Requirement 7.1）', () => {
    it('ルート要素が存在する', () => {
      expect(htmlContent).toContain('id="root"');
    });

    it('main.tsxがモジュールとして読み込まれる', () => {
      expect(htmlContent).toContain('type="module"');
      expect(htmlContent).toContain('src="/src/main.tsx"');
    });
  });
});

describe('main.tsx', () => {
  // main.tsxの内容をテスト
  const mainPath = resolve(__dirname, '../../spa/src/main.tsx');
  const mainContent = readFileSync(mainPath, 'utf-8');

  describe('Reactアプリケーションマウント（Requirement 7.1）', () => {
    it('StrictModeを使用している', () => {
      expect(mainContent).toContain('StrictMode');
    });

    it('createRootを使用している', () => {
      expect(mainContent).toContain('createRoot');
    });

    it('Appコンポーネントをインポートしている', () => {
      expect(mainContent).toContain("from './App'");
    });

    it('グローバルスタイルをインポートしている', () => {
      expect(mainContent).toContain("import './styles/global.css'");
    });

    it('ルート要素が見つからない場合のエラーハンドリングがある', () => {
      expect(mainContent).toContain('Root element not found');
    });
  });
});
