import React from 'react';
import {Instance} from 'webtorrent';
import {WebTorrentPanel} from 'modules/webtorrent/components/WebTorrentPanel';
import {AllMethods, WebConsole} from 'components/WebConsole';

export const WebTorrentClient: React.FC<{ client: Instance }> = ({client}) => {
  return (
    <div style={{display: 'flex', flexFlow: 'column', flex: 1}}>
      <div style={{flex: 1, display: 'flex', flexFlow: 'column',}}>
        <WebTorrentPanel client={client} />
      </div>
      <div style={{height: 120}}>
        <WebConsole global filters={AllMethods} onConsoleLoad={() => console.info('WebTorrentClient console loaded')} />
      </div>
      <div>
        <small>Node: {client['nodeId']} Peer: {client['peerId']}</small>
      </div>
    </div>
  )
};
