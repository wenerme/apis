import { combineReducers } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore fixme
import { webtorrentReducer } from './webtorrent';
import { kongReducer } from '../modules/kong/reducers/kong';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { isDev } from '@wener/utils';

export const rootReducer = combineReducers({
  // layout: layoutReducer,
  webtorrent: webtorrentReducer,
  kong: kongReducer,
});

export function configRootStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: isDev(),
    middleware: [...getDefaultMiddleware(), isDev() ? logger : null].filter((v) => v) as any,
  });
}

export const rootStore = configRootStore();
export interface TypedUseSelectorHook<TState> {
  <TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof rootStore.dispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => RootDispatch = useDispatch;
