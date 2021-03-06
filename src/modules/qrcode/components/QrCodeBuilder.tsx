import { Form, Input } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import QRCode, { CanvasQRCodeProps, SvgQRCodeProps } from 'qrcode.react';
import produce from 'immer';
import { FormFieldBuilder, FormFieldProps, FormFieldsBuilder } from 'src/libs/antds/form/builder';
import { SketchColorPicker } from 'src/libs/antds/form/SketchColorPicker';
import { merge } from 'lodash';
import { ResourceLinkButton } from 'src/components/ResourceLinkButton';
import { buildQrCodeLink } from 'src/servers/routers/api/barcode/buildQrCodeLink';

function buildValue(o) {
  const v = o[o.type];
  switch (o.type) {
    case 'wifi': {
      // WIFI:T:WPA;S:mynetwork;P:mypass;;
      const { encryption, ssid, password, hidden } = v;
      return `WIFI:T:${encryption};S:${ssid ?? ''};P:${!encryption || encryption === 'nopass' ? '' : password ?? ''};${
        hidden ? 'H:true' : ''
      };`;
    }
    case 'tel': {
      const { countryCode, number } = v;
      return `tel:${countryCode}${number ?? ''}`;
    }
    default:
    case 'text':
      return v;
  }
}

export const QrCodeBuilder: React.FC = () => {
  const [form] = Form.useForm();
  const [valueForm] = Form.useForm();

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
    form.setFieldsValue(options);
  }, []);

  // https://github.com/zxing/zxing/wiki/Barcode-Contents
  const [valueObject, setValueObject] = useState({
    type: 'text',
    text: 'https://apis.wener.me',
    wifi: {
      encryption: 'WAP',
      ssid: 'wener-wifi',
      password: 'wifi-password',
    },
    tel: {
      countryCode: '+86',
      number: '10086',
    },
  });
  useEffect(() => {
    valueForm.setFieldsValue(valueObject);
  }, []);
  useEffect(() => {
    const value = buildValue(valueObject);
    setOptions(
      produce((s) => {
        s.value = value;
      }),
    );
    form.setFieldsValue({ value });
  }, [valueObject]);

  const fields: FormFieldProps[] = useMemo(
    () => [
      {
        key: 'value',
        label: '二维码内容',
        required: true,
        'widget:readOnly': true,
      },
      {
        key: 'size',
        label: '尺寸',
        widget: 'slider',
        widgetProps: { min: 64, max: 300 },
      },
      {
        key: 'renderAs',
        label: '渲染方式',
        widget: 'select',
        options: [
          { value: 'svg', label: 'SVG' },
          { value: 'canvas', label: 'Canvas' },
        ],
      },
      {
        key: 'level',
        label: '容错率',
        widget: 'select',
        options: [
          ['L', '低 - 7%'],
          ['M', '中 - 15%'],
          ['Q', '四分之一 - 25%'],
          ['H', '高 - 30%'],
        ],
      },
      { key: 'includeMargin', label: '包含边距', widget: 'switch' },
      { key: 'fgColor', label: '前景色', widget: 'SketchColorPicker' },
      { key: 'bgColor', label: '背景色', widget: 'SketchColorPicker' },
      { key: 'imageSettings.src', label: '图片地址' },
      {
        key: 'imageSettings.height',
        label: '图片宽',
        widget: 'slider',
        widgetProps: { min: 16, max: 150 },
      },
      {
        key: 'imageSettings.width',
        label: '图片高',
        widget: 'slider',
        widgetProps: { min: 16, max: 150 },
      },
      {
        key: 'imageSettings.excavate',
        label: '图片位置镂空',
        widget: 'switch',
      },
    ],
    [],
  );

  const linkProvider = ({ format }) => {
    const { value, imageSettings, renderAs, ...query } = options;
    return buildQrCodeLink({ value, format, ...imageSettings });
  };

  return (
    <div className="container">
      <div>
        <h3>生成参数</h3>
        <div>
          <Form
            form={valueForm}
            onValuesChange={(v) => {
              setValueObject(
                produce((s) => {
                  merge(s, v);
                }),
              );
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <FormFieldBuilder
              pure
              field={{
                key: 'type',
                label: '值类型',
                required: true,
                widget: 'select',
                options: [
                  ['text', '文本'],
                  ['wifi', 'WiFi'],
                  ['tel', '电话号码'],
                ],
              }}
            />
            {valueObject.type === 'text' && (
              <FormFieldBuilder
                pure
                field={{
                  key: 'text',
                  name: null,
                  label: '文本内容',
                  required: true,
                }}
              />
            )}
            {valueObject.type === 'wifi' && (
              <React.Fragment>
                <FormFieldsBuilder
                  pure
                  fields={[
                    { key: 'wifi.ssid', label: 'SSID/网络名', required: true },
                    {
                      key: 'wifi.encryption',
                      label: '加密方式',
                      widget: 'select',
                      options: [
                        ['WPA', 'WPA/WPA2'],
                        ['WEP', 'WEP'],
                        ['nopass', '无密码'],
                      ],
                    },
                  ]}
                />
                {valueObject['wifi']?.encryption !== 'nopass' && (
                  <FormFieldBuilder
                    pure
                    field={{
                      key: 'wifi.password',
                      label: '密码',
                      widget: 'password',
                    }}
                  />
                )}
                {
                  <FormFieldBuilder
                    pure
                    field={{
                      key: 'wifi.hidden',
                      label: '隐藏网络',
                      widget: 'switch',
                    }}
                  />
                }
              </React.Fragment>
            )}

            {valueObject.type === 'tel' && (
              <FormFieldBuilder
                pure
                field={{
                  key: 'tel.number',
                  label: '电话号码',
                  required: true,
                  widget: <Input pattern="^[-0-9]*$" addonBefore={valueObject.tel.countryCode} />,
                }}
              />
            )}
          </Form>
          <hr />
          <Form
            form={form}
            onValuesChange={(v) => {
              setOptions(
                produce((s) => {
                  Object.assign(s, v);
                }),
              );
            }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <FormFieldsBuilder fields={fields} widgets={[SketchColorPicker]} />
          </Form>
        </div>
      </div>
      <div>
        <ResourceLinkButton linkProvider={linkProvider} formats={['svg']} />
        <figure style={{ textAlign: 'center', marginTop: 16 }}>
          <QRCode {...(options as any)} />
          <figcaption>二维码</figcaption>
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
