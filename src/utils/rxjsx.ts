import { Subject } from 'rxjs';
import { createLazyPromise } from '@wener/utils';

export async function promiseOfSubject<T>(target: Subject<T>, s: (state: T) => boolean): Promise<T> {
  const promise = createLazyPromise();
  const subscription = target.subscribe((v) => {
    let r: boolean;
    try {
      r = s(v);
    } catch (e) {
      promise.reject(e);
      return;
    }
    if (r) {
      promise.resolve(v);
    }
  });
  return promise.finally(() => {
    subscription.unsubscribe();
  });
}
