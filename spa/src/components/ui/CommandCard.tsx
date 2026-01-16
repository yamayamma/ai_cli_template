import { Link } from 'react-router-dom';
import type { Command } from '../../types';
import './CommandCard.css';

export interface CommandCardProps {
  command: Command;
}

export function CommandCard({ command }: CommandCardProps) {
  return (
    <Link to={`/commands/${command.id}`} className="command-card">
      <div className="command-card-header">
        <span className="command-name">{command.name}</span>
        {command.alias && <span className="command-alias">{command.alias}</span>}
      </div>
      <p className="command-description">{command.description}</p>
      <div className="command-meta">
        <span className="command-category">{command.category}</span>
        <span className={`command-step step-${command.step}`}>
          Step {command.step}
        </span>
      </div>
    </Link>
  );
}
