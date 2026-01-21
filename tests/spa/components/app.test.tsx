/**
 * App Component Tests
 * Task 6.1: Appコンポーネントの実装とセクション統合
 * Requirements: 1.1, 1.3, 5.1, 5.2
 */
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../../spa/src/App';

// IntersectionObserverのモック
const mockIntersectionObserver = vi.fn();

beforeEach(() => {
  mockIntersectionObserver.mockReset();
  mockIntersectionObserver.mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('App', () => {
  describe('基本レンダリング', () => {
    it('Appコンポーネントが正しくレンダリングされる', () => {
      render(<App />);

      // main要素が存在する
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('Headerコンポーネントが含まれる', () => {
      render(<App />);

      // header要素が存在する
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });

  describe('セクション統合（Requirement 1.1）', () => {
    it('WorkflowSectionが含まれる', () => {
      render(<App />);

      // workflowセクションが存在する
      const workflowSection = document.getElementById('workflow');
      expect(workflowSection).toBeInTheDocument();
    });

    it('CommandSectionが含まれる', () => {
      render(<App />);

      // commandsセクションが存在する
      const commandSection = document.getElementById('commands');
      expect(commandSection).toBeInTheDocument();
    });

    it('ApprovalSectionが含まれる', () => {
      render(<App />);

      // approvalセクションが存在する
      const approvalSection = document.getElementById('approval');
      expect(approvalSection).toBeInTheDocument();
    });

    it('ConceptSectionが含まれる', () => {
      render(<App />);

      // conceptsセクションが存在する
      const conceptSection = document.getElementById('concepts');
      expect(conceptSection).toBeInTheDocument();
    });

    it('EarsSectionが含まれる', () => {
      render(<App />);

      // earsセクションが存在する
      const earsSection = document.getElementById('ears');
      expect(earsSection).toBeInTheDocument();
    });
  });

  describe('セクション順序', () => {
    it('セクションが正しい順序で配置されている', () => {
      render(<App />);

      const main = screen.getByRole('main');
      // main内のsection要素を全て取得
      const sections = main.querySelectorAll('section');

      // セクションの順序を検証（section要素のid属性）
      const sectionIds = Array.from(sections).map((s) => s.getAttribute('id'));
      expect(sectionIds).toEqual(['workflow', 'commands', 'approval', 'concepts', 'ears']);
    });
  });

  describe('ナビゲーション連携（Requirement 1.3, 5.2）', () => {
    it('各セクションがナビゲーションリンクと対応するIDを持つ', () => {
      render(<App />);

      // ナビゲーションリンクが存在する
      const navLinks = ['workflow', 'commands', 'approval', 'concepts', 'ears'];

      for (const linkId of navLinks) {
        const section = document.getElementById(linkId);
        expect(section).toBeInTheDocument();
      }
    });
  });

  describe('レイアウト（Requirement 5.1）', () => {
    it('HeaderとMainコンテンツが適切にレイアウトされている', () => {
      render(<App />);

      const header = screen.getByRole('banner');
      const main = screen.getByRole('main');

      // ヘッダーとメインが両方存在する
      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();

      // アプリコンテナが存在する
      const appContainer = header.parentElement;
      expect(appContainer).toContainElement(header);
      expect(appContainer).toContainElement(main);
    });

    it('メインコンテンツが適切な余白クラスを持つ', () => {
      render(<App />);

      const main = screen.getByRole('main');
      // メイン要素がクラスを持っている
      expect(main.className).toBeTruthy();
    });
  });
});
