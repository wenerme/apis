import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { camelCase, startCase } from 'lodash';
import { terser } from 'rollup-plugin-terser';

const libraryName = require('./package.json').name.replace('@', '').replace('/', '-');
const globals = {
  lodash: '_',
};
const globalName = startCase(camelCase(libraryName)).replace(/\W/g, '');
const external = Object.keys(require('./package.json').peerDependencies || {});

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
    input: 'es/index.js',
    plugins: [nodeResolve({ browser: true }), babel({ babelHelpers: 'bundled' })],
    external,
    onwarn,
    output: [
      {
        file: `dist/${libraryName}.umd.js`,
        format: 'umd',
        name: globalName,
        globals,
        sourcemap: true,
      },
      {
        file: `dist/${libraryName}.system.js`,
        format: 'system',
        sourcemap: true,
      },
      {
        file: `dist/${libraryName}.cjs`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
  {
    input: 'es/index.js',
    plugins: [nodeResolve({ browser: true }), babel({ babelHelpers: 'bundled' })],
    external,
    onwarn,
    output: [
      {
        file: `dist/${libraryName}.esm.js`,
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
].flatMap(addMini());
