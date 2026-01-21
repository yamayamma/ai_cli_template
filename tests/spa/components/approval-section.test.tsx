/**
 * ApprovalSection Component Tests
 * Requirements: 3.1, 3.2, 3.3
 *
 * TDD: RED → GREEN → REFACTOR
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ApprovalSection } from '../../../spa/src/components/ApprovalSection';

describe('ApprovalSection', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Requirements 3.1: 3フェーズ承認ワークフローを図解で表示', () => {
    it('should have correct section id for navigation', () => {
      render(<ApprovalSection />);

      const section = document.getElementById('approval');
      expect(section).toBeInTheDocument();
    });

    it('should display section title', () => {
      render(<ApprovalSection />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('承認ワークフロー');
    });

    it('should display workflow phases', () => {
      render(<ApprovalSection />);

      // ワークフローの各フェーズが表示されていること
      expect(screen.getByText('Requirements')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Tasks')).toBeInTheDocument();
      expect(screen.getByText('Implementation')).toBeInTheDocument();
    });

    it('should display approval steps between phases', () => {
      render(<ApprovalSection />);

      // 承認ステップ（矢印やレビューアイコン）が表示されていること
      const approvalIndicators = screen.getAllByText(/承認|レビュー/i);
      expect(approvalIndicators.length).toBeGreaterThan(0);
    });
  });

  describe('Requirements 3.2: 各フェーズで人間のレビューが必要であることを明示', () => {
    it('should explain that human review is required at each phase', () => {
      render(<ApprovalSection />);

      // レビュー必要性の説明があること
      expect(screen.getByText(/人間のレビュー|レビューが必要|Human review/i)).toBeInTheDocument();
    });

    it('should display review checkpoints', () => {
      render(<ApprovalSection />);

      // 各フェーズにレビューチェックポイントがあることを示す
      const checkpoints = screen.getAllByRole('listitem');
      expect(checkpoints.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Requirements 3.3: -yオプションの使用方法と注意点を説明', () => {
    it('should display -y option explanation', () => {
      render(<ApprovalSection />);

      // -yオプションの説明があること（複数箇所に表示される）
      const yOptions = screen.getAllByText(/-y/);
      expect(yOptions.length).toBeGreaterThan(0);
    });

    it('should explain fast-track approval', () => {
      render(<ApprovalSection />);

      // ファストトラック承認の説明があること（複数箇所に表示される）
      const fastTrackElements = screen.getAllByText(/ファストトラック|自動承認|fast-track/i);
      expect(fastTrackElements.length).toBeGreaterThan(0);
    });

    it('should display caution about -y option usage', () => {
      render(<ApprovalSection />);

      // 注意点の説明があること（複数箇所に表示される）
      const cautionElements = screen.getAllByText(/注意|意図的|慎重/i);
      expect(cautionElements.length).toBeGreaterThan(0);
    });
  });
});
