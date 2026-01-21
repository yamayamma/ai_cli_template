/**
 * App Component
 * アプリケーションのルートコンポーネント
 * Requirements: 1.1, 1.3, 5.1, 5.2
 *
 * 全セクションの配置と順序設定
 * HeaderとMainコンテンツのレイアウト
 * セクションIDの設定とナビゲーション連携
 */

import styles from './components/App.module.css';
import { ApprovalSection } from './components/ApprovalSection';
import { CommandSection } from './components/CommandSection';
import { ConceptSection } from './components/ConceptSection';
import { EarsSection } from './components/EarsSection';
import { Header } from './components/Header';
import { WorkflowSection } from './components/WorkflowSection';

/**
 * App - アプリケーションのルートコンポーネント
 * 固定ヘッダーとメインコンテンツエリアのレイアウトを構成
 */
export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <WorkflowSection />
        <CommandSection />
        <ApprovalSection />
        <ConceptSection />
        <EarsSection />
      </main>
    </div>
  );
}
