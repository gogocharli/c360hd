import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>(null);

  // Remember the latest callback.
  useEffect(() => {
    // @ts-ignore Insits that current is readonly
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
