import { Widget } from '@rjsf/core';
import { Select } from 'antd';
import React from 'react';
import { asNumber, guessType } from '@rjsf/core/lib/utils';

const nums = new Set(['number', 'integer']);
/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema, value) => {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;

  if (value === '') {
    return undefined;
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === 'boolean') {
    return value === 'true';
  } else if (type === 'number') {
    return asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x) => guessType(x) === 'number')) {
      return asNumber(value);
    } else if (schema.enum.every((x) => guessType(x) === 'boolean')) {
      return value === 'true';
    }
  }

  return value;
};
export const SelectWidget: Widget = ({
  autofocus,
  disabled,
  formContext,
  id,
  // label,
  multiple,
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

  const { enumOptions, enumDisabled } = options as any; //todo typing

  const emptyValue = multiple ? [] : '';

  const handleChange = (nextValue) => onChange(processValue(schema, nextValue));

  const handleBlur = () => onBlur(id, processValue(schema, value));

  const handleFocus = () => onFocus(id, processValue(schema, value));

  const stringify = (currentValue) => (Array.isArray(currentValue) ? value.map(String) : String(value));

  return (
    <Select
      autoFocus={autofocus}
      disabled={disabled || (readonlyAsDisabled && readonly)}
      id={id}
      mode={typeof multiple !== 'undefined' ? 'multiple' : undefined}
      // name={id}
      onBlur={!readonly ? handleBlur : undefined}
      onChange={!readonly ? handleChange : undefined}
      onFocus={!readonly ? handleFocus : undefined}
      placeholder={placeholder}
      value={typeof value !== 'undefined' ? stringify(value) : emptyValue}
    >
      {enumOptions.map(({ value: optionValue, label: optionLabel }) => (
        <Select.Option
          disabled={enumDisabled && enumDisabled.indexOf(value) !== -1}
          key={String(optionValue)}
          value={String(optionValue)}
        >
          {optionLabel}
        </Select.Option>
      ))}
    </Select>
  );
};

// SelectWidget.propTypes = WidgetProps;

// TODO: Select does not receive formContext properly.
SelectWidget.defaultProps = {
  formContext: {},
};
