import React, { useMemo, useState } from 'react';
import { normalizeColumns } from '../../../../../libs/antds/table/normal';
import { KongRouteEntity } from '../../../apis/types';
import { renderArrayOfString, renderBoolean, renderTags } from '../../renders';
import { Button, Divider, Form } from 'antd';
import {
  buildInitialValues,
  FormFieldBuilder,
  FormFieldProps,
  FormFieldsBuilder,
} from '../../../../../libs/antds/form/builder';
import { createEntityColumns, KongEntityTable, KongEntityTableProps } from '../../entity/KongEntityTable';
import { flatMapDeep, keyBy, omitBy, uniq } from 'lodash';
import { EntitySelect } from '../../entity/EntitySelect';
import { Trans } from 'react-i18next';
import { HeaderInput } from '../../HeaderInput';
import { FormListField } from '../../FormListField';

const fields = [{ key: 'name', label: '名字' }];
const otherFields = [
  {
    key: 'https_redirect_status_code',
    label: '重定向码',
    widget: 'select',
    required: true,
    defaultValue: 426,
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
    label: '路径处理',
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
    widgetProps: { mode: 'tags' },
  },
  {
    key: 'service',
    label: '服务',
    widget: EntitySelect,
    widgetProps: {
      entityName: 'Service',
    },
  },
];
const protocolFields: FormFieldProps[] = [
  {
    key: 'methods',
    label: '方法',
    widget: 'select',
    widgetProps: { mode: 'tags', allowClear: true, autoClearSearchValue: true },
    options: ['GET', 'POST', 'DELETE', 'PATCH', 'HEAD', 'PUT', 'OPTIONS'],
  },
  {
    key: 'hosts',
    label: '主机',
    widget: 'select',
    widgetProps: { mode: 'tags' },
  },
  {
    key: 'paths',
    label: '路径',
    widget: 'select',
    widgetProps: { mode: 'tags' },
  },
  {
    key: 'headers',
    label: '请求头',
    widget: HeaderInput,
    render: FormListField,
    normalize: Object.entries,
    getValueFromEvent: Object.fromEntries,
  },
  {
    key: 'snis',
    label: 'SNIs',
    widget: 'select',
    defaultValue: [],
    widgetProps: { mode: 'tags' },
  },
  {
    key: 'sources',
    label: '来源',
    widget: 'select',
    defaultValue: [],
    widgetProps: { mode: 'tags' },
  },
  {
    key: 'destinations',
    label: '目标',
    widget: 'select',
    defaultValue: [],
    widgetProps: { mode: 'tags' },
  },
];
protocolFields.forEach((v) => Object.assign(v, { labelCol: { span: 4 }, wrapperCol: { span: 20 } }));

const protocolFieldByKey = keyBy(protocolFields, 'key');

const protocolFieldSet = {
  http: [['methods', 'hosts', 'headers'], ['paths']],
  https: [['methods', 'hosts', 'headers', 'paths'], ['snis']],
  tcp: [['sources'], ['destinations']],
  tls: [['sources', 'destinations'], ['snis']],
  grpc: [['hosts', 'headers'], ['paths']],
  grpcs: [['hosts', 'headers', 'paths'], ['snis']],
};
const protocolField = {
  key: 'protocols',
  label: '协议',
  widget: 'select',
  widgetProps: { mode: 'multiple' },
  required: true,
  defaultValue: ['http', 'https'],
  options: ['grpc', 'grpcs', 'http', 'https', 'tcp', 'tls'],
};

const RouteForm: React.FC<{ initialValues?; onSubmit? }> = ({ initialValues, onSubmit }) => {
  const initial = useMemo(() => {
    // pre process
    // null 不能被赋初始值
    const initial = initialValues
      ? omitBy(initialValues, (v) => v === null)
      : buildInitialValues([...fields, ...otherFields, protocolField]);
    if (initial['headers'] && !Array.isArray(initial['headers'])) {
      initial['headers'] = Object.entries(initial['headers']);
    }
    return initial;
  }, [initialValues]);

  const [form] = Form.useForm();

  const [protocols, setProtocols] = useState<string[]>(initialValues?.['protocols'] || ['http', 'https']);
  const currentProtocolFields = useMemo(() => {
    const keys = uniq(flatMapDeep(protocols, (v) => protocolFieldSet[v]));
    return keys.map((v) => protocolFieldByKey[v]);
  }, protocols);

  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={(values) => {
        // post process
        if (values['headers'] && Array.isArray(values['headers'])) {
          values['headers'] = Object.fromEntries(values['headers']);
        }
        onSubmit(values);
        console.log('values', values);
      }}
      onValuesChange={(v, r) => {
        if (v?.['protocols']) {
          setProtocols(v['protocols']);
        }
      }}
    >
      {initial?.id && <FormFieldBuilder pure field={{ key: 'id', label: 'ID', readOnly: true }} />}

      <FormFieldsBuilder pure fields={fields} />

      <Divider>
        <Trans>协议配置</Trans>
      </Divider>

      <FormFieldBuilder pure field={protocolField} />

      <FormFieldsBuilder fields={currentProtocolFields} />

      <Divider>
        <Trans>基础配置</Trans>
      </Divider>

      <FormFieldsBuilder pure fields={otherFields} />

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button htmlType="submit" type="primary">
          <Trans>提交</Trans>
        </Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>
          <Trans>重置</Trans>
        </Button>
      </div>
    </Form>
  );
};

export const KongRouteList: React.FC<Partial<KongEntityTableProps>> = (props) => {
  const columns = useMemo(
    () =>
      normalizeColumns<KongRouteEntity>(
        createEntityColumns([
          { key: 'service.id', title: '服务', width: 300 },

          {
            dataIndex: 'methods',
            title: '方法',
            width: 160,
            render: renderTags,
          },
          {
            dataIndex: 'protocols',
            title: '协议',
            width: 160,
            render: renderArrayOfString,
          },
          {
            dataIndex: 'hosts',
            title: '主机',
            width: 160,
            render: renderArrayOfString,
          },
          {
            dataIndex: 'paths',
            title: '路径',
            width: 160,
            render: renderArrayOfString,
          },

          {
            dataIndex: 'https_redirect_status_code',
            title: '重定向码',
            width: 80,
            render: renderArrayOfString,
          },
          {
            dataIndex: 'regex_priority',
            title: '正则优先',
            width: 80,
            render: renderArrayOfString,
          },
          {
            dataIndex: 'strip_path',
            title: 'Strip Path',
            width: 80,
            render: renderBoolean,
          },
          { dataIndex: 'path_handling', title: 'Path Handling', width: 120 },
          {
            dataIndex: 'preserve_host',
            title: '保留主机',
            width: 80,
            render: renderBoolean,
          },
        ]),
      ),
    [],
  );

  return <KongEntityTable label="路由" name="Route" columns={columns} editor={RouteForm} {...props} />;
};
