import { Provider } from 'react-redux';
import React from 'react';
import { rootStore } from 'src/reducers/store';

export const PageContext: React.FC = ({ children }) => {
  return <Provider store={rootStore}>{children}</Provider>;
};
