import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from 'reducers';
import {Provider} from 'react-redux';
import React from 'react';

const store = configureStore({reducer: rootReducer});

export const PageContext: React.FC = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
};
