import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { webtorrentReducer } from 'reducers/webtorrent';
import { kongReducer } from 'modules/kong/reducers/kong';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { isDev } from '@wener/utils/src/envs/isDev';

export const rootReducer = combineReducers({
  // layout: layoutReducer,
  webtorrent: webtorrentReducer,
  kong: kongReducer,
});

export function configRootStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: isDev(),
    middleware: [...getDefaultMiddleware(), isDev() ? logger : null].filter((v) => v),
  });
}

export const rootStore = configRootStore();

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof rootStore.dispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => RootDispatch = useDispatch;
