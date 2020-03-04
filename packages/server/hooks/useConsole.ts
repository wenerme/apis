import React, {useContext} from 'react';

export const ConsoleContext = React.createContext<Console>(null);

export function useConsole() {
  return useContext(ConsoleContext) ?? window.console
}
