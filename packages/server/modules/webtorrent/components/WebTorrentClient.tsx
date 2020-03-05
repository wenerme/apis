import React from 'react';
import {Instance} from 'webtorrent';
import {WebTorrentPanel} from 'modules/webtorrent/components/WebTorrentPanel';
import {AllMethods, WebConsole} from 'components/WebConsole';
import {Button} from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  PauseOutlined,
  PlaySquareOutlined,
  UploadOutlined
} from '@ant-design/icons/lib';
import {StatusBar} from 'modules/webtorrent/components/StatusBar';
import {useRootSelector} from 'reducers/index';
import {DialogModal} from 'modules/webtorrent/components/DialogModal';
import {useDispatch} from 'react-redux';
import {showDialog} from 'reducers/webtorrent';
import {TorrentDetailDrawer} from 'modules/webtorrent/components/TorrentDetailDrawer';

const WebTorrentToolbar: React.FC<{ client: Instance }> = ({client}) => {
  const dispatch = useDispatch()

  return (
    <div>
      <Button.Group>
        <Button onClick={() => dispatch(showDialog('new-download'))} icon={<DownloadOutlined />}>新建下载</Button>
        <Button onClick={() => dispatch(showDialog('new-seed'))} icon={<UploadOutlined />}>新建种子</Button>
        <Button icon={<PauseOutlined />}>暂停</Button>
        <Button icon={<PlaySquareOutlined />}>恢复</Button>
        <Button icon={<DeleteOutlined />}>删除</Button>
      </Button.Group>
    </div>
  )
};

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
