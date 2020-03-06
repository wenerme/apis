import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from 'reducers/index';

export function configRootStore() {
  return configureStore({reducer: rootReducer, middleware: [...getDefaultMiddleware()]});
}
