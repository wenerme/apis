import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import sourceMaps from 'rollup-plugin-sourcemaps';
import json from '@rollup/plugin-json';
// yarn add -D rollup @rollup/plugin-{commonjs,node-resolve,typescript,json} tslib typescript
const pkg = require('./package.json');

const libraryName = 'tinyrpc';

export default {
  // ts not working
  // https://github.com/rollup/plugins/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%94%8C+plugin-typescript%22+
  // input: `src/${libraryName}.ts`,
  input: `lib/${libraryName}.js`,
  output: [
    { file: pkg.browser, name: libraryName, format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    // typescript({ tsconfig: 'tsconfig.rollup.json'}),
    commonjs({ extensions: ['.js', '.ts', '.tsx'] }),
    resolve(),

    // Resolve source maps to the original source
    // sourceMaps(),
  ],
};
