import React from 'react';
import { PageLayout } from '../components/layout/PageLayout/PageLayout';
import { PageContent } from '../components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { WenerApisWelcome } from '@wener/ui/lib/components/WenerApisWelcome';

const DemoPageContent: React.FC = () => {
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

        {/*<DemoPageContent />*/}
        <WenerApisWelcome />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
