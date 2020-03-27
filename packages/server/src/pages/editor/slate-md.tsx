import React from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
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
    <PageLayout title="Slate Markdown Editor Demo" description="Slate 编辑器演示页面" keywords="slate demo">
      <PageContent>
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
