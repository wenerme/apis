import React from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { PageHeader } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';

const DemoPageContent: React.FC = () => {
  return <div></div>;
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
              <QrcodeOutlined style={{ marginRight: 8 }} />
              Demo Page
            </div>
          }
          backIcon={false}
        />

        <DemoPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
