/**
 * PhaseCard Component
 * Requirements: 1.1, 1.2
 *
 * SDDフェーズを表すカードコンポーネント
 * 各フェーズの目的、説明、成果物を表示
 */

import type { Phase } from '../data/types';
import styles from './PhaseCard.module.css';

interface PhaseCardProps {
  readonly phase: Phase;
}

/**
 * フェーズ詳細を表示するカードコンポーネント
 */
export function PhaseCard({ phase }: PhaseCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {phase.icon}
        </span>
        <h3 className={styles.title}>{phase.title}</h3>
      </div>
      <p className={styles.description}>{phase.description}</p>
      <div className={styles.outputs}>
        <span className={styles.outputLabel}>成果物:</span>
        <ul className={styles.outputList}>
          {phase.outputs.map((output) => (
            <li key={output} className={styles.outputItem}>
              <code>{output}</code>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
