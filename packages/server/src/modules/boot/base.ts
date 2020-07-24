let _base: string;

export function setBaseUrl(u: string) {
  _base = u;
}

export function getBaseUrl() {
  // allowed override base url
  return (_base = _base || localStorage['BASE_URL'] || location.href);
}

export function resolvePath(v: string): string {
  return new URL(v, getBaseUrl()).href;
}
