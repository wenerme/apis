const moment = require('moment');
const {flow} = require('lodash');

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const withPWA = require('next-pwa')
const withCss = require('@zeit/next-css');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});
const withSass = require('@zeit/next-sass');
const withTranspile = require('next-transpile-modules');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// andt less - 无法很好的限定 dark - 不全局
// const fs = require('fs');
// const path = require('path');
// const withLess = require('@zeit/next-less');
// const lessToJS = require('less-vars-to-js');
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
// );
// const themeVariables = require('antd/dist/dark-theme');

// 环境变量
const env = {
  APP_VERSION: moment().format('YYYYMMDD'),
  APP_BUILD_DATE: moment().format('YYYY-MM-DD hh:mm:ss'),
};

// 不同环境配置
const envs = {
  default: {},
  dev: {},
  prod: {},
  staging: {},
};

// 添加环境变量
Object.assign(env, require('dotenv').config().parsed);

const config = {
  // distDir: 'dist',
  webpack: (config, {isServer}) => {
    // https://github.com/zeit/next.js/issues/7779
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin()];

    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    // https://github.com/zeit/next.js/blob/canary/examples/with-ant-design/next.config.js
    // antd 模块 css 处理
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    // antd 模块 less 处理
    // if (isServer) {
    //   const antStyles = /antd\/.*?\/style.*?/;
    //   const origExternals = [...config.externals];
    //   config.externals = [
    //     (context, request, callback) => {
    //       if (request.match(antStyles)) return callback();
    //       if (typeof origExternals[0] === 'function') {
    //         origExternals[0](context, request, callback)
    //       } else {
    //         callback()
    //       }
    //     },
    //     ...(typeof origExternals[0] === 'function' ? [] : origExternals),
    //   ];
    //
    //   config.module.rules.unshift({
    //     test: antStyles,
    //     use: 'null-loader',
    //   })
    // }

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  //
  env,
  // no X-Powered-By header
  poweredByHeader: false,
  // next-sass next-css
  // cssModules: true,

  // antd less
  // lessLoaderOptions: {
  //   javascriptEnabled: true,
  //   modifyVars: themeVariables, // make your antd custom effective
  // },
};

module.exports = (phase, {defaultConfig}) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  // 按环境合并配置
  let envType = 'dev';
  if (isStaging) {
    envType = 'staging'
  } else if (isProd) {
    envType = 'prod'
  }
  Object.assign(env, envs.default, envs[envType]);

  return flow([
    // withLess,
    withSass,
    withCss,
    withMDX,
    // withTranspile,
    withBundleAnalyzer,
    // withPWA,
  ])(config)
};
