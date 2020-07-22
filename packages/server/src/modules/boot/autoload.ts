const System = window['System'];
const originalResolve = System.constructor.prototype.resolve;

const maps = {
  '@emotion/styled': 'https://cdn.jsdelivr.net/npm/@emotion/styled@10.0.27/dist/styled.umd.min.js',
  '@emotion/core': 'https://cdn.jsdelivr.net/npm/@emotion/core@10.0.27/dist/core.umd.min.js',
  '@emotion/styled-base': 'https://cdn.jsdelivr.net/npm/@emotion/styled-base@10.0.31/dist/styled-base.umd.min.js',
  '@emotion/weak-memoize': 'https://cdn.jsdelivr.net/npm/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.cjs.js',
  classnames: 'https://cdn.jsdelivr.net/npm/classnames',
  '@ant-design/colors': 'https://cdn.jsdelivr.net/npm/@ant-design/colors',
  'insert-css': 'https://cdn.jsdelivr.net/npm/insert-css',
  //
  // 'console-feed': '/modules/console-feed.system.js',
  'react-query': 'https://cdn.jsdelivr.net/npm/react-query@2.5.5/dist/react-query.production.min.js',
  'react-router-dom': 'https://cdn.jsdelivr.net/npm/react-router-dom@5.2.0/umd/react-router-dom.min.js',
  "immer": "https://cdn.jsdelivr.net/npm/immer/dist/immer.umd.production.min.js",
  // 'react-helmet': 'https://cdn.jsdelivr.net/npm/react-helmet@6.1.0/lib/Helmet.js',
  // 'react-loadable': 'https://cdn.jsdelivr.net/npm/react-loadable@5.5.0/lib/index.js',
  'prop-types': 'https://cdn.jsdelivr.net/npm/prop-types@15.7.2/prop-types.min.js',
};
const internal = /@wener[/]apis-(.+)/;
System.constructor.prototype.resolve = function (...args) {
  const id: string = args[0];
  if (maps[id]) {
    return maps[id];
  }
  // @babel/runtime/helpers/esm/inheritsLoose
  if (id.startsWith('@babel/runtime/')) {
    return `https://cdn.jsdelivr.net/npm/${id.replace('/esm/', '')}.js`;
  }
  if (id === 'rc-util/lib/warning') {
    return 'https://cdn.jsdelivr.net/npm/rc-util/lib/warning.js';
  }
  const m = id.match(internal);
  if (m) {
    // const url = `${location.origin}/modules/wener-apis-${m[1]}.system.js`;
    const name = id.replace('@', '').replace('/', '-');
    const url = `${location.origin}/modules/${name}.system.js`;
    console.log(`Load internal ${id} - `, url, args);
    return url;
  }

  try {
    const r = originalResolve.apply(this, args);
    console.log(`Load ${id} - `, r, args);
    return r;
  } catch (err) {
    console.error(`Failed to load - `, id, err);
    return `https://cdn.jsdelivr.net/npm/${id}`;
    // throw err;
  }
};
