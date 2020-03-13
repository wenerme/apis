import React from 'react';
import {Instance} from 'webtorrent';
import {WebTorrentPanel} from 'modules/webtorrent/components/WebTorrentPanel';
import {AllMethods, WebConsole} from 'components/WebConsole';
import {StatusBar} from 'modules/webtorrent/components/StatusBar';
import {useRootSelector} from 'reducers/store';
import {DialogModal} from 'modules/webtorrent/components/DialogModal';
import {TorrentDetailDrawer} from 'modules/webtorrent/components/TorrentDetailDrawer';
import {WebTorrentToolbar} from 'modules/webtorrent/components/WebTorrentToolbar';

export const WebTorrentClient: React.FC<{ client: Instance }> = ({client}) => {
  const showConsole = useRootSelector(v => v.webtorrent.showConsole);

  return (
    <div style={{display: 'flex', flexFlow: 'column', flex: 1}}>
      <div style={{flex: 1, display: 'flex', flexFlow: 'column',}}>
        <DialogModal />
        <TorrentDetailDrawer />
        <WebTorrentToolbar client={client} />
        <WebTorrentPanel client={client} />
      </div>
      <div style={{height: 120, ...(showConsole ? {} : {display: 'none'})}}>
        <WebConsole global filters={AllMethods} onConsoleLoad={() => console.info('WebTorrentClient console loaded')} />
      </div>
      <div>
        <StatusBar client={client} />
      </div>
    </div>
  )
};
