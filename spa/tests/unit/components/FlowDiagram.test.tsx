import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FlowDiagram } from '../../../src/components/interactive/FlowDiagram';

// Mock @xyflow/react
vi.mock('@xyflow/react', () => ({
  ReactFlow: ({
    nodes,
    edges,
    children,
  }: { nodes: unknown[]; edges: unknown[]; children?: React.ReactNode }) => (
    <div data-testid="react-flow" data-nodes={nodes.length} data-edges={edges.length}>
      {children}
    </div>
  ),
  Background: () => <div data-testid="react-flow-background" />,
  Controls: () => <div data-testid="react-flow-controls" />,
  MiniMap: () => <div data-testid="react-flow-minimap" />,
  Handle: ({ type, position }: { type: string; position: string }) => (
    <div data-testid={`handle-${type}-${position}`} />
  ),
  Position: {
    Top: 'top',
    Bottom: 'bottom',
    Left: 'left',
    Right: 'right',
  },
  useNodesState: (initialNodes: unknown[]) => [initialNodes, vi.fn()],
  useEdgesState: (initialEdges: unknown[]) => [initialEdges, vi.fn()],
}));

describe('FlowDiagram', () => {
  it('renders without crashing', () => {
    render(<FlowDiagram variant="workflow" />);
    expect(screen.getByTestId('react-flow')).toBeInTheDocument();
  });

  it('renders workflow diagram with correct number of nodes', () => {
    render(<FlowDiagram variant="workflow" />);
    const flow = screen.getByTestId('react-flow');
    // Workflow has 5 steps
    expect(Number(flow.getAttribute('data-nodes'))).toBeGreaterThanOrEqual(5);
  });

  it('renders sdd diagram variant', () => {
    render(<FlowDiagram variant="sdd" />);
    expect(screen.getByTestId('react-flow')).toBeInTheDocument();
  });

  it('renders controls when showControls is true', () => {
    render(<FlowDiagram variant="workflow" showControls />);
    expect(screen.getByTestId('react-flow-controls')).toBeInTheDocument();
  });

  it('renders minimap when showMinimap is true', () => {
    render(<FlowDiagram variant="workflow" showMinimap />);
    expect(screen.getByTestId('react-flow-minimap')).toBeInTheDocument();
  });

  it('has correct container class', () => {
    const { container } = render(<FlowDiagram variant="workflow" />);
    expect(container.querySelector('.flow-diagram-container')).toBeInTheDocument();
  });
});
