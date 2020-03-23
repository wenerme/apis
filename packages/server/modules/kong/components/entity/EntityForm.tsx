import React, { useMemo } from 'react';
import { buildInitialValues, FormFieldBuilder, FormFieldProps, FormFieldsBuilder } from 'libs/antds/form/builder';
import { omitBy } from 'lodash';
import { Button, Form } from 'antd';
import { Trans } from 'react-i18next';

export const EntityForm: React.FC<{
  fields?: FormFieldProps[];
  initialValues?;
  onSubmit?;
}> = ({ fields, children, initialValues, onSubmit }) => {
  const initial: any = useMemo(() => {
    return initialValues ? omitBy(initialValues, (v) => v === null) : buildInitialValues([...fields]);
  }, [initialValues]);

  const [form] = Form.useForm();

  return (
    <Form form={form} initialValues={initial} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={onSubmit}>
      {initial?.id && <FormFieldBuilder pure field={{ key: 'id', label: 'ID', readOnly: true }} />}
      <FormFieldsBuilder pure fields={fields} />

      {children}

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
