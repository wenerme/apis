import { Widget } from '@rjsf/core';
import React from 'react';
import { Input, InputNumber } from 'antd';

export const TextWidget: Widget = ({
  // autofocus,
  disabled,
  formContext,
  id,
  // label,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  readonly,
  // required,
  schema,
  value,
}) => {
  const { readonlyAsDisabled = true } = formContext;

  const handleNumberChange = (nextValue) => onChange(nextValue);

  const handleTextChange = ({ target }) => onChange(target.value === '' ? options.emptyValue : target.value);

  const handleBlur = ({ target }) => onBlur(id, target.value);

  const handleFocus = ({ target }) => onFocus(id, target.value);

  return schema.type === 'number' || schema.type === 'integer' ? (
    <InputNumber
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleNumberChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      style={{ width: '100%' }}
      type="number"
      value={value}
    />
  ) : (
    <Input
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleTextChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      type={(options.inputType as any) || 'text'}
      value={value}
    />
  );
};
