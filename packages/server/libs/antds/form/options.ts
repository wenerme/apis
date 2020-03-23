export type OptionLike = string[] | number[] | string[][] | Array<{ label; value; [k: string]: any }>;

export function normalizeOptions(o: OptionLike): Array<{ label; value }> {
  if (o === null || o === undefined) {
    return [];
  }
  if (typeof o?.[0] === 'string') {
    return (o as string[]).map((value) => ({ label: value, value }));
  }
  if (typeof o?.[0] === 'number') {
    return (o as number[]).map((value) => ({ label: value, value }));
  }
  if (Array.isArray(o?.[0])) {
    return (o as string[][]).map(([value, label]) => ({ label, value }));
  }
  return o as Array<{ label; value }>;
}
