import { createSlice } from '@reduxjs/toolkit';

export interface DemoState {
  count: number;
}

const slice = createSlice({
  name: 'demo',
  initialState: {
    count: 0,
  } as DemoState,
  reducers: {
    incCount(s, { payload }) {
      s.count += payload ?? 1;
    },
  },
});

export const { incCount } = slice.actions;
export const demoReducer = slice.reducer;
