import React from 'react';
import { FieldTemplateProps } from '@rjsf/core';
import { Form } from 'antd';
import { AntdThemeFormContext } from './layouts';

export const FieldTemplate: React.FC<FieldTemplateProps> = ({
  children,
  classNames,
  description,
  // disabled,
  displayLabel,
  // errors,
  // fields,
  formContext,
  help,
  hidden,
  id,
  label,
  rawDescription,
  rawErrors,
  rawHelp,
  // readonly,
  required,
  schema,
  uiSchema,
}) => {
  const { colon, labelCol, wrapperCol, wrapperStyle } = formContext as AntdThemeFormContext;

  if (hidden) {
    return <div className="field-hidden">{children}</div>;
  }

  const renderFieldErrors = () => rawErrors.map((error) => <div key={`field-${id}-error-${error}`}>{error}</div>);

  return id === 'root' ? (
    children
  ) : (
    <Form.Item
      className={classNames}
      colon={colon}
      extra={!!rawDescription && description}
      hasFeedback={schema.type !== 'array' && schema.type !== 'object'}
      help={(!!rawHelp && help) || (!!rawErrors && renderFieldErrors())}
      htmlFor={id}
      label={displayLabel && label}
      labelCol={labelCol || { span: 6 }}
      required={required}
      style={wrapperStyle}
      // validateStatus={validateStatus}
      validateStatus={rawErrors ? 'error' : undefined}
      wrapperCol={wrapperCol || { span: displayLabel && label ? 18 : 24 }}
    >
      {children}
    </Form.Item>
  );
};
