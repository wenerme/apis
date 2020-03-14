export function headersFromArray(o: [string, string] | [string, string[]]): Record<string, string | string[]> {
  if (!o) {
    return {}
  }
  return o
    // valid kv
    .filter(v => v && v?.[0]?.length && v?.[1]?.length)
    // flat array value
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return v.map(vv => [k, vv])
      }
      return [[k, v]]
    })
    .flat(1)
    .filter(v => v?.[1]?.length)
    .reduce((r: Record<string, string | string[]>, [k, v]) => {
      const last = r[k];
      if (last) {
        if (Array.isArray(last)) {
          last.push(v)
        } else {
          r[k] = [last, v]
        }
      } else {
        r[k] = v;
      }
      return r
    }, {});
}

export function headersToArray(o: Record<string, string | string[]>): string[][] {
  return Object
    .entries(o)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return v.map(vv => [k, vv])
      }
      return [[k, v]]
    }).flat(1)
}
