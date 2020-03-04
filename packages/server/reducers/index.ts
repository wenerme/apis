import {combineReducers} from 'redux';
import {layoutReducer, LayoutState} from './layout';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export interface RootState {
  layout: LayoutState
}

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDarkLightTheme: () => 'dark' | 'light' = () => useRootSelector(v => v.layout.isLight ? 'light' : 'dark');

export const rootReducer = combineReducers({
  layout: layoutReducer,
});
