import React, {useMemo} from 'react';
import {Modal} from 'antd';
import {useRootSelector} from 'reducers/index';
import {useDispatch} from 'react-redux';
import {hideDialog} from 'reducers/webtorrent';
import {NewSeedPanel} from 'modules/webtorrent/components/NewSeedPanel';
import {NewDownloadPanel} from 'modules/webtorrent/components/NewDownloadPanel';

export const DialogModal: React.FC = () => {
  const dialog = useRootSelector(v => v.webtorrent.showDialog);
  const dispatch = useDispatch();
  const menus = useMemo(() => {
    return {
      'new-seed': {
        title: '新建种子',
        component: <NewDownloadPanel />
      },
      'new-download': {
        title: '新建种子',
        component: <NewSeedPanel />
      }
    }
  }, [])
  return (
    <Modal
      title={menus[dialog]?.title}
      centered
      visible={Boolean(dialog)}
      onCancel={() => dispatch(hideDialog())}
    >
      {menus[dialog]?.component}
    </Modal>
  )
};
