import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

function buildMod(mod) {
  if (!mod) {
    throw new Error('no MOD_NAME');
  }
  const libraryName = `wener-apis-${mod}`;
  const input = `src/modules/${mod}/index.ts`;

  const dev = process.env.NODE_ENV !== 'production';
  const dir = `public/modules`;

  const external = [
    /@wener[/]apis-/,
    //
    'react',
    'react-dom',
    'immer',
    //
    'lodash',
    //
    'antd',
    //
    '@wener/ui',
    '@wener/utils',
    //
    'single-spa',
    'single-spa-layout',
    // 'single-spa-react',
  ];

  /* Common Rollup Script
   * =====================
   */

  function onwarn(warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.warn('THIS_IS_UNDEFINED', warning.message);
  }

  return [
    {
      input,
      plugins: [
        nodeResolve({ browser: true, extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
        babel({
          babelHelpers: 'bundled',
          babelrc: false,
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
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
