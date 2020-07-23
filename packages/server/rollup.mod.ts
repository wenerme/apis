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
    'react-query',
    'react-router-dom',
    'prop-types',

    // load failed - cjs
    // 'react-simple-code-editor',
    // 'immer',
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

    // langs
    'he',
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
            // { find: 'react-loadable', replacement: 'src/externals/react-loadable/index.js' },
            // { find: 'react-fast-compare', replacement: 'src/externals/react-fast-compare/index.js' },
            // { find: 'react-simple-code-editor', replacement: 'src/externals/react-simple-code-editor/index.js' },
            // { find: 'fast-xml-parser', replacement: 'src/externals/fast-xml-parser/index.js' },
            //
            { find: 'react-side-effect', replacement: 'react-side-effect/lib/index.es.js' },
            { find: 'react-helmet', replacement: 'react-helmet/es/Helmet.js' },
          ],
        }),
        nodeResolve({ browser: true, preferBuiltins: false, extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
        commonjs({
          extensions: ['.js', '.jsx'],
        }),
        babel({
          // exclude: /[.]yarn/,
          babelHelpers: 'bundled',
          // babelHelpers: 'runtime',
          // babelHelpers: 'inline',
          babelrc: false,
          presets: [
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-flow',
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: [
            ['babel-plugin-add-module-exports'],
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
