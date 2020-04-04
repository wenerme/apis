import { DependencyList, useState } from 'react';
import { useAsyncEffect } from '@wener/ui';
import produce from 'immer';

export interface FetchingData<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

export function useFetchEffect<T = any>(fetcher: () => Promise<T>, deps?: DependencyList): FetchingData<T> {
  const [state, setState] = useState<FetchingData<T>>(() => ({
    loading: false,
  }));

  useAsyncEffect(async () => {
    setState(
      produce((state) => {
        state.loading = true;
        state.error = null;
      }),
    );
    try {
      const data = await fetcher();
      setState(
        produce((state) => {
          state.loading = false;
          state.data = data;
        }),
      );
    } catch (e) {
      setState(
        produce((state) => {
          state.loading = false;
          state.error = e;
          state.data = null;
        }),
      );
    }
  }, deps);

  return state;
}
