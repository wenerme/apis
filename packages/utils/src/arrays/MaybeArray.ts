export type MaybeArray<T> = T | T[];

export function firstOfMaybeArray<T>(v: MaybeArray<T>): T {
  if (Array.isArray(v)) {
    return v[0];
  }
  return v;
}

export function lastOfMaybeArray<T>(v: MaybeArray<T>): T {
  if (Array.isArray(v)) {
    return v[v.length - 1];
  }
  return v;
}

export function arrayOfMaybeArray<T>(v: MaybeArray<T>): T[] {
  if (Array.isArray(v)) {
    return v;
  }
  if (v === null || v === undefined) {
    return [];
  }
  return [v];
}
