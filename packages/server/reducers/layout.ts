import {createSlice} from '@reduxjs/toolkit';

export interface LayoutState {
  menuOpenKeys: string[]
  isLight
  isDark
}

const slice = createSlice({
  name: 'layout',
  initialState: {
    menuOpenKeys: [],
    isDark: false,
    isLight: true,
  } as LayoutState,
  reducers: {
    setMenuOpenKeys(state, {payload}) {
      state.menuOpenKeys = payload ?? [];
    }
  }
});

export const {setMenuOpenKeys} = slice.actions;
export const layoutReducer = slice.reducer;
