import React, { useState } from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { Button, PageHeader } from 'antd';
import { useMounted } from '@wener/ui';
import { getCurrentWebTorrentClient, getWebTorrentClient } from 'src/modules/webtorrent/client';
import { Instance } from 'webtorrent';
import dynamic from 'next/dynamic';
import WebTorrentFilled from '../../components/icons/WebTorrentFilled';

const WebTorrentClient = dynamic(
  () => import('../../modules/webtorrent/components/WebTorrentClient').then(({ WebTorrentClient }) => WebTorrentClient),
  {
    loading: () => <div>Loading WebTorrentClient ...</div>,
    ssr: false,
  },
);

const WebTorrentPageContent: React.FC = () => {
  const [client, setClient] = useState<Instance>(getCurrentWebTorrentClient());
  const [loading, setLoading] = useState(false);

  const doInit = async () => {
    if (client) {
      return;
    }
    setLoading(true);

    try {
      console.info('initialing client');
      const current = await getWebTorrentClient();
      setClient(current);
      console.info(`client nodeId=${current?.['nodeId']} peerId=${current?.['peerId']}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {!client && (
        <Button disabled={loading} onClick={doInit}>
          初始化
        </Button>
      )}
      {client && <WebTorrentClient client={client} />}
    </React.Fragment>
  );
};

const Page = () => {
  const mounted = useMounted();
  return (
    <PageLayout
      showFooter={false}
      title="WebTorrent 网页客户端"
      description="WebTorrent client"
      keywords="online webtorrent"
    >
      <PageContent
        style={{
          display: 'flex',
          flexFlow: 'column',
          margin: '0 8px',
          paddingBottom: 4,
        }}
      >
        <PageHeader
          title={
            <div>
              <WebTorrentFilled style={{ marginRight: 8 }} />
              WebTorrent 网页客户端
            </div>
          }
          backIcon={false}
        />

        {mounted && <WebTorrentPageContent />}
      </PageContent>
    </PageLayout>
  );
};
export default Page;
