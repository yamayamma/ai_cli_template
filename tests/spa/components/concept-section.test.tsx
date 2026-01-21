/**
 * ConceptSection Component Tests
 * Requirements: 4.1, 4.2, 4.3
 *
 * TDD: RED → GREEN → REFACTOR
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ConceptSection } from '../../../spa/src/components/ConceptSection';
import { comparisonItems, specsConcept, steeringConcept } from '../../../spa/src/data/concepts';

describe('ConceptSection', () => {
  afterEach(() => {
    cleanup();
  });

  it('should have correct section id for navigation', () => {
    render(<ConceptSection />);

    const section = document.getElementById('concepts');
    expect(section).toBeInTheDocument();
  });

  it('should display section title', () => {
    render(<ConceptSection />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Steering.*Specs|概念/i);
  });

  describe('Requirements 4.1: SteeringとSpecsの比較表を表示', () => {
    it('should render comparison table', () => {
      render(<ConceptSection />);

      // テーブルが存在すること
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    it('should display table headers', () => {
      render(<ConceptSection />);

      // テーブルヘッダーが表示されていること
      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders).toHaveLength(3);

      // ヘッダーテキストを確認
      expect(columnHeaders[0]).toHaveTextContent('観点');
      expect(columnHeaders[1]).toHaveTextContent('Steering');
      expect(columnHeaders[2]).toHaveTextContent('Specs');
    });

    it('should display all comparison items', () => {
      render(<ConceptSection />);

      // すべての比較項目が表示されていること
      for (const item of comparisonItems) {
        expect(screen.getByText(item.aspect)).toBeInTheDocument();
        expect(screen.getByText(item.steering)).toBeInTheDocument();
        expect(screen.getByText(item.specs)).toBeInTheDocument();
      }
    });
  });

  describe('Requirements 4.2: Steeringの役割説明', () => {
    it('should display Steering title', () => {
      render(<ConceptSection />);

      // Steeringのタイトルが表示されていること
      const headings = screen.getAllByRole('heading', { level: 3 });
      const steeringHeading = headings.find((h) => h.textContent?.includes('Steering'));
      expect(steeringHeading).toBeInTheDocument();
    });

    it('should display Steering description', () => {
      render(<ConceptSection />);

      // Steeringの説明が表示されていること
      expect(screen.getByText(steeringConcept.description)).toBeInTheDocument();
    });

    it('should display Steering path', () => {
      render(<ConceptSection />);

      // Steeringのパスが表示されていること
      expect(screen.getByText(steeringConcept.path)).toBeInTheDocument();
    });

    it('should display Steering purposes', () => {
      render(<ConceptSection />);

      // Steeringの用途が表示されていること
      for (const purpose of steeringConcept.purposes) {
        expect(screen.getByText(purpose)).toBeInTheDocument();
      }
    });
  });

  describe('Requirements 4.3: Specsの役割説明', () => {
    it('should display Specs title', () => {
      render(<ConceptSection />);

      // Specsのタイトルが表示されていること
      const headings = screen.getAllByRole('heading', { level: 3 });
      const specsHeading = headings.find((h) => h.textContent?.includes('Specs'));
      expect(specsHeading).toBeInTheDocument();
    });

    it('should display Specs description', () => {
      render(<ConceptSection />);

      // Specsの説明が表示されていること
      expect(screen.getByText(specsConcept.description)).toBeInTheDocument();
    });

    it('should display Specs path', () => {
      render(<ConceptSection />);

      // Specsのパスが表示されていること
      expect(screen.getByText(specsConcept.path)).toBeInTheDocument();
    });

    it('should display Specs purposes', () => {
      render(<ConceptSection />);

      // Specsの用途が表示されていること
      for (const purpose of specsConcept.purposes) {
        expect(screen.getByText(purpose)).toBeInTheDocument();
      }
    });
  });
});
