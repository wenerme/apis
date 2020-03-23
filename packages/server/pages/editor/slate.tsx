import React from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { PageHeader } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import { SlateRichEditor } from 'components/editor/slate/SlateRichEditor';

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>Slate Editor Demo</title>
          <meta name="description" content="Slate 编辑器演示页面" />
          <meta name="keywords" content="slate demo" />
        </Head>
        <PageHeader
          title={
            <div>
              <EditOutlined style={{ marginRight: 8 }} />
              Slate
            </div>
          }
          backIcon={false}
        />

        <SlateRichEditor />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
