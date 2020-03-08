import {EffectCallback, useEffect, useMemo} from 'react';
import {debounce} from 'lodash';


export function useDebounceEffect(cb: EffectCallback, deps?, wait?) {
  const bounce = useMemo(() => debounce(() => {
    cb?.()
  }, wait), [wait]);

  useEffect(() => {
    bounce();
    return () => bounce.cancel()
  }, deps)
}
