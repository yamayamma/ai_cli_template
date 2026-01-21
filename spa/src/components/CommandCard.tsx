/**
 * CommandCard Component
 * Requirements: 2.1, 2.2, 2.3
 *
 * 個別コマンドの詳細を表示するカードコンポーネント
 * ホバー/クリックで詳細表示、CodeBlockでコード例を表示
 */

import { useState } from 'react';
import type { Command } from '../data/types';
import { CodeBlock } from './CodeBlock';
import styles from './CommandCard.module.css';

interface CommandCardProps {
  readonly command: Command;
}

/**
 * コマンド詳細カードコンポーネント
 * クリックで詳細（パラメータ、例）を展開表示
 */
export function CommandCard({ command }: CommandCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>
          <code>{command.name}</code>
        </h3>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '閉じる' : '詳細'}
        </button>
      </div>

      <p className={styles.description}>{command.description}</p>

      <div className={styles.syntax}>
        <span className={styles.syntaxLabel}>構文:</span>
        <code className={styles.syntaxCode}>{command.syntax}</code>
      </div>

      {isExpanded && (
        <div className={styles.details}>
          {/* パラメータセクション */}
          <div className={styles.parameters}>
            <h4 className={styles.sectionTitle}>パラメータ</h4>
            <ul className={styles.paramList}>
              {command.parameters.map((param) => (
                <li key={param.name} className={styles.paramItem}>
                  <div className={styles.paramHeader}>
                    <code className={styles.paramName}>{param.name}</code>
                    <span className={styles.paramType}>{param.type}</span>
                    {param.required && <span className={styles.required}>必須</span>}
                  </div>
                  <p className={styles.paramDescription}>{param.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* コード例セクション */}
          <div className={styles.examples}>
            <h4 className={styles.sectionTitle}>使用例</h4>
            {command.examples.map((example) => (
              <div key={example.title} className={styles.example}>
                <p className={styles.exampleTitle}>{example.title}</p>
                <CodeBlock code={example.code} language={example.language} />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
