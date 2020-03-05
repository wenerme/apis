import {createSlice} from '@reduxjs/toolkit';

export interface WebTorrentState {
  showConsole: boolean
  showDialog?: 'new-seed' | 'new-download'
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
  },
});

export const {toggleConsole, showDialog, hideDialog} = slice.actions;
export const webtorrentReducer = slice.reducer;
