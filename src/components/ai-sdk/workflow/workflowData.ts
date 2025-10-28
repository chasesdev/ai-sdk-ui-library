import { Node, Edge } from '@xyflow/react';

export interface WorkflowNodeData {
  label: string;
  description?: string;
  code?: string;
  language?: string;
  icon?: string;
  status?: 'idle' | 'running' | 'success' | 'error';
}

export const initialNodes: Node<WorkflowNodeData>[] = [
  {
    id: 'start',
    type: 'workflow',
    position: { x: 50, y: 200 },
    data: {
      label: 'Start',
      description: 'Initialize workflow',
      code: `async function startWorkflow() {
  const context = await initContext();
  return context;
}`,
      language: 'typescript',
      icon: 'play',
      status: 'success',
    },
  },
  {
    id: 'process',
    type: 'workflow',
    position: { x: 300, y: 200 },
    data: {
      label: 'Process Data',
      description: 'Transform and validate input',
      code: `const processData = (input) => {
  const validated = validate(input);
  return transform(validated);
}`,
      language: 'javascript',
      icon: 'cpu',
      status: 'running',
    },
  },
  {
    id: 'decision',
    type: 'workflow',
    position: { x: 550, y: 200 },
    data: {
      label: 'Decision Point',
      description: 'Check conditions',
      code: `if (result.isValid) {
  return handleSuccess(result);
} else {
  return handleError(result);
}`,
      language: 'typescript',
      icon: 'git-branch',
      status: 'idle',
    },
  },
  {
    id: 'success',
    type: 'workflow',
    position: { x: 750, y: 100 },
    data: {
      label: 'Success Path',
      description: 'Handle successful result',
      code: `async function handleSuccess(data) {
  await saveResult(data);
  await notify('success');
  return { status: 'complete' };
}`,
      language: 'typescript',
      icon: 'check-circle',
      status: 'success',
    },
  },
  {
    id: 'error',
    type: 'workflow',
    position: { x: 750, y: 300 },
    data: {
      label: 'Error Path',
      description: 'Handle errors and retry',
      code: `async function handleError(error) {
  await logError(error);
  if (canRetry(error)) {
    return retry();
  }
  throw error;
}`,
      language: 'typescript',
      icon: 'alert-circle',
      status: 'error',
    },
  },
  {
    id: 'complete',
    type: 'workflow',
    position: { x: 1000, y: 200 },
    data: {
      label: 'Complete',
      description: 'Finalize workflow',
      code: `async function complete() {
  await cleanup();
  return {
    status: 'done',
    timestamp: Date.now()
  };
}`,
      language: 'typescript',
      icon: 'check',
      status: 'idle',
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'start',
    target: 'process',
    type: 'animated',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
  {
    id: 'e2',
    source: 'process',
    target: 'decision',
    type: 'animated',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e3',
    source: 'decision',
    target: 'success',
    sourceHandle: 'success',
    type: 'animated',
    animated: true,
    label: 'Valid',
    style: { stroke: '#10b981', strokeWidth: 2 },
    labelStyle: { fill: '#10b981', fontWeight: 600 },
  },
  {
    id: 'e4',
    source: 'decision',
    target: 'error',
    sourceHandle: 'error',
    type: 'animated',
    animated: true,
    label: 'Invalid',
    style: { stroke: '#ef4444', strokeWidth: 2 },
    labelStyle: { fill: '#ef4444', fontWeight: 600 },
  },
  {
    id: 'e5',
    source: 'success',
    target: 'complete',
    type: 'animated',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
  },
  {
    id: 'e6',
    source: 'error',
    target: 'complete',
    type: 'animated',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
  },
];
