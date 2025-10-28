'use client';

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './workflow.css';

import CustomNode from './CustomNode';
import AnimatedEdge from './AnimatedEdge';
import { initialNodes, initialEdges } from './workflowData';
import { Lock, Unlock } from 'lucide-react';

const nodeTypes = {
  workflow: CustomNode,
};

const edgeTypes = {
  animated: AnimatedEdge,
};

interface WorkflowPlannerProps {
  className?: string;
}

const WorkflowPlanner: React.FC<WorkflowPlannerProps> = ({ className = '' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isLocked, setIsLocked] = useState(false);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isLocked) {
        const newEdge = {
          ...connection,
          type: 'animated',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [setEdges, isLocked]
  );

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className={`workflow-planner ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={isLocked ? undefined : onNodesChange}
        onEdgesChange={isLocked ? undefined : onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.5,
        }}
        nodesDraggable={!isLocked}
        nodesConnectable={!isLocked}
        elementsSelectable={!isLocked}
        defaultEdgeOptions={{
          type: 'animated',
          animated: true,
        }}
        className="bg-gray-50 dark:bg-gray-900"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          className="bg-gray-50 dark:bg-gray-900"
        />
        <Controls
          showZoom
          showFitView
          showInteractive={false}
          className="!bg-white dark:!bg-gray-800 !border-gray-200 dark:!border-gray-700 !shadow-lg"
        />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            switch (node.data.status) {
              case 'success':
                return '#10b981';
              case 'error':
                return '#ef4444';
              case 'running':
                return '#3b82f6';
              default:
                return '#6b7280';
            }
          }}
          className="!bg-white dark:!bg-gray-800 !border-gray-200 dark:!border-gray-700 !shadow-lg"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        <Panel position="top-right" className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <button
            onClick={toggleLock}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={isLocked ? 'Unlock editing' : 'Lock editing'}
          >
            {isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="text-gray-700 dark:text-gray-300">Locked</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span className="text-gray-700 dark:text-gray-300">Unlocked</span>
              </>
            )}
          </button>
        </Panel>
      </ReactFlow>
      <div className="workflow-info mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-900 dark:text-gray-100">Interactive Workflow:</strong>{' '}
          {isLocked ? (
            'Click the unlock button to enable editing. '
          ) : (
            'Drag nodes to reposition, connect handles to create edges, or click the lock button to prevent changes. '
          )}
          Use the controls to zoom and navigate the workflow diagram.
        </p>
      </div>
    </div>
  );
};

export default WorkflowPlanner;
