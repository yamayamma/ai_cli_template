import { Link } from 'react-router-dom'
import { sections } from '../data/sections'
import { steps } from '../data/steps'
import StepCard from '../components/ui/StepCard'
import './Home.css'

export default function Home() {
  const workflowSection = sections.find(s => s.id === 'workflow')
  const sddSection = sections.find(s => s.id === 'sdd')
  const commandsSection = sections.find(s => s.id === 'commands')
  
  return (
    <div className="page home-page">
      <div className="container">
        <header className="hero">
          <h1>SpecKit Documentation</h1>
          <p className="hero-subtitle">
            AIと協調して開発を進める、Spec Driven Development（SDD）のためのツールキット
          </p>
          <div className="hero-cta">
            <Link to="/workflow" className="btn btn-primary">
              開発フローを学ぶ
            </Link>
            <Link to="/sdd" className="btn btn-secondary">
              SDDとは？
            </Link>
          </div>
        </header>
        
        <section className="learning-path">
          <h2>学習パス</h2>
          <p className="section-intro">
            SpecKitを効果的に使うための推奨学習順序です。
          </p>
          
          <div className="path-cards">
            <div className="path-card">
              <span className="path-number">1</span>
              <h3>{workflowSection?.title}</h3>
              <p>5ステップの開発フローを理解する</p>
              <Link to="/workflow" className="path-link">
                はじめる →
              </Link>
            </div>
            
            <div className="path-card">
              <span className="path-number">2</span>
              <h3>{sddSection?.title}</h3>
              <p>SDDの概念と従来手法との違いを学ぶ</p>
              <Link to="/sdd" className="path-link">
                学ぶ →
              </Link>
            </div>
            
            <div className="path-card">
              <span className="path-number">3</span>
              <h3>{commandsSection?.title}</h3>
              <p>各コマンドの使い方を確認する</p>
              <Link to="/commands" className="path-link">
                参照する →
              </Link>
            </div>
          </div>
        </section>
        
        <section className="workflow-preview">
          <h2>開発フローの5ステップ</h2>
          <p className="section-intro">
            SpecKitの中核となる5つのステップを紹介します。
          </p>
          <div className="steps-preview">
            {steps.slice(0, 3).map(step => (
              <StepCard key={step.id} step={step} compact />
            ))}
          </div>
          <Link to="/workflow" className="view-all-link">
            すべてのステップを見る →
          </Link>
        </section>
      </div>
    </div>
  )
}
