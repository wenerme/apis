import {createSlice} from '@reduxjs/toolkit';

type DialogType = 'new-seed' | 'new-download'

export interface WebTorrentState {
  showConsole: boolean
  showDialog?: DialogType

  showTorrentDetail?: string
}

const slice = createSlice({
  name: 'webtorrent',
  initialState: {
    showConsole: true,
  } as WebTorrentState,
  reducers: {
    toggleConsole(state) {
      state.showConsole = !state.showConsole
    },
    showDialog(state, {payload}) {
      state.showDialog = payload
    },
    hideDialog(state) {
      state.showDialog = null
    },
    showTorrentDetail(state, {payload}) {
      state.showTorrentDetail = payload
    },
    hideTorrentDetail(state) {
      state.showTorrentDetail = null
    },
  },
});

export const {toggleConsole, showDialog, hideDialog, showTorrentDetail, hideTorrentDetail} = slice.actions;
export const webtorrentReducer = slice.reducer;
