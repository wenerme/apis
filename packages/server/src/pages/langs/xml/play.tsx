import React from 'react';
import { PageHeader } from 'antd';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { XmlPlayground } from 'src/modules/lang-xml';

const Page = () => {
  return (
    <PageLayout title="Demo Page" description="演示页面" keywords="demo, react nextjs, zeit now">
      <PageContent>
        <PageHeader title={<div>XML Playground</div>} backIcon={false} />

        <XmlPlayground />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
