export function firstOf<T>(v: T | T[]): T {
  if (Array.isArray(v)) {
    return v[0];
  }
  return v;
}
