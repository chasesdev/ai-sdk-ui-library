import React from 'react';
import { cn } from '@/lib/utils';

export interface EdgeProps {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  type?: 'straight' | 'curved' | 'step';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  width?: number;
  animated?: boolean;
  arrow?: 'start' | 'end' | 'both';
  className?: string;
}

export const Edge: React.FC<EdgeProps> = ({
  id,
  from,
  to,
  label,
  type = 'straight',
  style = 'solid',
  color = '#6b7280',
  width = 2,
  animated = false,
  arrow = 'end',
  className
}) => {
  const getPath = () => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx = from.x + dx / 2;
    const cy = from.y + dy / 2;

    switch (type) {
      case 'curved':
        return `M ${from.x} ${from.y} Q ${cx} ${cy - 50} ${to.x} ${to.y}`;
      case 'step':
        return `M ${from.x} ${from.y} H ${cx} V ${cy} H ${to.x} V ${to.y}`;
      default:
        return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
  };

  const getStrokeDasharray = () => {
    switch (style) {
      case 'dashed':
        return '8,4';
      case 'dotted':
        return '2,2';
      default:
        return 'none';
    }
  };

  const getMarker = (position: 'start' | 'end') => {
    const isStart = position === 'start';
    const x = isStart ? from.x : to.x;
    const y = isStart ? from.y : to.y;
    const dx = isStart ? from.x - to.x : to.x - from.x;
    const dy = isStart ? from.y - to.y : to.y - from.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return (
      <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
        <polygon
          points={isStart ? '0,0 8,-3 8,3' : '0,0 -8,-3 -8,3'}
          fill={color}
        />
      </g>
    );
  };

  const getLabelPosition = () => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return {
      x: from.x + dx / 2,
      y: from.y + dy / 2 - 10
    };
  };

  // Calculate viewBox with padding
  const padding = 20;
  const minX = Math.min(from.x, to.x) - padding;
  const minY = Math.min(from.y, to.y) - padding;
  const maxX = Math.max(from.x, to.x) + padding;
  const maxY = Math.max(from.y, to.y) + padding;
  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  return (
    <svg
      className={cn('w-full h-full', className)}
      viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="transition-all duration-200">
        {/* Edge path */}
        <path
          d={getPath()}
          stroke={color}
          strokeWidth={width}
          strokeDasharray={getStrokeDasharray()}
          fill="none"
          className={cn(
            animated && 'animate-pulse'
          )}
        />

        {/* Arrows */}
        {(arrow === 'start' || arrow === 'both') && getMarker('start')}
        {(arrow === 'end' || arrow === 'both') && getMarker('end')}

        {/* Label */}
        {label && (
          <text
            x={getLabelPosition().x}
            y={getLabelPosition().y}
            textAnchor="middle"
            className="text-xs fill-gray-600 dark:fill-gray-400"
            style={{
              textShadow: '0 0 3px white, 0 0 3px white'
            }}
          >
            {label}
          </text>
        )}
      </g>
    </svg>
  );
};