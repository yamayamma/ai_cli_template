import { Link } from 'react-router-dom';
import './SDDConcepts.css';

export default function SDDConcepts() {
  return (
    <div className="page sdd-concepts-page">
      <div className="container">
        <header className="concepts-header">
          <h1>SDDの基本概念</h1>
          <p className="concepts-intro">
            Spec Driven Developmentの核となる考え方を理解しましょう。
          </p>
        </header>

        <section className="concept-section">
          <h2>仕様駆動とは</h2>
          <p>
            仕様駆動（Specification-Driven）とは、開発プロセスの起点を
            仕様書に置くアプローチです。コードを書く前に、何を作るかを 明確に定義します。
          </p>
          <div className="concept-highlight">
            <strong>ポイント:</strong> 「何を作るか」を先に決め、 「どう作るか」は後から考える
          </div>
        </section>

        <section className="concept-section">
          <h2>AIとの協調</h2>
          <p>
            SDDでは、AIが開発プロセス全体をサポートします。
            仕様の作成、曖昧点の特定、計画の立案、コードの実装、
            テストの生成など、各ステップでAIが効率的に支援します。
          </p>
          <ul className="concept-list">
            <li>仕様書のテンプレート生成</li>
            <li>要件の曖昧点を質問形式で特定</li>
            <li>技術選定と実装計画の提案</li>
            <li>TDDによるコード実装</li>
            <li>テストケースの自動生成</li>
          </ul>
        </section>

        <section className="concept-section">
          <h2>テスト駆動開発（TDD）</h2>
          <p>
            SDDはTDD（Test-Driven Development）を重視します。
            仕様からテストケースを生成し、テストをパスするコードを
            実装することで、品質を担保します。
          </p>
          <div className="tdd-cycle">
            <div className="tdd-step tdd-red">
              <span className="step-num">1</span>
              <strong>Red</strong>
              <p>失敗するテストを書く</p>
            </div>
            <div className="tdd-step tdd-green">
              <span className="step-num">2</span>
              <strong>Green</strong>
              <p>テストをパスするコードを書く</p>
            </div>
            <div className="tdd-step tdd-refactor">
              <span className="step-num">3</span>
              <strong>Refactor</strong>
              <p>コードを改善する</p>
            </div>
          </div>
        </section>

        <nav className="page-nav">
          <Link to="/sdd" className="nav-link">
            ← SDDトップへ
          </Link>
          <Link to="/sdd/comparison" className="nav-link">
            他手法との比較 →
          </Link>
        </nav>
      </div>
    </div>
  );
}
