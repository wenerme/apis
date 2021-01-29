export type OptionLike = string[] | number[] | string[][] | Array<LabelValue>;
export type LabelValue = { label: string; value: any; [k: string]: any };

export function normalizeOptions(o: OptionLike): Array<LabelValue> {
  if (o === null || o === undefined) {
    return [];
  }
  if (typeof o?.[0] === 'string') {
    return (o as string[]).map((value) => ({ label: value, value }));
  }
  if (typeof o?.[0] === 'number') {
    return (o as number[]).map((value) => ({ label: String(value), value }));
  }
  if (Array.isArray(o?.[0])) {
    return (o as string[][]).map(([value, label]) => ({ label, value }));
  }
  return o as Array<LabelValue>;
}
