import { Link } from 'react-router-dom';
import { getSectionById } from '../data/sections';
import './SDD.css';

export default function SDD() {
  const section = getSectionById('sdd');

  return (
    <div className="page sdd-page">
      <div className="container">
        <header className="sdd-header">
          <h1>Spec Driven Development</h1>
          <p className="sdd-intro">
            仕様書を起点として開発を進める、AIとの協調による新しい開発アプローチです。
          </p>
        </header>

        <section className="sdd-overview">
          <h2>SDDとは</h2>
          <p>
            Spec Driven Development（SDD）は、仕様書（Specification）を
            開発の中心に据えた開発手法です。従来の開発手法と異なり、
            AIとの協調により、仕様の明確化から実装、検証まで 一貫したプロセスで開発を進めます。
          </p>
        </section>

        <section className="sdd-subsections">
          <h2>詳しく学ぶ</h2>
          <div className="subsection-cards">
            {section?.subsections?.map((sub) => (
              <Link key={sub.id} to={sub.path} className="subsection-card">
                <h3>{sub.title}</h3>
                <p>{getSubsectionDescription(sub.id)}</p>
                <span className="card-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sdd-principles">
          <h2>SDDの基本原則</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <span className="principle-icon">📝</span>
              <h3>仕様ファースト</h3>
              <p>コードを書く前に、まず仕様を明確にします</p>
            </div>
            <div className="principle-card">
              <span className="principle-icon">🤖</span>
              <h3>AI協調</h3>
              <p>AIがプロセス全体をサポートします</p>
            </div>
            <div className="principle-card">
              <span className="principle-icon">🧪</span>
              <h3>テスト駆動</h3>
              <p>仕様からテストを生成し、品質を担保します</p>
            </div>
            <div className="principle-card">
              <span className="principle-icon">🔄</span>
              <h3>継続的改善</h3>
              <p>フィードバックを反映し、仕様を更新します</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function getSubsectionDescription(id: string): string {
  const descriptions: Record<string, string> = {
    concepts: 'SDDの基本的な考え方と原則を理解する',
    comparison: 'アジャイルやウォーターフォールとの違いを比較',
    benefits: 'SDDを採用するメリットとデメリット',
  };
  return descriptions[id] || '';
}
