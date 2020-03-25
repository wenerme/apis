import { createSlice } from '@reduxjs/toolkit';

export interface LayoutFrameState {
  theme: 'dark' | 'light';

  showHeader?: boolean;
  showFooter?: boolean;
}

export function createLayoutFrameSlice({ name = 'layout' } = {}) {
  return createSlice({
    name,
    initialState: {
      theme: 'light',
    } as LayoutFrameState,
    reducers: {},
  });
}
