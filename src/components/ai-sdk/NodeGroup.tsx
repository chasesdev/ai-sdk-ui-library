import React from 'react';
import {
  Circle,
  Square,
  Diamond,
  Hexagon,
  Star,
  Triangle,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NodeProps } from './Node';

export interface NodeGroupProps {
  nodes: NodeProps[];
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Renders multiple nodes in a shared SVG container
 * Solves the nested SVG issue when displaying multiple nodes together
 */
export const NodeGroup: React.FC<NodeGroupProps> = ({
  nodes,
  width = 600,
  height = 400,
  className
}) => {
  const getShape = (node: NodeProps) => {
    const { x, y, type = 'circle', size = 40, color = '#3b82f6', selected = false, draggable = false } = node;
    const halfSize = size / 2;

    switch (type) {
      case 'circle':
        return (
          <circle
            cx={x}
            cy={y}
            r={halfSize}
            fill={color}
            stroke={selected ? '#1f2937' : color}
            strokeWidth={selected ? 3 : 1}
            className={cn(draggable && 'cursor-move')}
          />
        );

      case 'square':
        return (
          <rect
            x={x - halfSize}
            y={y - halfSize}
            width={size}
            height={size}
            fill={color}
            stroke={selected ? '#1f2937' : color}
            strokeWidth={selected ? 3 : 1}
            className={cn(draggable && 'cursor-move')}
          />
        );

      case 'diamond':
        return (
          <polygon
            points={`${x},${y - halfSize} ${x + halfSize},${y} ${x},${y + halfSize} ${x - halfSize},${y}`}
            fill={color}
            stroke={selected ? '#1f2937' : color}
            strokeWidth={selected ? 3 : 1}
            className={cn(draggable && 'cursor-move')}
          />
        );

      case 'hexagon':
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = x + halfSize * Math.cos(angle);
          const py = y + halfSize * Math.sin(angle);
          hexPoints.push(`${px},${py}`);
        }
        return (
          <polygon
            points={hexPoints.join(' ')}
            fill={color}
            stroke={selected ? '#1f2937' : color}
            strokeWidth={selected ? 3 : 1}
            className={cn(draggable && 'cursor-move')}
          />
        );

      case 'star':
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI / 5) * i;
          const radius = i % 2 === 0 ? halfSize : halfSize / 2;
          const px = x + radius * Math.cos(angle - Math.PI / 2);
          const py = y + radius * Math.sin(angle - Math.PI / 2);
          starPoints.push(`${px},${py}`);
        }
        return (
          <polygon
            points={starPoints.join(' ')}
            fill={color}
            stroke={selected ? '#1f2937' : color}
            strokeWidth={selected ? 3 : 1}
            className={cn(draggable && 'cursor-move')}
          />
        );

      case 'triangle':
        return (
          <polygon
            points={`${x},${y - halfSize} ${x + halfSize},${y + halfSize} ${x - halfSize},${y + halfSize}`}
            fill={color}
            stroke={selected ? '#1f2937' : color}
            strokeWidth={selected ? 3 : 1}
            className={cn(draggable && 'cursor-move')}
          />
        );

      default:
        return null;
    }
  };

  const getIcon = (node: NodeProps) => {
    const { type = 'circle', size = 40 } = node;
    const iconSize = size * 0.4;
    const iconColor = '#ffffff';

    switch (type) {
      case 'circle':
        return <Circle size={iconSize} color={iconColor} />;
      case 'square':
        return <Square size={iconSize} color={iconColor} />;
      case 'diamond':
        return <Diamond size={iconSize} color={iconColor} />;
      case 'hexagon':
        return <Hexagon size={iconSize} color={iconColor} />;
      case 'star':
        return <Star size={iconSize} color={iconColor} />;
      case 'triangle':
        return <Triangle size={iconSize} color={iconColor} />;
      default:
        return <Settings size={iconSize} color={iconColor} />;
    }
  };

  return (
    <svg
      className={cn('w-full h-full', className)}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {nodes.map((node) => {
        const { id, x, y, size = 40, selected = false, label, onClick, onDoubleClick } = node;

        return (
          <g
            key={id}
            className="transition-all duration-200"
            onClick={() => onClick?.(id)}
            onDoubleClick={() => onDoubleClick?.(id)}
          >
            {getShape(node)}

            {/* Icon */}
            <g transform={`translate(${x}, ${y})`}>
              <foreignObject
                x={-size * 0.2}
                y={-size * 0.2}
                width={size * 0.4}
                height={size * 0.4}
                className="pointer-events-none"
              >
                <div className="w-full h-full flex items-center justify-center text-white">
                  {getIcon(node)}
                </div>
              </foreignObject>
            </g>

            {/* Label */}
            <text
              x={x}
              y={y + size / 2 + 15}
              textAnchor="middle"
              className="text-xs fill-gray-700 dark:fill-gray-300 pointer-events-none"
              style={{
                textShadow: '0 0 3px white, 0 0 3px white'
              }}
            >
              {label}
            </text>

            {/* Selection indicator */}
            {selected && (
              <circle
                cx={x}
                cy={y}
                r={size / 2 + 8}
                fill="none"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="4,2"
                className="animate-pulse"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
