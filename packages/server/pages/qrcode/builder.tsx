import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Form, Input, InputNumber, PageHeader, Select, Switch} from 'antd';
import React, {useEffect, useState} from 'react';
import QRCode, {CanvasQRCodeProps, SvgQRCodeProps} from 'qrcode.react'
import {QrcodeOutlined} from '@ant-design/icons';
import produce from 'immer';

const Option = Select.Option
export type OptionLike = string[] | string[][] | Array<{ label, value }>;

export function normalizeOptions(o: OptionLike): Array<{ label, value }> {
  if (typeof o?.[0] === 'string') {
    return (o as string[]).map((v, i) => ({label: v, value: i}))
  }
  if (Array.isArray(o?.[0])) {
    return (o as string[][]).map(([v, i]) => ({label: v, value: i}))
  }
  return o as Array<{ label, value }>;
}

const QRCodeBuilderPageContent = () => {
  const [form] = Form.useForm();

  const [options, setOptions] = useState<CanvasQRCodeProps | SvgQRCodeProps>({
    value: 'https://apis.wener.me',
    renderAs: 'svg',
    size: 128,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'H',
    imageSettings: {
      src: '',
      width: 24,
      height: 24,
    },
  });
  useEffect(() => {
    form.setFieldsValue(options)
  }, []);

  const fields = [
    {key: 'value', name: null, label: '二维码内容'},
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
    {key: 'fgColor', label: '前景色', widget: 'react-color-picker'},
    {key: 'bgColor', label: '背景色', widget: 'react-color-picker'},
    {key: 'imageSettings.src', label: '图片地址'},
    {key: 'imageSettings.height', label: '图片宽', widget: 'number'},
    {key: 'imageSettings.width', label: '图片高', widget: 'number'},
    {key: 'imageSettings.excavate', label: '图片位置镂空', widget: 'switch'},
  ];

  fields.forEach(v => {
    if (v.key.includes('.')) {
      v.name = v.key.split('.');
    }
  });

  const buildWidget = (item) => {
    const {widget} = item;
    let {options = []} = item;
    options = normalizeOptions(options);
    switch (widget) {
      case 'number':
        return <InputNumber />
      case 'switch':
        return <Switch />
      case 'select':
        if (!options.length) {
          console.error(`no options`, item)
        }
        return (
          <Select>
            {options.map(({label, value}, i) => (
              <Option value={value} key={i}>{label}</Option>
            ))}
          </Select>
        )

      default:
    }
    return <Input />
  }
  const buildFormItem = (item) => {
    const {label, key, name} = item;
    return (
      <Form.Item key={key} label={label} name={name || key}>
        {buildWidget(item)}
      </Form.Item>
    )
  }

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
              fields.map(buildFormItem)
            }
          </Form>
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
