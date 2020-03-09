import {combineReducers} from 'redux';
import {layoutReducer, LayoutState} from './layout';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {webtorrentReducer, WebTorrentState} from 'reducers/webtorrent';
import {kongReducer, KongState} from 'modules/kong/reducers/kong';

export interface RootState {
  layout: LayoutState
  webtorrent: WebTorrentState
  kong: KongState
}

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDarkLightTheme: () => 'dark' | 'light' = () => useRootSelector(v => v.layout.isLight ? 'light' : 'dark');

export const rootReducer = combineReducers({
  layout: layoutReducer,
  webtorrent: webtorrentReducer,
  kong: kongReducer,
});
