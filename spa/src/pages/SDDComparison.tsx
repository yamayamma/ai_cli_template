import { Link } from 'react-router-dom'
import { comparison, methodologies } from '../data/comparisons'
import { ComparisonChart } from '../components/interactive/ComparisonChart'
import './SDDComparison.css'

export default function SDDComparison() {
  return (
    <div className="page sdd-comparison-page">
      <div className="container">
        <header className="comparison-header">
          <h1>開発手法の比較</h1>
          <p className="comparison-intro">
            SDDと他の開発手法を比較して、それぞれの特徴を理解しましょう。
          </p>
        </header>

        <section className="interactive-chart-section">
          <h2>インタラクティブ比較</h2>
          <p className="section-description">
            バーにホバーすると詳細な説明が表示されます。
          </p>
          <ComparisonChart />
        </section>
        
        <section className="methodologies-section">
          <h2>開発手法の概要</h2>
          <div className="methodology-cards">
            {methodologies.map(method => (
              <div key={method.id} className="methodology-card">
                <h3>{method.name}</h3>
                <p>{method.description}</p>
                <div className="method-tags">
                  {method.bestFor.slice(0, 2).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="comparison-table-section">
          <h2>比較表</h2>
          <div className="table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>比較軸</th>
                  {methodologies.map(m => (
                    <th key={m.id}>{m.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.dimensions.map(dim => (
                  <tr key={dim.name}>
                    <td className="dimension-name">{dim.name}</td>
                    {methodologies.map(m => (
                      <td key={m.id}>{dim.values[m.id]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
        <section className="pros-cons-section">
          <h2>メリット・デメリット</h2>
          <div className="pros-cons-grid">
            {methodologies.map(method => (
              <div key={method.id} className="pros-cons-card">
                <h3>{method.name}</h3>
                <div className="pros">
                  <h4>✅ メリット</h4>
                  <ul>
                    {method.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>⚠️ デメリット</h4>
                  <ul>
                    {method.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <nav className="page-nav">
          <Link to="/sdd/concepts" className="nav-link">
            ← 基本概念
          </Link>
          <Link to="/sdd/benefits" className="nav-link">
            メリット・デメリット →
          </Link>
        </nav>
      </div>
    </div>
  )
}
