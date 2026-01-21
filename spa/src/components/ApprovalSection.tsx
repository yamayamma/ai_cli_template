/**
 * ApprovalSection Component
 * Requirements: 3.1, 3.2, 3.3
 *
 * 承認ワークフローの図解、レビュー必要性、-yオプション説明を表示
 */

import styles from './ApprovalSection.module.css';

/**
 * ワークフローフェーズの定義
 */
const workflowPhases = [
  { id: 'requirements', label: 'Requirements', icon: '📋' },
  { id: 'design', label: 'Design', icon: '🏗️' },
  { id: 'tasks', label: 'Tasks', icon: '✅' },
  { id: 'implementation', label: 'Implementation', icon: '💻' },
] as const;

/**
 * レビューチェックポイントの定義
 */
const reviewCheckpoints = [
  {
    phase: 'Requirements → Design',
    description: '要件が明確で実現可能かを確認',
  },
  {
    phase: 'Design → Tasks',
    description: '設計が要件を満たし、実装可能かを確認',
  },
  {
    phase: 'Tasks → Implementation',
    description: 'タスク分解が適切で、TDDで実装可能かを確認',
  },
] as const;

/**
 * 承認ワークフローセクション
 */
export function ApprovalSection() {
  return (
    <section id="approval" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>承認ワークフロー</h2>
        <p className={styles.subtitle}>
          SDDでは各フェーズで人間のレビューが必要です。承認を経て次のフェーズに進みます。
        </p>

        {/* ワークフロー図解 */}
        <div className={styles.workflow}>
          {workflowPhases.map((phase, index) => (
            <div key={phase.id} className={styles.phaseWrapper}>
              <div className={styles.phaseBox}>
                <span className={styles.phaseIcon} aria-hidden="true">
                  {phase.icon}
                </span>
                <span className={styles.phaseLabel}>{phase.label}</span>
              </div>
              {index < workflowPhases.length - 1 && (
                <div className={styles.approvalStep}>
                  <span className={styles.approvalArrow}>→</span>
                  <span className={styles.approvalBadge}>承認</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* レビューチェックポイント */}
        <div className={styles.checkpoints}>
          <h3 className={styles.checkpointsTitle}>レビューチェックポイント</h3>
          <ul className={styles.checkpointList}>
            {reviewCheckpoints.map((checkpoint) => (
              <li key={checkpoint.phase} className={styles.checkpointItem}>
                <span className={styles.checkpointPhase}>{checkpoint.phase}</span>
                <span className={styles.checkpointDesc}>{checkpoint.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* -y オプション説明 */}
        <div className={styles.fastTrack}>
          <h3 className={styles.fastTrackTitle}>
            <code>-y</code> オプション（ファストトラック承認）
          </h3>
          <p className={styles.fastTrackDesc}>
            <code>-y</code> オプションを使用すると、確認をスキップして自動承認できます。
            プロトタイピングや個人開発で素早く進めたい場合に便利です。
          </p>
          <div className={styles.caution}>
            <span className={styles.cautionIcon} aria-hidden="true">
              ⚠️
            </span>
            <p className={styles.cautionText}>
              <strong>注意:</strong> <code>-y</code>{' '}
              は意図的に使用してください。チーム開発では、各フェーズでのレビューを慎重に行うことを推奨します。
            </p>
          </div>
          <div className={styles.example}>
            <code className={styles.exampleCode}>/kiro-spec-requirements feature-name -y</code>
          </div>
        </div>
      </div>
    </section>
  );
}
