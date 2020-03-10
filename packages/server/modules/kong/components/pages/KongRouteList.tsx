import React, {CSSProperties, useMemo, useState} from 'react'
import {normalizeColumns} from 'libs/antds/table/normal';
import {KongRouteEntity} from 'modules/kong/apis/types';
import {renderArrayOfString, renderBoolean, renderTimeStamp} from 'modules/kong/components/renders';
import {Button, Divider, Form, Input, Select} from 'antd';
import {buildInitialValues, FormFieldBuilder, FormFieldProps, FormFieldsBuilder} from 'libs/antds/form/builder';
import {KongEntityTable, OperationColumn} from 'modules/kong/components/KongEntityTable';
import {flatMapDeep, keyBy, omitBy, uniq} from 'lodash';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons/lib';

const HeaderInput: React.FC<{ value?, onChange?, style?: CSSProperties }> = ({value = [], style, onChange}) => {
  const [name = '', values = []] = value;
  return (
    <div style={style}>
      <Input
        type="text"
        value={name}
        required
        onChange={v => onChange([v.target.value, values])}
        style={{width: '40%'}}
        placeholder="X-Token"
      />
      <Select
        value={values}
        onChange={v => onChange([name, v])}
        mode="tags"
        style={{width: '60%'}}
      />
    </div>
  )
};

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 20},
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 20, offset: 4},
  },
};

const fields = [
  {key: 'name', label: '名字'},
];
const otherFields = [
  {
    key: 'https_redirect_status_code',
    label: '重定向码',
    widget: 'select',
    required: true,
    options: [426, 301, 302, 307, 308],
  },
  {
    key: 'regex_priority',
    label: '正则优先级',
    widget: 'number',
    defaultValue: 0,
  },
  {
    key: 'strip_path',
    label: '剔除路径',
    widget: 'switch',
    defaultValue: true,
  },
  {
    key: 'path_handling',
    label: '路径处理逻辑',
    widget: 'select',
    defaultValue: 'v0',
    options: ['v1', 'v0'],
  },
  {
    key: 'preserve_host',
    label: '保留主机',
    widget: 'switch',
    defaultValue: false,
  },
  {
    key: 'tags',
    label: '标签',
    widget: 'select',
    defaultValue: [],
    widgetProps: {mode: 'tags'},
  },
];
const protocolFields: FormFieldProps[] = [
  {
    key: 'methods',
    label: '方法',
    widget: 'select',
    widgetProps: {mode: 'multiple'},
    options: ['GET', 'POST', 'DELETE', 'PATCH', 'HEAD', 'PUT', 'OPTIONS'],
  },
  {
    key: 'hosts',
    label: '主机',
    widget: 'select',
    widgetProps: {mode: 'tags'},
  },
  {
    key: 'paths',
    label: '路径',
    widget: 'select',
    widgetProps: {mode: 'tags'},
  },
  {
    key: 'headers',
    label: '请求头',
    render({field}) {
      const {name, label, key} = field;
      return (
        <Form.List name={name} key={key}>
          {(fields, {add, remove}) => (
            <div>
              {fields.map((field, i) => (
                <Form.Item
                  {...(i === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={i === 0 ? label : ''}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    noStyle
                  >
                    <HeaderInput style={{minWidth: '60%', maxWidth: 'calc(100% - 32px)', marginRight: 8}} />
                  </Form.Item>

                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                      }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}

                </Form.Item>
              ))}

              <Form.Item
                {...(fields.length === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={fields.length === 0 ? label : ''}
              >
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{minWidth: '60%', maxWidth: 'calc(100% - 32px)'}}
                >
                  <PlusOutlined /> 添加
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      )
    },
    normalize: Object.entries,
    getValueFromEvent: Object.fromEntries,
  },
  {
    key: 'snis',
    label: 'SNIs',
    widget: 'select',
    defaultValue: [],
    widgetProps: {mode: 'tags'},
  },
  {
    key: 'sources',
    label: '来源',
    widget: 'select',
    defaultValue: [],
    widgetProps: {mode: 'tags'},
  },
  {
    key: 'destinations',
    label: '目标',
    widget: 'select',
    defaultValue: [],
    widgetProps: {mode: 'tags'},
  },
];
protocolFields.forEach(v => Object.assign(v, {labelCol: {span: 4}, wrapperCol: {span: 20}}));

const protocolFieldByKey = keyBy(protocolFields, 'key');

const protocolFieldSet = {
  http: [
    ['methods', 'hosts', 'headers'],
    ['paths']
  ],
  https: [
    ['methods', 'hosts', 'headers', 'paths'],
    ['snis']
  ],
  tcp: [
    ['sources'],
    ['destinations']
  ],
  tls: [
    ['sources', 'destinations'],
    ['snis']
  ],
  grpc: [
    ['hosts', 'headers'],
    ['paths']
  ],
  grpcs: [
    ['hosts', 'headers', 'paths'],
    ['snis']
  ],
};

const RouteForm: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  const initial = useMemo(() => {
    // pre process
    // null 不能被赋初始值
    const initial = omitBy(initialValues, v => v === null) ?? buildInitialValues([...fields]);
    if (initial['headers'] && !Array.isArray(initial['headers'])) {
      initial['headers'] = Object.entries(initial['headers'])
    }
    return initial;
  }, [initialValues]);

  const [form] = Form.useForm();

  const [protocols, setProtocols] = useState<string[]>(initialValues?.['protocols'] || []);
  const currentProtocolFields = useMemo(() => {
    const keys = uniq(flatMapDeep(protocols, v => protocolFieldSet[v]));
    return keys.map(v => protocolFieldByKey[v])
  }, [protocols]);

  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{span: 4}}
      wrapperCol={{span: 20}}
      onFinish={(values) => {
        // post process
        if (values['headers'] && Array.isArray(values['headers'])) {
          values['headers'] = Object.fromEntries(values['headers'])
        }
        onSubmit(values)
        console.log('values', values)
      }}
      onValuesChange={(v, r) => {
        if (v?.['protocols']) {
          setProtocols(v['protocols'])
        }
      }}
    >
      <FormFieldsBuilder pure fields={fields} />

      <Divider>协议配置</Divider>

      <FormFieldBuilder pure field={{
        key: 'protocols',
        label: '协议',
        widget: 'select',
        widgetProps: {mode: 'multiple'},
        required: true,
        defaultValue: 'http',
        options: ['grpc', 'grpcs', 'http', 'https', 'tcp', 'tls'],
      }} />

      <FormFieldsBuilder fields={currentProtocolFields} />

      <Divider>公共配置</Divider>

      <FormFieldsBuilder pure fields={otherFields} />

      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button htmlType="submit" type="primary">提交</Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>重置</Button>
      </div>
    </Form>
  )
};


export const KongRouteList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns<KongRouteEntity>([
    {dataIndex: 'name', title: '名字', fixed: 'left', width: 160, className: 'no-wrap'},
    {dataIndex: 'id', title: 'ID', width: 300},
    {key: 'service.id', title: '服务ID', width: 300},

    {dataIndex: 'methods', title: '方法', width: 100, render: renderArrayOfString},
    {dataIndex: 'protocols', title: '协议', width: 160, render: renderArrayOfString},
    {dataIndex: 'hosts', title: '主机', width: 160, render: renderArrayOfString},
    {dataIndex: 'paths', title: '路径', width: 160, render: renderArrayOfString},

    {dataIndex: 'https_redirect_status_code', title: '重定向码', width: 80, render: renderArrayOfString},
    {dataIndex: 'regex_priority', title: '正则优先', width: 80, render: renderArrayOfString,},
    {dataIndex: 'strip_path', title: 'Strip Path', width: 80, render: renderBoolean},
    {dataIndex: 'path_handling', title: 'Path Handling', width: 120},
    {dataIndex: 'preserve_host', title: '保留主机', width: 80, render: renderBoolean},

    {dataIndex: 'created_at', title: '创建时间', width: 160, render: renderTimeStamp},
    {dataIndex: 'updated_at', title: '更新时间', width: 160, render: renderTimeStamp},

    OperationColumn,
  ]), []);


  return <KongEntityTable
    label="路由"
    name="Route"
    columns={columns}
    editor={RouteForm}
  />
};

