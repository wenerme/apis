import React, { useEffect, useRef, useState } from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { Button, Descriptions, Divider, Input, List, message, PageHeader } from 'antd';
import TorrentFileFilled from 'components/icons/TorrentFileFilled';
import ParseTorrent, { toMagnetURI, toTorrentFile } from 'parse-torrent';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { format } from 'date-fns';
import numeral from 'numeral';
import { copy } from '@wener/utils/src/browsers/clipboard';
import { download } from '@wener/utils/src/browsers/download';
import produce from 'immer';
import { uniq } from 'lodash';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import { readFileAsArrayBuffer } from 'utils/io';
import { FileReceiver } from 'components/FileReceiver';

const Editable: React.FC<{ disabled?; onEdit?; initialValue? }> = ({ disabled, onEdit, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const valueRef = useRef<any>();
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <div>
      <ContentEditable
        className="editable"
        disabled={disabled}
        html={value ?? ''}
        onBlur={() => {
          onEdit(valueRef.current);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.blur();
          }
        }}
        onChange={(v) => {
          const value = (valueRef.current = sanitizeHtml(v.target.value, {
            allowedTags: [],
          }));
          setValue(value);
        }}
      />
      <style jsx global>{`
        .editable:not([disabled]) {
          border-bottom: 1px cornflowerblue solid;
          padding: 4px 8px;
        }
        .editable:not([disabled]):focus {
          border-bottom: 2px cornflowerblue solid;
          outline: none;
          padding-bottom: 3px;
        }
      `}</style>
    </div>
  );
};

const TorrentReaderPageContent: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [torrent, setTorrent] = useState<ParseTorrent.Instance>();
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(false);

  const [editing, setEditing] = useState({ tracker: '' });

  useAsyncEffect(async () => {
    if (!file) {
      return;
    }
    const buf = await readFileAsArrayBuffer(file);
    const { Buffer } = await import('buffer/');
    const r = ParseTorrent(new Buffer(buf));
    setTorrent(r);
    console.log('parsed torrent', r);
  }, [file]);

  useEffect(() => {
    setEditing(
      produce((s) => {
        s.tracker = torrent?.announce?.join('\n') ?? '';
      })
    );
  }, [torrent]);

  const desc = [
    { label: '名字', name: 'name', span: 4, editable: true },
    { label: 'Hash', name: 'infoHash', span: 4 },
    {
      label: '操作',
      name: 'infoHash',
      span: 4,
      render(v) {
        return (
          <div>
            <Button
              onClick={() => {
                copy(toMagnetURI(torrent));
                message.success('复制成功');
              }}
            >
              复制磁链
            </Button>
            <Button
              onClick={() => {
                download(`${torrent.name}.torrent`, toTorrentFile(torrent), {
                  type: 'application/x-bittorrent',
                });
              }}
            >
              下载种子文件
            </Button>
          </div>
        );
      },
    },
    { label: '创建者', name: 'createdBy', span: 2, editable: true },
    {
      label: '创建时间',
      name: 'created',
      span: 2,
      render: (v) => format(v, 'yyyy-MM-dd HH:mm:ss'),
    },
    { label: '备注', name: 'comment', span: 4, editable: true },
    {
      label: '大小',
      name: 'length',
      span: 2,
      render: (v) => `${numeral(v).format('0,0')}/${numeral(v).format('0.0 ib')}`,
    },
    {
      label: '片段长度',
      name: 'pieceLength',
      span: 2,
      render: (v) => `${numeral(v).format('0,0')}/${numeral(v).format('0.0 ib')}`,
    },
    {
      label: '片段数',
      name: 'pieces',
      render: (v) => numeral(v.length).format('0,0'),
    },
    {
      label: '最后片段长度',
      name: 'lastPieceLength',
      render: (v) => numeral(v).format('0,0'),
    },
  ];

  return (
    <div className="container">
      <div style={{ margin: '0 12px' }}>
        <h2>种子文件信息</h2>

        <Descriptions column={4}>
          {desc.map((item) => {
            const { label, name, render, editable, ...props } = item;

            let content = null;
            const val = torrent?.[name];
            if (render) {
              content = val ? render(val) : val;
            } else if (editable && torrent) {
              content = (
                <Editable
                  initialValue={val}
                  onEdit={(v) => {
                    console.log(`Edit ${name}`, v);
                    setTorrent(
                      produce((s) => {
                        s[name] = v;
                      })
                    );
                  }}
                />
              );
            }
            return (
              <Descriptions.Item label={label} key={label} {...props}>
                {content}
              </Descriptions.Item>
            );
          })}
        </Descriptions>

        <Divider orientation="left">文件列表</Divider>
        <List
          itemLayout="vertical"
          dataSource={torrent?.files ?? []}
          renderItem={({ path, name, length, offset }) => (
            <List.Item
              key={path}
              actions={[
                <span key={1}>大小 {numeral(length).format('0.00b')}</span>,
                <span key={2}>偏移 {numeral(offset).format('0,0')}</span>,
              ]}
            >
              <List.Item.Meta title={<span style={{ wordBreak: 'break-all' }}>{name}</span>} />
            </List.Item>
          )}
        />
        <Divider orientation="left">Tracker</Divider>
        <Input.TextArea
          style={{ minHeight: 200 }}
          value={editing.tracker}
          onChange={(v) => {
            const value = v.currentTarget.value;
            setEditing(
              produce((s) => {
                s.tracker = value;
              })
            );
          }}
          readOnly={!torrent}
          onBlur={(v) => {
            if (!torrent) {
              return;
            }
            const value = v.currentTarget.value;
            setTorrent(
              produce((s) => {
                s.announce = uniq(
                  value
                    .split('\n')
                    .map((v) => v.trim())
                    .filter((v) => v)
                );
              })
            );
          }}
        />
      </div>
      <div>
        <div style={{ margin: 12 }}>
          <FileReceiver extensions={['torrent']} accept="application/x-bittorrent" onFileChange={setFile} />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .container > div {
          flex: 1;
        }
        @media (max-width: 767.98px) {
          .container {
            flex-flow: column;
          }
        }
      `}</style>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>BT种子文件解析</title>
          <meta name="description" content="BitTorrent file parser" />
          <meta name="keywords" content="torrent file reader,torrent file parser" />
        </Head>
        <PageHeader
          title={
            <div>
              <TorrentFileFilled style={{ marginRight: 8 }} />
              BT种子文件解析
            </div>
          }
          backIcon={false}
        />

        <TorrentReaderPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
