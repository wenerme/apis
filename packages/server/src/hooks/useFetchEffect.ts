import React, { DependencyList } from 'react';

export interface FetchingData<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

export function useFetchEffect<T = any>(fetcher: () => Promise<T> | T, deps?: DependencyList) {
  const [state, setState] = React.useState<FetchingData<T>>(() => ({ loading: true }));

  React.useEffect(() => {
    // keep data
    setState((state) => ({ ...state, loading: true, error: null }));

    let rel: Promise<T> | T;
    try {
      rel = fetcher();
    } catch (error) {
      setState({ loading: false, data: null, error });
      return;
    }

    if (rel['then']) {
      const promise = rel as Promise<T>;
      promise.then((data) => setState({ loading: false, data })).catch((error) =>
        setState({ loading: false, data: null, error }),
      );
    } else {
      setState({ loading: false, data: rel as any });
    }
  }, deps);

  return state;
}
