/**
 * Task 3.1: CodeBlockコンポーネントのユニットテスト
 * TDD: RED Phase - テストを先に作成
 * Requirements: 2.3
 */

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CodeBlock, copyToClipboard } from '../../../spa/src/components/CodeBlock';

describe('CodeBlock Component', () => {
  // Clipboard APIのモック設定
  const mockWriteText = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Clipboard APIをモック
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe('CodeBlock rendering', () => {
    it('should render code content in a pre/code element', () => {
      const testCode = '/kiro-spec-init "my-feature"';
      render(<CodeBlock code={testCode} />);

      const codeElement = screen.getByTestId('code-content');
      expect(codeElement).toHaveTextContent(testCode);
    });

    it('should render a copy button', () => {
      render(<CodeBlock code="test code" />);

      const copyButton = screen.getByRole('button', { name: /コピー|copy/i });
      expect(copyButton).toBeInTheDocument();
    });

    it('should apply language class when language prop is provided', () => {
      render(<CodeBlock code="const x = 1;" language="typescript" />);

      const codeElement = screen.getByTestId('code-content');
      expect(codeElement).toHaveClass('language-typescript');
    });

    it('should render title when title prop is provided', () => {
      render(<CodeBlock code="test code" title="Example" />);

      expect(screen.getByText('Example')).toBeInTheDocument();
    });
  });

  describe('Copy functionality', () => {
    it('should copy code to clipboard when copy button is clicked', async () => {
      const testCode = '/kiro-spec-init "feature"';
      mockWriteText.mockResolvedValueOnce(undefined);

      render(<CodeBlock code={testCode} />);

      const copyButton = screen.getByRole('button', { name: /コピー|copy/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(testCode);
      });
    });

    it('should show success feedback after successful copy', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);

      render(<CodeBlock code="test" />);

      const copyButton = screen.getByRole('button', { name: /コピー|copy/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText(/コピー完了|copied/i)).toBeInTheDocument();
      });
    });

    it('should show error feedback when copy fails', async () => {
      mockWriteText.mockRejectedValueOnce(new Error('Copy failed'));

      render(<CodeBlock code="test" />);

      const copyButton = screen.getByRole('button', { name: /コピー|copy/i });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByText(/コピー失敗|error|failed/i)).toBeInTheDocument();
      });
    });

    it('should reset feedback after a short delay', async () => {
      vi.useFakeTimers();
      mockWriteText.mockResolvedValueOnce(undefined);

      render(<CodeBlock code="test" />);

      const copyButton = screen.getByRole('button', { name: /コピー|copy/i });

      // Click the button
      await act(async () => {
        fireEvent.click(copyButton);
        // Let the promise resolve
        await Promise.resolve();
      });

      // Check success message appears
      expect(screen.getByText(/コピー完了|copied/i)).toBeInTheDocument();

      // Advance past the reset timeout (2000ms)
      await act(async () => {
        vi.advanceTimersByTime(2100);
      });

      // Should be back to default state
      expect(screen.queryByText(/コピー完了|copied/i)).not.toBeInTheDocument();
      expect(screen.getByText('コピー')).toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button with aria-label', () => {
      render(<CodeBlock code="test" />);

      const copyButton = screen.getByRole('button');
      expect(copyButton).toHaveAttribute('aria-label');
    });
  });
});

describe('ClipboardService', () => {
  const mockWriteText = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
  });

  it('should return success result on successful copy', async () => {
    mockWriteText.mockResolvedValueOnce(undefined);

    const result = await copyToClipboard('test text');

    expect(result.success).toBe(true);
    expect(mockWriteText).toHaveBeenCalledWith('test text');
  });

  it('should return error result on failed copy', async () => {
    mockWriteText.mockRejectedValueOnce(new Error('Permission denied'));

    const result = await copyToClipboard('test text');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeTruthy();
    }
  });

  it('should handle Clipboard API not available', async () => {
    // Remove clipboard API
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const result = await copyToClipboard('test text');

    expect(result.success).toBe(false);
  });
});
