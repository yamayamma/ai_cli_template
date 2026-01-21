/**
 * ConceptSection Component
 * Requirements: 4.1, 4.2, 4.3
 *
 * SteeringとSpecsの概念説明と比較表を表示
 */

import type { Concept } from '../data/concepts';
import { comparisonItems, specsConcept, steeringConcept } from '../data/concepts';
import styles from './ConceptSection.module.css';

/**
 * 概念カードコンポーネント
 */
function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.cardTitle}>{concept.title}</h3>
      <code className={styles.cardPath}>{concept.path}</code>
      <p className={styles.cardDescription}>{concept.description}</p>
      <div className={styles.purposes}>
        <span className={styles.purposesLabel}>主な用途:</span>
        <ul className={styles.purposesList}>
          {concept.purposes.map((purpose) => (
            <li key={purpose} className={styles.purposeItem}>
              {purpose}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * ConceptSection - SteeringとSpecsの概念説明セクション
 */
export function ConceptSection() {
  return (
    <section id="concepts" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>SteeringとSpecs</h2>
        <p className={styles.subtitle}>
          SDDではSteeringとSpecsという2つの概念でプロジェクト情報を管理します。
        </p>

        {/* 概念カード */}
        <div className={styles.cards}>
          <ConceptCard concept={steeringConcept} />
          <ConceptCard concept={specsConcept} />
        </div>

        {/* 比較表 */}
        <div className={styles.comparison}>
          <h3 className={styles.comparisonTitle}>比較表</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>観点</th>
                  <th className={styles.th}>Steering</th>
                  <th className={styles.th}>Specs</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item) => (
                  <tr key={item.aspect}>
                    <td className={styles.tdAspect}>{item.aspect}</td>
                    <td className={styles.td}>{item.steering}</td>
                    <td className={styles.td}>{item.specs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
