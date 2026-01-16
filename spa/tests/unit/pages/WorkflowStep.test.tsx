import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// This will be replaced with actual import once component exists
const WorkflowStep = ({ stepId }: { stepId: string }) => (
  <div>
    <h1>{stepId}</h1>
    <p>Step description</p>
  </div>
)

describe('WorkflowStep Page', () => {
  it('should render step heading', () => {
    render(
      <MemoryRouter>
        <WorkflowStep stepId="specify" />
      </MemoryRouter>
    )
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('specify')
  })

  it('should display step content', () => {
    render(
      <MemoryRouter>
        <WorkflowStep stepId="clarify" />
      </MemoryRouter>
    )
    
    expect(screen.getByText(/Step description/)).toBeInTheDocument()
  })
})
