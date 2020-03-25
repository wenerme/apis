export type LazyPromise<T> = Promise<T> & {
  reject(e: any): void;
  resolve(v?: T | PromiseLike<T>): void;
};

export function createLazyPromise<T = any>(): LazyPromise<T> {
  const promise: LazyPromise<T> = Object.assign(
    new Promise<T>((resolve, reject) => {
      promise.reject = reject;
      promise.resolve = resolve;
    }),
    {
      resolve() {
        throw new Error('pending resolve');
      },
      reject() {
        throw new Error('pending reject');
      },
    }
  );
  return promise;
}
