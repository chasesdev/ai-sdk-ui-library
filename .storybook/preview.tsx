import type { Preview, Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import '../src/app/globals.css';

// Decorator to apply dark mode class and mobile optimizations
const withTheme: Decorator = (Story, context) => {
  const background = context.globals.backgrounds?.value;

  useEffect(() => {
    const isDark = background === '#1a1a1a' || background === 'dark';

    // Apply dark class to html element
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Add mobile optimization styles
    const styleId = 'mobile-optimization-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Mobile optimizations for Storybook Overview */
        @media (max-width: 768px) {
          /* Smoother scrolling on mobile */
          .sbdocs-content {
            scroll-behavior: smooth;
          }

          /* Optimize Canvas spacing on mobile */
          .docs-story {
            margin: 1rem 0;
          }
        }

        /* Shimmer animation for loading placeholders */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .canvas-placeholder {
          animation: shimmer 1.5s ease-in-out infinite;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
        }

        .dark .canvas-placeholder {
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
        }
      `;
      document.head.appendChild(style);
    }

    // Open first category on mobile
    if (window.innerWidth <= 768) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        const firstCategory = document.querySelector('.sbdocs-content > details');
        if (firstCategory && !firstCategory.hasAttribute('open')) {
          firstCategory.setAttribute('open', '');
        }
      }, 100);
    }
  }, [background]);

  return <Story />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    options: {
      storySort: {
        order: [
          'AI SDK Components',
          ['Overview', '*'],
        ],
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
