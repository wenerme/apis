import {useEffect, useRef, useState} from 'react';

export function useInterval(handler: TimerHandler, interval) {
  const ref = useRef<any>();
  const [count, setCount] = useState(0);
  // useEffect(handler, [count]);
  useEffect(() => {
    // ref.current = setInterval(() => setCount(v => v + 1), interval);
    ref.current = setInterval(handler, interval);
    return () => clearInterval(ref.current)
  }, [interval])
}
