import {DependencyList, useEffect, useMemo} from 'react';

export function useAsyncEffect(effect: () => Promise<void | (() => void | undefined)>, deps?: DependencyList) {
  const cleaner = useMemo(() => {
    const a: any = () => this?.real();
    a.real = null;
    return a.bind(a);
  }, []);
  useEffect(() => {
    effect()
      .then(v => cleaner.real = v)
      .catch(e => {
        console.trace(`useAsyncEffect error`, deps, e)
      });
    return cleaner;
  }, deps)
}
