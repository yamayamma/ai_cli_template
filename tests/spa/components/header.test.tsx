import { fireEvent, render, screen } from '@testing-library/react';
/**
 * Header Component Tests
 * Task 4.1: Headerコンポーネントの実装
 * Requirements: 5.1, 5.3
 */
import { describe, expect, it } from 'vitest';
import { Header } from '../../../spa/src/components/Header';

describe('Header', () => {
  describe('基本レンダリング', () => {
    it('ヘッダーコンポーネントが正しくレンダリングされる', () => {
      render(<Header />);

      // header要素が存在する
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('ロゴ/タイトルが表示される', () => {
      render(<Header />);

      // Spec Kitのタイトルが表示される
      expect(screen.getByText('Spec Kit')).toBeInTheDocument();
    });

    it('ナビゲーションが表示される', () => {
      render(<Header />);

      // nav要素が存在する
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('固定ヘッダー', () => {
    it('固定ヘッダー用のクラスが適用されている', () => {
      render(<Header />);

      const header = screen.getByRole('banner');
      expect(header.className).toContain('header');
    });
  });

  describe('モバイルメニュー', () => {
    it('ハンバーガーメニューボタンが存在する', () => {
      render(<Header />);

      // ボタンが存在する
      const menuButton = screen.getByRole('button', { name: /メニュー/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('メニューボタンクリックで開閉状態が切り替わる', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /メニュー/i });

      // 初期状態は閉じている
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      // クリックで開く
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // 再度クリックで閉じる
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('メニューが開いているときナビゲーションにactiveクラスが適用される', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /メニュー/i });
      const nav = screen.getByRole('navigation');

      // 初期状態ではactiveクラスなし
      expect(nav.className).not.toContain('active');

      // クリックでactiveクラスが追加される
      fireEvent.click(menuButton);
      expect(nav.className).toContain('active');
    });
  });

  describe('ナビゲーションリンク', () => {
    it('ワークフローセクションへのリンクが存在する', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /ワークフロー/i })).toBeInTheDocument();
    });

    it('コマンドセクションへのリンクが存在する', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /コマンド/i })).toBeInTheDocument();
    });

    it('EARSセクションへのリンクが存在する', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /EARS/i })).toBeInTheDocument();
    });
  });

  describe('アクセシビリティ', () => {
    it('メニューボタンにaria-controlsが設定されている', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /メニュー/i });
      expect(menuButton).toHaveAttribute('aria-controls', 'main-nav');
    });

    it('ナビゲーションに適切なIDが設定されている', () => {
      render(<Header />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('id', 'main-nav');
    });
  });
});
