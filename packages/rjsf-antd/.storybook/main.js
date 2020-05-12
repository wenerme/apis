const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.(js|ts|tsx|mdx)', '../src/**/*.stories.(js|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
  ],
};
