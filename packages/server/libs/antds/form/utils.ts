export type OptionLike = string[] | string[][] | Array<{ label, value, [k: string]: any }>;

export function normalizeOptions(o: OptionLike): Array<{ label, value }> {
  if (typeof o?.[0] === 'string') {
    return (o as string[]).map((v, i) => ({label: v, value: i}))
  }
  if (Array.isArray(o?.[0])) {
    return (o as string[][]).map(([v, i]) => ({label: v, value: i}))
  }
  return o as Array<{ label, value }>;
}
