/**
 * CommandSection Component
 * Requirements: 2.1, 2.2
 *
 * Spec Kitコマンドの一覧と詳細を表示するセクション
 */

import { commands } from '../data/commands';
import { CommandCard } from './CommandCard';
import styles from './CommandSection.module.css';

/**
 * コマンドリファレンスセクション
 * 全コマンドをカード形式で一覧表示
 */
export function CommandSection() {
  return (
    <section id="commands" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>コマンドリファレンス</h2>
        <p className={styles.subtitle}>
          Spec Kitで使用可能なコマンド一覧。各カードをクリックして詳細を表示できます。
        </p>

        <div className={styles.grid}>
          {commands.map((command) => (
            <CommandCard key={command.id} command={command} />
          ))}
        </div>
      </div>
    </section>
  );
}
