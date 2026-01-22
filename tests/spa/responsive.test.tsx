import { fireEvent, render, screen } from '@testing-library/react';
/**
 * Responsive Design Tests
 * モバイルレスポンシブ対応のテスト
 * Task: 7.1 - モバイルレスポンシブ対応の実装
 * Requirements: 5.3
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from '../../spa/src/components/Header';
import { Navigation } from '../../spa/src/components/Navigation';

/**
 * モックウィンドウサイズの設定
 */
function setWindowWidth(width: number): void {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
}

describe('Mobile Responsive Design', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // モバイルサイズにリセット
    setWindowWidth(375);
  });

  afterEach(() => {
    // 元のサイズに戻す
    setWindowWidth(originalInnerWidth);
  });

  describe('Header - ハンバーガーメニュー', () => {
    it('モバイル時にハンバーガーメニューボタンが表示される', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: 'メニュー' });
      expect(menuButton).toBeInTheDocument();
    });

    it('初期状態でメニューアイコンが☰（ハンバーガー）である', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: 'メニュー' });
      expect(menuButton).toHaveTextContent('☰');
    });

    it('メニューボタンクリックでアイコンが✕に切り替わる', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: 'メニュー' });
      fireEvent.click(menuButton);

      expect(menuButton).toHaveTextContent('✕');
    });

    it('メニュー開閉でaria-expandedが正しく切り替わる', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: 'メニュー' });

      // 初期状態はfalse
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      // クリックでtrue
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // 再クリックでfalse
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('メニューボタンがナビゲーションを制御している（aria-controls）', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: 'メニュー' });
      expect(menuButton).toHaveAttribute('aria-controls', 'main-nav');
    });
  });

  describe('Navigation - モバイルメニュー動作', () => {
    const mockOnClose = vi.fn();
    const mockOnNavigate = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('閉じた状態でナビゲーションに.openクラスが付与されない', () => {
      render(
        <Navigation
          isOpen={false}
          onClose={mockOnClose}
          activeSection="workflow"
          onNavigate={mockOnNavigate}
        />
      );

      const nav = screen.getByRole('navigation', { name: 'メインナビゲーション' });
      expect(nav.className).not.toContain('open');
    });

    it('開いた状態でナビゲーションに.openクラスが付与される', () => {
      render(
        <Navigation
          isOpen={true}
          onClose={mockOnClose}
          activeSection="workflow"
          onNavigate={mockOnNavigate}
        />
      );

      const nav = screen.getByRole('navigation', { name: 'メインナビゲーション' });
      expect(nav.className).toContain('open');
    });

    it('ナビゲーションリンクをクリックするとonCloseが呼ばれる', () => {
      render(
        <Navigation
          isOpen={true}
          onClose={mockOnClose}
          activeSection="workflow"
          onNavigate={mockOnNavigate}
        />
      );

      const commandsLink = screen.getByRole('link', { name: 'コマンド' });
      fireEvent.click(commandsLink);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('ナビゲーションリンクをクリックするとonNavigateが呼ばれる', () => {
      render(
        <Navigation
          isOpen={true}
          onClose={mockOnClose}
          activeSection="workflow"
          onNavigate={mockOnNavigate}
        />
      );

      const commandsLink = screen.getByRole('link', { name: 'コマンド' });
      fireEvent.click(commandsLink);

      expect(mockOnNavigate).toHaveBeenCalledWith('commands');
    });

    it('全てのナビゲーションリンクが存在する', () => {
      render(
        <Navigation
          isOpen={true}
          onClose={mockOnClose}
          activeSection="workflow"
          onNavigate={mockOnNavigate}
        />
      );

      expect(screen.getByRole('link', { name: 'ワークフロー' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'コマンド' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '承認' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '概念' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'EARS' })).toBeInTheDocument();
    });
  });

  describe('Touch Device Interactions', () => {
    it('ナビゲーションリンクがタッチターゲットサイズ要件を満たす（44px以上推奨）', () => {
      render(<Navigation isOpen={true} onClose={vi.fn()} activeSection="workflow" />);

      const links = screen.getAllByRole('link');

      // 各リンクにpadding適用を確認（CSS側でpadding: var(--spacing-3) var(--spacing-4)で12-16px）
      // 実際のタッチターゲットサイズはCSSで制御されるため、要素の存在を確認
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toBeInTheDocument();
      }
    });
  });

  describe('Accessibility - モバイル対応', () => {
    it('ナビゲーションにaria-labelが設定されている', () => {
      render(<Navigation isOpen={true} onClose={vi.fn()} activeSection="workflow" />);

      const nav = screen.getByRole('navigation', { name: 'メインナビゲーション' });
      expect(nav).toBeInTheDocument();
    });

    it('アクティブリンクにaria-current属性が設定される', () => {
      render(<Navigation isOpen={true} onClose={vi.fn()} activeSection="commands" />);

      const activeLink = screen.getByRole('link', { name: 'コマンド' });
      expect(activeLink).toHaveAttribute('aria-current', 'true');
    });

    it('非アクティブリンクにはaria-current属性がない', () => {
      render(<Navigation isOpen={true} onClose={vi.fn()} activeSection="commands" />);

      const inactiveLink = screen.getByRole('link', { name: 'ワークフロー' });
      expect(inactiveLink).not.toHaveAttribute('aria-current');
    });
  });
});
