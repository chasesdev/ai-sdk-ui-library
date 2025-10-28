import React from 'react';
import { Brain, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReasoningStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  evidence?: string[];
}

export interface ReasoningProps {
  steps: ReasoningStep[];
  title?: string;
  showEvidence?: boolean;
  layout?: 'vertical' | 'horizontal' | 'compact';
  className?: string;
}

export const Reasoning: React.FC<ReasoningProps> = ({
  steps,
  title = 'Reasoning Process',
  showEvidence = true,
  layout = 'vertical',
  className
}) => {
  const getStepIcon = (status: ReasoningStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const isCompact = layout === 'compact';
  const isHorizontal = layout === 'horizontal';

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
      </div>

      <div className={cn(
        'space-y-3',
        isHorizontal && 'flex gap-4 overflow-x-auto pb-2',
        isCompact && 'space-y-2'
      )}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'relative',
              !isHorizontal && !isCompact && index < steps.length - 1 && 'pb-3',
              isHorizontal && 'flex-shrink-0 min-w-64'
            )}
          >
            <div className={cn(
              'flex items-start gap-3',
              isHorizontal && 'flex-col'
            )}>
              <div className="flex items-center gap-2">
                {getStepIcon(step.status)}
                {!isHorizontal && index < steps.length - 1 && (
                  <div className="absolute left-5 top-8 w-0.5 h-12 bg-gray-200 dark:bg-gray-600" />
                )}
                {isHorizontal && index < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400 mt-1" />
                )}
              </div>

              <div className={cn(
                'flex-1',
                isCompact && 'ml-7'
              )}>
                <h4 className={cn(
                  'font-medium text-gray-900 dark:text-gray-100',
                  isCompact ? 'text-sm' : 'text-base'
                )}>
                  {step.title}
                </h4>
                
                {!isCompact && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {step.description}
                  </p>
                )}

                {showEvidence && step.evidence && step.evidence.length > 0 && !isCompact && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Evidence:
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {step.evidence.map((evidence, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-gray-400">•</span>
                          <span>{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};