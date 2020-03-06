import React, {useEffect, useRef, useState} from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Button, Descriptions, Divider, Input, List, message, PageHeader, Upload} from 'antd';
import TorrentFileFilled from 'components/icons/TorrentFileFilled';
import {InboxOutlined} from '@ant-design/icons/lib';
import ParseTorrent, {toMagnetURI, toTorrentFile} from 'parse-torrent';
import {useAsyncEffect} from 'hooks/useAsyncEffect';
import {format} from 'date-fns';
import numeral from 'numeral'
import {copy} from 'utils/clipboard';
import {download} from 'utils/download';
import produce from 'immer';
import {uniq} from 'lodash';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

export const FileReceiver: React.FC<{ onFileChange?: (file: File) => void, accept?: string, extensions?: string[] }> = ({onFileChange, accept, extensions = []}) => {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!file) {
      return
    }
    onFileChange?.(file);
  }, [file]);
  // fixme can not receive torrent file
  // useEffect(() => {
  //   const onPaste = async (e: ClipboardEvent) => {
  //     const clipboardData: DataTransfer = e.clipboardData || window['clipboardData'] || e['originalEvent']?.['clipboardData'];
  //     const items: DataTransferItemList = clipboardData?.items;
  //     if (!items) {
  //       return
  //     }
  //     console.log(`Text ${clipboardData.getData('text')}`);
  //
  //     for (const item of items) {
  //       console.log(`ITEM ${item.kind} ${item.type}`, 'file ', item.getAsFile())
  //     }
  //     for (const item of clipboardData.files) {
  //       console.log(`FILE ${item.type} ${item.size}`)
  //     }
  //     // window['items'] = items;
  //     // if (items.length >= 2 && items[0].kind === 'string' && items[1].kind === 'file') {
  //     //   const lazyText = createLazyPromise<string>();
  //     //   // items[0].getAsString(v => lazyText.)
  //     //   pasteRef.current = [items[0], items[1]]
  //     //   const text: string = await new Promise(resolve => {
  //     //
  //     //   });
  //     //   let file = pasteRef.current[1].getAsFile();
  //     //   debugger
  //     //   if (!file) {
  //     //     console.error(`No file`, items[1])
  //     //     return
  //     //   }
  //     //
  //     //   let type = file.type;
  //     //   // fix type
  //     //   type = type;
  //     //   // NOTE paste file can not parse by libs
  //     //   if (type !== file.type) {
  //     //     const blob = file.slice(0, file.size);
  //     //     file = new File([blob], text, {type});
  //     //   }
  //     //   console.log(`Get file`, text, file.name, file.type);
  //     //   setFile(file)
  //     // } else if (items[0].kind === 'file') {
  //     //   const file = items[0].getAsFile();
  //     //   console.log(`Get file`, file.name, file.type);
  //     //   setFile(file)
  //     // } else {
  //     //   console.log(`paste item not match`, [...items].map(v => ({type: v.type, kind: v.kind})));
  //     // }
  //   };
  //
  //   document.addEventListener('paste', onPaste);
  //   return () => document.removeEventListener('paste', onPaste);
  // }, []);

  return (
    <Upload.Dragger
      showUploadList={false}
      supportServerRender={true}
      accept={accept}
      beforeUpload={file => {
        if (extensions.length) {
          if (file?.name && !extensions.find(v => file.name.endsWith(`.${v}`))) {
            message.error(`只支持 ${extensions.join(', ')} 文件`);
            return false
          }
        }
        return true
      }}
      customRequest={async opts => {
        if (opts.file instanceof File) {
          setFile(opts.file);
        } else {
          console.error(`invalid file`, opts.file);
          message.error('无效的文件')
        }
      }}
    >
      <div>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          点击<b>选择</b>文件、<b>拖拽</b>文件到该区域、<b>粘贴</b>文件
        </p>
        <p className="ant-upload-hint">
          支持{extensions.join(',')}文件
        </p>
      </div>
    </Upload.Dragger>
  )
};

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      resolve(e.target.result as ArrayBuffer);
    };
    reader.onerror = error => {
      reject(error)
    };
  })
}

const Editable: React.FC<{ disabled?, onEdit?, initialValue? }> = ({disabled, onEdit, initialValue}) => {
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
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.blur()
          }
        }}
        onChange={v => {
          const value = valueRef.current = sanitizeHtml(v.target.value, {allowedTags: []});
          setValue(value)
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
  )
};

const TorrentReaderPageContent: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [torrent, setTorrent] = useState<ParseTorrent.Instance>();
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(false);

  const [editing, setEditing] = useState({tracker: ''});

  useAsyncEffect(async () => {
    if (!file) {
      return
    }
    const buf = await readFileAsArrayBuffer(file);
    const {Buffer} = await import('buffer/');
    const r = ParseTorrent(new Buffer(buf));
    setTorrent(r);
    console.log('parsed torrent', r)
  }, [file]);

  useEffect(() => {
    setEditing(produce(s => {
      s.tracker = torrent?.announce?.join('\n') ?? '';
    }))
  }, [torrent]);

  const desc = [
    {label: '名字', name: 'name', span: 4, editable: true},
    {label: 'Hash', name: 'infoHash', span: 4},
    {
      label: '操作', name: 'infoHash', span: 4,
      render(v) {
        return (
          <div>
            <Button onClick={() => {
              copy(toMagnetURI(torrent));
              message.success('复制成功')
            }}>
              复制磁链
            </Button>
            <Button onClick={() => {
              download(`${torrent.name}.torrent`, toTorrentFile(torrent), {type: 'application/x-bittorrent'})
            }}>
              下载种子文件
            </Button>
          </div>
        )
      }
    },
    {label: '创建者', name: 'createdBy', span: 2, editable: true,},
    {label: '创建时间', name: 'created', span: 2, render: (v) => format(v, 'yyyy-MM-dd HH:mm:ss')},
    {label: '备注', name: 'comment', span: 4, editable: true},
    {
      label: '大小', name: 'length', span: 2,
      render: (v) => `${numeral(v).format('0,0')}/${numeral(v).format('0.0 ib')}`,
    },
    {
      label: '片段长度',
      name: 'pieceLength',
      span: 2,
      render: (v) => `${numeral(v).format('0,0')}/${numeral(v).format('0.0 ib')}`
    },
    {label: '片段数', name: 'pieces', render: (v) => numeral(v.length).format('0,0')},
    {label: '最后片段长度', name: 'lastPieceLength', render: (v) => numeral(v).format('0,0')},
  ];

  return (
    <div className="container">
      <div style={{margin: '0 12px'}}>
        <h2>种子文件信息</h2>

        <Descriptions column={4}>
          {desc.map((item) => {
            const {label, name, render, editable, ...props} = item;

            let content = null;
            const val = torrent?.[name];
            if (render) {
              content = val ? render(val) : val;
            } else if (editable && torrent) {
              content = (<Editable
                initialValue={val}
                onEdit={v => {
                  console.log(`Edit ${name}`, v);
                  setTorrent(produce(s => {
                    s[name] = v
                  }))
                }} />)
            }
            return (
              <Descriptions.Item
                label={label}
                key={label}
                {...props}
              >
                {content}
              </Descriptions.Item>
            )
          })}
        </Descriptions>

        <Divider orientation="left">
          文件列表
        </Divider>
        <List
          itemLayout="vertical"
          dataSource={torrent?.files ?? []}
          renderItem={({path, name, length, offset}) => (
            <List.Item
              key={path}
              actions={[
                <span>大小 {numeral(length).format('0.00b')}</span>,
                <span>偏移 {numeral(offset).format('0,0')}</span>,
              ]}
            >
              <List.Item.Meta title={<span style={{wordBreak: 'break-all'}}>{name}</span>}
              />
            </List.Item>
          )}
        />
        <Divider orientation="left">
          Tracker
        </Divider>
        <Input.TextArea
          style={{minHeight: 200}}
          value={editing.tracker}
          onChange={(v) => {
            const value = v.currentTarget.value;
            setEditing(produce(s => {
              s.tracker = value;
            }))
          }}
          readOnly={!torrent}
          onBlur={v => {
            if (!torrent) {
              return
            }
            const value = v.currentTarget.value;
            setTorrent(produce(s => {
              s.announce = uniq(value.split('\n').map(v => v.trim()).filter(v => v))
            }))
          }}
        />
      </div>
      <div>
        <div>
          <FileReceiver extensions={['torrent']} accept="application/x-bittorrent" onFileChange={setFile} />
        </div>
      </div>
      <style jsx>{`
.container {
  display: flex;
}
.container > div{
  flex:1;
}
@media (max-width: 767.98px) { 
  .container {
    flex-flow: column;
  }
}
`}</style>
    </div>
  )
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
              <TorrentFileFilled style={{marginRight: 8}} />
              BT种子文件解析
            </div>
          }
          backIcon={false}
        />

        <TorrentReaderPageContent />

      </PageContent>
    </PageLayout>
  )
};
export default Page
