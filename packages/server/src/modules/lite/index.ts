export { default as metadata } from './metadata.json';

/**
 * System configuration
 */

if (!window['process']) {
  window['process'] = { env: { NODE_ENV: isDev() ? 'development' : 'production' } } as any;
}
const System = window['System'];
System.import(resolveModule({ name: '@wener/apis-boot', dev: isDev() }))
  // import('src/modules/boot')
  .then(({ boot }) =>
    boot({
      dev: isDev(),
      internals: [/^@wener[/]apis-(.+)/, /^@wener[/]ui([/]\w+)?/, /^@wener[/]utils/],
      baselUrl: getBaseUrl(),
      resolver: resolveModule,
      System,
    }),
  )
  .then(() => import('src/modules/root'));

function isDev(): boolean {
  if (localStorage['devtools']) {
    return localStorage['devtools'] === 'true';
  }
  return Boolean(location.origin.match(/localhost|127\.0\.0|192\.168/));
}

function resolveModule({ name, dev }) {
  const fn = `./modules/${name.replace('@', '').replace(/[/]/g, '-')}.system${dev ? '' : '.min'}.js`;
  return new URL(fn, getBaseUrl()).href;
}

function getBaseUrl() {
  // allowed override base url
  return localStorage['BASE_URL'] || location.href;
}
