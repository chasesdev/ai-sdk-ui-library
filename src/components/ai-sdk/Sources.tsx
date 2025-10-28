import React, { useState } from 'react';
import { ExternalLink, FileText, Globe, Book, Video, Code, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Source {
  id: string;
  title: string;
  url: string;
  type: 'web' | 'document' | 'book' | 'video' | 'code' | 'other';
  snippet?: string;
  author?: string;
  publishDate?: string;
  relevanceScore?: number;
  trustScore?: number;
}

export interface SourcesProps {
  sources: Source[];
  title?: string;
  maxVisible?: number;
  showRelevance?: boolean;
  showTrust?: boolean;
  layout?: 'list' | 'grid' | 'compact';
  className?: string;
}

export const Sources: React.FC<SourcesProps> = ({
  sources,
  title = 'Sources',
  maxVisible = 5,
  showRelevance = true,
  showTrust = false,
  layout = 'list',
  className
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleSources = expanded ? sources : sources.slice(0, maxVisible);
  const hasMore = sources.length > maxVisible;

  const getIcon = (type: Source['type']) => {
    switch (type) {
      case 'web':
        return <Globe className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'book':
        return <Book className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'code':
        return <Code className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: Source['type']) => {
    switch (type) {
      case 'web':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'document':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'book':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'video':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'code':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleCopyUrl = async (source: Source) => {
    await navigator.clipboard.writeText(source.url);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isCompact = layout === 'compact';
  const isGrid = layout === 'grid';

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4',
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title} ({sources.length})
        </h3>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600 dark:text-gray-400"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More ({sources.length - maxVisible})
              </>
            )}
          </Button>
        )}
      </div>

      <div className={cn(
        'space-y-3',
        isGrid && 'grid grid-cols-1 md:grid-cols-2 gap-4'
      )}>
        {visibleSources.map((source) => (
          <div
            key={source.id}
            className={cn(
              'border border-gray-200 dark:border-gray-600 rounded-lg p-3',
              'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
              isCompact && 'p-2'
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className={cn('p-1 rounded', getTypeColor(source.type))}>
                  {getIcon(source.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    'font-medium text-gray-900 dark:text-gray-100 truncate',
                    isCompact && 'text-sm'
                  )}>
                    {source.title}
                  </h4>
                  {source.author && !isCompact && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By {source.author}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyUrl(source)}
                  className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {copiedId === source.id ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>

            {source.snippet && !isCompact && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {source.snippet}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {source.type}
                </Badge>
                {source.publishDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {source.publishDate}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {showRelevance && source.relevanceScore !== undefined && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Relevance:
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${source.relevanceScore * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round(source.relevanceScore * 100)}%
                      </span>
                    </div>
                  </div>
                )}

                {showTrust && source.trustScore !== undefined && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Trust:
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full',
                            source.trustScore >= 0.8 ? 'bg-green-500' :
                            source.trustScore >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: `${source.trustScore * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round(source.trustScore * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sources.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No sources available</p>
        </div>
      )}
    </div>
  );
};