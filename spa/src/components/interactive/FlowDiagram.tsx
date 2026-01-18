import {
  Background,
  Controls,
  type Edge,
  Handle,
  MiniMap,
  type Node,
  type NodeTypes,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback, useMemo } from 'react';
import '@xyflow/react/dist/style.css';
import './FlowDiagram.css';

export type FlowVariant = 'workflow' | 'sdd';

export interface FlowDiagramProps {
  variant: FlowVariant;
  showControls?: boolean;
  showMinimap?: boolean;
  onNodeClick?: (nodeId: string) => void;
  className?: string;
}

interface CustomNodeData {
  label: string;
  description?: string;
  variant?: string;
}

function CustomNode({ data }: { data: CustomNodeData }) {
  return (
    <div className={`custom-node ${data.variant || ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-label">{data.label}</div>
      {data.description && <div className="node-description">{data.description}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const workflowNodes: Node[] = [
  {
    id: 'step-1',
    type: 'custom',
    position: { x: 250, y: 0 },
    data: { label: '1. Spec', description: '仕様を定義', variant: 'step-1' },
  },
  {
    id: 'step-2',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { label: '2. Research', description: '調査・分析', variant: 'step-2' },
  },
  {
    id: 'step-3',
    type: 'custom',
    position: { x: 250, y: 200 },
    data: { label: '3. Plan', description: '技術計画', variant: 'step-3' },
  },
  {
    id: 'step-4',
    type: 'custom',
    position: { x: 250, y: 300 },
    data: { label: '4. Tasks', description: 'タスク分解', variant: 'step-4' },
  },
  {
    id: 'step-5',
    type: 'custom',
    position: { x: 250, y: 400 },
    data: { label: '5. Implement', description: '実装', variant: 'step-5' },
  },
];

const workflowEdges: Edge[] = [
  { id: 'e1-2', source: 'step-1', target: 'step-2', animated: true },
  { id: 'e2-3', source: 'step-2', target: 'step-3', animated: true },
  { id: 'e3-4', source: 'step-3', target: 'step-4', animated: true },
  { id: 'e4-5', source: 'step-4', target: 'step-5', animated: true },
];

const sddNodes: Node[] = [
  {
    id: 'sdd-spec',
    type: 'custom',
    position: { x: 250, y: 0 },
    data: { label: 'Specification', description: '仕様を定義', variant: 'sdd-spec' },
  },
  {
    id: 'sdd-test',
    type: 'custom',
    position: { x: 400, y: 120 },
    data: { label: 'Test', description: 'テスト作成', variant: 'sdd-test' },
  },
  {
    id: 'sdd-impl',
    type: 'custom',
    position: { x: 250, y: 240 },
    data: { label: 'Implementation', description: '実装', variant: 'sdd-impl' },
  },
  {
    id: 'sdd-refactor',
    type: 'custom',
    position: { x: 100, y: 120 },
    data: { label: 'Refactor', description: 'リファクタリング', variant: 'sdd-refactor' },
  },
];

const sddEdges: Edge[] = [
  { id: 'e-spec-test', source: 'sdd-spec', target: 'sdd-test', animated: true },
  { id: 'e-test-impl', source: 'sdd-test', target: 'sdd-impl', animated: true },
  { id: 'e-impl-refactor', source: 'sdd-impl', target: 'sdd-refactor', animated: true },
  { id: 'e-refactor-spec', source: 'sdd-refactor', target: 'sdd-spec', animated: true },
];

export function FlowDiagram({
  variant,
  showControls = false,
  showMinimap = false,
  onNodeClick,
  className = '',
}: FlowDiagramProps) {
  const initialNodes = useMemo(
    () => (variant === 'workflow' ? workflowNodes : sddNodes),
    [variant]
  );

  const initialEdges = useMemo(
    () => (variant === 'workflow' ? workflowEdges : sddEdges),
    [variant]
  );

  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node.id);
      }
    },
    [onNodeClick]
  );

  return (
    <div className={`flow-diagram-container ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        panOnScroll
        zoomOnScroll
        preventScrolling={false}
      >
        <Background color="var(--border-subtle)" gap={20} />
        {showControls && <Controls />}
        {showMinimap && (
          <MiniMap
            nodeColor={(node) => {
              const variant = (node.data as unknown as CustomNodeData).variant ?? '';
              if (variant.includes('step')) return '#4A90D9';
              if (variant.includes('sdd')) return '#22c55e';
              return '#71717a';
            }}
          />
        )}
      </ReactFlow>
    </div>
  );
}
