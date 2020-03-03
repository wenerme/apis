import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Button, Form, message, PageHeader} from 'antd';
import React, {useEffect, useState} from 'react';
import QRCode, {CanvasQRCodeProps, SvgQRCodeProps} from 'qrcode.react'
import {QrcodeOutlined} from '@ant-design/icons';
import produce from 'immer';
import {buildFormItem} from 'libs/antds/form/builder';
import {SketchColorPicker} from 'libs/antds/form/SketchColorPicker';
import {format, UrlObject} from 'url';
import {API} from 'apis/api';
import {copy} from 'utils/clipboard';

const QRCodeBuilderPageContent = () => {
  const [form] = Form.useForm();

  const [options, setOptions] = useState<CanvasQRCodeProps | SvgQRCodeProps>({
    value: 'https://apis.wener.me',
    renderAs: 'svg',
    size: 256,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'H',
    imageSettings: {
      src: '',
      width: 48,
      height: 48,
    },
  });
  useEffect(() => {
    form.setFieldsValue(options)
  }, []);

  const fields = [
    {key: 'value', name: null, label: '二维码内容', required: true},
    {key: 'size', label: '尺寸', widget: 'number'},
    {
      key: 'renderAs',
      label: '渲染方式',
      widget: 'select',
      options: [{value: 'svg', label: 'SVG'}, {value: 'canvas', label: 'Canvas'}]
    },
    {
      key: 'level',
      label: '容错率',
      widget: 'select',
      options: [['L', '低 - 7%'], ['M', '中 - 15%'], ['Q', '四分之一 - 25%'], ['H', '高 - 30%'],]
    },
    {key: 'includeMargin', label: '包含边距', widget: 'switch'},
    {key: 'fgColor', label: '前景色', widget: 'SketchColorPicker'},
    {key: 'bgColor', label: '背景色', widget: 'SketchColorPicker'},
    {key: 'imageSettings.src', label: '图片地址'},
    {key: 'imageSettings.height', label: '图片宽', widget: 'number'},
    {key: 'imageSettings.width', label: '图片高', widget: 'number'},
    {key: 'imageSettings.excavate', label: '图片位置镂空', widget: 'switch'},
  ];

  const doCopyImgLink = () => {
    const {value, imageSettings, renderAs, ...query} = options;
    const svgUrl = API.apiOf(format({
      pathname: `/api/qrcode/svg/${encodeURIComponent(value)}`,
      query: query as any,
    } as UrlObject));

    copy(svgUrl);
    message.success('复制成功')
  };

  return (
    <div className="container">
      <div style={{flex: 1}}>
        <h3>生成参数</h3>
        <div>
          <Form
            form={form}
            onValuesChange={v => {
              setOptions(produce(s => {
                Object.assign(s, v)
              }))
            }}
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
          >
            {
              fields.map(v => buildFormItem(v, {widgets: [SketchColorPicker]}))
            }
          </Form>
        </div>
      </div>
      <div style={{flex: 1}}>
        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 32}}>
          <Button onClick={doCopyImgLink}>复制图片链接</Button>
        </div>
        <figure style={{textAlign: 'center'}}>
          <QRCode {...(options as any)} />
          <figcaption>二维码</figcaption>
        </figure>
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
