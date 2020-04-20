import { Widget } from '@rjsf/core';
import React from 'react';
import { InputNumber } from 'antd';

export const UpDownWidget: Widget = ({
  autofocus,
  disabled,
  formContext,
  id,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  readonly,
  required,
  schema,
  value,
}) => {
  const { readonlyAsDisabled = true } = formContext;

  const handleChange = (nextValue) => onChange(nextValue);

  const handleBlur = ({ target }) => onBlur(id, target.value);

  const handleFocus = ({ target }) => onFocus(id, target.value);

  return (
    <InputNumber
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      style={{ width: '100%' }}
      autoFocus={autofocus}
      required={required}
      type="number"
      value={value}
    />
  );
};
