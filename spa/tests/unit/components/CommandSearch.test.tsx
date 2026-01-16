import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandSearch } from '../../../src/components/interactive/CommandSearch';

describe('CommandSearch', () => {
  it('renders search input', () => {
    render(<CommandSearch onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/検索/i)).toBeInTheDocument();
  });

  it('calls onSearch when typing', () => {
    const onSearch = vi.fn();
    render(<CommandSearch onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText(/検索/i);
    fireEvent.change(input, { target: { value: 'spec' } });
    
    expect(onSearch).toHaveBeenCalledWith('spec');
  });

  it('shows clear button when input has value', () => {
    render(<CommandSearch onSearch={vi.fn()} initialValue="test" />);
    expect(screen.getByRole('button', { name: /クリア/i })).toBeInTheDocument();
  });

  it('clears input when clear button clicked', () => {
    const onSearch = vi.fn();
    render(<CommandSearch onSearch={onSearch} initialValue="test" />);
    
    const clearButton = screen.getByRole('button', { name: /クリア/i });
    fireEvent.click(clearButton);
    
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('has correct placeholder text', () => {
    render(<CommandSearch onSearch={vi.fn()} placeholder="カスタム検索" />);
    expect(screen.getByPlaceholderText('カスタム検索')).toBeInTheDocument();
  });
});
