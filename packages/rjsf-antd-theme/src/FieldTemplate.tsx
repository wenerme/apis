import React from 'react';
import { FieldTemplateProps } from '@rjsf/core';
import { Button, Col, Form, Input, Row } from 'antd';
import { AntdThemeFormContext } from './layouts';
import { ADDITIONAL_PROPERTY_FLAG } from '@rjsf/core/lib/utils';
import { CloseOutlined } from '@ant-design/icons';

export const FieldTemplate: React.FC<FieldTemplateProps & any> = ({
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

  // unknown
  onKeyChange,
  disabled,
  readonly,
  onDropPropertyClick,
}) => {
  const { colon, labelCol, wrapperCol, wrapperStyle } = formContext as AntdThemeFormContext;

  if (hidden) {
    return (
      <div className="field-hidden" style={{ display: 'none' }}>
        {children}
      </div>
    );
  }

  const renderFieldErrors = () => rawErrors.map((error) => <div key={`field-${id}-error-${error}`}>{error}</div>);

  // array and object will use ArrayFieldTemplate and ObjectFieldTemplate
  // which handle addition and description
  // if (schema.type === 'array' || schema.type === 'object') {
  //   return <>{children}</>;
  // }
  const isSimpleType = schema.type !== 'array' && schema.type !== 'object';
  if (ADDITIONAL_PROPERTY_FLAG in schema) {
    // additional property can edit label
    return (
      <Row justify="space-around" style={{ paddingBottom: 16 }}>
        <Col span={10} offset={1}>
          <Input
            type="text"
            id={`${id}-key`}
            onBlur={(event) => onKeyChange(event.target.value)}
            defaultValue={label}
            required={required}
          />
        </Col>
        <Col>:</Col>
        <Col span={10}>{children}</Col>
        <Col span={1}>
          <Button
            disabled={disabled || readonly}
            onClick={onDropPropertyClick(label)}
            danger
            // icon={<DeleteOutlined />}
            icon={<CloseOutlined />}
          />
        </Col>
      </Row>
    );
  }
  let _label = label;
  if (!displayLabel) {
    _label = false;
  }

  return (
    <Form.Item
      className={classNames}
      colon={colon}
      // description is always created
      extra={isSimpleType && Boolean(rawDescription) && description}
      hasFeedback={schema.type !== 'array' && schema.type !== 'object'}
      help={(!!rawHelp && help) || (!!rawErrors && renderFieldErrors())}
      htmlFor={id}
      label={_label}
      labelCol={_label ? labelCol || { span: 6 } : {}}
      required={required}
      style={wrapperStyle}
      // validateStatus={validateStatus}
      validateStatus={rawErrors ? 'error' : undefined}
      wrapperCol={wrapperCol || { span: _label ? 18 : 24 }}
    >
      {children}
    </Form.Item>
  );
};
