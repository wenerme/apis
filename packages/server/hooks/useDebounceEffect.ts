import {EffectCallback, useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';


export function useDebounceEffect(cb: EffectCallback, deps?, wait?) {
  const [count, setCount] = useState(0);

  const bounce = useMemo(() => debounce(() => {
    setCount(v => v + 1)
  }), [wait]);

  useEffect(cb, [count]);
  useEffect(() => {
    bounce();
    return () => bounce.cancel()
  }, deps)
}
