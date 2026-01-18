import { useNavigate } from 'react-router-dom';
import { FlowDiagram } from '../components/interactive/FlowDiagram';
import StepCard from '../components/ui/StepCard';
import { steps } from '../data/steps';
import './Workflow.css';

export default function Workflow() {
  const navigate = useNavigate();

  const handleNodeClick = (nodeId: string) => {
    // Extract step number from node ID (e.g., 'step-1' -> 'step1')
    const stepId = nodeId.replace('-', '');
    navigate(`/workflow/${stepId}`);
  };

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
            {steps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </section>

        <section className="workflow-overview">
          <h2>フローの概要</h2>
          <p className="section-description">各ステップをクリックすると詳細ページに移動します。</p>
          <FlowDiagram
            variant="workflow"
            showControls
            onNodeClick={handleNodeClick}
            className="large"
          />
        </section>
      </div>
    </div>
  );
}
