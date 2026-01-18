import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

// Placeholder - will be replaced with actual import
const SDDComparison = () => (
  <div>
    <h1>開発手法の比較</h1>
    <p>SDDと他の開発手法を比較</p>
  </div>
);

describe('SDDComparison Page', () => {
  it('should render comparison heading', () => {
    render(
      <MemoryRouter>
        <SDDComparison />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('開発手法の比較');
  });

  it('should display comparison info', () => {
    render(
      <MemoryRouter>
        <SDDComparison />
      </MemoryRouter>
    );

    expect(screen.getByText(/他の開発手法/)).toBeInTheDocument();
  });
});
