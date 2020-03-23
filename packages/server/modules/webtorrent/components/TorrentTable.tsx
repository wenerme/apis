import React, { useEffect, useMemo, useState } from 'react';
import { Instance, Torrent } from 'webtorrent';
import { ColumnProps } from 'antd/es/table';
import { Button, Dropdown, Menu, message, Table } from 'antd';
import { useInterval } from 'hooks/useInterval';
import { InfoCircleOutlined, MoreOutlined } from '@ant-design/icons/lib';
// import styles from './TorrentTable.module.css'
import './TorrentTable.module.css';
import { copy } from 'utils/clipboard';
import { useDispatch } from 'react-redux';
import { showTorrentDetail, updateSelection } from 'reducers/webtorrent';
import { useRootSelector } from 'reducers/store';

export const TorrentTable: React.FC<{ client: Instance }> = ({ client }) => {
  const [count, setCount] = useState(0);
  const [torrents, setTorrents] = useState(client.torrents);
  useInterval(() => {
    setTorrents(Array.from(client.torrents));
  }, 1000);

  useEffect(() => {
    client.on('torrent', (t) => {
      console.log(`On torrent`, t);
      setCount((v) => v + 1);
    });
  }, []);

  const doCopy = (v) => {
    copy(v);
    console.info(`Copy`, v);
    message.success('复制成功');
  };

  const dispatch = useDispatch();

  const columns: Array<ColumnProps<Torrent>> = useMemo(() => {
    const columns: Array<ColumnProps<Torrent>> = [
      {
        title: '名字',
        dataIndex: 'name',
        className: 'no-wrap',
      },
      // {
      //   title: 'Hash',
      //   dataIndex: 'infoHash',
      // },
      {
        title: '已接收',
        dataIndex: 'received',
      },
      {
        title: '已下载',
        dataIndex: 'downloaded',
      },
      {
        title: '下载速度',
        dataIndex: 'downloadSpeed',
      },
      {
        title: '已上传',
        dataIndex: 'uploaded',
      },
      {
        title: '上传速度',
        dataIndex: 'uploadSpeed',
      },
      {
        title: '剩余时间',
        dataIndex: 'timeRemaining',
      },
      {
        title: '进度',
        dataIndex: 'progress',
      },
      {
        title: '做种率',
        dataIndex: 'ratio',
      },
      {
        title: '长度',
        dataIndex: 'length',
      },
      {
        title: '片段长度',
        dataIndex: 'pieceLength',
      },
      {
        title: '上一片段长度',
        dataIndex: 'lastPieceLength',
      },
      {
        title: '节点数量',
        dataIndex: 'numPeers',
      },
      // {
      //   title: '路径',
      //   dataIndex: 'path',
      // },
      {
        title: '种子状态',
        width: 120,
        className: 'no-wrap',
        render(v, r, i) {
          const { ready, paused, done } = r;
          return [ready && '准备', paused && '暂停', done && '完成'].filter((v) => v).join('/');
        },
      },
      {
        title: '操作',
        width: 100,
        className: 'no-wrap',
        fixed: 'right',
        render(v, r: Torrent, i) {
          const { paused, done, infoHash } = r;
          return (
            <div>
              <Button type="link" onClick={() => dispatch(showTorrentDetail(infoHash))} icon={<InfoCircleOutlined />} />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item onClick={() => r.pause()}>暂停链接新节点</Menu.Item>
                    {paused && <Menu.Item onClick={() => r.resume()}>恢复链接新节点</Menu.Item>}
                    <Menu.Item onClick={() => doCopy(r.infoHash)}>复制 Hash</Menu.Item>
                    <Menu.Item onClick={() => doCopy(r.magnetURI)}>复制磁链</Menu.Item>
                    <Menu.Item>
                      <a href={r.torrentFileBlobURL} download={`${r.name}.torrent`}>
                        下载种子文件
                      </a>
                    </Menu.Item>
                    <Menu.Item onClick={() => client.remove(r)}>删除</Menu.Item>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <MoreOutlined />
                </a>
              </Dropdown>
            </div>
          );
        },
      },
    ];
    columns.forEach((v) => {
      v.key = v.key ?? (v.title as string);
      // v.width = v.width ?? 80
    });
    return columns;
  }, []);

  const selections = useRootSelector((v) => v.webtorrent.selections);

  return (
    <Table
      // className={styles.TorrentTable}
      className="TorrentTable"
      bordered
      rowKey="infoHash"
      // size="small"
      columns={columns}
      dataSource={torrents}
      scroll={{ x: 1800, y: 500 }}
      // tableLayout="fixed"

      rowSelection={{
        selections: selections as any,
        onChange: (v) => dispatch(updateSelection(v)),
      }}

      // expandRowByClick

      // expandedRowKeys={expanded}
      // onExpandedRowsChange={v => {
      //   setExpanded(v)
      // }}
      // expandedRowRender={(r, i, indent, vis) => {
      //   if (!vis) {
      //     return
      //   }
      //   return (<TorrentDetailPanel torrent={r} />)
      // }}
    />
  );
};
