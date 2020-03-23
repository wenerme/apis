const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.(js|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-info',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    // https://www.npmjs.com/package/@storybook/preset-typescript
    // {
    //   name: '@storybook/preset-typescript',
    //   options: {
    //     tsLoaderOptions: {
    //       configFile: path.resolve(__dirname, '../tsconfig.ts-node.json'),
    //     },
    //     forkTsCheckerWebpackPluginOptions: {
    //       colors: false, // disables built-in colors in logger messages
    //     },
    //     include: [path.resolve(__dirname, '../stories')],
    //     transpileManager: true,
    //   },
    // }
  ],
};
