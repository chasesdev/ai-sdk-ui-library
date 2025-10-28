import React from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'default' | 'circle' | 'text' | 'card' | 'list';
  lines?: number;
  animate?: boolean;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = '1rem',
  className,
  variant = 'default',
  lines = 1,
  animate = true
}) => {
  const shimmerBase = cn(
    'bg-gray-200 dark:bg-gray-700',
    animate && 'animate-pulse',
    className
  );

  const renderShimmer = () => {
    switch (variant) {
      case 'circle':
        return (
          <div
            className={cn(shimmerBase, 'rounded-full')}
            style={{ width, height }}
          />
        );

      case 'text':
        return (
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  shimmerBase,
                  'rounded',
                  index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
                )}
                style={{ height }}
              />
            ))}
          </div>
        );

      case 'card':
        return (
          <div className={cn(shimmerBase, 'rounded-lg p-4')}>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/6" />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div
            className={cn(shimmerBase, 'rounded')}
            style={{ width, height }}
          />
        );
    }
  };

  return <>{renderShimmer()}</>;
};

// Predefined shimmer components for common use cases
export const TextShimmer: React.FC<Omit<ShimmerProps, 'variant'>> = (props) => (
  <Shimmer {...props} variant="text" />
);

export const CardShimmer: React.FC<Omit<ShimmerProps, 'variant'>> = (props) => (
  <Shimmer {...props} variant="card" />
);

export const ListShimmer: React.FC<Omit<ShimmerProps, 'variant'>> = (props) => (
  <Shimmer {...props} variant="list" />
);

export const AvatarShimmer: React.FC<Omit<ShimmerProps, 'variant'>> = (props) => (
  <Shimmer {...props} variant="circle" width={40} height={40} />
);

export const TitleShimmer: React.FC<Omit<ShimmerProps, 'variant'>> = (props) => (
  <Shimmer {...props} variant="default" height="2rem" className="rounded" />
);

export const ParagraphShimmer: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Shimmer
        key={index}
        variant="default"
        height="1rem"
        className={cn(
          'rounded',
          index === lines - 1 ? 'w-3/4' : 'w-full'
        )}
      />
    ))}
  </div>
);