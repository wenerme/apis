import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {PageHeader} from 'antd';
import React, {useState} from 'react';
import QRCode, {CanvasQRCodeProps, SvgQRCodeProps} from 'qrcode.react'
import {QrcodeOutlined} from '@ant-design/icons';

const QRCodeBuilderPageContent = () => {

  const [options, setOptions] = useState<CanvasQRCodeProps | SvgQRCodeProps>({
    value: 'https://apis.wener.me',
    renderAs: 'svg',
  });

  const fields = [
    {key: 'value', label: '二维码内容'},
    {key: 'size', label: '尺寸', widget: 'number'},
    {
      key: 'renderAs',
      label: '渲染方式',
      widget: 'select',
      options: [{value: 'svg', label: 'SVG'}, {value: 'canvas', label: 'Canvas'}]
    },
    // level	string ('L' 'M' 'Q' 'H')	'L'
    {
      key: 'level',
      label: '容错率',
      widget: 'select',
      options: [['L', '低 - 7%'], ['M', '中 - 15%'], ['Q', '四分之一 - 25%'], ['H', '高 - 30%'],]
    },
    {key: 'includeMargin', label: '包含边距', widget: 'switch'},
    {key: 'fgColor', label: '前景色', widget: 'react-color-picker'},
    {key: 'bgColor', label: '背景色', widget: 'react-color-picker'},
    {key: 'imageSettings.src', label: '图片地址'},
    {key: 'imageSettings.height', label: '图片宽', widget: 'number'},
    {key: 'imageSettings.width', label: '图片高', widget: 'number'},
    {key: 'imageSettings.excavate', label: '图片位置镂空', widget: 'switch'},
  ];

  return (
    <div className="container">
      <div style={{flex: 1}}>
        <h3>生成参数</h3>
        <div>

        </div>
      </div>
      <div style={{flex: 1}}>

        <figure style={{textAlign: 'center'}}>
          <QRCode {...(options as any)} />
          <figcaption>二维码</figcaption>
        </figure>
      </div>
      <style jsx>{`
.container {
  display: flex;
}
`}</style>
    </div>
  )
}

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>二维码/QR code/快速响应码 生成器</title>
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{marginRight: 8}} />
              二维码/QR code 生成器
            </div>
          }
          backIcon={false}
        />

        <QRCodeBuilderPageContent />

      </PageContent>
    </PageLayout>
  )
};

export default Page
