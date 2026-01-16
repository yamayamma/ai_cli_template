import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Commands from '../../../src/pages/Commands';

describe('Commands Page', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Commands />
      </MemoryRouter>
    );
    expect(screen.getByText('コマンドリファレンス')).toBeInTheDocument();
  });

  it('displays command cards', () => {
    render(
      <MemoryRouter>
        <Commands />
      </MemoryRouter>
    );
    // Should show command cards
    const cards = document.querySelectorAll('.command-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('has a search input', () => {
    render(
      <MemoryRouter>
        <Commands />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/検索/i)).toBeInTheDocument();
  });

  it('displays all main commands', () => {
    render(
      <MemoryRouter>
        <Commands />
      </MemoryRouter>
    );
    expect(screen.getByText('specify')).toBeInTheDocument();
    expect(screen.getByText('clarify')).toBeInTheDocument();
    expect(screen.getByText('plan')).toBeInTheDocument();
  });
});
