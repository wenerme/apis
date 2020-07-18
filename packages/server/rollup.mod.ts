import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const mod = process.env.MOD_NAME;
if (!mod) {
  throw new Error('no MOD_NAME');
}
const libraryName = `wener-apis-${mod}`;
const input = `src/modules/${mod}/index.ts`;

const external = ['react', 'react-dom', 'immer', 'lodash', '@wener/ui', '@wener/utils'];

/* Common Rollup Script
 * =====================
 */

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  console.warn('THIS_IS_UNDEFINED', warning.message);
}

function addMini() {
  return (src) => {
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

export default [
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
    ],
    external,
    onwarn,
    output: [
      {
        file: `dist/${libraryName}.system.js`,
        format: 'system',
        sourcemap: true,
      },
    ],
  },
].flatMap(addMini());
