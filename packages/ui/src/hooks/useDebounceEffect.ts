import { EffectCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

export function useDebounceEffect(cb: EffectCallback, deps: any[], wait: number) {
  const bounce = useMemo(
    () =>
      debounce(() => {
        cb?.();
      }, wait),
    [cb, wait],
  );

  useEffect(() => {
    bounce();
    return () => bounce.cancel();
  }, deps);
}
