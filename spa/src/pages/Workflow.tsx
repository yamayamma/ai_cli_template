import { steps } from '../data/steps'
import StepCard from '../components/ui/StepCard'
import './Workflow.css'

export default function Workflow() {
  return (
    <div className="page workflow-page">
      <div className="container">
        <header className="workflow-header">
          <h1>開発フロー</h1>
          <p className="workflow-intro">
            SpecKitは5つのステップで構成される開発フローを提供します。
            各ステップは順番に実行され、仕様の作成から検証まで一貫したプロセスで開発を進めます。
          </p>
        </header>
        
        <section className="workflow-steps">
          <div className="steps-grid">
            {steps.map(step => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </section>
        
        <section className="workflow-overview">
          <h2>フローの概要</h2>
          <div className="flow-diagram-placeholder">
            <p>インタラクティブなフロー図がここに表示されます</p>
          </div>
        </section>
      </div>
    </div>
  )
}
