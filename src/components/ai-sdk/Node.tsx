import React from 'react';
import { 
  Circle, 
  Square, 
  Diamond, 
  Hexagon, 
  Star, 
  Triangle,
  Plus,
  Minus,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  type?: 'circle' | 'square' | 'diamond' | 'hexagon' | 'star' | 'triangle';
  size?: number;
  color?: string;
  selected?: boolean;
  draggable?: boolean;
  onClick?: (nodeId: string) => void;
  onDoubleClick?: (nodeId: string) => void;
  className?: string;
}

export const Node: React.FC<NodeProps> = ({
  id,
  label,
  x,
  y,
  type = 'circle',
  size = 40,
  color = '#3b82f6',
  selected = false,
  draggable = false,
  onClick,
  onDoubleClick,
  className
}) => {
  const getShape = () => {
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

  const getIcon = () => {
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

  // Calculate viewBox with padding
  const padding = 30;
  const minX = x - size / 2 - padding;
  const minY = y - size / 2 - padding;
  const viewBoxWidth = size + padding * 2;
  const viewBoxHeight = size + padding * 2 + 20; // Extra space for label

  return (
    <svg
      className={cn('w-full h-full', className)}
      viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        className="transition-all duration-200"
        onClick={() => onClick?.(id)}
        onDoubleClick={() => onDoubleClick?.(id)}
      >
        {getShape()}

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
              {getIcon()}
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
    </svg>
  );
};