'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@storybook/addon-docs/blocks';

interface LazyCanvasProps {
  of: any;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Lazy-loading wrapper for Storybook Canvas component using Intersection Observer
 * Only renders the Canvas when the component is visible or about to become visible
 *
 * @param of - Story reference to render
 * @param threshold - Intersection threshold (0-1, default: 0.1)
 * @param rootMargin - How far ahead to preload (default: '200px')
 */
export const LazyCanvas: React.FC<LazyCanvasProps> = ({
  of,
  threshold = 0.1,
  rootMargin = '200px'
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Intersection Observer is available
    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          // Disconnect after first render to save resources
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: shouldRender ? 'auto' : '200px' }}
    >
      {shouldRender ? (
        <Canvas of={of} />
      ) : (
        <div
          className="canvas-placeholder"
          style={{
            background: 'var(--bg-muted, #f3f4f6)',
            borderRadius: '8px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted, #6b7280)',
            fontSize: '0.875rem'
          }}
        >
          Loading component...
        </div>
      )}
    </div>
  );
};
