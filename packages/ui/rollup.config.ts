import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { camelCase, startCase } from 'lodash';

const pkg = require('./package.json');
const libraryName = pkg.name.replace('@', '').replace('/', '-');
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  rxjs: 'Rx',
  immer: 'immer',
  'prop-types': 'PropTypes',
  'styled-components': 'styled',
  lodash: '_',
  '@wener/utils': 'WenerUtils',
};
const external = Object.keys(require('./package.json').peerDependencies || {}).filter((v) => !['immer'].includes(v));
export default [
  ...buildRollup({
    libraryName,
    input: 'src/index.ts',
    globals,
    external,
  }),
  ...buildRollup({
    libraryName: libraryName + '-antds',
    input: 'src/antds/index.ts',
    globals,
    external,
  }),
  ...buildRollup({
    libraryName: libraryName + '-icons',
    input: 'src/icons/index.ts',
    globals,
    external,
  }),
].map(report);
function report(v) {
  console.log(`${v.input} -> ${v.output.map((v) => v.file).join(', ')}`);
  return v;
}
function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }
  console.warn(warning.code, warning.message);
}

function addMini({ options = {} } = {}) {
  return (src) => {
    const mini = {
      ...src,
      output: src.output.map((o) => ({ ...o, file: o.file.replace(/([.]\w+)$/, '.min$1') })),
      plugins: [...src.plugins],
    };

    const r = [src];
    const esm = mini.output.filter((v) => v.format === 'esm');
    const opt = { ...options };
    if (esm.length) {
      mini.output = mini.output.filter((v) => !esm.includes(v));

      r.push({
        ...mini,
        output: esm,
        plugins: [...mini.plugins, terser({ ...opt, ecma: 6, module: true })],
      });
    }
    if (mini.output.length) {
      mini.plugins.push(terser(opt));
      r.push(mini);
    }
    return r;
  };
}

// yarn add -D rollup @rollup/plugin-{commonjs,node-resolve,typescript,json} tslib typescript
function buildRollup({
  libraryName = require('./package.json').name.replace('@', '').replace('/', '-'),
  input = `src/index.ts`,
  dev = (process.env.NODE_ENV || '').startsWith('dev'),
  external = Object.keys(require('./package.json').peerDependencies || {}),
  globalName = startCase(camelCase(libraryName)).replace(/\W/g, ''),
  globals = {},
}) {
  return [
    {
      input,
      onwarn,
      external,
      plugins: [
        nodeResolve({
          browser: true,
          mainFields: ['module', 'main'],
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
        }),
        babel({
          babelHelpers: 'bundled',
          babelrc: false,
          presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
          plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
        }),
      ],
      output: [
        {
          file: `dist/${libraryName}.umd.js`,
          name: globalName,
          format: 'umd',
          sourcemap: true,
          globals,
        },
        { file: `dist/${libraryName}.cjs`, format: 'cjs', sourcemap: true },
        { file: `dist/${libraryName}.system.js`, format: 'system', sourcemap: true },
        { file: `dist/${libraryName}.esm.js`, format: 'esm', sourcemap: true },
      ],
    },
  ].flatMap(dev ? (v) => v : addMini());
}
