/**
 * WorkflowSection Component
 * Requirements: 1.1, 1.2
 *
 * SDDの3フェーズワークフローを視覚的に表示するセクション
 * Requirements → Design → Tasks フローを図示
 */

import { phases } from '../data/phases';
import { PhaseCard } from './PhaseCard';
import styles from './WorkflowSection.module.css';

/**
 * SDDワークフローセクション
 * 3フェーズを視覚的に表示し、フェーズ間の接続を矢印で示す
 */
export function WorkflowSection() {
  return (
    <section id="workflow" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>SDDワークフロー</h2>
        <p className={styles.subtitle}>
          Spec-Driven Development は3つのフェーズで構成されます。
          各フェーズは承認を経て次へ進みます。
        </p>

        <div className={styles.flow}>
          {phases.map((phase, index) => (
            <div key={phase.id} className={styles.phaseWrapper}>
              <PhaseCard phase={phase} />
              {index < phases.length - 1 && (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
