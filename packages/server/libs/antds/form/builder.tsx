import {normalizeOptions} from 'libs/antds/form/utils';
import {Form, Input, InputNumber, Select, Switch} from 'antd';
import React from 'react';
import isFunction from 'lodash/isFunction'

const Option = Select.Option;

export function normalizeItem(item) {
  if (item.key.includes('.') && !item.name) {
    item.name = item.name = item.key.split('.');
  }
  if (!item.valuePropName && item.widget === 'switch') {
    item.valuePropName = 'checked'
  }
  return item;
}

export type Widget = (item: any) => any
export const DefaultWidgets: Record<string, Widget> = {
  default: () => <Input />,
  number: () => <InputNumber />,
  switch: () => <Switch />,
  select: ({options, name}) => {
    options = normalizeOptions(options);
    if (!options.length) {
      console.error(`no options`, name)
    }
    return (
      <Select>
        {options.map(({label, value}, i) => (
          <Option value={value} key={i}>{label}</Option>
        ))}
      </Select>
    );
  }
};

export function buildWidget(item, widgets = []) {
  const {widget} = item;
  if (isFunction(widget)) {
    return React.createElement(widget)
  }
  if (widget && typeof widget !== 'string') {
    return widget
  }

  let w: any;
  for (const Widget of widgets) {
    if (isFunction(Widget)) {
      w = Widget(item)
    } else if (widget === Widget.displayName) {
      w = <Widget />
    }
    if (w) {
      break
    }
  }
  if (!w) {
    w = DefaultWidgets[widget];
  }
  if (!w) {
    if (widget) {
      console.warn(`no widget found`, widget, item)
    }
    w = DefaultWidgets['default']
  }
  if (isFunction(w)) {
    w = w(item);
  }
  return w
}

export function buildFormItem(item, {widgets = []} = {}) {
  item = normalizeItem(item);
  const {label, key, name, required, valuePropName, disabled, children} = item;
  return (
    <Form.Item
      key={key}
      valuePropName={valuePropName}
      label={label}
      name={name || key}
      rules={[{required}]}>
      {children ?? buildWidget(item, widgets)}
    </Form.Item>
  )
}
