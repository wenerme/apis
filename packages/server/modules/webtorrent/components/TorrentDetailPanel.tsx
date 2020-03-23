import { Torrent } from 'webtorrent';
import React from 'react';
import { Tabs } from 'antd';
import { TorrentDetailPane } from 'modules/webtorrent/components/TorrentDetailPane';
import { TorrentFileTable } from 'modules/webtorrent/components/TorrentFileTable';

export const TorrentDetailPanel: React.FC<{ torrent: Torrent }> = ({ torrent }) => {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="详情" key="1">
        <TorrentDetailPane torrent={torrent} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="文件" key="2">
        <TorrentFileTable torrent={torrent} />
      </Tabs.TabPane>
    </Tabs>
  );
};
