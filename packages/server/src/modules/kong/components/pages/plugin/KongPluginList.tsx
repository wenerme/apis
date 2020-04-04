import React, { useEffect, useMemo, useRef, useState } from 'react';
import { normalizeColumns } from 'src/libs/antds/table/normal';
import { KongPluginSchema, KongUpstreamEntity, ProtocolTypes } from '../../../apis/types';
import { renderBoolean, renderTags } from '../../renders';
import { createEntityColumns, KongEntityTable, TagsField } from '../../entity/KongEntityTable';
import { buildInitialValues, FormFieldBuilder, FormFieldProps, FormFieldsBuilder } from 'src/libs/antds/form/builder';
import { omitBy } from 'lodash';
import { Button, Divider, Form, Spin } from 'antd';
import { useKongSelector } from '../../../reducers/kong';
import { getKongService } from '../../../apis/client';
import { useAsyncEffect } from '@wener/ui';
import { doUpdateInformation } from '../../../reducers/actions';
import { useDispatch } from 'react-redux';
import { EntitySelect } from '../../entity/EntitySelect';
import { Trans } from 'react-i18next';

function buildFields(schema: KongPluginSchema, name, fields = []): FormFieldProps[] {
  if (schema.fields) {
    schema.fields.forEach((v) => {
      Object.entries(v).forEach(([k, v]) => {
        buildFields(v, [...name, k], fields);
      });
    });
  } else if (schema.type) {
    const field: FormFieldProps = { name, key: name.join('.'), fieldProps: {}, widgetProps: {} };
    field.label = name.filter((_, i) => i > 0).join('.');
    const { default: defaultValue, required, one_of, elements } = schema;
    if (defaultValue !== undefined) {
      field.defaultValue = defaultValue;
    }
    if (required !== undefined) {
      field.required = required;
    }
    switch (schema.type) {
      case 'string': {
        const { one_of } = schema;
        if (one_of) {
          field.widget = 'select';
          field.options = one_of;
        }
        break;
      }
      case 'number':
      case 'integer': {
        {
          const { between, gt } = schema;
          field.widget = 'number';
          if (between) {
            const [min, max] = between;
            field.rules = [{ type: 'number', min, max }];
          }
        }
        {
          const { one_of } = schema;
          if (one_of) {
            field.widget = 'select';
            field.options = one_of;
          }
        }
        break;
      }
      case 'boolean':
        field.widget = 'switch';
        break;
      case 'array':
        if (elements && elements.type === 'string') {
          field.widget = 'select';
          if (elements.one_of) {
            field.options = elements.one_of;
            field.widgetProps = { mode: 'multiple' };
          } else {
            field.widgetProps = { mode: 'tags' };
          }
          break;
        }
      // falls through
      case 'set':
      case 'map':
      case 'function':
      case 'foreign':
      case 'record':
      default:
        console.log(`Unknown type ${schema.type}`, schema);
        return fields;
    }
    fields.push(field);
  }
  return fields;
}

const pluginCommonFields: FormFieldProps[] = [
  {
    key: 'protocols',
    label: '协议',
    widget: 'select',
    widgetProps: { mode: 'multiple' },
    defaultValue: ['grpc', 'grpcs', 'http', 'https'],
    options: ProtocolTypes,
  },
  { key: 'enabled', label: '启用', widget: 'switch', defaultValue: true },
  TagsField,
  {
    key: 'service',
    label: '服务',
    widget: EntitySelect,
    widgetProps: {
      entityName: 'Service',
    },
  },
  {
    key: 'route',
    label: '路由',
    widget: EntitySelect,
    widgetProps: {
      entityName: 'Route',
    },
  },
  {
    key: 'consumer',
    label: '消费者',
    widget: EntitySelect,
    widgetProps: {
      entityName: 'Consumer',
    },
  },
];

const PluginForm: React.FC<{ initialValues?; onSubmit? }> = ({ initialValues, onSubmit }) => {
  const plugins = useKongSelector((v) => v.information?.plugins?.available_on_server ?? []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doUpdateInformation());
  }, []);

  const pluginNameField = {
    key: 'name',
    label: '插件',
    required: true,
    widget: 'select',
    widgetProps: { showSearch: true },
    options: Object.keys(plugins ?? []),
  };

  const [configFields, setConfigFields] = useState([]);

  const initial = useMemo(() => {
    return initialValues ? omitBy(initialValues, (v) => v === null) : buildInitialValues([...pluginCommonFields]);
  }, [initialValues]);

  const [form] = Form.useForm();

  const [name, setName] = useState(initial?.['name']);

  const [schema, setSchema] = useState({});
  const [pluginConfigLoading, setPluginConfigLoading] = useState(false);

  const initialConfig = useRef<{ name; config }>();
  if (!initialConfig.current) {
    initialConfig.current = { name: initial.name, config: initial.config };
  }
  useAsyncEffect(async () => {
    if (!name) {
      setConfigFields([]);
      return;
    }
    try {
      setPluginConfigLoading(true);
      const schema = await getKongService().getPluginSchema(name);
      console.log(`Schema`, schema);
      setSchema(schema);
      const fields = buildFields(schema, ['config']);
      // 回显值
      if (name === initialConfig.current.name) {
        form.setFieldsValue({ config: initialConfig.current.config });
      } else {
        form.setFieldsValue({ config: buildInitialValues(fields) });
      }
      setConfigFields(fields);
    } finally {
      setPluginConfigLoading(false);
    }
  }, [name]);

  return (
    <Form
      form={form}
      initialValues={initial}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={onSubmit}
      onValuesChange={(v) => {
        if (v?.['name']) {
          setName(v['name']);
        }
      }}
    >
      {initial?.id && <FormFieldBuilder pure field={{ key: 'id', label: 'ID', readOnly: true }} />}
      <FormFieldBuilder pure field={pluginNameField} />
      <FormFieldsBuilder pure fields={pluginCommonFields} />

      <Divider>
        <Trans>插件配置</Trans>
      </Divider>
      <Spin spinning={pluginConfigLoading}>{configFields.length && <FormFieldsBuilder fields={configFields} />}</Spin>

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

export const KongPluginList: React.FC = () => {
  const columns = useMemo(
    () =>
      normalizeColumns<KongUpstreamEntity>(
        createEntityColumns([
          { dataIndex: 'route.id', title: '路由', width: 120 },
          { dataIndex: 'service.id', title: '服务', width: 120 },
          { dataIndex: 'consumer.id', title: '消费者', width: 120 },

          {
            dataIndex: 'protocols',
            title: '协议',
            width: 120,
            render: renderTags,
          },
          {
            dataIndex: 'enabled',
            title: '启用',
            width: 80,
            render: renderBoolean,
          },
        ]),
      ),
    [],
  );
  return <KongEntityTable label="插件" name="Plugin" columns={columns} editor={PluginForm} />;
};
