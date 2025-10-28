'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Send, 
  User, 
  Bot, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  Edit,
  Trash2,
  MoreHorizontal,
  Paperclip,
  Mic,
  Square,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error' | 'typing';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  reactions?: {
    thumbsUp?: number;
    thumbsDown?: number;
  };
  metadata?: Record<string, any>;
}

export interface ConversationProps {
  messages: Message[];
  onSendMessage?: (message: string, attachments?: File[]) => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  onReactToMessage?: (messageId: string, reaction: 'thumbsUp' | 'thumbsDown') => void;
  onRetryMessage?: (messageId: string) => void;
  layout?: 'chat' | 'timeline' | 'compact' | 'minimal';
  showAvatars?: boolean;
  showTimestamps?: boolean;
  showReactions?: boolean;
  showActions?: boolean;
  allowEditing?: boolean;
  allowDeletion?: boolean;
  allowReactions?: boolean;
  allowAttachments?: boolean;
  allowVoiceInput?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Conversation: React.FC<ConversationProps> = ({
  messages,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onReactToMessage,
  onRetryMessage,
  layout = 'chat',
  showAvatars = true,
  showTimestamps = true,
  showReactions = true,
  showActions = true,
  allowEditing = true,
  allowDeletion = true,
  allowReactions = true,
  allowAttachments = true,
  allowVoiceInput = false,
  placeholder = 'Type your message...',
  disabled = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() && attachments.length === 0) return;
    if (disabled) return;

    onSendMessage?.(inputValue, attachments);
    setInputValue('');
    setAttachments([]);
  };

  const handleEditMessage = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message && allowEditing) {
      setEditingMessageId(messageId);
      setEditContent(message.content);
    }
  };

  const handleSaveEdit = () => {
    if (editingMessageId && editContent.trim()) {
      onEditMessage?.(editingMessageId, editContent);
      setEditingMessageId(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditContent('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAvatar = (role: string, messageId?: string) => {
    if (role === 'user') {
      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${messageId}`} />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
      );
    }
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${messageId}`} />
        <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
      </Avatar>
    );
  };

  const renderMessage = (message: Message) => {
    const isEditing = editingMessageId === message.id;
    const isUser = message.role === 'user';

    return (
      <div key={message.id} className={cn(
        'flex gap-3 p-4',
        isUser && 'flex-row-reverse',
        layout === 'compact' && 'p-2',
        layout === 'minimal' && 'p-1'
      )}>
        {showAvatars && layout !== 'minimal' && (
          <div className={cn('flex-shrink-0', isUser && 'ml-3')}>
            {getAvatar(message.role, message.id)}
          </div>
        )}
        
        <div className={cn(
          'flex flex-col gap-2 max-w-[80%]',
          isUser && 'items-end',
          layout === 'minimal' && 'max-w-[90%]'
        )}>
          <div className={cn(
            'rounded-lg p-3',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-muted',
            layout === 'compact' && 'p-2',
            layout === 'minimal' && 'p-2 text-sm'
          )}>
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map(attachment => (
                      <div key={attachment.id} className="flex items-center gap-2 text-sm opacity-80">
                        <Paperclip className="h-3 w-3" />
                        <span>{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {message.status === 'typing' && (
                  <div className="flex gap-1 mt-2">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
              </>
            )}
          </div>
          
          {(showTimestamps || showActions || showReactions) && layout !== 'minimal' && (
            <div className={cn(
              'flex items-center gap-2 text-xs text-muted-foreground',
              isUser && 'flex-row-reverse'
            )}>
              {showTimestamps && (
                <span>{formatTimestamp(message.timestamp)}</span>
              )}
              
              {showActions && !isEditing && (
                <div className={cn('flex gap-1', isUser && 'flex-row-reverse')}>
                  {allowEditing && isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleEditMessage(message.id)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                  
                  {allowDeletion && isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onDeleteMessage?.(message.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                  
                  {message.status === 'error' && onRetryMessage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onRetryMessage(message.id)}
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => navigator.clipboard.writeText(message.content)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {showReactions && allowReactions && (
                <div className={cn('flex gap-1', isUser && 'flex-row-reverse')}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-6 px-1',
                      message.reactions?.thumbsUp && 'text-blue-500'
                    )}
                    onClick={() => onReactToMessage?.(message.id, 'thumbsUp')}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    {message.reactions?.thumbsUp && (
                      <span className="ml-1 text-xs">{message.reactions.thumbsUp}</span>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-6 px-1',
                      message.reactions?.thumbsDown && 'text-red-500'
                    )}
                    onClick={() => onReactToMessage?.(message.id, 'thumbsDown')}
                  >
                    <ThumbsDown className="h-3 w-3" />
                    {message.reactions?.thumbsDown && (
                      <span className="ml-1 text-xs">{message.reactions.thumbsDown}</span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChatLayout = () => (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Conversation</CardTitle>
        <CardDescription>AI-powered conversation interface</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map(renderMessage)}
          </div>
        </ScrollArea>
        
        {!disabled && (
          <div className="border-t p-4">
            {attachments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted rounded p-2">
                    <Paperclip className="h-3 w-3" />
                    <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              {allowAttachments && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full p-3 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                <div className="absolute right-2 bottom-2 flex gap-1">
                  {allowVoiceInput && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'h-6 w-6 p-0',
                        isRecording && 'text-red-500'
                      )}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <Square className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() && attachments.length === 0}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderTimelineLayout = () => (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div key={message.id} className="relative">
          {index < messages.length - 1 && (
            <div className="absolute left-4 top-8 h-full w-px bg-border" />
          )}
          
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {getAvatar(message.role, message.id)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </span>
                {showTimestamps && (
                  <span className="text-sm text-muted-foreground">
                    {formatTimestamp(message.timestamp)}
                  </span>
                )}
                {message.status && (
                  <Badge variant="outline" className="text-xs">
                    {message.status}
                  </Badge>
                )}
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {showActions && (
                    <div className="flex gap-2 mt-3">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      {allowReactions && (
                        <>
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {message.reactions?.thumbsUp || 0}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {message.reactions?.thumbsDown || 0}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompactLayout = () => (
    <div className="space-y-2">
      {messages.map(message => (
        <div
          key={message.id}
          className={cn(
            'flex gap-2 p-2 rounded-lg',
            message.role === 'user' ? 'bg-primary/10' : 'bg-muted/50'
          )}
        >
          {showAvatars && (
            <div className="flex-shrink-0">
              {getAvatar(message.role, message.id)}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm">
                {message.role === 'user' ? 'You' : 'AI'}
              </span>
              {showTimestamps && (
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(message.timestamp)}
                </span>
              )}
            </div>
            <div className="text-sm truncate">{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMinimalLayout = () => (
    <div className="space-y-1">
      {messages.map(message => (
        <div key={message.id} className="text-sm">
          <span className={cn(
            'font-medium',
            message.role === 'user' ? 'text-primary' : 'text-muted-foreground'
          )}>
            {message.role === 'user' ? 'You:' : 'AI:'}
          </span>{' '}
          <span className="truncate inline-block max-w-[300px]">
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );

  const layouts = {
    chat: renderChatLayout,
    timeline: renderTimelineLayout,
    compact: renderCompactLayout,
    minimal: renderMinimalLayout,
  };

  return (
    <div className={cn('w-full h-full', className)}>
      {layouts[layout]()}
    </div>
  );
};

// Default conversation messages
export const defaultConversationMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hi! Can you help me create a comprehensive storybook for AI SDK components?',
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'I\'d be happy to help you create a comprehensive storybook for AI SDK components! Based on the AI SDK documentation, you\'ll need to create 31 different components including Actions, Branch, Chain of Thought, and many more.\n\nEach component should have:\n- Multiple layout options\n- Interactive stories\n- Proper TypeScript interfaces\n- Accessibility features\n- Responsive design\n\nWould you like me to start by setting up the Storybook configuration and then we can work through each component systematically?',
    timestamp: '2024-01-15T10:30:15Z',
    reactions: { thumbsUp: 2 },
  },
  {
    id: '3',
    role: 'user',
    content: 'That sounds great! Let\'s start with the Actions component. I want it to support different layouts like horizontal, vertical, and grid arrangements.',
    timestamp: '2024-01-15T10:31:00Z',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Perfect! Let\'s create the Actions component with the following features:\n\n**Core Features:**\n- Multiple layout options (horizontal, vertical, grid)\n- Configurable button sizes (sm, md, lg)\n- Loading states and disabled states\n- Icon support with optional labels\n- Various button variants\n\n**Story Variants:**\n- Default layout with all actions\n- Individual layout stories\n- Different sizes\n- Loading and disabled states\n- Custom action configurations\n\nI\'ll create the component with proper TypeScript interfaces and comprehensive stories. Would you like me to include any specific actions or keep it generic?',
    timestamp: '2024-01-15T10:31:20Z',
    status: 'typing',
  },
];