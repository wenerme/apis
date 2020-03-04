import React, {useEffect, useState} from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Descriptions, PageHeader, Spin} from 'antd';
import {QrcodeOutlined} from '@ant-design/icons/lib';
import {ImageReceiver} from 'components/ImageReceiver';
import {Result} from '@zxing/library';

const formats = Object.entries({
  /** Aztec 2D barcode format. */
  AZTEC: 0,
  /** CODABAR 1D format. */
  CODABAR: 1,
  /** Code 39 1D format. */
  CODE_39: 2,
  /** Code 93 1D format. */
  CODE_93: 3,
  /** Code 128 1D format. */
  CODE_128: 4,
  /** Data Matrix 2D barcode format. */
  DATA_MATRIX: 5,
  /** EAN-8 1D format. */
  EAN_8: 6,
  /** EAN-13 1D format. */
  EAN_13: 7,
  /** ITF (Interleaved Two of Five) 1D format. */
  ITF: 8,
  /** MaxiCode 2D barcode format. */
  MAXICODE: 9,
  /** PDF417 format. */
  PDF_417: 10,
  /** QR Code 2D barcode format. */
  QR_CODE: 11,
  /** RSS 14 */
  RSS_14: 12,
  /** RSS EXPANDED */
  RSS_EXPANDED: 13,
  /** UPC-A 1D format. */
  UPC_A: 14,
  /** UPC-E 1D format. */
  UPC_E: 15,
  /** UPC/EAN extension format. Not a stand-alone format. */
  UPC_EAN_EXTENSION: 16
})
const LinearBarCodeReaderPageContent: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [result, setResult] = useState<Result>();
  const [loading, setLoading] = useState(false);

  let format: any = result?.getBarcodeFormat() ?? null
  if (format !== null) {
    format = formats.find(([_, v]) => v === format)?.[0]
  }
  useEffect(() => {
    if (!image) {
      return
    }

    setLoading(true)

    import('@zxing/library')
      .then(async ({BrowserBarcodeReader}) => {
        const reader = new BrowserBarcodeReader();
        const result = await reader.decodeFromImageElement(image);
        setResult(result);
        console.log(`decode result`, result)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [image]);

  return (
    <div className="container">
      <div>
        <h2>条形码内容</h2>
        <Spin spinning={loading}>
          <Descriptions>
            <Descriptions.Item key={1} span={3} label="文本">{result?.getText()}</Descriptions.Item>
            <Descriptions.Item key={2} label="格式">{format}</Descriptions.Item>
          </Descriptions>
        </Spin>
      </div>
      <div>
        <div>
          <ImageReceiver
            decoderType="canvas"
            onImageLoad={setImage}
          />
        </div>
      </div>
      <style jsx>{`
.container {
  display: flex;
}
.container > div{
  flex: 1;
}
@media (max-width: 767.98px) { 
  .container {
    flex-flow: column;
  }
}
`}</style>
    </div>
  )
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>条形码扫描</title>
          <meta name="description" content="在线条形码扫描" />
          <meta name="keywords" content="online barcode scan" />
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{marginRight: 8}} />
              条形码扫描
            </div>
          }
          backIcon={false}
        />

        <LinearBarCodeReaderPageContent />

      </PageContent>
    </PageLayout>
  )
};
export default Page
