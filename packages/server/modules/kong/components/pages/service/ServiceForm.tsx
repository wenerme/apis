import React, {useMemo} from 'react';
import {EntitySelect} from 'modules/kong/components/entity/EntitySelect';
import {ProtocolTypes} from 'modules/kong/apis/types';
import {omitBy} from 'lodash';
import {buildInitialValues, FormFieldBuilder, FormFieldsBuilder} from 'libs/antds/form/builder';
import URI from 'urijs';
import {Button, Divider, Form, message} from 'antd';
import {Trans} from 'react-i18next';
import {TagsField} from 'modules/kong/components/entity/KongEntityTable';

export const ServiceForm: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  const fields = [
    {key: 'name', label: '名字'},
    {
      key: 'retries',
      label: '重试',
      widget: 'number',
      defaultValue: 5,
      required: true,
      help: '代理请求失败的重试次数',
    },
    {key: 'connect_timeout', label: '链接超时', widget: 'number', required: true, defaultValue: 60000},
    {key: 'write_timeout', label: '写超时', widget: 'number', required: true, defaultValue: 60000},
    {key: 'read_timeout', label: '读超时', widget: 'number', required: true, defaultValue: 60000},
    TagsField,
    {
      key: 'client_certificate',
      label: '客户端证书',
      widget: EntitySelect,
      widgetProps: {
        entityName: 'Certificate'
      }
    },
  ];
  const connectionFields = [
    {
      key: 'url',
      label: 'URL',
    },
    {
      key: 'protocol',
      label: '协议',
      widget: 'select',
      required: true,
      defaultValue: 'http',
      options: ProtocolTypes,
    },
    {
      key: 'host',
      label: '主机',
      defaultValue: '172.19.0.1',
      required: true,
    },
    {
      key: 'port',
      label: '端口',
      defaultValue: 80,
      widget: 'number',
      // rules: [{min: 0, max: 65535}],
      required: true,
    },
    {
      key: 'path',
      label: '路径',
    },
  ];

  const initial = useMemo(() => {
    const o: any = initialValues ? omitBy(initialValues, v => v === null) : buildInitialValues([...fields, ...connectionFields]);
    const {protocol, host, port, path} = o;
    try {
      if (!o['url']) {
        o['url'] = new URI({protocol, hostname: host, port, path}).toString()
      }
    } catch (e) {
      console.error(`Build url failed`, {protocol, host, port, path}, e)
    }
    return o
  }, [initialValues]);

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      onFinish={(values) => {
        // if (!values.client_certificate?.id) {
        //   values.client_certificate = null
        // }
        onSubmit(values)
      }}
      onValuesChange={(v, r) => {
        const f = ['hostname', 'protocol', 'port', 'path'];
        if (v['url']) {
          try {
            const uri = new URI(v['url']);
            const o: any = {};
            f.forEach(v => {
              const neo = uri[v]();
              if (r[v] !== neo) {
                o[v] = neo;
              }
            });
            const {hostname, ...values} = o;
            form.setFieldsValue({...values, host: hostname});
          } catch (e) {
            message.error(`无效的URL: ${e}`)
          }
        } else {
          const {protocol, host, port, path} = r;
          const neo = new URI({protocol, hostname: host, port, path}).toString();
          if (neo !== r['url']) {
            form.setFieldsValue({url: neo});
          }
        }
      }}
    >
      {initial?.id && <FormFieldBuilder pure field={{key: 'id', label: 'ID', readOnly: true}} />}
      <FormFieldsBuilder pure fields={fields} />
      <Divider><Trans>上游</Trans></Divider>
      <FormFieldsBuilder pure fields={connectionFields} />


      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button htmlType="submit" type="primary"><Trans>提交</Trans></Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}><Trans>重置</Trans></Button>
      </div>
    </Form>
  )
};
