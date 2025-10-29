import { useEffect, useState } from 'react';

export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return (): void => setIsMounted(false);
  }, []);

  return isMounted;
}
