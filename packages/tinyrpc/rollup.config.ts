import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash/camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
// rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-sourcemaps lodash.camelcase rollup-plugin-typescript2 rollup-plugin-json
const pkg = require('./package.json');

const libraryName = 'tinyrpc';

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.browser, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true,tsconfig:'tsconfig.rollup.json' }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
