module.exports = {
  stories: ['../stories/**/*.stories.@(js|ts|tsx|mdx)', '../src/**/*.stories.@(js|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
  ],
};
