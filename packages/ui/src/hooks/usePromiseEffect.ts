import React from 'react';
import { MaybePromise } from '@wener/utils';

export interface PromiseData<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

function isPromise<T>(v: any): v is Promise<T> {
  return v && v.then && v.catch;
}

export function usePromiseEffect<T>(v: MaybePromise<T>): PromiseData<T> {
  const [state, setState] = React.useState<PromiseData<T>>(() => {
    if (isPromise(v)) {
      return { loading: true };
    }
    return { loading: false, data: v };
  });

  React.useEffect(() => {
    if (isPromise(v)) {
      setState((state) => ({ ...state, loading: true, error: undefined }));
      v.then((data) => setState({ loading: false, data })).catch((error) => setState({ loading: false, error }));
    } else {
      // prevent useless state change
      setState((state) => {
        if (state.data === v) {
          return state;
        }
        return { loading: false, data: v };
      });
    }
  }, [v]);
  return state;
}
