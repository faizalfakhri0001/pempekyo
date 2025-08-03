/** @format */

import { useEffect, type DependencyList } from 'react';

export function useDebounceEffect(
  effect: () => void,
  deps: DependencyList,
  delay = 300
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}

