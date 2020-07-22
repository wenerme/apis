import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';

function buildMod(mod) {
  if (!mod) {
    throw new Error('no MOD_NAME');
  }
  const libraryName = `wener-apis-${mod}`;
  const input = `src/modules/${mod}/index.ts`;

  const dev = process.env.NODE_ENV !== 'production';
  const dir = `public/modules`;

  const external = [
    /^@wener[/]apis-/,
    // react
    'react',
    'react-dom',
    'react-is',
    'immer',
    'react-query',
    'react-router-dom',
    'prop-types',
    // load failed - cjs
    // 'react-helmet',
    // 'react-loadable',
    // utils
    'lodash',
    'tslib',
    // ui
    'antd',
    '@ant-design/icons',
    // wener
    '@wener/ui',
    '@wener/ui/icons',
    '@wener/ui/antds',
    '@wener/utils',
    // spa
    'single-spa',
    'single-spa-layout',
    // 'single-spa-react',

    //
    // /^@babel[/]runtime/,

    // geo
    // 'console-feed',
  ];

  /* Common Rollup Script
   * =====================
   */

  function onwarn(warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.warn(warning.code, warning.message);
  }

  return [
    {
      input,
      plugins: [
        alias({
          entries: [
            {
              find: new RegExp(`^src[/]modules[/](\\w+(?!${mod}))$`),
              replacement: '@wener/apis-$1',
            },
          ],
        }),
        nodeResolve({ browser: true, extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
        babel({
          babelHelpers: 'bundled',
          // babelHelpers: 'runtime',
          // babelHelpers: 'inline',
          babelrc: false,
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            // ['@babel/plugin-transform-runtime',{
            // // absoluteRuntime:true,
            // //   corejs: 3,
            //   helper: false
            // }],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      ],
      external,
      onwarn,
      output: [
        {
          file: `${dir}/${libraryName}.system.js`,
          format: 'system',
          sourcemap: true,
        },
      ],
    },
  ].flatMap(addMini({ dev }));
}

function addMini({ dev }) {
  return (src) => {
    if (dev) {
      return src;
    }

    let opt = {};
    if (src.output.find((v) => v.format === 'esm')) {
      opt = {
        ecma: 6,
        module: true,
      };
    }
    const mini = {
      ...src,
      output: src.output.map((o) => ({ ...o, file: o.file.replace(/([.]\w+)$/, '.min$1') })),
      plugins: [...src.plugins, terser(opt)],
    };
    return [src, mini];
  };
}

const mod = process.env.MOD_NAME || '';
export default mod.split(',').flatMap((v) => buildMod(v));
