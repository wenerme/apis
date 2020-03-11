import React, {useMemo} from 'react'
import {Button, Divider, Form, message} from 'antd';
import {normalizeColumns} from 'libs/antds/table/normal';
import URI from 'urijs'
import {buildInitialValues, FormFieldBuilder, FormFieldsBuilder} from 'libs/antds/form/builder';
import {createEntityColumns, KongEntityTable} from 'modules/kong/components/KongEntityTable';
import {omitBy} from 'lodash';
import {ProtocolTypes} from 'modules/kong/apis/types';
import {EntitySelect} from 'modules/kong/components/EntitySelect';

const ServiceForm: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  const fields = [
    {key: 'name', label: '名字'},
    {
      key: 'retries',
      label: '重试次数',
      widget: 'number',
      defaultValue: 5,
      required: true,
      help: '代理请求失败的重试次数',
    },
    {key: 'connect_timeout', label: '链接超时', widget: 'number', required: true, defaultValue: 60000},
    {key: 'write_timeout', label: '写超时', widget: 'number', required: true, defaultValue: 60000},
    {key: 'read_timeout', label: '读超时', widget: 'number', required: true, defaultValue: 60000},
    {
      key: 'tags',
      label: '标签',
      widget: 'select',
      defaultValue: [],
      widgetProps: {mode: 'tags'},
    },
    {
      key: 'client_certificate.id',
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
    const o = initialValues ? omitBy(initialValues, v => v === null) : buildInitialValues([...fields, ...connectionFields]);
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
      onFinish={onSubmit}
      onValuesChange={(v, r) => {
        const f = ['host', 'protocol', 'port', 'path'];
        if (v['url']) {
          try {
            const uri = new URI(v['url']);
            const o = {};
            f.forEach(v => {
              const neo = uri[v]();
              if (r[v] !== neo) {
                o[v] = neo;
              }
            });
            form.setFieldsValue(o);
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
      {initial.id && <FormFieldBuilder pure field={{key: 'id', label: 'ID', readOnly: true}} />}
      <FormFieldsBuilder pure fields={fields} />
      <Divider>上游</Divider>
      <FormFieldsBuilder pure fields={connectionFields} />


      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button htmlType="submit" type="primary">提交</Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>重置</Button>
      </div>
    </Form>
  )
};

export const KongServiceList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns(createEntityColumns([
    {
      title: '目标',
      width: 250,
      className: 'no-wrap',
      render(v, r, i): any {
        const {host, protocol, path, port} = r;
        const uri = new URI('');
        Object.entries({host, protocol, path, port})
          .forEach(([k, v]) => {
            if (v) {
              uri[k](v)
            }
          });
        return uri.toString()
      }
    },
    {dataIndex: 'retries', title: '重试', width: 80,},
    {dataIndex: 'connect_timeout', title: '链接超时', width: 100},
    {dataIndex: 'write_timeout', title: '写超时', width: 100},
    {dataIndex: 'read_timeout', title: '读超时', width: 100},
  ])), []);


  return (
    <KongEntityTable
      label={'服务'}
      name={'Service'}
      columns={columns}
      editor={ServiceForm}
    />
  )
};

