import React, { useState } from 'react';
import { 
  Wrench, 
  Play, 
  Settings, 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  required?: boolean;
  default?: any;
  enum?: any[];
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  executionTime?: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category?: string;
  parameters?: ToolParameter[];
  result?: ToolResult;
  status: 'idle' | 'running' | 'success' | 'error';
  executionTime?: number;
  icon?: React.ReactNode;
}

export interface ToolProps {
  tool: Tool;
  expanded?: boolean;
  showParameters?: boolean;
  showResult?: boolean;
  onExecute?: (toolId: string, parameters?: Record<string, any>) => void;
  onReset?: (toolId: string) => void;
  className?: string;
}

export const Tool: React.FC<ToolProps> = ({
  tool,
  expanded = false,
  showParameters = true,
  showResult = true,
  onExecute,
  onReset,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState(false);

  const getStatusIcon = () => {
    switch (tool.status) {
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Wrench className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (tool.status) {
      case 'running':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
    }
  };

  const handleParameterChange = (name: string, value: any) => {
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const handleExecute = () => {
    if (onExecute) {
      onExecute(tool.id, parameters);
    }
  };

  const handleReset = () => {
    setParameters({});
    if (onReset) {
      onReset(tool.id);
    }
  };

  const handleCopyResult = async () => {
    if (tool.result?.data) {
      await navigator.clipboard.writeText(JSON.stringify(tool.result.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDefaultValue = (param: ToolParameter) => {
    if (param.default !== undefined) return param.default;
    switch (param.type) {
      case 'string': return '';
      case 'number': return 0;
      case 'boolean': return false;
      case 'array': return [];
      case 'object': return {};
      default: return '';
    }
  };

  return (
    <Card className={cn('transition-all duration-200', getStatusColor(), className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {tool.icon || getStatusIcon()}
                <CardTitle className="text-lg">{tool.name}</CardTitle>
              </div>
              {tool.category && (
                <Badge variant="secondary" className="text-xs">
                  {tool.category}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {tool.executionTime && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {tool.executionTime}ms
                </span>
              )}

              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-8 w-8 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CardDescription className="text-sm">
            {tool.description}
          </CardDescription>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4">
          {showParameters && tool.parameters && tool.parameters.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Parameters
              </h4>
              <div className="space-y-2">
                {tool.parameters.map((param) => (
                  <div key={param.name} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {param.name}
                      </label>
                      {param.required && (
                        <span className="text-xs text-red-500">*</span>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {param.type}
                      </Badge>
                    </div>
                    
                    {param.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {param.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2">
                      {param.type === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={parameters[param.name] ?? getDefaultValue(param)}
                          onChange={(e) => handleParameterChange(param.name, e.target.checked)}
                          className="rounded border-gray-300"
                          disabled={tool.status === 'running'}
                        />
                      ) : param.enum ? (
                        <select
                          value={parameters[param.name] ?? getDefaultValue(param)}
                          onChange={(e) => handleParameterChange(param.name, e.target.value)}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                          disabled={tool.status === 'running'}
                        >
                          <option value="">Select an option</option>
                          {param.enum.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={param.type === 'number' ? 'number' : 'text'}
                          value={parameters[param.name] ?? getDefaultValue(param)}
                          onChange={(e) => {
                            const value = param.type === 'number' 
                              ? Number(e.target.value) 
                              : e.target.value;
                            handleParameterChange(param.name, value);
                          }}
                          placeholder={param.default ? `Default: ${param.default}` : ''}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                          disabled={tool.status === 'running'}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              onClick={handleExecute}
              disabled={tool.status === 'running'}
              size="sm"
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              {tool.status === 'running' ? 'Running...' : 'Execute'}
            </Button>
            
            {(tool.status === 'success' || tool.status === 'error') && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Reset
              </Button>
            )}
          </div>

          {showResult && tool.result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Result
                </h4>
                {tool.result.data && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyResult}
                    className="h-6 px-2 text-xs"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              <div className={cn(
                'p-3 rounded-md text-sm font-mono',
                tool.result.success 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
              )}>
                {tool.result.success ? (
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(tool.result.data, null, 2)}
                  </pre>
                ) : (
                  <p>{tool.result.error}</p>
                )}
              </div>
              
              {tool.result.executionTime && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Execution time: {tool.result.executionTime}ms
                </p>
              )}
            </div>
          )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};