import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { notification, PageHeader, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { QRCode } from 'jsqr';
import { ImageReceiver } from 'src/components/ImageReceiver';
import { sleep } from '@wener/utils/src/asyncs/sleep';

const ChunkInfo: React.FC<{ chunk }> = ({ chunk }) => {
  const { type, text, bytes } = chunk;
  return (
    <div>
      <div>类型: {type}</div>
      {text && <div>文本: {text}</div>}
      {bytes && <div>字节: {bytes?.length}</div>}
    </div>
  );
};

const QRCodeReaderPageContent: React.FC = () => {
  const [qrInfo, setQrInfo] = useState<QRCode>();
  const [imageData, setImageData] = useState<ImageData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageData) {
      return;
    }
    setLoading(true);

    console.log(`Parse data ${imageData.data.length} ${imageData.width}x${imageData.height}`);
    import('jsqr').then(async ({ default: jsQR }) => {
      try {
        // update loading state
        await sleep(100);
        console.time('jsqr.decode');
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth',
        });
        console.timeEnd('jsqr.decode');
        setQrInfo(code);
        console.log(`Code`, code);
      } catch (e) {
        console.error(`parse failed`, e, imageData);
        notification.error({
          duration: 5,
          message: '解析失败',
          description: e.message,
        });
      } finally {
        setLoading(false);
      }
    });
  }, [imageData]);
  return (
    <div style={{ display: 'flex' }} className="container">
      <div style={{ flex: 1 }}>
        <div style={{ margin: 20 }}>
          <h2>二维码中的信息</h2>
          <Spin spinning={loading}>
            <div>
              <div>
                <h3>数据</h3>
                <pre>{qrInfo?.data}</pre>
              </div>
              <div>
                <h3>区块</h3>
                {qrInfo &&
                  qrInfo.chunks.map((v, i) => (
                    <div key={i}>
                      <ChunkInfo chunk={v} />
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </Spin>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div>
          <ImageReceiver decoderType="canvas" onImageDataChange={setImageData} />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
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

        <QRCodeReaderPageContent />
      </PageContent>
    </PageLayout>
  );
};

export default Page;
