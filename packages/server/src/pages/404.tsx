import React from 'react';
import { PageLayout } from '../components/layout/PageLayout/PageLayout';
import { PageContent } from '../components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import { WenerApisWelcome } from '@wener/ui/src/components/WenerApisWelcome';

const DemoPageContent: React.FC = () => {
  return (
    <div>
      <WenerApisWelcome />
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout title="Page Not Found" description="Not found page" keywords="demo, react nextjs, zeit now">
      <PageContent>
        <PageHeader title={<div>Page not found / 页面未找到</div>} backIcon={false} />

        <DemoPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
