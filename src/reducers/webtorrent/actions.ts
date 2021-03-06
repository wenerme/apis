import { createDownload, CreateDownloadOptions } from 'src/modules/webtorrent/libs/downloads';
import { createSeed, CreateSeedOptions } from 'src/modules/webtorrent/libs/seeds';
import { getCurrentWebTorrentClient } from 'src/modules/webtorrent/client';
import { RootState } from '../store';
import { Torrent } from 'webtorrent';

function getSelectionTorrents(selections: string[] = []): Torrent[] {
  return getCurrentWebTorrentClient().torrents.filter((v) => selections.includes(v.infoHash));
}

export function doDeleteSelections() {
  return async (dispatch, getState) => {
    (getState() as RootState).webtorrent.selections.forEach((v) => {
      getCurrentWebTorrentClient().remove(v);
    });
  };
}

export function doPauseSelections() {
  return async (dispatch, getState) => {
    getSelectionTorrents((getState() as RootState).webtorrent.selections).forEach((v) => {
      v.pause();
    });
  };
}

export function doResumeSelections() {
  return async (dispatch, getState) => {
    getSelectionTorrents((getState() as RootState).webtorrent.selections).forEach((v) => {
      v.resume();
    });
  };
}

export function doCreateDownload(options: CreateDownloadOptions) {
  return async (dispatch, getState) => {
    createDownload(getCurrentWebTorrentClient(), options);
  };
}

export function doCreateSeed(options: CreateSeedOptions) {
  return async (dispatch, getState) => {
    createSeed(getCurrentWebTorrentClient(), options);
  };
}
