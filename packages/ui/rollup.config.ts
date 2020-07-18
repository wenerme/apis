import { camelCase } from '@wener/utils';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  console.warn('THIS_IS_UNDEFINED', warning.message);
}

// yarn add -D rollup @rollup/plugin-{commonjs,node-resolve,typescript,json} tslib typescript
const pkg = require('./package.json');

const libraryName = pkg.name.replace('@', '').replace('/', '-');

export default [
  {
    input: `es/index.js`,
    onwarn,
    external: Object.keys(require('./package.json').peerDependencies),
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        // presets: [
        //   ['@babel/env', { 'modules': false }],
        // ],
      }),
      terser(),
    ],
    output: [
      {
        file: `dist/${libraryName}.umd.js`,
        name: camelCase(libraryName),
        format: 'umd',
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          rxjs: 'Rx',
          immer: 'immer',
          'prop-types': 'PropTypes',
          'styled-components': 'styled',
          lodash: '_',
        },
      },
      { file: `dist/${libraryName}.cjs`, format: 'cjs', sourcemap: true },
    ],
  },
  {
    input: `es/index.js`,
    onwarn,
    external: Object.keys(require('./package.json').peerDependencies),
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
      }),
      terser({ ecma: 6, module: true }),
    ],
    output: [
      {
        file: `dist/${libraryName}.esm.js`,
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
];
