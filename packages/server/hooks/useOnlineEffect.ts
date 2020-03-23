import { useEffect, useState } from 'react';

export function useOnlineEffect(): null | boolean {
  const [online, setOnline] = useState(window?.navigator?.onLine);

  useEffect(() => {
    const handler = (e) => setOnline(e.type === 'online');
    window.addEventListener('online', handler);
    window.addEventListener('offline', handler);
    return () => {
      window.removeEventListener('online', handler);
      window.removeEventListener('offline', handler);
    };
  }, []);

  return online;
}
