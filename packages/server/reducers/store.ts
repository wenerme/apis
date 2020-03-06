import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from 'reducers/index';

import logger from 'redux-logger'
import {isDev} from 'utils/utils';

export function configRootStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: isDev(),
    middleware: [
      ...getDefaultMiddleware(),
      isDev() ? logger : null,
    ].filter(v => v)
  });
}
