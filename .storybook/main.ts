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
  managerHead: (head) => `
    ${head}
    <base href="/storybook/">
  `,
};

export default config;
