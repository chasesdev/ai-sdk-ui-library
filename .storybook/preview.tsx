import type { Preview, Decorator } from '@storybook/react';
import React, { useEffect } from 'react';
import '../src/app/globals.css';

// Decorator to apply dark mode class based on background selection
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
