/**
 * CommandSection and CommandCard Component Tests
 * Requirements: 2.1, 2.2, 2.3
 *
 * TDD: RED → GREEN → REFACTOR
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CommandCard } from '../../../spa/src/components/CommandCard';
import { CommandSection } from '../../../spa/src/components/CommandSection';
import { commands } from '../../../spa/src/data/commands';

describe('CommandSection', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Requirements 2.1: コマンド一覧を表示', () => {
    it('should render all commands', () => {
      render(<CommandSection />);

      // 全コマンドが表示されていること
      for (const command of commands) {
        expect(screen.getByText(command.name)).toBeInTheDocument();
      }
    });

    it('should have correct section id for navigation', () => {
      render(<CommandSection />);

      const section = document.getElementById('commands');
      expect(section).toBeInTheDocument();
    });

    it('should display section title', () => {
      render(<CommandSection />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('コマンドリファレンス');
    });
  });

  describe('Requirements 2.2: コマンドの詳細説明を表示', () => {
    it('should render description for each command', () => {
      render(<CommandSection />);

      // 各コマンドの説明が表示されていること
      for (const command of commands) {
        expect(screen.getByText(command.description)).toBeInTheDocument();
      }
    });
  });
});

describe('CommandCard', () => {
  afterEach(() => {
    cleanup();
  });

  const mockCommand = commands[0]; // spec-init command

  it('should render command name', () => {
    render(<CommandCard command={mockCommand} />);

    expect(screen.getByText('/kiro-spec-init')).toBeInTheDocument();
  });

  it('should render command description', () => {
    render(<CommandCard command={mockCommand} />);

    expect(screen.getByText(mockCommand.description)).toBeInTheDocument();
  });

  it('should render command syntax', () => {
    render(<CommandCard command={mockCommand} />);

    expect(screen.getByText(mockCommand.syntax)).toBeInTheDocument();
  });

  it('should render parameters section when expanded', () => {
    render(<CommandCard command={mockCommand} />);

    // まず詳細を展開
    const toggleButton = screen.getByRole('button', { name: /詳細/i });
    fireEvent.click(toggleButton);

    // パラメータタイトルが表示されていること
    expect(screen.getByText('パラメータ')).toBeInTheDocument();

    // パラメータ名が表示されていること
    for (const param of mockCommand.parameters) {
      expect(screen.getByText(param.name)).toBeInTheDocument();
    }
  });

  it('should render code examples with CodeBlock when expanded', () => {
    render(<CommandCard command={mockCommand} />);

    // まず詳細を展開
    const toggleButton = screen.getByRole('button', { name: /詳細/i });
    fireEvent.click(toggleButton);

    // 例のタイトルが表示されていること
    for (const example of mockCommand.examples) {
      expect(screen.getByText(example.title)).toBeInTheDocument();
    }

    // コードが表示されていること
    for (const example of mockCommand.examples) {
      expect(screen.getByText(example.code)).toBeInTheDocument();
    }
  });

  it('should be rendered as an article element', () => {
    render(<CommandCard command={mockCommand} />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });

  describe('Requirements 2.2: ホバー時の詳細表示', () => {
    it('should show expanded state when details button is clicked', () => {
      render(<CommandCard command={mockCommand} />);

      // 初期状態ではexamplesは非表示（または折りたたみ状態）
      const toggleButton = screen.getByRole('button', { name: /詳細/i });
      expect(toggleButton).toBeInTheDocument();

      // ボタンをクリックして展開
      fireEvent.click(toggleButton);

      // 展開後にパラメータと例が表示されていること
      expect(screen.getByText('パラメータ')).toBeVisible();
    });
  });

  describe('Requirements 2.3: コード例のコピー機能', () => {
    it('should have copy button in code examples', () => {
      render(<CommandCard command={mockCommand} />);

      // 詳細を展開
      const toggleButton = screen.getByRole('button', { name: /詳細/i });
      fireEvent.click(toggleButton);

      // コピーボタンが存在すること
      const copyButtons = screen.getAllByRole('button', { name: /コピー/i });
      expect(copyButtons.length).toBeGreaterThan(0);
    });
  });
});
