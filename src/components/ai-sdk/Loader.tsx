'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Brain, Zap, RefreshCw, Download, Upload, Search, Cpu } from 'lucide-react';

export interface LoaderProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'brain' | 'typing' | 'progress' | 'skeleton';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';
  speed?: 'slow' | 'normal' | 'fast';
  text?: string;
  progress?: number;
  showProgress?: boolean;
  infinite?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'primary',
  speed = 'normal',
  text,
  progress,
  showProgress = false,
  infinite = true,
  className,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (progress !== undefined) {
      setCurrentProgress(progress);
    }
  }, [progress]);

  const getSizeClasses = () => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };
    return sizes[size];
  };

  const getColorClasses = () => {
    const colors = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
      muted: 'text-muted-foreground',
    };
    return colors[color];
  };

  const getAnimationDuration = () => {
    const durations = {
      slow: '3s',
      normal: '1.5s',
      fast: '0.8s',
    };
    return durations[speed];
  };

  const renderSpinner = () => (
    <Loader2 
      className={cn(
        'animate-spin',
        getSizeClasses(),
        getColorClasses(),
        className
      )}
      style={{ animationDuration: getAnimationDuration() }}
    />
  );

  const renderDots = () => {
    const dotSize = {
      sm: 'w-1 h-1',
      md: 'w-2 h-2',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
    }[size];

    return (
      <div className={cn('flex gap-1', className)}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              dotSize,
              getColorClasses(),
              'rounded-full animate-bounce'
            )}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: getAnimationDuration(),
            }}
          />
        ))}
      </div>
    );
  };

  const renderPulse = () => (
    <div
      className={cn(
        'rounded-full animate-pulse',
        getSizeClasses(),
        getColorClasses(),
        'bg-current',
        className
      )}
      style={{ animationDuration: getAnimationDuration() }}
    />
  );

  const renderBars = () => {
    const barSize = {
      sm: 'w-1 h-4',
      md: 'w-1 h-6',
      lg: 'w-2 h-8',
      xl: 'w-2 h-12',
    }[size];

    return (
      <div className={cn('flex gap-1 items-end', className)}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              barSize,
              getColorClasses(),
              'bg-current rounded-sm animate-pulse'
            )}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: getAnimationDuration(),
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          />
        ))}
      </div>
    );
  };

  const renderBrain = () => (
    <div className={cn('relative', getSizeClasses(), className)}>
      <Brain 
        className={cn(
          'w-full h-full animate-pulse',
          getColorClasses()
        )}
        style={{ animationDuration: getAnimationDuration() }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                'w-1 h-1 rounded-full bg-current',
                getColorClasses()
              )}
              style={{
                animation: `ping ${getAnimationDuration()} infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderTyping = () => {
    const dotSize = {
      sm: 'w-1 h-1',
      md: 'w-2 h-2',
      lg: 'w-2 h-2',
      xl: 'w-3 h-3',
    }[size];

    return (
      <div className={cn('flex gap-1', className)}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              dotSize,
              getColorClasses(),
              'rounded-full'
            )}
            style={{
              animation: `typing ${getAnimationDuration()} infinite`,
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  };

  const renderProgress = () => {
    const height = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    }[size];

    return (
      <div className={cn('w-full', height, className)}>
        <div className="relative w-full h-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full bg-current transition-all duration-300 ease-out',
              getColorClasses()
            )}
            style={{ width: `${currentProgress}%` }}
          />
          {showProgress && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium bg-background px-1">
                {Math.round(currentProgress)}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSkeleton = () => {
    const height = {
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
      xl: 'h-12',
    }[size];

    return (
      <div className={cn('w-full space-y-2', className)}>
        <div
          className={cn(
            height,
            'bg-muted rounded animate-pulse'
          )}
          style={{ animationDuration: getAnimationDuration() }}
        />
        {size !== 'sm' && (
          <div
            className={cn(
              'h-4 bg-muted rounded animate-pulse w-3/4'
            )}
            style={{ 
              animationDuration: getAnimationDuration(),
              animationDelay: '0.2s'
            }}
          />
        )}
        {size === 'lg' || size === 'xl' ? (
          <div
            className={cn(
              'h-4 bg-muted rounded animate-pulse w-1/2'
            )}
            style={{ 
              animationDuration: getAnimationDuration(),
              animationDelay: '0.4s'
            }}
          />
        ) : null}
      </div>
    );
  };

  const loaders = {
    spinner: renderSpinner,
    dots: renderDots,
    pulse: renderPulse,
    bars: renderBars,
    brain: renderBrain,
    typing: renderTyping,
    progress: renderProgress,
    skeleton: renderSkeleton,
  };

  const renderLoader = () => {
    const LoaderComponent = loaders[type];
    return <LoaderComponent />;
  };

  if (type === 'skeleton') {
    return renderLoader();
  }

  return (
    <div className="flex items-center gap-2">
      {renderLoader()}
      {text && (
        <span className={cn('text-sm', getColorClasses())}>
          {text}
        </span>
      )}
    </div>
  );
};

// Preset loader configurations
export const LoadingStates = {
  // Basic loading states
  spinner: <Loader type="spinner" />,
  dots: <Loader type="dots" />,
  pulse: <Loader type="pulse" />,
  bars: <Loader type="bars" />,
  
  // AI-specific loading states
  thinking: <Loader type="brain" text="Thinking..." />,
  generating: <Loader type="brain" text="Generating response..." />,
  processing: <Loader type="bars" text="Processing..." />,
  typing: <Loader type="typing" text="AI is typing..." />,
  
  // Action-specific loading states
  uploading: <Loader type="progress" text="Uploading..." progress={65} />,
  downloading: <Loader type="progress" text="Downloading..." progress={35} />,
  searching: <Loader type="spinner" text="Searching..." />,
  analyzing: <Loader type="brain" text="Analyzing data..." />,
  
  // Size variations
  small: <Loader type="spinner" size="sm" />,
  large: <Loader type="spinner" size="lg" />,
  xlarge: <Loader type="spinner" size="xl" />,
  
  // Color variations
  success: <Loader type="spinner" color="success" />,
  warning: <Loader type="spinner" color="warning" />,
  error: <Loader type="spinner" color="error" />,
  
  // Speed variations
  slow: <Loader type="spinner" speed="slow" />,
  fast: <Loader type="spinner" speed="fast" />,
  
  // Progress indicators
  progress: <Loader type="progress" progress={75} showProgress />,
  indeterminate: <Loader type="progress" infinite />,
  
  // Content placeholders
  textSkeleton: <Loader type="skeleton" size="md" />,
  titleSkeleton: <Loader type="skeleton" size="lg" />,
  cardSkeleton: <Loader type="skeleton" size="xl" />,
};

// Specialized loader components
export const AILoader: React.FC<{ text?: string; size?: LoaderProps['size'] }> = ({ 
  text = 'AI is thinking...', 
  size = 'md' 
}) => (
  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
    <Loader type="brain" size={size} />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export const ChatLoader: React.FC<{ text?: string }> = ({ 
  text = 'AI is typing...' 
}) => (
  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
    <Loader type="typing" size="sm" />
    <span className="text-sm text-primary">{text}</span>
  </div>
);

export const ProgressLoader: React.FC<{ 
  progress?: number; 
  text?: string; 
  showPercentage?: boolean 
}> = ({ 
  progress = 0, 
  text, 
  showPercentage = true 
}) => (
  <div className="w-full space-y-2">
    {text && <p className="text-sm font-medium">{text}</p>}
    <Loader 
      type="progress" 
      progress={progress} 
      showProgress={showPercentage}
      size="md"
    />
  </div>
);

export const FullScreenLoader: React.FC<{ text?: string }> = ({ 
  text = 'Loading...' 
}) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <Loader type="brain" size="xl" />
      <p className="text-lg font-medium">{text}</p>
    </div>
  </div>
);

export const InlineLoader: React.FC<{ text?: string }> = ({ 
  text = 'Loading...' 
}) => (
  <span className="inline-flex items-center gap-2">
    <Loader type="spinner" size="sm" />
    <span className="text-sm">{text}</span>
  </span>
);