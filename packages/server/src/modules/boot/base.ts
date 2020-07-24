
export function getBaseUrl() {
  // allowed override base url
  return (localStorage['BASE_URL'] || location.href);
}

export function resolvePath(v: string): string {
  return new URL(v, getBaseUrl()).href;
}
