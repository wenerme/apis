import React from 'react';
import {Torrent} from 'webtorrent';
import {Descriptions} from 'antd';
import {format} from 'date-fns';

export const TorrentDetailPane: React.FC<{ torrent: Torrent }> = ({torrent}) => {
  const desc = [
    {label: '文件名', name: 'name'},
    {label: 'Hash', name: 'infoHash'},
    {label: '链接', name: 'magnetURI', format: (v) => <a href={v}>{v}</a>},
    {label: '创建时间', name: 'created', format: (v) => format(v, 'yyyy-MM-dd HH:mm:ss')},
    {label: '创建人', name: 'createdBy'},
    {label: '备注', name: 'comment'},
  ];
  return (
    <div>
      <Descriptions>
        {desc.map(({label, name, format = v => v}) => {
          let v = torrent[name];
          v = v && format(v);
          return (
            <Descriptions.Item label={label} key={label}>
              {v}
            </Descriptions.Item>
          )
        })}
      </Descriptions>
    </div>
  )
};
