import { createSlice } from '@reduxjs/toolkit';

type DialogType = 'new-seed' | 'new-download';

export interface WebTorrentState {
  showConsole: boolean;
  showDialog?: DialogType;

  showTorrentDetail?: string;

  selections: string[];
}

const slice = createSlice({
  name: 'webtorrent',
  initialState: {
    showConsole: true,

    selections: [],
  } as WebTorrentState,
  reducers: {
    toggleConsole(state) {
      state.showConsole = !state.showConsole;
    },
    showDialog(state, { payload }) {
      state.showDialog = payload;
    },
    hideDialog(state) {
      state.showDialog = undefined;
    },
    showTorrentDetail(state, { payload }) {
      state.showTorrentDetail = payload;
    },
    hideTorrentDetail(state) {
      state.showTorrentDetail = undefined;
    },

    updateSelection(state, { payload }) {
      state.selections = payload ?? [];
    },
  },
});

export const {
  toggleConsole,
  showDialog,
  hideDialog,
  showTorrentDetail,
  hideTorrentDetail,
  updateSelection,
} = slice.actions;
export const webtorrentReducer = slice.reducer;
