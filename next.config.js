const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// https://github.com/JerryCauser/next-compose/blob/master/index.js
const compose = plugins => ({
    webpack(config, options) {
        return plugins.reduce((config, plugin) => {
            if (plugin instanceof Array) {
                const [_plugin, ...args] = plugin;
                plugin = _plugin(...args)
            }
            if (plugin instanceof Function) {
                plugin = plugin()
            }
            if (plugin && plugin.webpack instanceof Function) {
                return plugin.webpack(config, options)
            }
            return config
        }, config)
    },

    webpackDevMiddleware(config) {
        return plugins.reduce((config, plugin) => {
            if (plugin instanceof Array) {
                const [_plugin, ...args] = plugin;
                plugin = _plugin(...args)
            }
            if (plugin instanceof Function) {
                plugin = plugin()
            }
            if (plugin && plugin.webpackDevMiddleware instanceof Function) {
                return plugin.webpackDevMiddleware(config)
            }
            return config
        }, config)
    }
});

const withCss = require('@zeit/next-css');
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
});
const withSass = require('@zeit/next-sass');
const withTM = require('next-transpile-modules');

// 环境变量
const env = {};
// 不同环境配置
const envs = {
    default: {},
    dev: {},
    prod: {},
    staging: {},
};

// 添加环境变量
require('dotenv').config();
// no filter
Object.assign(env, process.env);

const config = {
    // distDir: 'dist',
    webpack: (config, {isServer}) => {
        // https://github.com/zeit/next.js/issues/7779
        const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
        if (config.resolve.plugins) {
            config.resolve.plugins.push(new TsconfigPathsPlugin());
        } else {
            config.resolve.plugins = [new TsconfigPathsPlugin()];
        }

        // // antd 模块 css 处理
        // // 目前没有加 babel 插件 - 没有生效 - 因为编译异常 - 可能需要 css loader
        // if (isServer) {
        //     const antStyles = /antd\/.*?\/style\/css.*?/;
        //     const origExternals = [...config.externals];
        //     config.externals = [
        //         (context, request, callback) => {
        //             if (request.match(antStyles)) return callback();
        //             if (typeof origExternals[0] === 'function') {
        //                 origExternals[0](context, request, callback)
        //             } else {
        //                 callback()
        //             }
        //         },
        //         ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        //     ];
        //
        //     config.module.rules.unshift({
        //         test: antStyles,
        //         use: 'null-loader',
        //     })
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

    // return withTM(withSass(withMDX(config)));
    return compose([
        // [withTM, {}],
        [withSass, {}],
        [withCss, {}],
        [withMDX, {}],
        config
    ])
};
