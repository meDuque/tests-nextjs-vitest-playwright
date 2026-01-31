import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs', '@storybook/test'],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['..\\public'],
  features: {
    backgrounds: false,
  },
};
export default config;
