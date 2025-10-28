import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {},
  // staticDirs removed to prevent circular copy when building to public/storybook/

  // Set base path for production deployment at /storybook/
  managerHead: (head) => {
    // Only set base href in production build
    if (process.env.NODE_ENV === 'production') {
      return `
        ${head}
        <base href="/storybook/">
      `;
    }
    return head;
  },
};

export default config;
