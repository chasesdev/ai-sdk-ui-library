import type { Meta, StoryObj } from '@storybook/nextjs';
import WorkflowPlanner from './WorkflowPlanner';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './workflow.css';
import CustomNode from './CustomNode';
import AnimatedEdge from './AnimatedEdge';
import { WorkflowNodeData } from './workflowData';

const meta: Meta<typeof WorkflowPlanner> = {
  title: 'AI SDK/Graph & Visualization/WorkflowPlanner',
  component: WorkflowPlanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive workflow visualization component built with ReactFlow. Features animated edges, drag-and-drop nodes, lock/unlock editing, and rich node content with syntax-highlighted code.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const nodeTypes = {
  workflow: CustomNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

/**
 * Default interactive workflow with 6 nodes showing a complete process flow
 * Features: lock/unlock toggle, drag & drop, animated edges with flowing dots
 */
export const Default: Story = {
  render: () => (
    <div className="h-screen p-8">
      <WorkflowPlanner />
    </div>
  )
};

/**
 * Demonstration of all node status states: idle, running, success, error
 * Shows visual indicators for each status with appropriate colors
 */
export const NodeStatusStates: Story = {
  render: () => {
    const nodes: Node<WorkflowNodeData>[] = [
      {
        id: 'idle-node',
        type: 'workflow',
        position: { x: 50, y: 100 },
        data: {
          label: 'Idle State',
          description: 'Waiting to execute',
          code: `const task = () => {
  // Not yet started
  return { status: 'idle' };
}`,
          language: 'typescript',
          icon: 'circle',
          status: 'idle',
        },
      },
      {
        id: 'running-node',
        type: 'workflow',
        position: { x: 300, y: 100 },
        data: {
          label: 'Running State',
          description: 'Currently processing',
          code: `const task = async () => {
  // Processing...
  await processData();
  return { status: 'running' };
}`,
          language: 'typescript',
          icon: 'cpu',
          status: 'running',
        },
      },
      {
        id: 'success-node',
        type: 'workflow',
        position: { x: 550, y: 100 },
        data: {
          label: 'Success State',
          description: 'Completed successfully',
          code: `const task = async () => {
  const result = await execute();
  return {
    status: 'success',
    data: result
  };
}`,
          language: 'typescript',
          icon: 'check-circle',
          status: 'success',
        },
      },
      {
        id: 'error-node',
        type: 'workflow',
        position: { x: 800, y: 100 },
        data: {
          label: 'Error State',
          description: 'Failed with error',
          code: `const task = async () => {
  try {
    await riskyOperation();
  } catch (error) {
    return {
      status: 'error',
      error
    };
  }
}`,
          language: 'typescript',
          icon: 'alert-circle',
          status: 'error',
        },
      },
    ];

    const edges: Edge[] = [
      { id: 'e1', source: 'idle-node', target: 'running-node', type: 'animated', animated: true, style: { stroke: '#6b7280', strokeWidth: 2 } },
      { id: 'e2', source: 'running-node', target: 'success-node', type: 'animated', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'e3', source: 'running-node', target: 'error-node', type: 'animated', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
    ];

    return (
      <div className="h-screen p-8">
        <div className="h-full">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              className="bg-gray-50 dark:bg-gray-900"
            >
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    );
  }
};

/**
 * Examples of different workflow patterns: linear, branching, and cyclic
 */
export const WorkflowPatterns: Story = {
  render: () => {
    const nodes: Node<WorkflowNodeData>[] = [
      // Linear workflow
      {
        id: 'linear-1',
        type: 'workflow',
        position: { x: 50, y: 50 },
        data: { label: 'Step 1', description: 'Linear workflow', icon: 'play', status: 'success' },
      },
      {
        id: 'linear-2',
        type: 'workflow',
        position: { x: 250, y: 50 },
        data: { label: 'Step 2', description: 'Sequential process', icon: 'cpu', status: 'running' },
      },
      {
        id: 'linear-3',
        type: 'workflow',
        position: { x: 450, y: 50 },
        data: { label: 'Step 3', description: 'Final step', icon: 'check', status: 'idle' },
      },

      // Branching workflow
      {
        id: 'branch-start',
        type: 'workflow',
        position: { x: 50, y: 250 },
        data: { label: 'Start', description: 'Branching workflow', icon: 'play', status: 'success' },
      },
      {
        id: 'branch-decision',
        type: 'workflow',
        position: { x: 250, y: 250 },
        data: { label: 'Branch', description: 'Decision point', icon: 'git-branch', status: 'idle' },
      },
      {
        id: 'branch-a',
        type: 'workflow',
        position: { x: 450, y: 180 },
        data: { label: 'Path A', description: 'Success path', icon: 'check-circle', status: 'success' },
      },
      {
        id: 'branch-b',
        type: 'workflow',
        position: { x: 450, y: 320 },
        data: { label: 'Path B', description: 'Error path', icon: 'alert-circle', status: 'error' },
      },

      // Cyclic workflow
      {
        id: 'cycle-1',
        type: 'workflow',
        position: { x: 700, y: 200 },
        data: { label: 'Process', description: 'Cyclic workflow', icon: 'cpu', status: 'running' },
      },
      {
        id: 'cycle-2',
        type: 'workflow',
        position: { x: 900, y: 200 },
        data: { label: 'Validate', description: 'Check & retry', icon: 'git-branch', status: 'idle' },
      },
    ];

    const edges: Edge[] = [
      // Linear
      { id: 'l1', source: 'linear-1', target: 'linear-2', type: 'animated', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
      { id: 'l2', source: 'linear-2', target: 'linear-3', type: 'animated', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },

      // Branching
      { id: 'b1', source: 'branch-start', target: 'branch-decision', type: 'animated', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
      { id: 'b2', source: 'branch-decision', target: 'branch-a', type: 'animated', animated: true, label: 'Success', style: { stroke: '#10b981', strokeWidth: 2 } },
      { id: 'b3', source: 'branch-decision', target: 'branch-b', type: 'animated', animated: true, label: 'Error', style: { stroke: '#ef4444', strokeWidth: 2 } },

      // Cyclic (with loop back)
      { id: 'c1', source: 'cycle-1', target: 'cycle-2', type: 'animated', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
      { id: 'c2', source: 'cycle-2', target: 'cycle-1', type: 'animated', animated: true, label: 'Retry', style: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '5,5' } },
    ];

    return (
      <div className="h-screen p-8">
        <div className="h-full">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              className="bg-gray-50 dark:bg-gray-900"
            >
              <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
              <Controls />
              <MiniMap />
              <Panel position="top-left" className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-sm font-semibold mb-2">Workflow Patterns</h3>
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• <strong>Linear:</strong> Top row - sequential steps</li>
                  <li>• <strong>Branching:</strong> Middle row - conditional paths</li>
                  <li>• <strong>Cyclic:</strong> Right side - loop with retry</li>
                </ul>
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    );
  }
};

/**
 * Styling variations: custom colors, compact size, dark mode compatibility
 */
export const StylingVariants: Story = {
  render: () => {
    const nodes: Node<WorkflowNodeData>[] = [
      {
        id: 'compact-1',
        type: 'workflow',
        position: { x: 50, y: 100 },
        data: {
          label: 'Compact',
          description: 'Smaller node',
          code: `// Compact view`,
          language: 'typescript',
          icon: 'circle',
          status: 'success',
        },
      },
      {
        id: 'custom-color-1',
        type: 'workflow',
        position: { x: 300, y: 100 },
        data: {
          label: 'Custom Style',
          description: 'Custom colors',
          code: `// Custom theming
const theme = {
  primary: '#06b6d4',
  bg: 'cyan'
}`,
          language: 'typescript',
          icon: 'cpu',
          status: 'running',
        },
      },
      {
        id: 'detailed-1',
        type: 'workflow',
        position: { x: 550, y: 100 },
        data: {
          label: 'Detailed Node',
          description: 'More code content',
          code: `async function processWorkflow() {
  const data = await fetchData();
  const validated = validate(data);
  const transformed = transform(validated);
  await save(transformed);
  return { success: true };
}`,
          language: 'typescript',
          icon: 'check-circle',
          status: 'success',
        },
      },
    ];

    const edges: Edge[] = [
      {
        id: 'e1',
        source: 'compact-1',
        target: 'custom-color-1',
        type: 'animated',
        animated: true,
        style: { stroke: '#06b6d4', strokeWidth: 3 }
      },
      {
        id: 'e2',
        source: 'custom-color-1',
        target: 'detailed-1',
        type: 'animated',
        animated: true,
        style: { stroke: '#8b5cf6', strokeWidth: 3 }
      },
    ];

    return (
      <div className="h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="h-full">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              fitViewOptions={{ padding: 0.3 }}
              className="bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-2xl"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={2}
                className="opacity-50"
              />
              <Controls className="!bg-white/90 dark:!bg-gray-800/90 !border-purple-200 dark:!border-purple-700 !shadow-2xl" />
              <MiniMap
                className="!bg-white/90 dark:!bg-gray-800/90 !border-purple-200 dark:!border-purple-700 !shadow-2xl"
                nodeColor={(node) => {
                  switch (node.data.status) {
                    case 'success': return '#06b6d4';
                    case 'running': return '#8b5cf6';
                    default: return '#6b7280';
                  }
                }}
              />
              <Panel position="top-center" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl">
                <span className="text-sm font-semibold">Custom Styled Workflow</span>
              </Panel>
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    );
  }
};
