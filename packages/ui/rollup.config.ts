import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// yarn add -D rollup @rollup/plugin-{commonjs,node-resolve,typescript,json} tslib typescript
const pkg = require('./package.json');

const libraryName = pkg.name.replace('@', '').replace('/', '-');

export default {
  // ts not working
  // https://github.com/rollup/plugins/issues?q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%94%8C+plugin-typescript%22+
  // input: `src/${libraryName}.ts`,
  input: `lib/index.js`,
  output: [
    {
      file: `dist/${libraryName}.umd.js`,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'styled-components': 'styled',
        lodash: '_',
      },
    },
    // https://github.com/rollup/rollup-plugin-commonjs/issues/290
    { file: `dist/${libraryName}.esm.js`, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react', 'react-is', 'styled-components', 'lodash', 'react-dom', 'prop-types'],

  watch: {
    include: 'lib/**',
  },
  plugins: [
    peerDepsExternal(),
    json(),
    // typescript({ tsconfig: 'tsconfig.rollup.json'}),
    commonjs({ extensions: ['.js', '.ts', '.tsx'] }),
    resolve({
      dedupe: ['react', 'react-dom'],
    }),
  ],
};
