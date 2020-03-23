import { createSlice } from '@reduxjs/toolkit';

export interface DemoState {}

const slice = createSlice({
  name: 'demo',
  initialState: {} as DemoState,
  reducers: {},
});

export const {} = slice.actions;
export const demoReducer = slice.reducer;
