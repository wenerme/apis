export type OptionLike = string[] | string[][] | Array<{ label, value, [k: string]: any }>;

export function normalizeOptions(o: OptionLike): Array<{ label, value }> {
  if (typeof o?.[0] === 'string') {
    return (o as string[]).map((label, value) => ({label: label ?? value, value: value ?? label}))
  }
  if (Array.isArray(o?.[0])) {
    return (o as string[][]).map(([value, label]) => ({label, value}))
  }
  return o as Array<{ label, value }>;
}
