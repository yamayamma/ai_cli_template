/**
 * CodeBlock Component
 * コピー機能付きコードブロック
 * Requirements: 2.3
 */
import { useCallback, useState } from 'react';
import styles from './CodeBlock.module.css';

/**
 * ClipboardService - コピー結果の型定義
 */
export type CopyResult = { success: true } | { success: false; error: string };

/**
 * Clipboard APIを使用してテキストをクリップボードにコピー
 */
export async function copyToClipboard(text: string): Promise<CopyResult> {
  if (!navigator.clipboard) {
    return { success: false, error: 'Clipboard API is not available' };
  }

  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Copy failed',
    };
  }
}

/**
 * コピー状態の型
 */
type CopyState = 'idle' | 'success' | 'error';

/**
 * CodeBlockコンポーネントのProps
 */
interface CodeBlockProps {
  /** 表示するコード */
  code: string;
  /** プログラミング言語（オプション） */
  language?: string;
  /** タイトル（オプション） */
  title?: string;
}

/**
 * CodeBlock - コピー機能付きコードブロックコンポーネント
 */
export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const handleCopy = useCallback(async () => {
    const result = await copyToClipboard(code);

    if (result.success) {
      setCopyState('success');
    } else {
      setCopyState('error');
    }

    // 2秒後にリセット
    setTimeout(() => {
      setCopyState('idle');
    }, 2000);
  }, [code]);

  const getCopyButtonText = () => {
    switch (copyState) {
      case 'success':
        return 'コピー完了';
      case 'error':
        return 'コピー失敗';
      default:
        return 'コピー';
    }
  };

  const languageClass = language ? `language-${language}` : '';

  return (
    <div className={styles.codeBlock}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.container}>
        <pre className={styles.pre}>
          <code data-testid="code-content" className={`${styles.code} ${languageClass}`.trim()}>
            {code}
          </code>
        </pre>
        <button
          type="button"
          className={`${styles.copyButton} ${styles[copyState] || ''}`.trim()}
          onClick={handleCopy}
          aria-label={getCopyButtonText()}
        >
          {getCopyButtonText()}
        </button>
      </div>
    </div>
  );
}
