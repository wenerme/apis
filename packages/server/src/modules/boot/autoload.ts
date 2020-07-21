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
  try {
    const r = originalResolve.apply(this, args);
    console.log(`Load ${id} - `, r, args);
    return r;
  } catch (err) {
    const m = id.match(internal);
    if (m) {
      // FIXME will hang
      const url = `/modules/wener-apis-${m[1]}.system.js`;
      console.log(`Load internal ${id} - `, url, args);
      return url;
    }
    console.log(`Failed to load - `, err);
    throw err;
  }
};
