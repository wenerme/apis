import React from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { PageHeader } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import { SlateMarkdownEditor } from 'components/editor/slate/SlateMarkdownEditor';

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>Slate Markdown Editor Demo</title>
          <meta name="description" content="Slate 编辑器演示页面" />
          <meta name="keywords" content="slate demo" />
        </Head>
        <PageHeader
          title={
            <div>
              <EditOutlined style={{ marginRight: 8 }} />
              Slate Markdown Editor
            </div>
          }
          backIcon={false}
        />

        <SlateMarkdownEditor />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
