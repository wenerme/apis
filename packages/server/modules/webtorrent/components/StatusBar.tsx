import React from 'react';
import {Instance} from 'webtorrent';
import {Button, Dropdown, Menu, Tooltip} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined, ExpandAltOutlined, SettingFilled} from '@ant-design/icons/lib';
import {useDispatch} from 'react-redux';
import {toggleConsole} from 'reducers/webtorrent';

export const StatusBar: React.FC<{ client: Instance }> = ({client}) => {
  const dispatch = useDispatch();

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <div style={{display: 'grid', columnGap: 8, gridAutoFlow: 'column', alignItems: 'center'}}>
        <Dropdown
          placement="topLeft"
          overlay={(
            <Menu>
              <Menu.Item onClick={() => dispatch(toggleConsole())}>
                日志
              </Menu.Item>
            </Menu>
          )}
        >
          <Button type="link" size="small" icon={<SettingFilled style={{color: '#888'}} />} />
        </Dropdown>
        <div>
          <Tooltip title="下载速度">
            <ArrowDownOutlined /> 0 K/s
          </Tooltip>
        </div>
        <div>
          <Tooltip title="上传速度">
            <ArrowUpOutlined /> 0 K/s
          </Tooltip>
        </div>
        <div>
          <Tooltip title="做种率">
            <ExpandAltOutlined /> 0%
          </Tooltip>
        </div>
      </div>

      <small> Node: {client['nodeId']} Peer: {client['peerId']}</small>
    </div>
  )
};
