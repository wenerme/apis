import {Provider} from 'react-redux';
import React from 'react';
import {configRootStore} from 'reducers/store';

const store = configRootStore();

export const PageContext: React.FC = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
};
