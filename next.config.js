module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
};
