import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  if (typeof window == 'undefined') return false;

  const mediaQuery = window.matchMedia(query);
  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const toggleMatch = () => setMatch(!!mediaQuery.matches);
    mediaQuery.addEventListener('change', toggleMatch);
    return () => mediaQuery.removeEventListener('change', toggleMatch);
  }, []);

  return match;
}
