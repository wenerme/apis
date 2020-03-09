import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {createSlice} from '@reduxjs/toolkit';

export interface LayoutFrameState {
  theme: 'dark' | 'light'

  // no component
  menus: MenuSpec[]

  showHeader: boolean
  showFooter: boolean
}


function createLayoutFrameState(s?: Partial<LayoutFrameState>): LayoutFrameState {
  return {
    theme: 'light',
    menus: [],
    showFooter: true,
    showHeader: true,

    ...s
  }
}

export function createLayoutFrameSlice({name = 'layout'} = {}) {
  return createSlice({
    name,
    initialState: {
      theme: 'light',
      menus: [],
      showHeader: true,
      showFooter: true,
    } as LayoutFrameState,
    reducers: {},
  })
}
