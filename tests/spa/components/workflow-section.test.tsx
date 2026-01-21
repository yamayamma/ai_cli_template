/**
 * WorkflowSection Component Tests
 * Requirements: 1.1, 1.2
 *
 * TDD: RED → GREEN → REFACTOR
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PhaseCard } from '../../../spa/src/components/PhaseCard';
import { WorkflowSection } from '../../../spa/src/components/WorkflowSection';
import { phases } from '../../../spa/src/data/phases';

describe('WorkflowSection', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Requirements 1.1: SDDの3フェーズを視覚的に表示', () => {
    it('should render all three SDD phases', () => {
      render(<WorkflowSection />);

      // 3つのフェーズが表示されていること
      expect(screen.getByText('Requirements')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Tasks')).toBeInTheDocument();
    });

    it('should have correct section id for navigation', () => {
      render(<WorkflowSection />);

      const section = document.getElementById('workflow');
      expect(section).toBeInTheDocument();
    });

    it('should display section title', () => {
      render(<WorkflowSection />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('SDDワークフロー');
    });

    it('should display phase arrows/connections between phases', () => {
      render(<WorkflowSection />);

      // フェーズ間の矢印が表示されていること
      const arrows = screen.getAllByText('→');
      expect(arrows.length).toBe(2); // Requirements → Design → Tasks
    });
  });

  describe('Requirements 1.2: 各フェーズの目的・成果物を表示', () => {
    it('should render description for each phase', () => {
      render(<WorkflowSection />);

      // 各フェーズの説明が含まれていること
      for (const phase of phases) {
        expect(screen.getByText(phase.description)).toBeInTheDocument();
      }
    });

    it('should render outputs for each phase', () => {
      render(<WorkflowSection />);

      // 各フェーズの成果物ファイル名が表示されていること
      expect(screen.getByText('requirements.md')).toBeInTheDocument();
      expect(screen.getByText('design.md')).toBeInTheDocument();
      expect(screen.getByText('tasks.md')).toBeInTheDocument();
    });
  });
});

describe('PhaseCard', () => {
  afterEach(() => {
    cleanup();
  });

  const mockPhase = phases[0]; // Requirements phase

  it('should render phase title', () => {
    render(<PhaseCard phase={mockPhase} />);

    expect(screen.getByText('Requirements')).toBeInTheDocument();
  });

  it('should render phase icon', () => {
    render(<PhaseCard phase={mockPhase} />);

    expect(screen.getByText('📋')).toBeInTheDocument();
  });

  it('should render phase description', () => {
    render(<PhaseCard phase={mockPhase} />);

    expect(screen.getByText(mockPhase.description)).toBeInTheDocument();
  });

  it('should render phase outputs', () => {
    render(<PhaseCard phase={mockPhase} />);

    expect(screen.getByText('requirements.md')).toBeInTheDocument();
  });

  it('should be rendered as an article element', () => {
    render(<PhaseCard phase={mockPhase} />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });
});
