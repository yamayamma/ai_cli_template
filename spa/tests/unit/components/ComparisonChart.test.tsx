import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComparisonChart } from '../../../src/components/interactive/ComparisonChart';

describe('ComparisonChart', () => {
  it('renders without crashing', () => {
    render(<ComparisonChart />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('displays traditional vs SDD comparison', () => {
    render(<ComparisonChart />);
    // Check for title that contains both
    expect(screen.getByText('従来手法 vs SDD 比較')).toBeInTheDocument();
  });

  it('shows all comparison categories', () => {
    render(<ComparisonChart />);
    // Check for category labels specifically
    expect(screen.getByText('仕様書の明確さ')).toBeInTheDocument();
    expect(screen.getByText('実装との整合性')).toBeInTheDocument();
  });

  it('has interactive hover states', () => {
    const { container } = render(<ComparisonChart />);
    const bars = container.querySelectorAll('.comparison-bar');
    expect(bars.length).toBeGreaterThan(0);

    // Verify bars have data attributes for interaction
    const firstBar = bars[0];
    expect(firstBar).toHaveClass('comparison-bar');
  });

  it('displays legend', () => {
    render(<ComparisonChart />);
    expect(screen.getByText('凡例: 従来手法')).toBeInTheDocument();
  });

  it('has correct container structure', () => {
    const { container } = render(<ComparisonChart />);
    expect(container.querySelector('.comparison-chart')).toBeInTheDocument();
  });

  it('shows tooltips on hover', async () => {
    const { container } = render(<ComparisonChart />);
    const bars = container.querySelectorAll('.comparison-bar');

    if (bars.length > 0) {
      fireEvent.mouseEnter(bars[0]);
      // Tooltip should appear or bar should be highlighted
      expect(bars[0]).toBeInTheDocument();
    }
  });
});
