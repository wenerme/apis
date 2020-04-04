import React, { useMemo, useState } from 'react';
import { Button, Divider, Form } from 'antd';
import { buildInitialValues, FormFieldProps, FormFieldsBuilder } from 'src/antds/forms/builder';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';
import { useAntdTheme } from '@wener/apis-server/src/hooks/useAntdTheme';
import { FormFieldBuilder } from '@wener/apis-server/src/libs/antds/form/builder';
import { FormInstance } from 'antd/lib/form';
import { withProps } from 'src/hocs';
import _ = require('lodash');

export default {
  title: 'antds/forms/builder',
  decorators: [
    (storyFn: Function) => {
      useAntdTheme({ theme: 'light' });
      return (
        <div>
          <div style={{ minWidth: 400 }}>{storyFn()}</div>
        </div>
      );
    },
    centered,
  ],
};

// 简单 - 处理没有特殊逻辑的场景
const SimpleForm: React.FC<{
  initialValues?: any;
  onSubmit?: (v: any) => void;
  fields: any[];
  form?: FormInstance;
}> = ({ form: formProps, initialValues, onSubmit, fields }) => {
  const [form] = Form.useForm(formProps);
  const initial = useMemo(() => initialValues ?? buildInitialValues(fields), []);
  return (
    <Form form={form} initialValues={initial} onFinish={onSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      {initial?.id && <FormFieldBuilder pure field={{ key: 'id', label: 'ID', readOnly: true }} />}

      <FormFieldsBuilder fields={fields} />

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button htmlType="submit" type="primary">
          提交
        </Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>
          重置
        </Button>
      </div>
    </Form>
  );
};

const userFields: FormFieldProps[] = [
  { key: 'name', label: '名字', required: true },
  { key: 'age', label: '年龄', widget: 'number', defaultValue: 18 },
  { key: 'active', label: '激活', widget: 'switch' },
];

/// 直接传入一组字段定义即可
const UserForm: React.FC<{ initialValues?: any; onSubmit?: any }> = withProps(SimpleForm, { fields: userFields });

/// 没有初始值
export const CreateUser = withProps(UserForm, {
  onSubmit: action('create'),
});
/// 有初始值
export const EditUser = withProps(UserForm, {
  initialValues: {
    id: 123,
    name: 'wener',
    age: '22',
  },
  onSubmit: action('update'),
});

/// 服务表单 - 根据选项不同字段不同
const ServiceForm = ({
  onSubmit,
  initialValues,
  form: formProps,
}: {
  onSubmit: (v: any) => void;
  initialValues?: any;
  form?: FormInstance;
}) => {
  const fields: FormFieldProps[] = [
    { key: 'name', label: '服务名字', required: true },
    {
      key: 'type',
      label: '服务类型',
      defaultValue: 'register',
      widget: 'select',
      options: [
        { value: 'register', label: '注册' },
        { value: 'continue', label: '续期' },
      ],
    },
  ];
  // key 加了前缀 - 会生成对象
  const typesFields: Record<string, FormFieldProps[]> = {
    register: [{ key: 'register.price', label: '价格' }],
    // 加了默认值
    continue: [{ key: 'continue.month', label: '月份', defaultValue: 12 }],
  };
  const [form] = Form.useForm(formProps);
  const initial = useMemo(
    // () => initialValues ?? buildInitialValues([...fields, ...Object.values(typesFields).flat()]),
    () => initialValues ?? buildInitialValues([...fields, ..._.flatten(Object.values(typesFields))]),
    [],
  );
  const [type, setType] = useState(initial.type);

  return (
    <Form
      form={form}
      initialValues={initial}
      onFinish={onSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onValuesChange={(v) => {
        if (v.type) {
          setType(v.type);
        }
      }}
    >
      {initial?.id && <FormFieldBuilder pure field={{ key: 'id', label: 'ID', readOnly: true }} />}

      {/* 基础字段 */}
      <FormFieldsBuilder pure fields={fields} />
      <Divider>详细信息</Divider>
      <FormFieldsBuilder fields={typesFields[type]} />

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button htmlType="submit" type="primary">
          提交
        </Button>
        <Button htmlType="reset" onClick={() => form.resetFields()}>
          重置
        </Button>
      </div>
    </Form>
  );
};

export const CreateService = withProps(ServiceForm, { onSubmit: action('create') });
export const EditService = withProps(ServiceForm, {
  initialValues: {
    id: 456,
    name: '测试',
    type: 'continue',
    continue: { month: 36 },
  },
  onSubmit: action('create'),
});
