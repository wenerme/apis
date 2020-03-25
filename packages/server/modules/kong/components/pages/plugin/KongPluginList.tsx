import React, { useEffect, useMemo, useState } from 'react';
import { normalizeColumns } from 'libs/antds/table/normal';
import { KongPluginSchema, KongUpstreamEntity, ProtocolTypes } from 'modules/kong/apis/types';
import { renderBoolean, renderTags } from 'modules/kong/components/renders';
import { createEntityColumns, KongEntityTable, TagsField } from 'modules/kong/components/entity/KongEntityTable';
import { buildInitialValues, FormFieldBuilder, FormFieldProps, FormFieldsBuilder } from 'libs/antds/form/builder';
import { omitBy } from 'lodash';
import { Button, Divider, Form, Spin } from 'antd';
import { useKongSelector } from 'modules/kong/reducers/kong';
import { getKongService } from 'modules/kong/apis/client';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import { doUpdateInformation } from 'modules/kong/reducers/actions';
import { useDispatch } from 'react-redux';
import { EntitySelect } from 'modules/kong/components/entity/EntitySelect';
import { Trans } from 'react-i18next';

function buildFields(schema: KongPluginSchema, name, fields = []): FormFieldProps[] {
  if (schema.fields) {
    schema.fields.forEach((v) => {
      Object.entries(v).forEach(([k, v]) => {
        buildFields(v, [...name, k], fields);
      });
    });
  } else if (schema.type) {
    const field: FormFieldProps = { name, key: name.join('.') };
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

const PluginForm: React.FC<{ initialValues?; onSubmit? }> = ({ initialValues, onSubmit }) => {
  const plugins = useKongSelector((v) => v.information?.plugins?.available_on_server ?? []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(doUpdateInformation());
  }, []);

  const fields: FormFieldProps[] = [
    {
      key: 'name',
      label: '插件',
      required: true,
      widget: 'select',
      widgetProps: { showSearch: true },
      options: Object.keys(plugins ?? []),
    },
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
  const [configFields, setConfigFields] = useState([]);

  const initial = useMemo(() => {
    return initialValues ? omitBy(initialValues, (v) => v === null) : buildInitialValues([...fields]);
  }, [initialValues]);

  const [form] = Form.useForm();

  const [name, setName] = useState(initial?.['name']);

  const [schema, setSchema] = useState({});
  const [pluginConfigLoading, setPluginConfigLoading] = useState(false);
  useAsyncEffect(async () => {
    if (name) {
      try {
        setPluginConfigLoading(true);
        const schema = await getKongService().getPluginSchema(name);
        console.log(`Schema`, schema);
        setSchema(schema);
        form.setFieldsValue({ config: null });
        const fields = buildFields(schema, ['config']);
        setConfigFields(fields);
      } finally {
        setPluginConfigLoading(false);
      }
    } else {
      setConfigFields([]);
    }
  }, [name]);
  useEffect(() => {
    form.setFieldsValue(buildInitialValues(configFields));
  }, [configFields]);

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
      <FormFieldsBuilder pure fields={fields} />

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
        ])
      ),
    []
  );
  return <KongEntityTable label="插件" name="Plugin" columns={columns} editor={PluginForm} />;
};
