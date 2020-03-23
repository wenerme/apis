const path = require('path');
module.exports = ({config}) => {


  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {parser: 'typescript'},
      },
    ],
    enforce: 'pre',
  });


  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [require.resolve('babel-preset-react-app')],
    },
  });

  config.module.rules.push({
    test: /\.s?css$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.extensions.push('.ts', '.tsx', '.css', '.scss', '.mdx', '.md');
  return config;
};
