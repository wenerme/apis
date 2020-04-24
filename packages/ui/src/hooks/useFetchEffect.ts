import React, { DependencyList } from 'react';
import { MaybePromise } from '@wener/utils';
import { usePromiseEffect } from './usePromiseEffect';

export function useFetchEffect<T = any>(fetcher: () => MaybePromise<T>, deps?: DependencyList) {
  const [result, setResult] = React.useState<any>(() => {
    try {
      return fetcher();
    } catch (error) {
      return Promise.reject(error);
    }
  });
  const initial = React.useRef(true);
  React.useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    try {
      setResult(fetcher());
    } catch (error) {
      setResult(Promise.reject(error));
    }
  }, deps);

  return usePromiseEffect(result);
}
