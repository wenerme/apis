import React, { useRef, useState } from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { Button, Divider, message, PageHeader } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';

import { useMounted } from 'hooks/useMounted';
import dynamic from 'next/dynamic';
// import {JsonEditor} from 'components/JsonEditor/JsonEditor';
import { decode, encode } from 'bencode';
import TextArea from 'antd/lib/input/TextArea';
import { JsonEditor } from 'components/JsonEditor/JsonEditor';
import { readFileAsBuffer } from 'utils/io';
import { FileReceiver } from 'components/FileReceiver';
import { download } from '@wener/utils/src/browsers/download';
import { useDebounceEffect } from 'hooks/useDebounceEffect';

const JsonEditorDyn: any = dynamic(
  () => import('components/JsonEditor/JsonEditor').then(({ JsonEditor }) => JsonEditor),
  {
    loading: () => <div>Loading editor</div>,
    ssr: false,
  }
);
// const JsonEditor: any = () => <div>Test</div>

const BencodePageContent: React.FC = () => {
  const [value, setValue] = useState({
    name: 'wener',
  });
  const editorRef = useRef<JsonEditor>();

  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  useDebounceEffect(
    () => {
      setEncoded(encode(value).toString());
    },
    [value],
    200
  );

  const doDownload = () => {
    download(`generated.torrent`, encode(value), {
      type: 'application/x-bittorrent',
    });
  };
  const doDecode = () => {
    try {
      const v = decode(new Buffer(decoded) as any, 'utf8' as any);
      setValue(v);
    } catch (e) {
      console.error(`Decode failed`, e);
      message.error(`解码失败: ${e}`);
    }
  };
  return (
    <div className="container">
      <div>
        <JsonEditorDyn ref={editorRef} value={value} onChange={setValue} />
      </div>
      <div>
        <div>
          <Divider orientation="left">编码内容</Divider>
          <Button type="primary" onClick={doDownload}>
            下载编码内容
          </Button>
          <TextArea style={{ width: '100%' }} value={encoded} readOnly />
        </div>
        <div>
          <Divider orientation="left">解码内容</Divider>
          <Button type="primary" onClick={doDecode}>
            解码
          </Button>
          <TextArea style={{ width: '100%' }} value={decoded} onChange={(e) => setDecoded(e.currentTarget.value)} />
        </div>
        <div>
          <Divider orientation="left">Torrent 解码</Divider>
          <FileReceiver
            onFileChange={async (file) => {
              setValue(decode(await readFileAsBuffer(file), 'utf-8' as any));
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
        }
        .container > div {
          flex: 1;
          margin: 8px;
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
  const mounted = useMounted();

  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>Bencode 解析/生成</title>
          <meta
            name="description"
            content="Bencode (pronounced like B-encode) is the encoding used by the peer-to-peer file sharing system BitTorrent for storing and transmitting loosely structured data"
          />
          <meta name="keywords" content="bencode encode ui, bencode decode ui, bencode online" />

          <link rel="stylesheet" href="/assets/jsoneditor/jsoneditor.css" />
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              Bencode codec
            </div>
          }
          backIcon={false}
        />

        {mounted && <BencodePageContent />}
      </PageContent>
    </PageLayout>
  );
};
export default Page;
