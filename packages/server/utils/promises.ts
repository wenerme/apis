export type LazyPromise<T> = Promise<T> & {
  reject(e): void;
  resolve(v: T): void;
};

export function createLazyPromise<T = any>(): LazyPromise<T> {
  let onResolve, onReject;
  const promise = new Promise<T>((resolve, reject) => {
    onResolve = resolve;
    onReject = reject;
  });
  promise['resolve'] = onResolve;
  promise['reject'] = onReject;
  return promise as any;
}

export type AsyncIntervalIdentifier = any;

export function setAsyncInterval(cb: () => void, interval, initial = interval): AsyncIntervalIdentifier {
  let id;
  const handler = async () => {
    await cb();
    id = setTimeout(handler, interval);
  };
  id = setTimeout(handler, initial);
  return () => id;
}

export function clearAsyncInterval(v: AsyncIntervalIdentifier) {
  clearTimeout(v?.());
}
