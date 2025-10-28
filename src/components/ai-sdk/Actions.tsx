'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Play, Pause, RotateCcw, Download, Share2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Action {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

interface ActionsProps {
  actions: Action[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export const Actions: React.FC<ActionsProps> = ({
  actions,
  layout = 'horizontal',
  size = 'md',
  showLabels = true,
  className,
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleActionClick = (action: Action) => {
    if (action.disabled || loadingStates[action.id]) return;

    if (action.loading) {
      setLoadingStates(prev => ({ ...prev, [action.id]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [action.id]: false }));
        action.onClick?.();
      }, 1500);
    } else {
      action.onClick?.();
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm': return 'sm';
      case 'lg': return 'lg';
      default: return 'default';
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical':
        return 'flex flex-col gap-2';
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2';
      default:
        return 'flex flex-wrap gap-2';
    }
  };

  return (
    <div className={cn(getLayoutClasses(), className)}>
      {actions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant || 'default'}
          size={getButtonSize()}
          disabled={action.disabled || loadingStates[action.id]}
          onClick={() => handleActionClick(action)}
          className={cn(
            'flex items-center gap-2 transition-all duration-200',
            loadingStates[action.id] && 'opacity-70'
          )}
        >
          {loadingStates[action.id] ? (
            <RotateCcw className="h-4 w-4 animate-spin" />
          ) : (
            action.icon
          )}
          {showLabels && <span>{action.label}</span>}
        </Button>
      ))}
    </div>
  );
};

// Default action configurations
export const defaultActions: Action[] = [
  {
    id: 'run',
    label: 'Run',
    icon: <Play className="h-4 w-4" />,
    onClick: () => console.log('Running action'),
  },
  {
    id: 'pause',
    label: 'Pause',
    icon: <Pause className="h-4 w-4" />,
    variant: 'secondary',
    onClick: () => console.log('Pausing action'),
  },
  {
    id: 'reset',
    label: 'Reset',
    icon: <RotateCcw className="h-4 w-4" />,
    variant: 'outline',
    onClick: () => console.log('Resetting action'),
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: <Copy className="h-4 w-4" />,
    onClick: () => console.log('Copying action'),
  },
  {
    id: 'download',
    label: 'Download',
    icon: <Download className="h-4 w-4" />,
    variant: 'secondary',
    onClick: () => console.log('Downloading action'),
  },
  {
    id: 'share',
    label: 'Share',
    icon: <Share2 className="h-4 w-4" />,
    onClick: () => console.log('Sharing action'),
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash2 className="h-4 w-4" />,
    variant: 'destructive',
    onClick: () => console.log('Deleting action'),
  },
];