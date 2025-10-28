'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook for detecting mobile viewport based on a breakpoint
 * @param breakpoint - Width in pixels below which is considered mobile (default: 768)
 * @returns boolean indicating if current viewport is mobile
 */
export const useMobileDetection = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (handles SSR)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
};
