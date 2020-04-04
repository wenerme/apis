import React from 'react';
import { Instance } from 'webtorrent';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CodeOutlined,
  ExpandAltOutlined,
  SettingFilled,
} from '@ant-design/icons/lib';
import { useDispatch } from 'react-redux';
import { toggleConsole } from 'src/reducers/webtorrent';

export const StatusBar: React.FC<{ client: Instance }> = ({ client }) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          columnGap: 8,
          gridAutoFlow: 'column',
          alignItems: 'center',
        }}
      >
        <Dropdown
          placement="topLeft"
          overlay={
            <Menu>
              <Menu.Item onClick={() => dispatch(toggleConsole())}>
                <CodeOutlined /> 日志
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" size="small" icon={<SettingFilled style={{ color: '#888' }} />} />
        </Dropdown>
        <div>
          <Tooltip title="下载速度">
            <span>
              <ArrowDownOutlined /> 0 K/s
            </span>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="上传速度">
            <span>
              <ArrowUpOutlined /> 0 K/s
            </span>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="做种率">
            <span>
              <ExpandAltOutlined /> 0%
            </span>
          </Tooltip>
        </div>
      </div>

      <small>
        {' '}
        Node: {client['nodeId']} Peer: {client['peerId']}
      </small>
    </div>
  );
};
