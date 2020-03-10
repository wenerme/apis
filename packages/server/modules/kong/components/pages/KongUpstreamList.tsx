import React, {useMemo} from 'react'
import {normalizeColumns} from 'libs/antds/table/normal';
import {createEntityColumns, KongEntityTable} from 'modules/kong/components/KongEntityTable';
import {KongUpstreamEntity} from 'modules/kong/apis/types';
import {Button, Form} from 'antd';
import {buildInitialValues, FormFieldBuilder, FormFieldProps, FormFieldsBuilder} from 'libs/antds/form/builder';
import {omitBy} from 'lodash';

const HashTypes = ['none', 'consumer', 'ip', 'header', 'cookie'];
const fields: FormFieldProps[] = [
  {key: 'name', label: '主机名', required: true},
  {key: 'host_header', label: 'Host Header'},
  {
    key: 'algorithm',
    label: '算法',
    required: true,
    defaultValue: 'round-robin',
    widget: 'select',
    options: ['consistent-hashing', 'least-connections', 'round-robin']
  },
  {key: 'hash_on', label: 'Hash', required: true, defaultValue: 'none', widget: 'select', options: HashTypes},
  {
    key: 'hash_fallback',
    label: 'Hash Fallback',
    required: true,
    defaultValue: 'none',
    widget: 'select',
    options: HashTypes
  },

  {key: 'hash_on_header', label: 'Hash Header'},
  {key: 'hash_on_cookie_path', label: 'Hash Cookie Path'},
  {key: 'hash_fallback_header', label: 'Hash Fallback Header'},

  {key: 'slots', label: 'Hash 槽', widget: 'slider', widgetProps: {min: 10, max: 65536}, defaultValue: 10000},

  // TODO Health checks

  {
    key: 'tags',
    label: '标签',
    widget: 'select',
    defaultValue: [],
    widgetProps: {mode: 'tags'},
  },
];

const UpstreamForm: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  const initial = useMemo(() => {
    const o = initialValues ? omitBy(initialValues, v => v === null) : buildInitialValues([...fields]);
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
    >
      {initial.id && <FormFieldBuilder pure field={{key: 'id', label: 'ID', readOnly: true}} />}

      <FormFieldsBuilder pure fields={fields} />

      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button htmlType="submit" type="primary">提交</Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>重置</Button>
      </div>
    </Form>
  )
};
export const KongUpstreamList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns<KongUpstreamEntity>(createEntityColumns([
    {key: 'algorithm', title: '算法', width: 120},
    {key: 'hash_on', title: 'Hash', width: 120},
    {key: 'hash_fallback', title: 'Hash Fallback', width: 120},
    {key: 'hash_on_cookie_path', title: 'Hash Cookie 路径', width: 180},
  ])), []);
  return (
    <KongEntityTable
      label='上游'
      name='Upstream'
      columns={columns}
      editor={UpstreamForm}
    />
  )
};

