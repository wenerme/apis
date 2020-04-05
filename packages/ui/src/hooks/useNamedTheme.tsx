import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useConstant } from './useConstant';

const NamedThemeContext = React.createContext<BehaviorSubject<any>>(new BehaviorSubject<any>(null));

export function NamedThemeProvider({ children, initialTheme }) {
  const state = useConstant(
    () => new BehaviorSubject(typeof initialTheme === 'function' ? initialTheme() : initialTheme),
  );
  useEffect(() => {
    return () => state.complete();
  }, []);
  return <NamedThemeContext.Provider value={state}>{children}</NamedThemeContext.Provider>;
}

export function useNamedTheme(): [string, Dispatch<SetStateAction<string>>] {
  const state = useContext(NamedThemeContext);
  const [theme, setTheme] = useState(state.value);
  useEffect(() => {
    const subscribe = state.subscribe(setTheme);
    return subscribe.unsubscribe.bind(subscribe);
  }, [state]);
  return [theme, (v) => state.next(v)];
}
