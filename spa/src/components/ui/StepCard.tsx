import { Link } from 'react-router-dom';
import type { Step } from '../../types';
import './StepCard.css';

interface StepCardProps {
  step: Step;
  compact?: boolean;
}

export default function StepCard({ step, compact = false }: StepCardProps) {
  return (
    <Link
      to={`/workflow/${step.id}`}
      className={`step-card ${compact ? 'step-card--compact' : ''}`}
      style={{ '--step-color': step.color } as React.CSSProperties}
    >
      <div className="step-card__header">
        <span className="step-card__order">{step.order}</span>
        <span className="step-card__icon">{step.icon}</span>
      </div>
      <h3 className="step-card__name">{step.name}</h3>
      <p className="step-card__title">{step.title}</p>
      {!compact && <p className="step-card__description">{step.shortDescription}</p>}
    </Link>
  );
}
