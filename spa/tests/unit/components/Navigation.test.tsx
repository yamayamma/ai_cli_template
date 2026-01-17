import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../../../src/components/layout/Navigation';

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('Navigation - Mobile', () => {
  beforeEach(() => {
    mockMatchMedia(true); // Mobile viewport
  });

  it('renders hamburger menu on mobile', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation currentPath="/" />
      </MemoryRouter>
    );
    
    // Should have nav-toggle button (hamburger menu)
    const menuToggle = container.querySelector('.nav-toggle');
    expect(menuToggle).toBeInTheDocument();
  });

  it('toggles mobile menu on click', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation currentPath="/" />
      </MemoryRouter>
    );
    
    const menuButton = container.querySelector('.nav-toggle');
    expect(menuButton).toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton!);
    
    // Menu should have is-open class
    const menu = container.querySelector('.nav-menu.is-open');
    expect(menu).toBeInTheDocument();
  });

  it('closes menu when link is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation currentPath="/" />
      </MemoryRouter>
    );
    
    const menuButton = container.querySelector('.nav-toggle');
    fireEvent.click(menuButton!);
    
    // Menu should be open
    expect(container.querySelector('.nav-menu.is-open')).toBeInTheDocument();
    
    // Click a nav link
    const link = container.querySelector('.nav-link');
    fireEvent.click(link!);
    
    // Menu should close (no longer has is-open class)
    expect(container.querySelector('.nav-menu.is-open')).not.toBeInTheDocument();
  });
});

describe('Navigation - Desktop', () => {
  beforeEach(() => {
    mockMatchMedia(false); // Desktop viewport
  });

  it('shows full navigation on desktop', () => {
    render(
      <MemoryRouter>
        <Navigation currentPath="/" />
      </MemoryRouter>
    );
    
    // Should show nav links - section title from data is "開発フロー"
    expect(screen.getByText('開発フロー')).toBeInTheDocument();
  });

  it('navigation links are visible', () => {
    render(
      <MemoryRouter>
        <Navigation currentPath="/sdd" />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Spec Driven Development')).toBeInTheDocument();
    expect(screen.getByText('コマンドリファレンス')).toBeInTheDocument();
  });
});
