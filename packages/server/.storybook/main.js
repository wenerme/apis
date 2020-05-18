const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.(js|ts|tsx|mdx)','../src/components/**/*.stories.(ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
  ],
};
