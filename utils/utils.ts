export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const isDev = () => (process?.env?.NODE_ENV || '').startsWith('dev');

export function createLazyPromise<T = any>(): Promise<T> & { reject: () => void, resolve: (v: T) => void } {
  let onResolve, onReject;
  const promise = new Promise<T>(((resolve, reject) => {
    onResolve = resolve;
    onReject = reject
  }));
  promise['resolve'] = onResolve;
  promise['reject'] = onReject;
  return promise as any
}
