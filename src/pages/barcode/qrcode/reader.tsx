import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageHeader } from 'antd';
import React from 'react';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { QrCodeReaderPlayground } from 'src/modules/qrcode/reader/QrCodeReaderPlayground';

const Page = () => {
  return (
    <PageLayout title="二维码/QR code/快速响应码 解析器">
      <PageContent>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              二维码/QR code 解析器
            </div>
          }
          backIcon={false}
        />

        <QrCodeReaderPlayground />
      </PageContent>
    </PageLayout>
  );
};

export default Page;
