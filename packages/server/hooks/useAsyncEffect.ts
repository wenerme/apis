import {DependencyList, useEffect, useMemo} from 'react';

export function useAsyncEffect(effect: ({setCloser}) => Promise<void | (() => void | undefined)>, deps?: DependencyList) {
  const cleaner = useMemo(() => {
    const a: any = () => this?.real();
    a.real = null;
    return a.bind(a);
  }, []);
  useEffect(() => {
    effect({setCloser: (v) => cleaner.real = v})
      .then(v => cleaner.real = cleaner.real ?? v)
      .catch(e => {
        console.trace(`useAsyncEffect error`, deps, e)
      });
    return cleaner;
  }, deps)
}
