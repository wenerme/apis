import { createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useRootSelector } from 'src/reducers/store';
import { KongInformation, KongNodeStatus } from '../apis/types';

export const useKongSelector: TypedUseSelectorHook<KongState> = (selector, e) =>
  useRootSelector((s) => selector(s.kong), e);
export const useKongDispatch = useDispatch;

export interface KongConfig {
  baseURL;
  headers?;
}

export interface KongState {
  config?: KongConfig;

  information?: KongInformation;
  status?: KongNodeStatus;

  showSetup: boolean;
  showShare: boolean;
}

// https://github.com/troposhq/kong-admin-api-client

const slice = createSlice({
  name: 'kong',
  initialState: {
    // api: 'http://127.0.0.1:8001',
    api: '',

    showSetup: false,
    showShare: false,
  } as KongState,
  reducers: {
    updateInformation(state, { payload }) {
      state.information = payload;
    },

    updateStatus(state, { payload }) {
      state.status = payload;
    },

    toggleShowSetup(state) {
      state.showSetup = !state.showSetup;
    },
    toggleShowShare(state) {
      state.showShare = !state.showShare;
    },
    updateConfig(state, { payload }) {
      state.config = payload;
    },
    clearConfig(state) {
      state.config = null;
    },
  },
});

export const {
  updateInformation,
  updateStatus,
  updateConfig,
  toggleShowSetup,
  toggleShowShare,
  clearConfig,
} = slice.actions;
export const kongReducer = slice.reducer;
