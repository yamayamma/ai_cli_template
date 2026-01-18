import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

// Placeholder - will be replaced with actual import
const SDD = () => (
  <div>
    <h1>Spec Driven Development</h1>
    <p>SDDの概念を学びましょう</p>
  </div>
);

describe('SDD Page', () => {
  it('should render SDD heading', () => {
    render(
      <MemoryRouter>
        <SDD />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Spec Driven Development');
  });

  it('should display SDD description', () => {
    render(
      <MemoryRouter>
        <SDD />
      </MemoryRouter>
    );

    expect(screen.getByText(/SDDの概念/)).toBeInTheDocument();
  });
});
