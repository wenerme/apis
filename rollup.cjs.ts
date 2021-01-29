import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { camelCase, startCase } from 'lodash';
import alias from '@rollup/plugin-alias';

function createConfig({ name, format = 'esm', extensions = ['.js'], plugins = [] }) {
  return {
    input: require.resolve(name),
    output: {
      // file: `dist/${name}.${format}.js`,
      file: `src/externals/${name}/index.js`,
      sourcemap: true,
      name: startCase(camelCase(name)).replace(/\W/g, ''),
      format,
    },
    // external: ['react'],
    plugins: [
      ...plugins,
      nodeResolve({ browser: true, extensions }),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        plugins: [['babel-plugin-add-module-exports']],
      }),
      // babel({
      //   babelHelpers: 'bundled',
      //   babelrc: false,
      //   presets: [['@babel/preset-typescript', { allowNamespaces: true }], '@babel/preset-react'],
      //   plugins: [
      //     ['@babel/plugin-proposal-decorators', { legacy: true }],
      //     ['@babel/plugin-proposal-class-properties', { loose: true }],
      //   ],
      //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // }),
      commonjs({ extensions }),
    ],
  };
}

export default [
  createConfig({ name: 'fast-xml-parser' }),
];
