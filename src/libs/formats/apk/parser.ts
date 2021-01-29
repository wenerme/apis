export function parseApkIndex(s: string) {
  const splits = s.split('\n\n');
  return splits.map((v) => parseApkIndexRecord(v));
}

export function parseApkIndexRecord(s: string) {
  return Object.fromEntries(
    s.split('\n').map((v) => {
      const idx = v.indexOf(':');
      return [v.substring(0, idx), v.substring(idx + 1)];
    }),
    // .sort(([a], [b]) => a > b ? 1 : -1)
  );
}

export function parsePkgInfo(s: string) {
  return s
    .split('\n')
    .map((v) => v.trim())
    .filter((v) => v && !v.startsWith('#'))
    .map((v) => {
      const idx = v.indexOf('=');
      return [v.substring(0, idx), v.substring(idx + 1)];
    })
    .reduce((p, [k, v]) => {
      if (p[k]) {
        if (Array.isArray(p[k])) {
          p[k].push(v);
        } else {
          p[k] = [p[k], v];
        }
      } else {
        p[k] = v;
      }
      return p;
    }, {});
}
