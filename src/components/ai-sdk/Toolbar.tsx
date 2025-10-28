import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Palette,
  Undo,
  Redo,
  Eye,
  EyeOff,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface ToolbarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export interface ToolbarProps {
  items?: ToolbarItem[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'compact' | 'minimal';
  showLabels?: boolean;
  collapsible?: boolean;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  items,
  title,
  orientation = 'horizontal',
  variant = 'default',
  showLabels = false,
  collapsible = false,
  className
}) => {
  const [expanded, setExpanded] = React.useState(true);

  const defaultItems: ToolbarItem[] = [
    { id: 'undo', icon: <Undo className="h-4 w-4" />, label: 'Undo' },
    { id: 'redo', icon: <Redo className="h-4 w-4" />, label: 'Redo' },
    { id: 'sep1', separator: true },
    { id: 'bold', icon: <Bold className="h-4 w-4" />, label: 'Bold' },
    { id: 'italic', icon: <Italic className="h-4 w-4" />, label: 'Italic' },
    { id: 'underline', icon: <Underline className="h-4 w-4" />, label: 'Underline' },
    { id: 'sep2', separator: true },
    { id: 'align-left', icon: <AlignLeft className="h-4 w-4" />, label: 'Align Left' },
    { id: 'align-center', icon: <AlignCenter className="h-4 w-4" />, label: 'Align Center' },
    { id: 'align-right', icon: <AlignRight className="h-4 w-4" />, label: 'Align Right' },
    { id: 'sep3', separator: true },
    { id: 'list', icon: <List className="h-4 w-4" />, label: 'Bullet List' },
    { id: 'list-ordered', icon: <ListOrdered className="h-4 w-4" />, label: 'Numbered List' },
    { id: 'quote', icon: <Quote className="h-4 w-4" />, label: 'Quote' },
    { id: 'code', icon: <Code className="h-4 w-4" />, label: 'Code' },
    { id: 'sep4', separator: true },
    { id: 'link', icon: <Link className="h-4 w-4" />, label: 'Link' },
    { id: 'image', icon: <Image className="h-4 w-4" aria-hidden="true" />, label: 'Image' },
    { id: 'table', icon: <Table className="h-4 w-4" />, label: 'Table' },
    { id: 'sep5', separator: true },
    { id: 'palette', icon: <Palette className="h-4 w-4" />, label: 'Colors' },
    { id: 'settings', icon: <Settings className="h-4 w-4" />, label: 'Settings' }
  ];

  const toolbarItems = items || defaultItems;

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-1 gap-1';
      case 'minimal':
        return 'p-1 gap-0';
      default:
        return 'p-2 gap-2';
    }
  };

  const getButtonStyles = (item: ToolbarItem) => {
    const baseStyles = cn(
      'transition-colors',
      variant === 'compact' && 'h-8 w-8 p-0',
      variant === 'minimal' && 'h-7 w-7 p-0',
      variant === 'default' && 'h-9 w-9 p-0'
    );

    if (item.active) {
      return cn(baseStyles, 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100');
    }

    return cn(
      baseStyles,
      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
      item.disabled && 'opacity-50 cursor-not-allowed'
    );
  };

  const renderToolbarItem = (item: ToolbarItem) => {
    if (item.separator) {
      return (
        <Separator
          key={item.id}
          orientation={orientation}
          className={cn(
            orientation === 'horizontal' ? 'h-6' : 'w-6',
            variant === 'minimal' && 'mx-1'
          )}
        />
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        size="sm"
        className={getButtonStyles(item)}
        onClick={item.onClick}
        disabled={item.disabled}
        title={item.label}
      >
        {item.icon}
        {showLabels && variant !== 'minimal' && (
          <span className="ml-2 text-xs">{item.label}</span>
        )}
      </Button>
    );
  };

  return (
    <div
      className={cn(
        'flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        getVariantStyles(),
        className
      )}
    >
      {title && (
        <div className={cn(
          'px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700',
          orientation === 'vertical' && 'w-full text-center',
          orientation === 'horizontal' && 'border-r border-b-0'
        )}>
          {title}
        </div>
      )}

      <div className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        'items-center'
      )}>
        {toolbarItems.map(renderToolbarItem)}
      </div>

      {collapsible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'h-8 w-8 p-0',
            orientation === 'vertical' && 'mt-auto'
          )}
        >
          <MoreHorizontal className={cn(
            'h-4 w-4 transition-transform',
            !expanded && 'rotate-90'
          )} />
        </Button>
      )}
    </div>
  );
};