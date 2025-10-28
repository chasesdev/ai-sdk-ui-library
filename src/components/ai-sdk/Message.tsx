'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Bot, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  Edit,
  Trash2,
  Share2,
  Bookmark,
  Flag,
  MoreHorizontal,
  Check,
  Clock,
  AlertCircle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
}

export interface MessageReaction {
  type: 'thumbsUp' | 'thumbsDown' | 'laugh' | 'heart' | 'eyes';
  count: number;
  users?: string[];
}

export interface MessageProps {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
  author?: {
    name: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'away';
  };
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
  metadata?: Record<string, any>;
  isEdited?: boolean;
  editedAt?: string;
  isBookmarked?: boolean;
  isFlagged?: boolean;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  showAvatar?: boolean;
  showTimestamp?: boolean;
  showStatus?: boolean;
  showActions?: boolean;
  allowReactions?: boolean;
  allowEditing?: boolean;
  allowDeletion?: boolean;
  allowBookmark?: boolean;
  allowFlag?: boolean;
  allowShare?: boolean;
  className?: string;
  onCopy?: () => void;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
  onReact?: (reaction: string) => void;
  onBookmark?: () => void;
  onFlag?: () => void;
  onShare?: () => void;
  onRetry?: () => void;
}

export const Message: React.FC<MessageProps> = ({
  id,
  role,
  content,
  timestamp,
  status,
  author,
  attachments,
  reactions,
  metadata,
  isEdited,
  editedAt,
  isBookmarked,
  isFlagged,
  priority = 'normal',
  variant = 'default',
  showAvatar = true,
  showTimestamp = true,
  showStatus = true,
  showActions = true,
  allowReactions = true,
  allowEditing = false,
  allowDeletion = false,
  allowBookmark = true,
  allowFlag = true,
  allowShare = true,
  className,
  onCopy,
  onEdit,
  onDelete,
  onReact,
  onBookmark,
  onFlag,
  onShare,
  onRetry,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleEdit = () => {
    if (isEditing && editContent.trim() !== content) {
      onEdit?.(editContent);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <Check className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <Check className="h-3 w-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'low':
        return 'border-gray-200';
      case 'normal':
        return 'border-border';
      case 'high':
        return 'border-orange-200';
      case 'urgent':
        return 'border-red-200';
      default:
        return 'border-border';
    }
  };

  const getPriorityBadge = () => {
    if (priority === 'normal') return null;
    
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    
    return (
      <Badge variant="outline" className={cn('text-xs', colors[priority])}>
        {priority}
      </Badge>
    );
  };

  const getAvatar = () => {
    if (role === 'user') {
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={author?.avatar} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      );
    }
    
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={author?.avatar} />
        <AvatarFallback>
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    );
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleEdit}>Save</Button>
            <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="whitespace-pre-wrap text-sm">{content}</div>
        
        {attachments && attachments.length > 0 && (
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted rounded text-xs">
                <div className="w-4 h-4 bg-primary/10 rounded flex items-center justify-center">
                  <span className="text-primary text-xs">
                    {attachment.type.split('/')[0]?.toUpperCase()?.[0]}
                  </span>
                </div>
                <span className="flex-1 truncate">{attachment.name}</span>
                {attachment.size && (
                  <span className="text-muted-foreground">
                    {(attachment.size / 1024).toFixed(1)}KB
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        
        {reactions && reactions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {reactions.map((reaction) => (
              <Button
                key={reaction.type}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => onReact?.(reaction.type)}
              >
                {reaction.type === 'thumbsUp' && <ThumbsUp className="h-3 w-3 mr-1" />}
                {reaction.type === 'thumbsDown' && <ThumbsDown className="h-3 w-3 mr-1" />}
                {reaction.count}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderActions = () => {
    if (!showActions) return null;

    return (
      <div className="flex items-center gap-1">
        {allowReactions && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onReact?.('thumbsUp')}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => onReact?.('thumbsDown')}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => onCopy?.()}
        >
          <Copy className="h-3 w-3" />
        </Button>
        
        {allowEditing && role === 'user' && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleEdit}
          >
            <Edit className="h-3 w-3" />
          </Button>
        )}
        
        {allowBookmark && (
          <Button
            variant="ghost"
            size="sm"
            className={cn('h-6 w-6 p-0', isBookmarked && 'text-yellow-500')}
            onClick={() => onBookmark?.()}
          >
            <Bookmark className="h-3 w-3" />
          </Button>
        )}
        
        {allowShare && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onShare?.()}
          >
            <Share2 className="h-3 w-3" />
          </Button>
        )}
        
        {allowFlag && (
          <Button
            variant="ghost"
            size="sm"
            className={cn('h-6 w-6 p-0', isFlagged && 'text-red-500')}
            onClick={() => onFlag?.()}
          >
            <Flag className="h-3 w-3" />
          </Button>
        )}
        
        {allowDeletion && role === 'user' && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onDelete?.()}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
        
        {status === 'error' && onRetry && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onRetry?.()}
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-start gap-2', className)}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              {role === 'user' ? (author?.name || 'You') : (author?.name || 'AI')}
            </span>
            {showTimestamp && (
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(timestamp)}
              </span>
            )}
            {getStatusIcon()}
          </div>
          <div className="text-sm mt-1">{content}</div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        'flex gap-3 p-3 rounded-lg border',
        role === 'user' ? 'bg-primary/5 border-primary/20' : 'bg-muted/30',
        getPriorityColor(),
        className
      )}>
        {showAvatar && getAvatar()}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {role === 'user' ? (author?.name || 'You') : (author?.name || 'AI')}
              </span>
              {getPriorityBadge()}
              {isEdited && <span className="text-xs text-muted-foreground">(edited)</span>}
            </div>
            
            <div className="flex items-center gap-2">
              {showTimestamp && (
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(timestamp)}
                </span>
              )}
              {showStatus && getStatusIcon()}
            </div>
          </div>
          
          <div className="text-sm">{content}</div>
          
          {showActions && (
            <div className="flex justify-end mt-2">
              {renderActions()}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={cn(
      'transition-all duration-200 hover:shadow-sm',
      role === 'user' && 'border-primary/20',
      getPriorityColor(),
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {showAvatar && getAvatar()}
            
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">
                  {role === 'user' ? (author?.name || 'You') : (author?.name || 'AI')}
                </CardTitle>
                {getPriorityBadge()}
                {isBookmarked && <Bookmark className="h-4 w-4 text-yellow-500 fill-current" />}
                {isFlagged && <Flag className="h-4 w-4 text-red-500" />}
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                {showTimestamp && (
                  <CardDescription className="text-xs">
                    {formatTimestamp(timestamp)}
                  </CardDescription>
                )}
                {isEdited && editedAt && (
                  <CardDescription className="text-xs">
                    edited {formatTimestamp(editedAt)}
                  </CardDescription>
                )}
                {showStatus && getStatusIcon()}
              </div>
            </div>
          </div>
          
          {showActions && (
            <div className="flex items-center gap-1">
              {renderActions()}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {renderContent()}
        
        {metadata && Object.keys(metadata).length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center gap-1 mb-1">
                <Info className="h-3 w-3" />
                <span>Metadata</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium">{key}:</span> {String(value)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Default message examples
export const defaultMessage: MessageProps = {
  id: '1',
  role: 'assistant',
  content: 'Hello! I\'m here to help you with your AI SDK development. What would you like to work on today?',
  timestamp: '2024-01-15T10:30:00Z',
  author: {
    name: 'AI Assistant',
    status: 'online',
  },
  status: 'sent',
};

export const userMessage: MessageProps = {
  id: '2',
  role: 'user',
  content: 'I need help creating a comprehensive storybook for AI SDK components. Can you guide me through the process?',
  timestamp: '2024-01-15T10:31:00Z',
  author: {
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    status: 'online',
  },
  status: 'read',
  isEdited: true,
  editedAt: '2024-01-15T10:32:00Z',
};

export const systemMessage: MessageProps = {
  id: '3',
  role: 'system',
  content: 'New conversation started. AI Assistant is ready to help with AI SDK development.',
  timestamp: '2024-01-15T10:29:00Z',
  status: 'sent',
  priority: 'low',
};

export const errorMessage: MessageProps = {
  id: '4',
  role: 'user',
  content: 'This message failed to send',
  timestamp: '2024-01-15T10:33:00Z',
  status: 'error',
  author: {
    name: 'John Doe',
  },
};