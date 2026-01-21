/**
 * EarsSection and PatternCard Component Tests
 * Requirements: 6.1, 6.2, 6.3
 *
 * TDD: RED → GREEN → REFACTOR
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { EarsSection, PatternCard } from '../../../spa/src/components/EarsSection';
import { earsPatterns } from '../../../spa/src/data/ears-patterns';

describe('EarsSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('should have correct section id for navigation', () => {
    render(<EarsSection />);

    const section = document.getElementById('ears');
    expect(section).toBeInTheDocument();
  });

  it('should display section title', () => {
    render(<EarsSection />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/EARS/i);
  });

  it('should display EARS overview description', () => {
    render(<EarsSection />);

    // EARS形式の概要説明があること
    expect(screen.getByText(/Easy Approach to Requirements Syntax|要件構文/i)).toBeInTheDocument();
  });

  describe('Requirements 6.1: 5つのパターンを説明', () => {
    it('should render all 5 EARS patterns', () => {
      render(<EarsSection />);

      // 5つのパターン名が表示されていること
      expect(screen.getByText('Event-Driven')).toBeInTheDocument();
      expect(screen.getByText('State-Driven')).toBeInTheDocument();
      expect(screen.getByText('Unwanted Behavior')).toBeInTheDocument();
      expect(screen.getByText('Optional Feature')).toBeInTheDocument();
      expect(screen.getByText('Ubiquitous')).toBeInTheDocument();
    });

    it('should display pattern descriptions', () => {
      render(<EarsSection />);

      // 各パターンの説明が表示されていること
      for (const pattern of earsPatterns) {
        expect(screen.getByText(pattern.description)).toBeInTheDocument();
      }
    });
  });

  describe('Requirements 6.2: 各パターンの例を表示', () => {
    it('should display pattern template for each pattern', () => {
      render(<EarsSection />);

      // 各パターンのテンプレートが表示されていること
      for (const pattern of earsPatterns) {
        expect(screen.getByText(pattern.pattern)).toBeInTheDocument();
      }
    });
  });
});

describe('PatternCard', () => {
  afterEach(() => {
    cleanup();
  });

  const mockPattern = earsPatterns[0]; // Event-Driven pattern

  it('should render pattern name', () => {
    render(<PatternCard pattern={mockPattern} />);

    expect(screen.getByText('Event-Driven')).toBeInTheDocument();
  });

  it('should render pattern template', () => {
    render(<PatternCard pattern={mockPattern} />);

    expect(screen.getByText(mockPattern.pattern)).toBeInTheDocument();
  });

  it('should render pattern description', () => {
    render(<PatternCard pattern={mockPattern} />);

    expect(screen.getByText(mockPattern.description)).toBeInTheDocument();
  });

  it('should be rendered as an article element', () => {
    render(<PatternCard pattern={mockPattern} />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });

  describe('Requirements 6.3: パターン選択時のテンプレートと実例表示', () => {
    it('should have a button to toggle examples', () => {
      render(<PatternCard pattern={mockPattern} />);

      const button = screen.getByRole('button', { name: /例を表示|実例/i });
      expect(button).toBeInTheDocument();
    });

    it('should show examples when toggle button is clicked', () => {
      render(<PatternCard pattern={mockPattern} />);

      // 初期状態では例が非表示
      const button = screen.getByRole('button', { name: /例を表示|実例/i });

      // ボタンをクリック
      fireEvent.click(button);

      // 例が表示されること
      for (const example of mockPattern.examples) {
        expect(screen.getByText(example)).toBeInTheDocument();
      }
    });

    it('should hide examples when toggle button is clicked again', () => {
      render(<PatternCard pattern={mockPattern} />);

      const button = screen.getByRole('button', { name: /例を表示|実例/i });

      // クリックして展開
      fireEvent.click(button);

      // 例が表示されている
      expect(screen.getByText(mockPattern.examples[0])).toBeInTheDocument();

      // 再度クリックして閉じる
      fireEvent.click(button);

      // 例が非表示になる
      expect(screen.queryByText(mockPattern.examples[0])).not.toBeInTheDocument();
    });
  });
});
