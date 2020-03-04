import React, {useState} from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Button, PageHeader} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons/lib';
import {useMounted} from 'hooks/useMounted';
import {getCurrentWebTorrentClient, getWebTorrentClient} from 'modules/webtorrent/client';
import {Instance} from 'webtorrent';
import dynamic from 'next/dynamic';

const WebTorrentClient = dynamic(
  () => import('modules/webtorrent/components/WebTorrentClient').then(({WebTorrentClient}) => WebTorrentClient), {
    loading: () => <div>Loading WebTorrentClient ...</div>,
    ssr: false,
  });

const WebTorrentPageContent: React.FC = () => {
  const [client, setClient] = useState<Instance>(getCurrentWebTorrentClient());
  const [loading, setLoading] = useState(false);

  const doInit = async () => {
    if (client) {
      return
    }
    setLoading(true);

    try {
      console.info('initialing client');
      const current = await getWebTorrentClient();
      setClient(current);
      console.info(`client nodeId=${current?.['nodeId']} peerId=${current?.['peerId']}`);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {!client && <Button disabled={loading} onClick={doInit}>初始化</Button>}
      {client && <WebTorrentClient client={client} />}
    </>
  )
};

const Page = () => {
  const mounted = useMounted();
  return (
    <PageLayout showFooter={false}>
      <PageContent style={{display: 'flex', flexFlow: 'column', margin: '0 8px', paddingBottom: 4}}>
        <Head>
          <title>WebTorrent 网页客户端</title>
          <meta name="description" content="WebTorrent client" />
          <meta name="keywords" content="online webtorrent" />
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{marginRight: 8}} />
              WebTorrent 网页客户端
            </div>
          }
          backIcon={false}
        />

        {mounted && <WebTorrentPageContent />}

      </PageContent>
    </PageLayout>
  )
};
export default Page
