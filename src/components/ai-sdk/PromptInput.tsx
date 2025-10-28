'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square, 
  Image as ImageIcon,
  FileText,
  Code,
  Link,
  X,
  Plus,
  Sparkles,
  Command,
  ArrowUp,
  ArrowDown,
  History,
  Settings,
  Lightbulb,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PromptAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  content?: string;
}

export interface PromptSuggestion {
  id: string;
  text: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
}

export interface PromptVariable {
  name: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  required?: boolean;
}

interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, attachments?: PromptAttachment[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  allowAttachments?: boolean;
  allowVoiceInput?: boolean;
  allowSuggestions?: boolean;
  allowVariables?: boolean;
  allowHistory?: boolean;
  suggestions?: PromptSuggestion[];
  variables?: PromptVariable[];
  attachments?: PromptAttachment[];
  history?: string[];
  layout?: 'default' | 'compact' | 'minimal' | 'expanded';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  autoResize?: boolean;
  showShortcuts?: boolean;
  shortcuts?: Record<string, string>;
  className?: string;
  onAttachmentAdd?: (files: File[]) => void;
  onAttachmentRemove?: (attachmentId: string) => void;
  onSuggestionSelect?: (suggestion: PromptSuggestion) => void;
  onVariableChange?: (name: string, value: string) => void;
  onHistorySelect?: (historyItem: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Type your prompt here...',
  disabled = false,
  maxLength,
  showCharCount = false,
  allowAttachments = true,
  allowVoiceInput = false,
  allowSuggestions = true,
  allowVariables = false,
  allowHistory = false,
  suggestions = [],
  variables = [],
  attachments = [],
  history = [],
  layout = 'default',
  size = 'md',
  variant = 'default',
  autoResize = true,
  showShortcuts = true,
  shortcuts = {
    'Ctrl+Enter': 'Send',
    'Ctrl+K': 'Search history',
    'Ctrl+/': 'Show shortcuts',
  },
  className,
  onAttachmentAdd,
  onAttachmentRemove,
  onSuggestionSelect,
  onVariableChange,
  onHistorySelect,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    variables.reduce((acc, v) => ({ ...acc, [v.name]: v.value || '' }), {})
  );
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const handleValueChange = (newValue: string) => {
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleSubmit = () => {
    if (!currentValue.trim() || disabled) return;
    
    const processedValue = replaceVariables(currentValue);
    onSubmit?.(processedValue, attachments);
    
    if (!isControlled) {
      setInternalValue('');
    }
    
    setShowSuggestions(false);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    
    if (e.key === 'ArrowDown' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }
    
    if (e.key === 'ArrowUp' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }
    
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setShowHistory(false);
      setShowVariables(false);
    }
    
    // Handle shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          handleSubmit();
          break;
        case 'k':
          e.preventDefault();
          setShowHistory(!showHistory);
          break;
        case '/':
          e.preventDefault();
          // Show shortcuts help
          break;
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onAttachmentAdd?.(files);
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const replaceVariables = (text: string): string => {
    let result = text;
    variables.forEach(variable => {
      const value = variableValues[variable.name] || variable.value || '';
      result = result.replace(new RegExp(`{{${variable.name}}}`, 'g'), value);
    });
    return result;
  };

  const handleSuggestionSelect = (suggestion: PromptSuggestion) => {
    handleValueChange(suggestion.text);
    setShowSuggestions(false);
    onSuggestionSelect?.(suggestion);
    textareaRef.current?.focus();
  };

  const handleHistorySelect = (historyItem: string) => {
    handleValueChange(historyItem);
    setShowHistory(false);
    onHistorySelect?.(historyItem);
    textareaRef.current?.focus();
  };

  const handleVariableChange = (name: string, value: string) => {
    const newValues = { ...variableValues, [name]: value };
    setVariableValues(newValues);
    onVariableChange?.(name, value);
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };
    return sizes[size];
  };

  const getVariantClasses = () => {
    const variants = {
      default: 'border-border',
      outlined: 'border-2 border-primary',
      filled: 'border-0 bg-muted',
    };
    return variants[variant];
  };

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentValue, autoResize]);

  const renderAttachments = () => {
    if (attachments.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-3">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center gap-2 bg-muted rounded-md p-2 text-sm"
          >
            {attachment.type.startsWith('image/') ? (
              <ImageIcon className="h-4 w-4" />
            ) : attachment.type.includes('code') ? (
              <Code className="h-4 w-4" />
            ) : attachment.type.includes('text') ? (
              <FileText className="h-4 w-4" />
            ) : (
              <Paperclip className="h-4 w-4" />
            )}
            <span className="truncate max-w-[150px]">{attachment.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={() => onAttachmentRemove?.(attachment.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return (
      <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
        <CardContent className="p-2">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={cn(
                'flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-muted',
                index === selectedSuggestionIndex && 'bg-muted'
              )}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion.icon || <Lightbulb className="h-4 w-4" />}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{suggestion.text}</div>
                {suggestion.description && (
                  <div className="text-xs text-muted-foreground truncate">
                    {suggestion.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderHistory = () => {
    if (!showHistory || history.length === 0) return null;

    return (
      <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
        <CardContent className="p-2">
          <div className="flex items-center gap-2 p-2 text-sm font-medium text-muted-foreground">
            <History className="h-4 w-4" />
            Recent Prompts
          </div>
          {history.map((item, index) => (
            <div
              key={index}
              className="p-2 rounded cursor-pointer hover:bg-muted text-sm"
              onClick={() => handleHistorySelect(item)}
            >
              <div className="truncate">{item}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderVariables = () => {
    if (!showVariables || variables.length === 0) return null;

    return (
      <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4" />
            <span className="font-medium text-sm">Variables</span>
          </div>
          <div className="space-y-3">
            {variables.map((variable) => (
              <div key={variable.name}>
                <label className="text-sm font-medium mb-1 block">
                  {variable.name}
                  {variable.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {variable.type === 'select' ? (
                  <select
                    value={variableValues[variable.name] || ''}
                    onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="">Select...</option>
                    {variable.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : variable.type === 'boolean' ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={variableValues[variable.name] === 'true'}
                      onChange={(e) => handleVariableChange(variable.name, e.target.checked.toString())}
                    />
                    <span className="text-sm">Enable</span>
                  </label>
                ) : (
                  <Input
                    type={variable.type}
                    value={variableValues[variable.name] || ''}
                    onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                    placeholder={`Enter ${variable.name}`}
                    className="text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderMinimal = () => (
    <div className="flex gap-2">
      <Input
        value={currentValue}
        onChange={(e) => handleValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={cn('flex-1', getSizeClasses(), getVariantClasses())}
      />
      <Button onClick={handleSubmit} disabled={!currentValue.trim() || disabled} size="sm">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderCompact = () => (
    <div className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={1}
          className={cn(
            'resize-none',
            getSizeClasses(),
            getVariantClasses(),
            autoResize && 'min-h-[40px] max-h-[120px]'
          )}
        />
        {renderSuggestions()}
        {renderHistory()}
        {renderVariables()}
      </div>
      <div className="flex gap-1">
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
        <Button onClick={handleSubmit} disabled={!currentValue.trim() || disabled} size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderDefault = () => (
    <Card className={cn('relative', className)}>
      <CardContent className="p-4">
        {renderAttachments()}
        
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={currentValue}
              onChange={(e) => handleValueChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (allowSuggestions && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              rows={3}
              className={cn(
                'resize-none border-0 focus-visible:ring-0 p-0 shadow-none',
                getSizeClasses(),
                autoResize && 'min-h-[60px] max-h-[200px]'
              )}
            />
            {renderSuggestions()}
            {renderHistory()}
            {renderVariables()}
          </div>
          
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
            
            {allowVoiceInput && (
              <Button
                variant={isRecording ? 'destructive' : 'outline'}
                size="sm"
                onClick={handleVoiceToggle}
              >
                {isRecording ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
            
            {allowSuggestions && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <Lightbulb className="h-4 w-4" />
              </Button>
            )}
            
            {allowVariables && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVariables(!showVariables)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
            
            {allowHistory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-4 w-4" />
              </Button>
            )}
            
            <Button onClick={handleSubmit} disabled={!currentValue.trim() || disabled}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {(showCharCount || maxLength) && (
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            {showCharCount && (
              <span>{currentValue.length} characters</span>
            )}
            {maxLength && (
              <span>{currentValue.length}/{maxLength}</span>
            )}
          </div>
        )}
        
        {showShortcuts && Object.keys(shortcuts).length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Command className="h-3 w-3" />
              <span>Shortcuts:</span>
              {Object.entries(shortcuts).slice(0, 2).map(([key, desc]) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}: {desc}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderExpanded = () => (
    <Card className={cn('relative', className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Prompt Input</h3>
        </div>
        
        {renderAttachments()}
        
        <div className="space-y-4">
          <Textarea
            ref={textareaRef}
            value={currentValue}
            onChange={(e) => handleValueChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rows={6}
            className={cn(
              'resize-none',
              getSizeClasses(),
              autoResize && 'min-h-[120px] max-h-[300px]'
            )}
          />
          
          {renderSuggestions()}
          {renderHistory()}
          {renderVariables()}
          
          <div className="flex items-center justify-between">
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
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                </>
              )}
              
              {allowVoiceInput && (
                <Button
                  variant={isRecording ? 'destructive' : 'outline'}
                  onClick={handleVoiceToggle}
                >
                  {isRecording ? (
                    <Square className="h-4 w-4 mr-2" />
                  ) : (
                    <Mic className="h-4 w-4 mr-2" />
                  )}
                  {isRecording ? 'Stop Recording' : 'Voice Input'}
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                Enhance
              </Button>
              <Button onClick={handleSubmit} disabled={!currentValue.trim() || disabled}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
        
        {(showCharCount || maxLength) && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentValue.length} characters</span>
              {maxLength && <span>{currentValue.length}/{maxLength}</span>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const layouts = {
    minimal: renderMinimal,
    compact: renderCompact,
    default: renderDefault,
    expanded: renderExpanded,
  };

  return layouts[layout]();
};

// Default suggestions
export const defaultSuggestions: PromptSuggestion[] = [
  {
    id: '1',
    text: 'Explain the concept of machine learning',
    description: 'Get a detailed explanation of ML concepts',
    category: 'education',
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    id: '2',
    text: 'Write a React component for a todo list',
    description: 'Generate a React todo component with TypeScript',
    category: 'coding',
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: '3',
    text: 'Help me debug this error',
    description: 'Get help with debugging code issues',
    category: 'debugging',
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: '4',
    text: 'Create a story for this component',
    description: 'Generate Storybook stories for React components',
    category: 'documentation',
    icon: <FileText className="h-4 w-4" />,
  },
];

// Default variables
export const defaultVariables: PromptVariable[] = [
  {
    name: 'name',
    value: '',
    type: 'text',
    required: true,
  },
  {
    name: 'language',
    value: 'TypeScript',
    type: 'select',
    options: ['TypeScript', 'JavaScript', 'Python', 'Java'],
  },
  {
    name: 'includeTests',
    value: 'false',
    type: 'boolean',
  },
];