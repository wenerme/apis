export interface ImportSpec {
  name;
  version;
  vendor;
  path;
  baseUrl?;
  paths?;
  url?: string;
  dependencies?: any[];
}

const vendors = {
  unpkg,
  jsdelivr,
};

export interface ImportOption {
  spec?: Partial<ImportSpec>;
  dev?: boolean;
  type?: string;
}

export function buildImportMap(specs: ImportSpec[], opts: ImportOption = null): any {
  return {
    imports: Object.fromEntries(specs.map((v) => [v.name, buildUrl(v, opts).url])),
  };
}

export function buildUrl(o: ImportSpec, opts: ImportOption = null): ImportSpec {
  let spec = o;
  if (opts) {
    spec = { ...spec, ...opts.spec };
    if (opts.dev) {
      opts.type = 'dev';
    }
    spec.path = spec.paths?.[opts.type] || spec.path;
  }
  spec.url = spec.url || vendors[spec.vendor](spec);
  return spec;
}

function jsdelivr(spec: ImportSpec): string {
  return `https://cdn.jsdelivr.net/npm/${spec.name}${spec.version ? '@' + spec.version : ''}${spec.baseUrl ?? ''}${
    spec.path
  }`;
}

function unpkg(spec: ImportSpec): string {
  return `https://unpkg.com/${spec.name}${spec.version ? '@' + spec.version : ''}${spec.baseUrl ?? ''}${spec.path}`;
}

export class ImportManager {
  _all: ImportSpec[] = [];

  add(specs: ImportSpec[]) {
    this._all = this._all.concat(specs);
  }

  get(names) {
    return this._all.filter((v) => names.includes(v.name));
  }
}

export const imports = new ImportManager();

imports.add([
  {
    name: 'react',
    vendor: 'jsdelivr',
    version: '16.13.1',
    baseUrl: '/umd/',
    path: 'react.production.min.js',
    paths: {
      dev: 'react.development.js',
      profiling: 'react.profiling.js',
    },
  },
  {
    name: 'react-dom',
    vendor: 'jsdelivr',
    version: '16.13.1',
    baseUrl: '/umd/',
    path: 'react-dom.production.min.js',
    paths: {
      dev: 'react-dom.development.js',
      profiling: 'react-dom.profiling.js',
    },
  },
  {
    name: 'antd',
    vendor: 'unpkg',
    version: '4.4.2',
    path: '/dist/antd-with-locales.min.js',
    paths: {
      dev: '/dist/antd-with-locales.js',
    },
    dependencies: ['moment'],
  },
  {
    // https://unpkg.com/browse/moment@2.27.0/dist/moment.js
    name: 'moment',
    vendor: 'unpkg',
    version: '2.27.0',
    path: '/min/moment.min.js',
  },
  {
    name: 'lodash',
    vendor: 'unpkg',
    version: '4.17.19',
    path: '/lodash.min.js',
  },
  {
    name: 'single-spa',
    vendor: 'jsdelivr',
    version: '^5',
    path: '/lib/system/single-spa.min.js',
    paths: {
      dev: '/lib/system/single-spa.dev.js',
    },
  },
  {
    name: 'single-spa-layout',
    vendor: 'unpkg',
    version: '1.0.0-beta.5',
    path: '/dist/system/single-spa-layout.min.js',
  },
  {
    name: 'rxjs',
    vendor: 'jsdelivr',
    version: '6.6.0',
    path: '/bundles/rxjs.umd.min.js',
  },
]);
