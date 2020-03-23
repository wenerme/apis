import { useRouter } from 'next/router';
import { useEffect } from 'react';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: true });

export function useRouteProgress() {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();
    const handleError = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, []);
}
