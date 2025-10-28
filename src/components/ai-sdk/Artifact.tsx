import React, { useState } from 'react';
import { 
  FileText, 
  Code, 
  Image, 
  Video, 
  Music, 
  Archive, 
  Download, 
  Eye, 
  Copy, 
  Share2, 
  Trash2,
  Edit,
  ExternalLink,
  Clock,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Artifact {
  id: string;
  name: string;
  type: 'text' | 'code' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  content?: string;
  url?: string;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
  author?: string;
  description?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface ArtifactProps {
  artifact: Artifact;
  variant?: 'card' | 'list' | 'compact' | 'detailed';
  showActions?: boolean;
  showMetadata?: boolean;
  interactive?: boolean;
  onView?: (artifact: Artifact) => void;
  onEdit?: (artifact: Artifact) => void;
  onDownload?: (artifact: Artifact) => void;
  onShare?: (artifact: Artifact) => void;
  onDelete?: (artifactId: string) => void;
  onCopy?: (artifact: Artifact) => void;
  className?: string;
}

export const Artifact: React.FC<ArtifactProps> = ({
  artifact,
  variant = 'card',
  showActions = true,
  showMetadata = true,
  interactive = true,
  onView,
  onEdit,
  onDownload,
  onShare,
  onDelete,
  onCopy,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const getTypeIcon = () => {
    switch (artifact.type) {
      case 'text':
        return <FileText className="h-5 w-5" />;
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" aria-hidden="true" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Music className="h-5 w-5" />;
      case 'archive':
        return <Archive className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (artifact.type) {
      case 'text':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'code':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'image':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'video':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'audio':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'archive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString();
  };

  const handleCopy = async () => {
    if (artifact.content) {
      await navigator.clipboard.writeText(artifact.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    onCopy?.(artifact);
  };

  const renderContent = () => {
    if (variant === 'compact') {
      return (
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded', getTypeColor())}>
            {getTypeIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {artifact.name}
            </h4>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {artifact.type}
              </Badge>
              {artifact.size && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(artifact.size)}
                </span>
              )}
            </div>
          </div>
          {showActions && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView?.(artifact)}
                className="h-6 w-6 p-0"
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload?.(artifact)}
                className="h-6 w-6 p-0"
              >
                <Download className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      );
    }

    if (variant === 'list') {
      return (
        <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <div className={cn('p-2 rounded', getTypeColor())}>
            {getTypeIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {artifact.name}
            </h4>
            {artifact.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {artifact.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary" className="text-xs">
                {artifact.type}
              </Badge>
              {artifact.size && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(artifact.size)}
                </span>
              )}
              {artifact.createdAt && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(artifact.createdAt)}
                </span>
              )}
            </div>
          </div>
          {showActions && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView?.(artifact)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(artifact)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload?.(artifact)}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare?.(artifact)}
                className="h-8 w-8 p-0"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      );
    }

    // Card and Detailed variants
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className={cn('p-3 rounded-lg', getTypeColor())}>
            {getTypeIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {artifact.name}
            </h3>
            {artifact.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {artifact.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {artifact.type}
              </Badge>
              {artifact.tags && artifact.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {showMetadata && (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                Created: {formatDate(artifact.createdAt)}
              </span>
            </div>
            {artifact.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Author: {artifact.author}
                </span>
              </div>
            )}
            {artifact.size && (
              <div className="flex items-center gap-2">
                <Archive className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Size: {formatFileSize(artifact.size)}
                </span>
              </div>
            )}
          </div>
        )}

        {artifact.content && variant === 'detailed' && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-auto max-h-32">
              {artifact.content}
            </pre>
          </div>
        )}

        {showActions && (
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(artifact)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(artifact)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <span className="h-4 w-4">✓</span>
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload?.(artifact)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare?.(artifact)}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            {artifact.url && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex items-center gap-2"
              >
                <a href={artifact.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open
                </a>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(artifact.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  const getContainerStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-3 border border-gray-200 dark:border-gray-700 rounded-lg';
      case 'list':
        return 'bg-white dark:bg-gray-800';
      case 'detailed':
        return 'p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800';
      default:
        return 'p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800';
    }
  };

  return (
    <div className={cn(getContainerStyles(), interactive && 'hover:shadow-md transition-shadow', className)}>
      {renderContent()}
    </div>
  );
};