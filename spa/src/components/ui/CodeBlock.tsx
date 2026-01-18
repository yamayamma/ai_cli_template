import { useState } from 'react';
import './CodeBlock.css';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
  variant?: 'default' | 'terminal';
}

export function CodeBlock({
  code,
  language = 'bash',
  showLineNumbers = false,
  showCopy = true,
  variant = 'default',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderCode = () => {
    if (variant === 'terminal') {
      const lines = code.split('\n');
      return lines.map((line, i) => {
        if (line.startsWith('$')) {
          return (
            <div key={i}>
              <span className="prompt">$ </span>
              <span className="command">{line.slice(2)}</span>
            </div>
          );
        }
        return (
          <div key={i} className="output">
            {line}
          </div>
        );
      });
    }

    if (showLineNumbers) {
      const lines = code.split('\n');
      return lines.map((line, i) => (
        <div key={i} className="code-line">
          <span className="line-number">{i + 1}</span>
          <span className="line-content">{line}</span>
        </div>
      ));
    }

    return code;
  };

  return (
    <div className={`code-block ${variant}`}>
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
        {showCopy && (
          <button
            type="button"
            className={`code-block-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>
      <pre>
        <code>{renderCode()}</code>
      </pre>
    </div>
  );
}
