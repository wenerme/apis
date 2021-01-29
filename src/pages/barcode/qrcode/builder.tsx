import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import React from 'react';
import { QrcodeOutlined } from '@ant-design/icons';
import { QrCodeBuilderPlayground } from 'src/modules/qrcode/components/QrCodeBuilderPlayground';

const Page = () => {
  return (
    <PageLayout title="二维码/QR code/快速响应码 生成器">
      <PageContent>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              二维码/QR code 生成器
            </div>
          }
          backIcon={false}
        />

        <QrCodeBuilderPlayground />
      </PageContent>
    </PageLayout>
  );
};

export default Page;
