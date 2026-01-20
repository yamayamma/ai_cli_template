import { fireEvent, render, screen } from '@testing-library/react';
/**
 * Navigation Component Tests
 * Task 4.2: Navigationコンポーネントの実装
 * Requirements: 1.3, 5.1, 5.2, 5.3
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Navigation } from '../../../spa/src/components/Navigation';

// IntersectionObserverのモック
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
const mockUnobserve = vi.fn();

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  observe = mockObserve;
  disconnect = mockDisconnect;
  unobserve = mockUnobserve;
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords = () => [];
}

describe('Navigation', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    // セクション要素をDOMに追加
    const sections = ['workflow', 'commands', 'approval', 'concepts', 'ears'];
    for (const id of sections) {
      const section = document.createElement('section');
      section.id = id;
      document.body.appendChild(section);
    }
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  describe('基本レンダリング', () => {
    it('ナビゲーションコンポーネントが正しくレンダリングされる', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('セクションリンクが表示される', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} />);

      expect(screen.getByRole('link', { name: /ワークフロー/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /コマンド/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /承認/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /概念/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /EARS/i })).toBeInTheDocument();
    });

    it('リンクが正しいhref属性を持つ', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} />);

      expect(screen.getByRole('link', { name: /ワークフロー/i })).toHaveAttribute(
        'href',
        '#workflow'
      );
      expect(screen.getByRole('link', { name: /コマンド/i })).toHaveAttribute('href', '#commands');
    });
  });

  describe('アクティブセクションのハイライト', () => {
    it('デフォルトで最初のセクションがアクティブ', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} />);

      const workflowLink = screen.getByRole('link', { name: /ワークフロー/i });
      expect(workflowLink.className).toContain('active');
    });

    it('activeSection propで指定したセクションがハイライトされる', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} activeSection="commands" />);

      const commandsLink = screen.getByRole('link', { name: /コマンド/i });
      expect(commandsLink.className).toContain('active');

      const workflowLink = screen.getByRole('link', { name: /ワークフロー/i });
      expect(workflowLink.className).not.toContain('active');
    });
  });

  describe('スムーズスクロール連携', () => {
    it('リンククリック時にonNavigateが呼ばれる', () => {
      const mockOnNavigate = vi.fn();
      render(<Navigation isOpen={false} onClose={vi.fn()} onNavigate={mockOnNavigate} />);

      const commandsLink = screen.getByRole('link', { name: /コマンド/i });
      fireEvent.click(commandsLink);

      expect(mockOnNavigate).toHaveBeenCalledWith('commands');
    });

    it('リンククリック時のデフォルト動作が防止される', () => {
      const mockOnNavigate = vi.fn();
      render(<Navigation isOpen={false} onClose={vi.fn()} onNavigate={mockOnNavigate} />);

      const commandsLink = screen.getByRole('link', { name: /コマンド/i });
      const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

      commandsLink.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('モバイルメニュー開閉状態', () => {
    it('isOpen=falseの時、閉じた状態のクラスが適用される', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} />);

      const nav = screen.getByRole('navigation');
      expect(nav.className).not.toContain('open');
    });

    it('isOpen=trueの時、開いた状態のクラスが適用される', () => {
      render(<Navigation isOpen={true} onClose={vi.fn()} />);

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('open');
    });

    it('リンククリック時にonCloseが呼ばれる（モバイルメニュー閉じる）', () => {
      const mockOnClose = vi.fn();
      render(<Navigation isOpen={true} onClose={mockOnClose} />);

      const commandsLink = screen.getByRole('link', { name: /コマンド/i });
      fireEvent.click(commandsLink);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('アクセシビリティ', () => {
    it('nav要素にaria-labelが設定されている', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション');
    });

    it('アクティブリンクにaria-currentが設定されている', () => {
      render(<Navigation isOpen={false} onClose={vi.fn()} activeSection="commands" />);

      const commandsLink = screen.getByRole('link', { name: /コマンド/i });
      expect(commandsLink).toHaveAttribute('aria-current', 'true');

      const workflowLink = screen.getByRole('link', { name: /ワークフロー/i });
      expect(workflowLink).not.toHaveAttribute('aria-current');
    });
  });
});
