'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  ExternalLink, 
  Copy, 
  Share2,
  Plus,
  Users,
  Bot,
  User,
  Settings,
  ChevronRight,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatConfig {
  title?: string;
  description?: string;
  participants?: Array<{
    id: string;
    name: string;
    type: 'user' | 'bot' | 'system';
    avatar?: string;
  }>;
  context?: string;
  initialMessage?: string;
  isPublic?: boolean;
  allowAnonymous?: boolean;
  maxParticipants?: number;
  tags?: string[];
}

interface OpenInChatProps {
  config?: ChatConfig;
  variant?: 'button' | 'card' | 'modal' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  position?: 'fixed' | 'relative' | 'absolute';
  placement?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showPreview?: boolean;
  showConfig?: boolean;
  allowCustomization?: boolean;
  autoOpen?: boolean;
  className?: string;
  onOpen?: (config: ChatConfig) => void;
  onCopyLink?: (link: string) => void;
  onShare?: (config: ChatConfig) => void;
}

export const OpenInChat: React.FC<OpenInChatProps> = ({
  config = {},
  variant = 'button',
  size = 'md',
  position = 'relative',
  placement = 'bottom-right',
  showPreview = false,
  showConfig = false,
  allowCustomization = false,
  autoOpen = false,
  className,
  onOpen,
  onCopyLink,
  onShare,
}) => {
  const [isExpanded, setIsExpanded] = useState(autoOpen);
  const [customConfig, setCustomConfig] = useState<ChatConfig>(config);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpen = () => {
    onOpen?.(customConfig);
    if (variant === 'modal') {
      setIsExpanded(true);
    }
  };

  const handleCopyLink = async () => {
    const chatLink = generateChatLink(customConfig);
    try {
      await navigator.clipboard.writeText(chatLink);
      setCopiedLink(true);
      onCopyLink?.(chatLink);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = () => {
    onShare?.(customConfig);
  };

  const generateChatLink = (chatConfig: ChatConfig): string => {
    const params = new URLSearchParams();
    if (chatConfig.title) params.append('title', chatConfig.title);
    if (chatConfig.context) params.append('context', chatConfig.context);
    if (chatConfig.initialMessage) params.append('message', chatConfig.initialMessage);
    if (chatConfig.isPublic) params.append('public', 'true');
    
    return `https://chat.example.com/create?${params.toString()}`;
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
    };
    return sizes[size];
  };

  const getIconSize = () => {
    const sizes = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };
    return sizes[size];
  };

  const getPositionClasses = () => {
    if (position === 'relative') return '';
    
    const positions = {
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
    };
    
    return `fixed ${positions[placement]}`;
  };

  const renderButton = () => (
    <Button
      onClick={handleOpen}
      className={cn(
        'flex items-center gap-2',
        getSizeClasses(),
        className
      )}
    >
      <MessageSquare className={getIconSize()} />
      <span>Open in Chat</span>
      <ChevronRight className={cn(getIconSize(), 'ml-1')} />
    </Button>
  );

  const renderCard = () => (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Open in Chat</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {customConfig.participants?.length || 0} participants
          </Badge>
        </div>
        {customConfig.description && (
          <CardDescription>{customConfig.description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showPreview && (
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-medium text-sm mb-2">Chat Preview</h4>
            <div className="space-y-2">
              {customConfig.participants?.slice(0, 3).map((participant) => (
                <div key={participant.id} className="flex items-center gap-2 text-sm">
                  {participant.type === 'bot' ? (
                    <Bot className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <User className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>{participant.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {showConfig && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="title" className="text-sm">Chat Title</Label>
              <Input
                id="title"
                value={customConfig.title || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter chat title"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="context" className="text-sm">Context</Label>
              <Textarea
                id="context"
                value={customConfig.context || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, context: e.target.value }))}
                placeholder="What's this chat about?"
                className="mt-1"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-sm">Initial Message</Label>
              <Input
                id="message"
                value={customConfig.initialMessage || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, initialMessage: e.target.value }))}
                placeholder="First message to send"
                className="mt-1"
              />
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button onClick={handleOpen} className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Open Chat
          </Button>
          
          <Button variant="outline" onClick={handleCopyLink}>
            {copiedLink ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {customConfig.tags && customConfig.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {customConfig.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderModal = () => (
    <div className={cn('fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4')}>
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Create Chat</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="modal-title">Chat Title</Label>
              <Input
                id="modal-title"
                value={customConfig.title || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter chat title"
              />
            </div>
            
            <div>
              <Label htmlFor="modal-description">Description</Label>
              <Textarea
                id="modal-description"
                value={customConfig.description || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose of this chat"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="modal-context">Context</Label>
              <Textarea
                id="modal-context"
                value={customConfig.context || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, context: e.target.value }))}
                placeholder="What's this chat about?"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="modal-message">Initial Message</Label>
              <Textarea
                id="modal-message"
                value={customConfig.initialMessage || ''}
                onChange={(e) => setCustomConfig(prev => ({ ...prev, initialMessage: e.target.value }))}
                placeholder="First message to send"
                rows={2}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customConfig.isPublic || false}
                  onChange={(e) => setCustomConfig(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                <span className="text-sm">Public chat</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customConfig.allowAnonymous || false}
                  onChange={(e) => setCustomConfig(prev => ({ ...prev, allowAnonymous: e.target.checked }))}
                />
                <span className="text-sm">Allow anonymous</span>
              </label>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleOpen} className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Create Chat
            </Button>
            
            <Button variant="outline" onClick={handleCopyLink}>
              {copiedLink ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInline = () => (
    <div className={cn('flex items-center gap-4 p-4 border rounded-lg', className)}>
      <div className="flex-1">
        <h3 className="font-medium mb-1">{customConfig.title || 'Start a Chat'}</h3>
        {customConfig.description && (
          <p className="text-sm text-muted-foreground">{customConfig.description}</p>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleOpen} size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Open
        </Button>
        
        <Button variant="outline" size="sm" onClick={handleCopyLink}>
          {copiedLink ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );

  const renderFloatingButton = () => (
    <div className={cn(getPositionClasses(), className)}>
      <Button
        onClick={handleOpen}
        size={size}
        className={cn(
          'rounded-full shadow-lg hover:shadow-xl transition-all duration-200',
          getSizeClasses()
        )}
      >
        <MessageSquare className={getIconSize()} />
        {size !== 'sm' && <span className="ml-2">Chat</span>}
      </Button>
    </div>
  );

  if (variant === 'card') return renderCard();
  if (variant === 'modal' && isExpanded) return renderModal();
  if (variant === 'inline') return renderInline();
  if (position !== 'relative') return renderFloatingButton();
  
  return renderButton();
};

// Default configurations
export const defaultChatConfig: ChatConfig = {
  title: 'AI SDK Development Discussion',
  description: 'Let\'s discuss the implementation of AI SDK components',
  participants: [
    { id: '1', name: 'AI Assistant', type: 'bot' },
    { id: '2', name: 'John Doe', type: 'user' },
  ],
  context: 'Creating comprehensive storybook for AI SDK components',
  initialMessage: 'Hi! I need help with AI SDK development.',
  isPublic: false,
  allowAnonymous: false,
  maxParticipants: 10,
  tags: ['ai-sdk', 'development', 'storybook'],
};

export const quickChatConfig: ChatConfig = {
  title: 'Quick Question',
  initialMessage: 'I have a quick question about...',
  isPublic: true,
  allowAnonymous: true,
};

export const supportChatConfig: ChatConfig = {
  title: 'Support Chat',
  description: 'Get help from our support team',
  participants: [
    { id: '1', name: 'Support Bot', type: 'bot' },
    { id: '2', name: 'Support Agent', type: 'user' },
  ],
  context: 'Customer support and technical assistance',
  initialMessage: 'I need help with...',
  isPublic: false,
  maxParticipants: 3,
  tags: ['support', 'help'],
};