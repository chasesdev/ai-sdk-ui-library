'use client';

import React from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react';

const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  label,
  labelStyle = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Base edge path */}
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 2,
        }}
      />

      {/* Animated gradient overlay */}
      <defs>
        <linearGradient id={`gradient-${id}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={(style?.stroke as string) || '#3b82f6'} stopOpacity="0.2" />
          <stop offset="50%" stopColor={(style?.stroke as string) || '#3b82f6'} stopOpacity="1" />
          <stop offset="100%" stopColor={(style?.stroke as string) || '#3b82f6'} stopOpacity="0.2" />
          <animate
            attributeName="x1"
            values="0%;100%"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="0%;100%"
            dur="2s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      {/* Animated flowing dots */}
      <g>
        <circle r="3" fill={(style?.stroke as string) || '#3b82f6'}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="3" fill={(style?.stroke as string) || '#3b82f6'}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="0.5s" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle r="3" fill={(style?.stroke as string) || '#3b82f6'}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="1s" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
        <circle r="3" fill={(style?.stroke as string) || '#3b82f6'}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} begin="1.5s" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </circle>
      </g>

      {/* Edge label */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <div
              className="px-2 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-sm text-xs font-semibold"
              style={labelStyle}
            >
              {label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default AnimatedEdge;
