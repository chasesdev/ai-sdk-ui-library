import React from 'react';
import { Copy, ThumbsUp, ThumbsDown, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ResponseProps {
  content: string;
  author?: string;
  timestamp?: string;
  confidence?: number;
  sources?: Array<{
    title: string;
    url: string;
    snippet?: string;
  }>;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const Response: React.FC<ResponseProps> = ({
  content,
  author = 'AI Assistant',
  timestamp,
  confidence,
  sources,
  showActions = true,
  variant = 'default',
  className
}) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'AI Response',
        text: content
      });
    }
  };

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
      isCompact ? 'p-3' : 'p-4',
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {author}
            </p>
            {timestamp && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {timestamp}
              </p>
            )}
          </div>
        </div>

        {confidence !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Confidence:
            </span>
            <div className="flex items-center gap-1">
              <div className="w-12 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    confidence >= 0.8 ? 'bg-green-500' :
                    confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {Math.round(confidence * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={cn(
        'text-gray-800 dark:text-gray-200',
        isCompact ? 'text-sm' : 'text-base',
        !isCompact && 'prose prose-sm dark:prose-invert max-w-none'
      )}>
        {content}
      </div>

      {sources && sources.length > 0 && isDetailed && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sources:
          </p>
          <div className="space-y-2">
            {sources.map((source, index) => (
              <div key={index} className="text-xs">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {source.title}
                </a>
                {source.snippet && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {source.snippet}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showActions && (
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Copy className="h-4 w-4" />
            {!isCompact && <span className="ml-1">Copy</span>}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ThumbsUp className="h-4 w-4" />
            {!isCompact && <span className="ml-1">Helpful</span>}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ThumbsDown className="h-4 w-4" />
            {!isCompact && <span className="ml-1">Not Helpful</span>}
          </Button>

          {!isCompact && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Share2 className="h-4 w-4" />
              <span className="ml-1">Share</span>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 ml-auto"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};