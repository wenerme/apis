import {createSlice} from '@reduxjs/toolkit';
import {TypedUseSelectorHook} from 'react-redux';
import {useRootSelector} from 'reducers/index';
import {KongInformation} from 'modules/kong/apis/types';

export const useKongSelector: TypedUseSelectorHook<KongState> = (selector, e) => useRootSelector(s => selector(s.kong), e)

export interface KongState {
  api: string

  information?: KongInformation
}

// https://github.com/troposhq/kong-admin-api-client

const slice = createSlice({
  name: 'kong',
  initialState: {
    api: 'http://127.0.0.1:8001',
  } as KongState,
  reducers: {
    updateInformation(state, {payload}) {
      state.information = payload
    }
  },
});

export const {updateInformation} = slice.actions;
export const kongReducer = slice.reducer;
