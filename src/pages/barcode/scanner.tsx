import React from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';

// https://github.com/nimiq/qr-scanner

const ScannerPageContent: React.FC = () => {
  return <div></div>;
};

const Page = () => {
  return (
    <PageLayout title="Demo Page" description="演示页面" keywords="demo, react nextjs, zeit now">
      <PageContent>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              Demo Page
            </div>
          }
          backIcon={false}
        />

        <ScannerPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
