import React from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { PageHeader } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import dynamic from 'next/dynamic';

const SlateMarkdownEditor = dynamic(
  () =>
    import('src/components/editor/slate/SlateMarkdownEditor').then(({ SlateMarkdownEditor }) => SlateMarkdownEditor),
  {
    loading: () => <div>Loading...</div>,
  }
);
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
