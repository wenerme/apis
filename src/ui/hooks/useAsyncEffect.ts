import { DependencyList, useEffect, useRef } from 'react';

export function useAsyncEffect(
  effect: (o: { setCloser: (v: () => void) => void }) => Promise<void | (() => void | undefined)>,
  deps?: DependencyList,
) {
  const ref = useRef<() => void>();
  useEffect(() => {
    effect({ setCloser: (v) => (ref.current = v) })
      .then((v) => (typeof v === 'function' ? (ref.current = v) : null))
      .catch((e) => {
        console.trace(`useAsyncEffect error`, deps, e);
      });
    return () => ref.current?.();
  }, deps);
}
