import React, {useMemo, useState} from 'react';
import {Torrent, TorrentFile} from 'webtorrent';
import {Button, message, Table} from 'antd';
import {normalizeColumns} from 'libs/antds/table/normal';
import {useInterval} from 'hooks/useInterval';

export const TorrentFileTable: React.FC<{ torrent: Torrent }> = ({torrent}) => {
  const columns = useMemo(() => normalizeColumns<TorrentFile>([
    {dataIndex: 'name', title: '名字'},
    {dataIndex: 'path', title: '路径'},
    {dataIndex: 'progress', title: '进度'},
    {dataIndex: 'length', title: '大小'},
    {dataIndex: 'downloaded', title: '已下载'},
    {
      title: '操作',
      width: 80,
      render(v, r: TorrentFile, i) {

        return (
          <Button onClick={async () => {
            try {
              const a = document.createElement('a');
              a.download = r.name;
              a.href = await new Promise((resolve, reject) => {
                r.getBlobURL((e, v) => {
                  if (e) {
                    reject(e)
                  }
                  resolve(v)
                })
              });
              a.click()
            } catch (e) {
              console.error(`failed to getBlobURL`, e);
              message.error(`创建下载链接失败: ${e}`);
            }
          }}>
            下载
          </Button>
        )
      }
    },
  ]), []);

  const [files, setFiles] = useState(torrent.files);
  useInterval(() => {
    console.log(`files`, torrent.files);
    setFiles(Array.from(torrent.files));
  }, 3000);

  return (
    <Table
      rowKey="name"
      columns={columns}
      dataSource={files}
    />
  )
};
