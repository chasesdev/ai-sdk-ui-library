import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Minus2, 
  Maximize2, 
  X, 
  Settings,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PanelProps {
  title?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  resizable?: boolean;
  closable?: boolean;
  maximizable?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  position?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  variant?: 'default' | 'card' | 'glass';
  onCollapse?: (collapsed: boolean) => void;
  onClose?: () => void;
  onMaximize?: () => void;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  collapsible = false,
  collapsed = false,
  resizable = false,
  closable = false,
  maximizable = false,
  defaultWidth = 300,
  defaultHeight = 400,
  minWidth = 200,
  minHeight = 150,
  position = 'right',
  variant = 'default',
  onCollapse,
  onClose,
  onMaximize,
  className
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const handleClose = () => {
    onClose?.();
  };

  const handleMaximize = () => {
    const newMaximized = !isMaximized;
    setIsMaximized(newMaximized);
    onMaximize?.();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg';
      case 'glass':
        return 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg';
      default:
        return 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700';
    }
  };

  const getPositionStyles = () => {
    if (isMaximized) {
      return {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50
      };
    }

    const baseStyles = {
      width: isCollapsed ? 'auto' : size.width,
      height: isCollapsed ? 'auto' : size.height,
      minWidth: isCollapsed ? 'auto' : minWidth,
      minHeight: isCollapsed ? 'auto' : minHeight
    };

    switch (position) {
      case 'left':
        return {
          ...baseStyles,
          position: 'relative' as const,
          height: '100%'
        };
      case 'right':
        return {
          ...baseStyles,
          position: 'relative' as const,
          height: '100%'
        };
      case 'top':
        return {
          ...baseStyles,
          position: 'relative' as const,
          width: '100%'
        };
      case 'bottom':
        return {
          ...baseStyles,
          position: 'relative' as const,
          width: '100%'
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden transition-all duration-200',
        getVariantStyles(),
        isCollapsed && 'w-auto',
        className
      )}
      style={getPositionStyles()}
    >
      {/* Header */}
      {(title || collapsible || closable || maximizable) && (
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCollapse}
                className="h-6 w-6 p-0"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            )}
            
            {title && !isCollapsed && (
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-1">
            {maximizable && !isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMaximize}
                className="h-6 w-6 p-0"
              >
                {isMaximized ? (
                  <Minus2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
            
            {closable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      )}

      {/* Resize Handle */}
      {resizable && !isCollapsed && !isMaximized && (
        <div
          className={cn(
            'absolute bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors',
            position === 'right' && 'left-0 top-0 bottom-0 w-1 cursor-ew-resize',
            position === 'left' && 'right-0 top-0 bottom-0 w-1 cursor-ew-resize',
            position === 'bottom' && 'left-0 right-0 top-0 h-1 cursor-ns-resize',
            position === 'top' && 'left-0 right-0 bottom-0 h-1 cursor-ns-resize'
          )}
        >
          <GripVertical className="h-3 w-3 text-gray-500 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
};