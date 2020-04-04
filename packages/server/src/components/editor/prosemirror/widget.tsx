import { Form, Modal } from 'antd';
import { buildInitialValues, FormFieldsBuilder } from 'src/libs/antds/form/builder';
import React, { useEffect } from 'react';
import { FormInstance } from 'antd/lib/form';

const ModalForm: React.FC<{ fields; onForm?; onFinish }> = ({ fields, onForm, onFinish }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(buildInitialValues(fields));
    onForm?.(form);
  }, []);
  return (
    <Form
      form={form}
      onFinish={onFinish}
      wrapperCol={{
        span: 18,
      }}
      labelCol={{
        span: 6,
      }}
    >
      <FormFieldsBuilder pure fields={fields} />
    </Form>
  );
};

export function openFormPromote({ title, fields: originFields, callback }) {
  const fields = Object.entries(originFields as Record<string, any>).map(
    ([
      key,
      {
        options: { label, required, value },
      },
    ]) => ({
      key,
      label,
      required,
      defaultValue: value,
    }),
  );
  let form: FormInstance = null;
  Modal.confirm({
    title,
    icon: null,
    content: <ModalForm fields={fields} onForm={(v) => (form = v)} onFinish={callback} />,
    onOk: () => {
      return form?.validateFields().then(callback);
    },
  });
}
