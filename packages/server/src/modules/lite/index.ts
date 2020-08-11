export { default as metadata } from './metadata.json';

/**
 * System configuration
 */

if (!window['process']) {
  window['process'] = { env: { NODE_ENV: isDev() ? 'development' : 'production' } } as any;
}
const System = window['System'];

const start = Date.now();
let chain: Promise<any> = Promise.resolve();
if (!isGeneratorSupported()) {
  // FIXME this is kinda useless, need multi bundle
  chain = chain
    .then(System.import(resolveModule({ name: '@wener/apis-polyfill', dev: isDev() })))
    .then(({ load }) => load());
}
chain = chain
  // import('src/modules/boot') // not inject resolve yet
  .then(() => System.import(resolveModule({ name: '@wener/apis-boot', dev: isDev() })))
  .then(({ boot }) =>
    boot({
      dev: isDev(),
      internals: [/^@wener[/]apis-(.+)/, /^@wener[/]ui([/]\w+)?/, /^@wener[/]utils/],
      baselUrl: getBaseUrl(),
      resolver: resolveModule,
      System,
    }),
  );
chain = chain.then(() => import('src/modules/root'));
chain.then(() => console.log(`Started in ${Date.now() - start}ms`));
chain.catch((e) => {
  console.error(`Failed to setup application`, e);
});

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

function isGeneratorSupported() {
  let supported = true;
  try {
    eval('(function *() {})');
  } catch (e) {
    supported = false;
  }
  return supported;
}
