import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useConstant } from '@wener/utils/src/reactx/hooks/useConstant';

const LayoutThemeContext = React.createContext<BehaviorSubject<any>>(null);

export function LayoutThemeProvider({ children, initialTheme }) {
  const state = useConstant(() => new BehaviorSubject(typeof initialTheme === 'function' ? initialTheme() : initialTheme));
  useEffect(() => {
    return () => state.complete();
  }, []);
  return (
    <LayoutThemeContext.Provider value={state}>
      {children}
    </LayoutThemeContext.Provider>
  );
}

export function useLayoutTheme(): [string, Dispatch<SetStateAction<string>>] {
  const state = useContext(LayoutThemeContext);
  const [theme, setTheme] = useState();
  useEffect(() => {
    const subscribe = state.subscribe(setTheme);
    return subscribe.unsubscribe.bind(subscribe);
  }, [state]);
  return [theme, v => state.next(v)];
}
