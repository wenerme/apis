import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageLayout } from '../../../components/layout/PageLayout/PageLayout';
import { PageContent } from '../../../components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { Alert, Form, message, PageHeader } from 'antd';
import { BarcodeOutlined } from '@ant-design/icons/lib';
import JsBarcode, { Options as BarcodeOptions } from 'jsbarcode';
import { FormFieldProps, FormFieldsBuilder } from '../../../libs/antds/form/builder';
import produce from 'immer';
import { SketchColorPicker } from '../../../libs/antds/form/SketchColorPicker';
import { API } from '../../../apis/api';
import { ResourceLinkButton } from '../../../components/ResourceLinkButton';
import { useDebounceEffect } from '@wener/utils/src/reactx/hooks/useDebounceEffect';

const Barcode: React.FC<BarcodeOptions & { value: string; renderer?: 'svg' | 'canvas' | 'img' }> = (props) => {
  const { renderer = 'svg' } = props;
  const eleRef = useRef();
  useDebounceEffect(
    () => {
      if (!eleRef.current) {
        return;
      }
      try {
        const { value, renderer, ...options } = props;
        console.time(`JsBarcode`);
        JsBarcode(eleRef.current, value, options);
      } catch (e) {
        message.error(`生成条形码失败:${e}`, 3);
        console.log(`generate failed`, props, e);
      } finally {
        console.timeEnd(`JsBarcode`);
      }
    },
    [props],
    1000
  );

  const Ele = renderer;
  // not support high dpi
  // const dpr = getGlobalThis()?.devicePixelRatio ?? 1;
  return <Ele ref={eleRef} />;
};

const defaults = {
  CODE128: 'https://apis.wener.me',
  CODE128A: 'WENER',
  CODE128B: 'Wener.me',
  CODE128C: '12345678',

  CODE39: 'WENER ME',

  EAN2: '10',
  EAN5: '12340',
  EAN8: '12345670',
  EAN13: '1234567890128',

  UPC: '123456789999',
  UPCE: '0123456',

  ITF14: '10012345000017',
  ITF: '123456',

  MSI: '123456',
  MSI10: '123456',
  MSI11: '123456',
  MSI1010: '123456',
  MSI1110: '123456',

  pharmacode: '123456',

  codabar: '123456',
  GenericBarcode: '123456',
};

const formats = [
  'CODE39',
  'CODE128',
  'CODE128A',
  'CODE128B',
  'CODE128C',
  'EAN13',
  'EAN8',
  'EAN5',
  'EAN2',
  'UPC',
  'UPCE',
  'ITF14',
  'ITF',
  'MSI',
  'MSI10',
  'MSI11',
  'MSI1010',
  'MSI1110',
  'pharmacode',
  'codabar',
  'GenericBarcode',
];

const LinearBarCodeBuilderPageContent: React.FC = () => {
  const [form] = Form.useForm();
  const initRef = useRef<boolean>();

  const [options, setOptions] = useState<{ value; renderer } & BarcodeOptions>({
    renderer: 'svg',
    value: 'https://apis.wener.me',
    width: 2,
    height: 100,
    format: 'CODE128',
    displayValue: true,
    fontOptions: '',
    font: 'monospace',
    text: undefined,
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 20,
    background: '#ffffff',
    lineColor: '#000000',
    margin: 10,
    marginTop: undefined,
    marginBottom: undefined,
    marginLeft: undefined,
    marginRight: undefined,
    // valid: () => null
  });
  useEffect(() => {
    form.setFieldsValue(options);
    initRef.current = true;
  }, []);

  const fields: FormFieldProps[] = useMemo(
    () => [
      { key: 'value', label: '数据', widget: 'textarea' },
      { key: 'format', label: '格式', widget: 'select', options: formats },
      {
        key: 'renderer',
        label: '渲染方式',
        widget: 'select',
        options: ['svg', 'canvas', 'img'],
      },

      {
        key: 'width',
        label: '宽',
        widget: 'slider',
        widgetProps: { min: 1, max: 4 },
      },
      {
        key: 'height',
        label: '高',
        widget: 'slider',
        widgetProps: { min: 10, max: 150 },
      },
      { key: 'displayValue', label: '显示值', widget: 'switch' },
      { key: 'background', label: '背景色', widget: SketchColorPicker },
      { key: 'lineColor', label: '线条色', widget: SketchColorPicker },
    ],
    []
  );

  return (
    <div className="container">
      <div>
        <Form
          form={form}
          onValuesChange={(v) => {
            setOptions(
              produce((s) => {
                // change default value
                if (initRef.current && v.format && s.format !== v.format && s.value === defaults[s.format]) {
                  s.value = defaults[v.format];
                  form.setFieldsValue({ value: defaults[v.format] });
                }
                Object.assign(s, v);
              })
            );
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <FormFieldsBuilder fields={fields} />
        </Form>
      </div>
      <div>
        <ResourceLinkButton
          formats={['svg', 'png', 'jpg']}
          nameProvider={({ format: imageFormat }) => `${options.value}-${options.format}.${imageFormat}`}
          linkProvider={({ format: imageFormat }) =>
            `${API.origin}/api/barcode/gen/${options.format}/${encodeURIComponent(options.value)}.${imageFormat}`
          }
        />
        <figure style={{ textAlign: 'center', marginTop: 16 }}>
          {/*<Barcode {...options} />*/}
          {React.createElement(Barcode, options)}
          <figcaption>条形码</figcaption>
        </figure>
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
    <PageLayout>
      <PageContent>
        <Head>
          <title>条形码生成</title>
          <meta name="description" content="在线条形码生成" />
          <meta name="keywords" content="自定义,条形码生成,customize,linear barcode generate" />
        </Head>
        <PageHeader
          title={
            <div>
              <BarcodeOutlined style={{ marginRight: 8 }} />
              条形码生成
            </div>
          }
          backIcon={false}
        />

        <LinearBarCodeBuilderPageContent />

        <div style={{ marginTop: 18 }}>
          <Alert
            type="info"
            showIcon
            message={
              <div>
                内容规格参考
                <a href="https://en.wikipedia.org/wiki/Barcode">Barcode</a> <br />
                开发库参考
                <ul>
                  <li>
                    <a href="https://github.com/kciter/react-barcode">kciter/react-barcode</a>
                  </li>
                  <li>
                    <a href="https://github.com/lindell/JsBarcode">lindell/JsBarcode</a>
                  </li>
                </ul>
                类似
                <ul>
                  <li>
                    <a href="https://barcode.tec-it.com/zh/Code128?data=ABC-abc-1234">barcode.tec-it.com</a>
                  </li>
                  <li>
                    <a href="https://lindell.me/JsBarcode/generator/">JsBarcode/generator</a>
                  </li>
                </ul>
              </div>
            }
          />
        </div>
      </PageContent>
    </PageLayout>
  );
};
export default Page;
