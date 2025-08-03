/** @format */

import { useEffect, useRef, type DependencyList } from 'react';

export function useDebounceEffect(
  effect: () => void,
  deps: DependencyList,
  delay = 300
) {
  const handler = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}
