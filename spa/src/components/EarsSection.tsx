/**
 * EarsSection and PatternCard Components
 * Requirements: 6.1, 6.2, 6.3
 *
 * EARS形式の5つのパターンを説明・例示するセクション
 */

import { useState } from 'react';
import { earsPatterns } from '../data/ears-patterns';
import type { EarsPattern } from '../data/types';
import styles from './EarsSection.module.css';

/**
 * PatternCard - 個別パターンを表示するカード
 */
interface PatternCardProps {
  readonly pattern: EarsPattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  const toggleExamples = () => {
    setShowExamples((prev) => !prev);
  };

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{pattern.name}</h3>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleExamples}
          aria-expanded={showExamples}
        >
          {showExamples ? '閉じる' : '例を表示'}
        </button>
      </div>

      <div className={styles.template}>
        <code className={styles.templateCode}>{pattern.pattern}</code>
      </div>

      <p className={styles.description}>{pattern.description}</p>

      {showExamples && (
        <div className={styles.examples}>
          <h4 className={styles.examplesTitle}>実例</h4>
          <ul className={styles.exampleList}>
            {pattern.examples.map((example) => (
              <li key={example} className={styles.exampleItem}>
                {example}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

/**
 * EarsSection - EARS形式説明セクション
 */
export function EarsSection() {
  return (
    <section id="ears" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>EARS形式</h2>
        <p className={styles.subtitle}>
          EARS（Easy Approach to Requirements
          Syntax）は、要件を構造化された形式で記述するためのフレームワークです。
          5つのパターンを使い分けることで、明確で一貫性のある要件定義が可能になります。
        </p>

        <div className={styles.patterns}>
          {earsPatterns.map((pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </div>
    </section>
  );
}
