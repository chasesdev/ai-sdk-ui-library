import React from 'react';
import { Lightbulb, ArrowRight, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Suggestion {
  id: string;
  text: string;
  type?: 'question' | 'action' | 'improvement' | 'follow-up';
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  onClick?: () => void;
}

export interface SuggestionProps {
  suggestions: Suggestion[];
  title?: string;
  maxVisible?: number;
  layout?: 'list' | 'grid' | 'carousel';
  showCategory?: boolean;
  showPriority?: boolean;
  dismissible?: boolean;
  onDismiss?: (suggestionId: string) => void;
  onActionClick?: (suggestion: Suggestion) => void;
  className?: string;
}

export const Suggestion: React.FC<SuggestionProps> = ({
  suggestions,
  title = 'Suggestions',
  maxVisible = 5,
  layout = 'list',
  showCategory = true,
  showPriority = false,
  dismissible = false,
  onDismiss,
  onActionClick,
  className
}) => {
  const visibleSuggestions = suggestions.slice(0, maxVisible);

  const getTypeIcon = (type?: Suggestion['type']) => {
    switch (type) {
      case 'question':
        return <span className="text-xs">?</span>;
      case 'action':
        return <ArrowRight className="h-3 w-3" />;
      case 'improvement':
        return <span className="text-xs">↑</span>;
      case 'follow-up':
        return <Plus className="h-3 w-3" />;
      default:
        return <Lightbulb className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type?: Suggestion['type']) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'action':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'improvement':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'follow-up':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority?: Suggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.onClick) {
      suggestion.onClick();
    } else if (onActionClick) {
      onActionClick(suggestion);
    }
  };

  const handleDismiss = (e: React.MouseEvent, suggestionId: string) => {
    e.stopPropagation();
    if (onDismiss) {
      onDismiss(suggestionId);
    }
  };

  const isGrid = layout === 'grid';
  const isCarousel = layout === 'carousel';

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4',
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <Badge variant="secondary" className="ml-auto">
          {suggestions.length}
        </Badge>
      </div>

      <div className={cn(
        'space-y-2',
        isGrid && 'grid grid-cols-1 md:grid-cols-2 gap-3',
        isCarousel && 'flex gap-3 overflow-x-auto pb-2'
      )}>
        {visibleSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={cn(
              'group relative border rounded-lg p-3 cursor-pointer transition-all duration-200',
              'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
              getPriorityColor(suggestion.priority),
              isCarousel && 'flex-shrink-0 min-w-72'
            )}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium',
                getTypeColor(suggestion.type)
              )}>
                {getTypeIcon(suggestion.type)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                  {suggestion.text}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  {showCategory && suggestion.category && (
                    <Badge variant="outline" className="text-xs">
                      {suggestion.category}
                    </Badge>
                  )}

                  {showPriority && suggestion.priority && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-xs',
                        suggestion.priority === 'high' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                        suggestion.priority === 'medium' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                        suggestion.priority === 'low' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      )}
                    >
                      {suggestion.priority}
                    </Badge>
                  )}
                </div>
              </div>

              {dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleDismiss(e, suggestion.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {suggestions.length > maxVisible && (
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm">
            View all {suggestions.length} suggestions
          </Button>
        </div>
      )}
    </div>
  );
};