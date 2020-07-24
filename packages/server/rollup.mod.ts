import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';

function report(v) {
  console.log(`${v.input} -> ${v.output.map((v) => v.file).join(', ')}`);
  return v;
}

function buildMod({ name, minify = process.env.NODE_ENV === 'production' }) {
  if (!name) {
    throw new Error('no module name');
  }
  const libraryName = `wener-apis-${name}`;
  const input = `src/modules/${name}/index.ts`;

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
      // like qrcode module - imports alot
      inlineDynamicImports: true,
      plugins: [
        json(),
        alias({
          entries: [
            {
              find: new RegExp(`^src[/]modules[/](\\w+(?!${name}))$`),
              replacement: '@wener/apis-$1',
            },
            // { find: 'react-loadable', replacement: 'src/externals/react-loadable/index.js' },
            // { find: 'react-fast-compare', replacement: 'src/externals/react-fast-compare/index.js' },
            // { find: 'react-simple-code-editor', replacement: 'src/externals/react-simple-code-editor/index.js' },
            // { find: 'fast-xml-parser', replacement: 'src/externals/fast-xml-parser/index.js' },
            //
            { find: 'react-side-effect', replacement: 'react-side-effect/lib/index.es.js' },
            { find: 'react-helmet', replacement: 'react-helmet/es/Helmet.js' },

            // default use not binding zlib
            { find: 'pngjs', replacement: 'pngjs/browser.js' },
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
            [
              'babel-plugin-add-module-exports',
              {
                addDefaultProperty: true,
              },
            ],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            // ['@babel/plugin-transform-runtime', {
            //   // absoluteRuntime:true,
            //   // corejs: 3,
            //   // helper: false,
            //   'regenerator': true,
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
  ].flatMap(addMini({ skip: !minify, inline: false }));
}

function addMini({ skip, inline = false }) {
  return (src) => {
    if (skip) {
      return src;
    }

    if (inline) {
      src.plugins.push(terser());
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

const devMod = 'boot,root,mgmt,lite';
const mod = process.env.MOD_NAME || devMod;
export default mod.split(',').flatMap((v) => buildMod({ name: v, minify: true }));
