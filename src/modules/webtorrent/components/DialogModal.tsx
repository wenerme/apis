import React from 'react';
import { NewDownloadModal } from './NewDownloadModal';
import { NewSeedModal } from './NewSeedModal';

export const DialogModal: React.FC = () => {
  return (
    <React.Fragment>
      <NewDownloadModal />
      <NewSeedModal />
    </React.Fragment>
  );
};
