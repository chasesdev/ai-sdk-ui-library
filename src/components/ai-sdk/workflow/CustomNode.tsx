'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Play,
  Cpu,
  GitBranch,
  CheckCircle,
  AlertCircle,
  Check,
  LucideIcon
} from 'lucide-react';
import { WorkflowNodeData } from './workflowData';

const iconMap: Record<string, LucideIcon> = {
  play: Play,
  cpu: Cpu,
  'git-branch': GitBranch,
  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  check: Check,
};

const statusColors = {
  idle: 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600',
  running: 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-600',
  success: 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-600',
  error: 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-600',
};

const statusIconColors = {
  idle: 'text-gray-600 dark:text-gray-400',
  running: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
};

const CustomNode = memo(({ data, selected }: NodeProps<WorkflowNodeData>) => {
  const Icon = data.icon ? iconMap[data.icon] : Cpu;
  const status = data.status || 'idle';

  return (
    <div
      className={`
        relative rounded-lg border-2 bg-white dark:bg-gray-950 shadow-lg
        transition-all duration-200 min-w-[280px] max-w-[320px]
        ${selected ? 'ring-2 ring-primary ring-offset-2' : ''}
        ${statusColors[status]}
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-900"
      />

      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          ${status === 'idle' && 'bg-gray-200 dark:bg-gray-700'}
          ${status === 'running' && 'bg-blue-200 dark:bg-blue-800'}
          ${status === 'success' && 'bg-green-200 dark:bg-green-800'}
          ${status === 'error' && 'bg-red-200 dark:bg-red-800'}
        `}>
          <Icon className={`w-5 h-5 ${statusIconColors[status]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
            {data.label}
          </h3>
          {data.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {data.description}
            </p>
          )}
        </div>
        {status === 'running' && (
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse [animation-delay:200ms]" />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse [animation-delay:400ms]" />
          </div>
        )}
      </div>

      {/* Code Content */}
      {data.code && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900/50">
          <div className="rounded overflow-hidden text-xs">
            <SyntaxHighlighter
              language={data.language || 'javascript'}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '0.75rem',
                fontSize: '0.7rem',
                lineHeight: '1.4',
                maxHeight: '120px',
                overflow: 'auto',
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                }
              }}
            >
              {data.code.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Output Handles for Decision Nodes */}
      {data.icon === 'git-branch' && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="success"
            className="!w-3 !h-3 !bg-green-500 !border-2 !border-white dark:!border-gray-900 !top-[35%]"
          />
          <Handle
            type="source"
            position={Position.Right}
            id="error"
            className="!w-3 !h-3 !bg-red-500 !border-2 !border-white dark:!border-gray-900 !top-[65%]"
          />
        </>
      )}

      {/* Default Output Handle */}
      {data.icon !== 'git-branch' && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-primary !border-2 !border-white dark:!border-gray-900"
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
