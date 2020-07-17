import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const libraryName = 'wener-tinyrpc';

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  console.warn('THIS_IS_UNDEFINED', warning.message);
}

export default [
  {
    input: 'lib/index.js',
    plugins: [
      // https://github.com/rollup/plugins/issues/287
      // typescript(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
    external: ['lodash'],
    onwarn,
    output: [
      {
        file: `dist/umd/${libraryName}.js`,
        format: 'umd',
        sourcemap: true,
      },
      {
        file: `dist/system/${libraryName}.js`,
        format: 'system',
        sourcemap: true,
      },
      {
        file: `dist/cjs/${libraryName}.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'es/index.js',
    plugins: [
      // https://github.com/rollup/plugins/issues/287
      // typescript(),
      babel({ babelHelpers: 'bundled' }),
      terser({
        ecma: 6,
        module: true,
      }),
    ],
    external: ['lodash'],
    onwarn,
    output: [
      {
        file: `dist/esm/${libraryName}.js`,
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
];
