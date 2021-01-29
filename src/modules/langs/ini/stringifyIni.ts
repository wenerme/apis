export function stringifyIni(o: any) {
  const s = [];
  if (o['']) {
    s.push(stringifyIniObject(o['']));
  }
  for (const [section, kv] of Object.entries(o)) {
    if (section) {
      s.push(`[${section}]`);
      s.push(stringifyIniObject(kv));
    }
  }
  return s.join('\n');
}

function stringifyIniObject(o: any) {
  const s = [];
  for (const [k, v] of Object.entries(o)) {
    if (Array.isArray(v)) {
      v.forEach((i) => s.push(`${k}=${i}`));
    } else {
      s.push(`${k}=${v ?? ''}`);
    }
  }
  return s.join('\n');
}
