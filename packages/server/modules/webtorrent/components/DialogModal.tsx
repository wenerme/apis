import React from 'react';
import {NewDownloadModal} from 'modules/webtorrent/components/NewDownloadModal';
import {NewSeedModal} from 'modules/webtorrent/components/NewSeedModal';

export const DialogModal: React.FC = () => {
  return (
    <>
      <NewDownloadModal />
      <NewSeedModal />
    </>
  )
};
