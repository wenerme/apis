import React, { useEffect, useState } from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { Descriptions, notification, PageHeader, Spin } from 'antd';
import { BarcodeOutlined } from '@ant-design/icons/lib';
import { ImageReceiver } from 'src/components/ImageReceiver';
import { Result } from '@zxing/library';
import { getZxingFormat } from 'src/libs/barcodes/formats';

const LinearBarCodeReaderPageContent: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [result, setResult] = useState<Result>();
  const [loading, setLoading] = useState(false);

  const format = getZxingFormat(result?.getBarcodeFormat())?.label;

  useEffect(() => {
    if (!image) {
      return;
    }

    setLoading(true);

    import('@zxing/library')
      // fixme typing
      .then(async ({ BrowserBarcodeReader }: any) => {
        const reader = new BrowserBarcodeReader();
        const result = await reader.decodeFromImageElement(image);
        setResult(result);
        console.log(`decode result`, result);
      })
      .catch((e) => {
        console.log(`parse barcode failed`, e);
        notification.error({
          message: '解析失败',
          description: e.message,
          duration: 8,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [image]);

  return (
    <div className="container">
      <div>
        <h2>条形码内容</h2>
        <Spin spinning={loading}>
          <Descriptions>
            <Descriptions.Item key={1} span={3} label="文本">
              {result?.getText()}
            </Descriptions.Item>
            <Descriptions.Item key={2} label="格式">
              {format}
            </Descriptions.Item>
          </Descriptions>
        </Spin>
      </div>
      <div>
        <div>
          <ImageReceiver decoderType="canvas" onImageLoad={setImage} />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .container > div {
          flex: 1;
        }
        @media (max-width: 767.98px) {
          .container {
            flex-flow: column;
          }
        }
      `}</style>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout title="条形码扫描" description="在线条形码扫描" keywords="nline barcode scan">
      <PageContent>
        <PageHeader
          title={
            <div>
              <BarcodeOutlined style={{ marginRight: 8 }} />
              条形码扫描
            </div>
          }
          backIcon={false}
        />

        <LinearBarCodeReaderPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
