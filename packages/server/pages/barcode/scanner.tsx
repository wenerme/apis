import React from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {PageHeader} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons/lib';

// https://github.com/nimiq/qr-scanner

const ScannerPageContent: React.FC = () => {
  return (
    <div></div>
  )
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>Demo Page</title>
          <meta name="description" content="演示页面" />
          <meta name="keywords" content="demo, react nextjs, zeit now" />
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{marginRight: 8}} />
              Demo Page
            </div>
          }
          backIcon={false}
        />

        <ScannerPageContent />

      </PageContent>
    </PageLayout>
  )
};
export default Page
