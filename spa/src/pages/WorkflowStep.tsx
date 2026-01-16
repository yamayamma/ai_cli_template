import { useParams, Link, Navigate } from 'react-router-dom'
import { getStepById, steps } from '../data/steps'
import { getCommandById } from '../data/commands'
import './WorkflowStep.css'

export default function WorkflowStep() {
  const { stepId } = useParams<{ stepId: string }>()
  const step = stepId ? getStepById(stepId) : undefined
  
  if (!step) {
    return <Navigate to="/workflow" replace />
  }
  
  const prevStep = step.previousStep ? getStepById(step.previousStep) : undefined
  const nextStep = step.nextStep ? getStepById(step.nextStep) : undefined
  const relatedCommands = step.relatedCommands.map(id => getCommandById(id)).filter(Boolean)
  
  return (
    <div className="page workflow-step-page">
      <div className="container">
        <header 
          className="step-header"
          style={{ '--step-color': step.color } as React.CSSProperties}
        >
          <div className="step-badge">
            <span className="step-order">Step {step.order}</span>
            <span className="step-icon">{step.icon}</span>
          </div>
          <h1>{step.name}</h1>
          <p className="step-title">{step.title}</p>
        </header>
        
        <section className="step-content">
          <p className="step-description">{step.description}</p>
          
          {step.examples.length > 0 && (
            <div className="step-examples">
              <h2>使用例</h2>
              {step.examples.map((example, index) => (
                <div key={index} className="example-card">
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                  {example.codeSnippet && (
                    <pre className="code-block">
                      <code>{example.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {relatedCommands.length > 0 && (
            <div className="related-commands">
              <h2>関連コマンド</h2>
              <ul className="command-list">
                {relatedCommands.map(command => command && (
                  <li key={command.id}>
                    <Link to={`/commands/${command.id}`} className="command-link">
                      <code>{command.name}</code>
                      <span>{command.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        
        <nav className="step-navigation">
          {prevStep ? (
            <Link to={`/workflow/${prevStep.id}`} className="nav-button nav-prev">
              <span className="nav-label">前へ</span>
              <span className="nav-step">{prevStep.icon} {prevStep.name}</span>
            </Link>
          ) : (
            <div />
          )}
          
          {nextStep ? (
            <Link to={`/workflow/${nextStep.id}`} className="nav-button nav-next">
              <span className="nav-label">次へ</span>
              <span className="nav-step">{nextStep.name} {nextStep.icon}</span>
            </Link>
          ) : (
            <Link to="/workflow" className="nav-button nav-next">
              <span className="nav-label">完了</span>
              <span className="nav-step">フロー一覧へ</span>
            </Link>
          )}
        </nav>
        
        <div className="step-progress">
          {steps.map(s => (
            <Link
              key={s.id}
              to={`/workflow/${s.id}`}
              className={`progress-dot ${s.id === step.id ? 'active' : ''}`}
              style={{ backgroundColor: s.id === step.id ? step.color : undefined }}
              title={s.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
