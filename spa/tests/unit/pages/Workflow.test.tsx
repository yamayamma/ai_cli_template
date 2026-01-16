import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// This will be replaced with actual import once component exists
const Workflow = () => (
  <div>
    <h1>開発フロー</h1>
    <p>5ステップの開発フローを学びましょう</p>
  </div>
)

describe('Workflow Page', () => {
  it('should render workflow heading', () => {
    render(
      <MemoryRouter>
        <Workflow />
      </MemoryRouter>
    )
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('開発フロー')
  })

  it('should display workflow description', () => {
    render(
      <MemoryRouter>
        <Workflow />
      </MemoryRouter>
    )
    
    expect(screen.getByText(/5ステップの開発フロー/)).toBeInTheDocument()
  })
})
