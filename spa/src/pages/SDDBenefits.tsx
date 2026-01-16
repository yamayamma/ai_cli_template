import { Link } from 'react-router-dom'
import { getMethodologyById } from '../data/comparisons'
import './SDDBenefits.css'

export default function SDDBenefits() {
  const sdd = getMethodologyById('sdd')
  
  return (
    <div className="page sdd-benefits-page">
      <div className="container">
        <header className="benefits-header">
          <h1>SDDのメリット・デメリット</h1>
          <p className="benefits-intro">
            SDDを採用する際に考慮すべきポイントを解説します。
          </p>
        </header>
        
        <section className="benefits-section">
          <h2>✅ メリット</h2>
          <div className="benefit-cards">
            {sdd?.pros.map((pro, index) => (
              <div key={index} className="benefit-card benefit-pro">
                <span className="benefit-number">{index + 1}</span>
                <p>{pro}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="drawbacks-section">
          <h2>⚠️ デメリット・注意点</h2>
          <div className="benefit-cards">
            {sdd?.cons.map((con, index) => (
              <div key={index} className="benefit-card benefit-con">
                <span className="benefit-number">{index + 1}</span>
                <p>{con}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="best-for-section">
          <h2>SDDが適しているプロジェクト</h2>
          <div className="best-for-list">
            {sdd?.bestFor.map((item, index) => (
              <div key={index} className="best-for-item">
                <span className="check-icon">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="when-to-use">
          <h2>SDDを選ぶべきとき</h2>
          <div className="scenarios">
            <div className="scenario">
              <h3>👍 採用を検討すべきケース</h3>
              <ul>
                <li>複雑な要件を持つプロジェクト</li>
                <li>長期的な保守が必要なシステム</li>
                <li>品質と信頼性が重要な場合</li>
                <li>AIツールを活用できる環境</li>
              </ul>
            </div>
            <div className="scenario">
              <h3>👎 他の手法を検討すべきケース</h3>
              <ul>
                <li>非常に小規模なプロジェクト</li>
                <li>プロトタイプや実験的な開発</li>
                <li>要件が頻繁に変わる初期段階</li>
                <li>学習コストをかけられない場合</li>
              </ul>
            </div>
          </div>
        </section>
        
        <nav className="page-nav">
          <Link to="/sdd/comparison" className="nav-link">
            ← 他手法との比較
          </Link>
          <Link to="/workflow" className="nav-link">
            開発フローを学ぶ →
          </Link>
        </nav>
      </div>
    </div>
  )
}
