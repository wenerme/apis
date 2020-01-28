const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// const withCSS = require('@zeit/next-css');
// const withMDX = require('@next/mdx')({
//     extension: /\.mdx?$/
// });
// const withSass = require('@zeit/next-sass');
// const withTM = require('next-transpile-modules');

// 环境变量
const env = {};
// 不同环境配置
const envs = {
    default: {},
    dev: {},
    prod: {},
    staging: {},
};

const config = {
    // distDir: 'dist',
    webpack: (config, options) => {
        // https://github.com/zeit/next.js/issues/7779
        const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsPlugin());
        } else {
            config.resolve.plugins = [new TsconfigPathsPlugin()];
        }

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
};

module.exports = phase => {
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

    // return withTM(withSass(withCSS(withMDX(config))));
    return config;
};
