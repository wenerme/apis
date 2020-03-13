import React from 'react';
import {Instance} from 'webtorrent';
import {useDispatch} from 'react-redux';
import {Button} from 'antd';
import {showDialog} from 'reducers/webtorrent';
import {
  DeleteOutlined,
  DownloadOutlined,
  PauseOutlined,
  PlaySquareOutlined,
  UploadOutlined
} from '@ant-design/icons/lib';
import {useRootSelector} from 'reducers/store';
import {doDeleteSelections, doPauseSelections, doResumeSelections} from 'reducers/webtorrent/actions';

export const WebTorrentToolbar: React.FC<{ client: Instance }> = ({client}) => {
  const hasSelection = useRootSelector(v => Boolean(v.webtorrent.selections?.length));
  const dispatch = useDispatch();

  return (
    <div>
      <Button.Group>
        <Button onClick={() => dispatch(showDialog('new-download'))} icon={<DownloadOutlined />}>新建下载</Button>
        <Button onClick={() => dispatch(showDialog('new-seed'))} icon={<UploadOutlined />}>新建种子</Button>
        <Button
          disabled={!hasSelection}
          onClick={() => dispatch(doPauseSelections())}
          icon={<PauseOutlined />}
        >
          暂停
        </Button>
        <Button
          disabled={!hasSelection}
          onClick={() => dispatch(doResumeSelections())}
          icon={<PlaySquareOutlined />}
        >
          恢复
        </Button>
        <Button
          disabled={!hasSelection}
          onClick={() => dispatch(doDeleteSelections())}
          icon={<DeleteOutlined />}
        >
          删除
        </Button>
      </Button.Group>
    </div>
  )
};
