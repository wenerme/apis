import React from 'react';
import { PageHeader } from 'antd';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { HtmlEntitiesPlayground } from 'src/modules/langs';

const Page = () => {
  return (
    <PageLayout title="HTML Entities" description="HTML Entities Playground" keywords="html, convert">
      <PageContent>
        <PageHeader title={<div>HTML Entities</div>} backIcon={false} />
        <HtmlEntitiesPlayground />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
