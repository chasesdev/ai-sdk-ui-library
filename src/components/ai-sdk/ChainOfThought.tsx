'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronRight, Brain, Lightbulb, Target, Zap, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThoughtStep {
  id: string;
  title: string;
  description?: string;
  content: string;
  status?: 'pending' | 'thinking' | 'completed' | 'error';
  type?: 'analysis' | 'synthesis' | 'evaluation' | 'conclusion';
  metadata?: Record<string, any>;
  substeps?: ThoughtStep[];
}

interface ChainOfThoughtProps {
  steps: ThoughtStep[];
  layout?: 'linear' | 'tree' | 'compact' | 'detailed';
  showProgress?: boolean;
  collapsible?: boolean;
  interactive?: boolean;
  showTypes?: boolean;
  showMetadata?: boolean;
  animated?: boolean;
  className?: string;
}

export const ChainOfThought: React.FC<ChainOfThoughtProps> = ({
  steps,
  layout = 'linear',
  showProgress = true,
  collapsible = true,
  interactive = true,
  showTypes = true,
  showMetadata = false,
  animated = true,
  className,
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState<string>('');

  const toggleExpanded = (stepId: string) => {
    if (!collapsible) return;
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const handleStepClick = (stepId: string) => {
    if (interactive) {
      setCurrentStep(stepId);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'thinking':
        return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'error':
        return <Circle className="h-4 w-4 text-red-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'analysis':
        return <Target className="h-4 w-4 text-purple-500" />;
      case 'synthesis':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'evaluation':
        return <Zap className="h-4 w-4 text-orange-500" />;
      case 'conclusion':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  const getProgressPercentage = () => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    return (completedSteps / steps.length) * 100;
  };

  const renderLinearLayout = () => (
    <div className="space-y-3">
      {showProgress && (
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="w-full h-1.5" />
        </div>
      )}

      {steps.map((step, index) => (
        <div key={step.id} className="relative">
          {index < steps.length - 1 && (
            <div className="absolute left-5 top-10 h-full w-px bg-border/50" />
          )}

          <div
            className={cn(
              'group relative rounded-lg border bg-card transition-all duration-200',
              currentStep === step.id && 'border-primary/50 bg-primary/5',
              interactive && 'cursor-pointer hover:border-primary/30 hover:bg-accent/50',
              animated && 'animate-in fade-in duration-300'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center gap-2 mt-0.5">
                    {getStatusIcon(step.status)}
                    {showTypes && getTypeIcon(step.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold leading-none">{step.title}</h4>
                      {showTypes && step.type && (
                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                          {step.type}
                        </Badge>
                      )}
                    </div>
                    {step.description && (
                      <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    )}
                    <p className="text-sm text-foreground/80 leading-relaxed">{step.content}</p>

                    {showMetadata && step.metadata && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {Object.entries(step.metadata).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-[10px] h-5 px-2 font-normal">
                            {String(value)}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {collapsible && step.substeps && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(step.id);
                    }}
                  >
                    {expandedSteps.has(step.id) ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </Button>
                )}
              </div>

              {step.substeps && expandedSteps.has(step.id) && (
                <div className="mt-4 ml-8 space-y-2 border-l-2 border-border/50 pl-4">
                  {step.substeps.map((substep) => (
                    <div key={substep.id} className="flex items-start gap-2">
                      {getStatusIcon(substep.status)}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium mb-0.5">{substep.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{substep.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompactLayout = () => (
    <div className="space-y-1.5">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            'flex items-center gap-3 p-3 border rounded-lg transition-all duration-200',
            currentStep === step.id && 'bg-primary/5 border-primary/50',
            interactive && 'cursor-pointer hover:bg-accent/50 hover:border-primary/30'
          )}
          onClick={() => handleStepClick(step.id)}
        >
          {getStatusIcon(step.status)}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-medium">{step.title}</span>
              {showTypes && step.type && (
                <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                  {step.type}
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground truncate">{step.content}</div>
          </div>
          {index < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
        </div>
      ))}
    </div>
  );

  const renderDetailedLayout = () => (
    <div className="space-y-4">
      {showProgress && (
        <div className="rounded-lg border bg-card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Thinking Progress</h3>
            <Progress value={getProgressPercentage()} className="w-full h-1.5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-blue-500">
                {steps.filter(s => s.status === 'thinking').length}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Thinking</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-500">
                {steps.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-500">
                {steps.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Pending</div>
            </div>
            <div>
              <div className="text-xl font-bold text-red-500">
                {steps.filter(s => s.status === 'error').length}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">Errors</div>
            </div>
          </div>
        </div>
      )}

      {steps.map((step, index) => (
        <div key={step.id} className="rounded-lg border bg-card transition-all duration-200">
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex items-center gap-2 mt-0.5">
                  {getStatusIcon(step.status)}
                  {showTypes && getTypeIcon(step.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    {showTypes && step.type && (
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 capitalize">
                        {step.type}
                      </Badge>
                    )}
                  </div>
                  {step.description && (
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 ml-2">Step {index + 1}</span>
            </div>

            <div className="text-sm text-foreground/80 leading-relaxed">
              {step.content}
            </div>

            {showMetadata && step.metadata && (
              <div className="mt-4 rounded-md border bg-muted/30 p-3">
                <h4 className="text-xs font-semibold mb-2">Metadata</h4>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(step.metadata).map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-[10px] h-5 px-2 font-normal">
                      <span className="font-medium">{key}:</span> {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {step.substeps && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold mb-2">Substeps</h4>
                <div className="space-y-2 border-l-2 border-border/50 pl-4">
                  {step.substeps.map((substep) => (
                    <div key={substep.id} className="flex items-start gap-2">
                      {getStatusIcon(substep.status)}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium mb-0.5">{substep.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{substep.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const layouts = {
    linear: renderLinearLayout,
    compact: renderCompactLayout,
    detailed: renderDetailedLayout,
  };

  return (
    <div className={cn('w-full', className)}>
      {layouts[layout]()}
    </div>
  );
};

// Default chain of thought steps
export const defaultChainSteps: ThoughtStep[] = [
  {
    id: '1',
    title: 'Analyze the Problem',
    description: 'Break down the user request into key components',
    content: 'The user wants to build a comprehensive storybook for AI SDK components. This involves creating multiple components with different layouts and interactions.',
    status: 'completed',
    type: 'analysis',
    metadata: { confidence: 0.95, timeSpent: '2.3s' },
  },
  {
    id: '2',
    title: 'Identify Required Components',
    description: 'List all components that need to be created',
    content: 'Based on the AI SDK documentation, I need to create 31 components including Actions, Branch, Chain of Thought, etc.',
    status: 'completed',
    type: 'analysis',
    metadata: { componentCount: 31, complexity: 'high' },
  },
  {
    id: '3',
    title: 'Design Component Architecture',
    description: 'Plan the structure and relationships between components',
    content: 'Each component should be self-contained with proper TypeScript interfaces and multiple story variants.',
    status: 'thinking',
    type: 'synthesis',
    metadata: { patterns: ['atomic design', 'story-driven'], estimatedTime: '45min' },
    substeps: [
      {
        id: '3a',
        title: 'Define interfaces',
        content: 'Create TypeScript interfaces for props and state',
        status: 'completed',
        type: 'analysis',
      },
      {
        id: '3b',
        title: 'Plan stories',
        content: 'Design comprehensive story variants for each component',
        status: 'thinking',
        type: 'synthesis',
      },
    ],
  },
  {
    id: '4',
    title: 'Implement Components',
    description: 'Build each component with proper styling and interactions',
    content: 'Create components using shadcn/ui primitives with responsive design and accessibility features.',
    status: 'pending',
    type: 'synthesis',
  },
  {
    id: '5',
    title: 'Review and Refine',
    description: 'Test components and ensure quality standards',
    content: 'Validate all components work correctly in Storybook with proper documentation.',
    status: 'pending',
    type: 'evaluation',
  },
];