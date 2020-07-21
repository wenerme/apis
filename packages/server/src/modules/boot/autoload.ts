const System = window['System'];
const originalResolve = System.constructor.prototype.resolve;

const internal = /@wener[/]apis-(.+)/;
System.constructor.prototype.resolve = function (...args) {
  const id: string = args[0];
  // @babel/runtime/helpers/esm/inheritsLoose
  if (id.startsWith('@babel/runtime/')) {
    return `https://cdn.jsdelivr.net/npm/${id.replace('/esm/', '')}.js`;
  }
  if (id === 'classnames') {
    return 'https://cdn.jsdelivr.net/npm/classnames';
  }
  if (id === '@ant-design/colors') {
    return 'https://cdn.jsdelivr.net/npm/@ant-design/colors';
  }
  if (id === 'rc-util/lib/warning') {
    return 'https://cdn.jsdelivr.net/npm/rc-util/lib/warning.js';
  }
  if (id === 'insert-css') {
    return 'https://cdn.jsdelivr.net/npm/insert-css';
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
