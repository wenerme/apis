import React from 'react';
import { PageHeader } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { AsteriskConfPlayground } from 'src/modules/langs';

const Page = () => {
  return (
    <PageLayout
      title="ini 文件解析处理"
      description="Ini file parser reader generator"
      keywords="ini file, parser, generator, json, convert"
    >
      <PageContent>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              Ini 解析
            </div>
          }
          backIcon={false}
        />

        <AsteriskConfPlayground />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
