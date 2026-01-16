import type { ReactNode } from 'react';
import { useState } from 'react';
import './Tooltip.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  multiline?: boolean;
  delay?: number;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  multiline = false,
  delay = 0,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const handleMouseEnter = () => {
    if (delay > 0) {
      const id = window.setTimeout(() => setVisible(true), delay);
      setTimeoutId(id);
    } else {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setVisible(false);
  };

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <div
        className={`tooltip-content ${position} ${multiline ? 'multiline' : ''} ${visible ? 'visible' : ''}`}
        role="tooltip"
        aria-hidden={!visible}
      >
        {content}
      </div>
    </div>
  );
}
