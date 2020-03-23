import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { useRootSelector } from 'reducers/store';
import { useDispatch } from 'react-redux';
import { hideTorrentDetail } from 'reducers/webtorrent';
import { getCurrentWebTorrentClient } from 'modules/webtorrent/client';
import { Torrent } from 'webtorrent';
import { TorrentDetailPanel } from 'modules/webtorrent/components/TorrentDetailPanel';

export const TorrentDetailDrawer: React.FC = () => {
  const torrentId = useRootSelector((v) => v.webtorrent.showTorrentDetail);
  const dispatch = useDispatch();

  const [torrent, setTorrent] = useState<Torrent>();
  useEffect(() => {
    setTorrent(getCurrentWebTorrentClient()?.torrents?.find((v) => v.infoHash === torrentId));
  }, [torrentId]);
  return (
    <Drawer
      title="种子详情"
      placement="right"
      closable
      visible={Boolean(torrent)}
      onClose={() => dispatch(hideTorrentDetail())}
      destroyOnClose
      width="80vw"
    >
      {torrent && <TorrentDetailPanel torrent={torrent} />}
    </Drawer>
  );
};
