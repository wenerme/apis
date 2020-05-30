import React from 'react';
import { Instance } from 'webtorrent';
import { WebTorrentPanel } from './WebTorrentPanel';
import { AllMethods, WebConsole } from 'src/components/WebConsole';
import { StatusBar } from './StatusBar';
import { useRootSelector } from 'src/reducers/store';
import { DialogModal } from './DialogModal';
import { TorrentDetailDrawer } from './TorrentDetailDrawer';
import { WebTorrentToolbar } from './WebTorrentToolbar';

export const WebTorrentClient: React.FC<{ client: Instance }> = ({ client }) => {
  const showConsole = useRootSelector((v) => v.webtorrent.showConsole);

  return (
    <div style={{ display: 'flex', flexFlow: 'column', flex: 1 }}>
      <div style={{ flex: 1, display: 'flex', flexFlow: 'column' }}>
        <DialogModal />
        <TorrentDetailDrawer />
        <WebTorrentToolbar client={client} />
        <WebTorrentPanel client={client} />
      </div>
      <div style={{ height: 120, ...(showConsole ? {} : { display: 'none' }) }}>
        <WebConsole global filters={AllMethods} onConsoleLoad={() => console.info('WebTorrentClient console loaded')} />
      </div>
      <div>
        <StatusBar client={client} />
      </div>
    </div>
  );
};
