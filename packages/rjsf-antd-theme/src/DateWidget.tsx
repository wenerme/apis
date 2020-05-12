import { Widget } from '@rjsf/core';
import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';

export const DateWidget: Widget = ({
  // autofocus,
  disabled,
  formContext,
  id,
  // label,
  onBlur,
  onChange,
  onFocus,
  // options,
  placeholder,
  readonly,
  // required,
  // schema,
  value,
}) => {
  const { readonlyAsDisabled = true } = formContext;

  const handleChange = (nextValue) => onChange(nextValue && nextValue.format('YYYY-MM-DD'));

  const handleBlur = () => onBlur(id, value);

  const handleFocus = () => onFocus(id, value);

  return (
    <DatePicker
      disabled={disabled || (readonlyAsDisabled && readonly)}
      // id={id}
      name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      showTime={false}
      style={{ width: '100%' }}
      value={value && moment(value)}
    />
  );
};
