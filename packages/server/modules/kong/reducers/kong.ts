import {createSlice} from '@reduxjs/toolkit';
import {TypedUseSelectorHook} from 'react-redux';
import {useRootSelector} from 'reducers/index';
import {KongInformation, KongNodeStatus} from 'modules/kong/apis/types';

export const useKongSelector: TypedUseSelectorHook<KongState> = (selector, e) => useRootSelector(s => selector(s.kong), e)

export interface KongState {
  api: string

  information?: KongInformation
  status?: KongNodeStatus
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
    },

    updateStatus(state, {payload}) {
      state.status = payload
    }
  },
});

export const {updateInformation, updateStatus} = slice.actions;
export const kongReducer = slice.reducer;
