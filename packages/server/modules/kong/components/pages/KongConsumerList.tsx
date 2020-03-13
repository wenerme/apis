import React, {useMemo} from 'react'
import {normalizeColumns} from 'libs/antds/table/normal';
import {KongUpstreamEntity} from 'modules/kong/apis/types';
import {KongEntityTable, OperationColumn} from 'modules/kong/components/KongEntityTable';
import {buildInitialValues, FormFieldBuilder, FormFieldProps, FormFieldsBuilder} from 'libs/antds/form/builder';
import {omitBy} from 'lodash';
import {Button, Form} from 'antd';
import {renderTags, renderTimeStamp} from 'modules/kong/components/renders';

const fields: FormFieldProps[] = [
  {key: 'username', label: '用户名'},
  {key: 'custom_id', label: '自定义'},

  {
    key: 'tags',
    label: '标签',
    widget: 'select',
    defaultValue: [],
    widgetProps: {mode: 'tags'},
  },
];

const ConsumerForm: React.FC<{ initialValues?, onSubmit? }> = ({initialValues, onSubmit}) => {
  const initial = useMemo(() => {
    return initialValues ? omitBy(initialValues, v => v === null) : buildInitialValues([...fields])
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
      {initial?.id && <FormFieldBuilder pure field={{key: 'id', label: 'ID', readOnly: true}} />}
      <FormFieldsBuilder pure fields={fields} />

      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button htmlType="submit" type="primary">提交</Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>重置</Button>
      </div>
    </Form>
  )
};

export const KongConsumerList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns<KongUpstreamEntity>([
    {dataIndex: 'id', title: 'ID', width: 300},
    {
      key: 'username',
      title: '用户名',
      width: 120
    },
    {
      key: 'custom_id',
      title: '自定义',
      width: 120
    },
    {dataIndex: 'tags', title: '标签', width: 120, render: renderTags},
    {dataIndex: 'created_at', title: '创建时间', width: 160, render: renderTimeStamp},
    OperationColumn,
  ]), []);
  return (
    <KongEntityTable
      label='消费者'
      name='Consumer'
      columns={columns}
      editor={ConsumerForm}
    />
  )
};

