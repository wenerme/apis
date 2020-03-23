import React, { useState } from 'react';
import { Instance } from 'webtorrent';
import { InstanceStatus, setInstanceStatus } from 'libs/webtorrents/status';
import { useInterval } from 'hooks/useInterval';
import { getCurrentWebTorrentClient } from 'modules/webtorrent/client';
import produce from 'immer';
import { TorrentTable } from 'modules/webtorrent/components/TorrentTable';

export const WebTorrentPanel: React.FC<{ client: Instance }> = ({ client }) => {
  const [clientStatus, setClientStatus] = useState<InstanceStatus>({} as any);

  useInterval(() => {
    const c = getCurrentWebTorrentClient();

    if (!c) {
      return;
    }
    setClientStatus(
      produce((s) => {
        setInstanceStatus(s, c);
      })
    );
  }, 3000);

  const items = [
    { label: 'NodeId', name: 'nodeId' },
    { label: 'PeerId', name: 'peerId' },

    { label: '下载速度', name: 'downloadSpeed' },
    { label: '上传速度', name: 'uploadSpeed' },
    { label: '进度', name: 'progress', format: (v) => `${v.toFixed(2)}%` },
    { label: '做种率', name: 'ratio', format: (v) => `${v.toFixed(2)}%` },
  ];

  return (
    // <div style={{display: 'flex', flexFlow: 'column', flex: 1}}>
    //   <div>
    //     {/*<Descriptions>*/}
    //     {/*  {items.map(({label, name, format = v => v}) => (*/}
    //     {/*    <Descriptions.Item*/}
    //     {/*      label={label}*/}
    //     {/*      key={label}*/}
    //     {/*    >*/}
    //     {/*      {clientStatus[name] && format(clientStatus[name])}*/}
    //     {/*    </Descriptions.Item>*/}
    //     {/*  ))}*/}
    //     {/*</Descriptions>*/}
    //   </div>
    //   <div style={{flex: 1}}>
    //     <TorrentTable client={client} />
    //   </div>
    // </div>
    <TorrentTable client={client} />
  );
};
