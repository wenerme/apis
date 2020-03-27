import React from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import { SlateRichEditor } from 'src/components/editor/slate/SlateRichEditor';

const Page = () => {
  return (
    <PageLayout title="Slate Editor Demo" description="Slate 编辑器演示页面" keywords="slate demo">
      <PageContent>
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
