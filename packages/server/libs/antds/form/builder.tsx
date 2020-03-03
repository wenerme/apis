import {normalizeOptions} from 'libs/antds/form/utils';
import {Form, Input, InputNumber, Select, Switch} from 'antd';
import React from 'react';

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

export type Widget = React.ComponentClass | React.FunctionComponent | ((item: any) => React.ReactNode)
export const DefaultWidgets: Record<string, Widget> = {
    default: Input,
    text: Input,
    password: Input.Password,
    textarea: Input.TextArea,
    number: InputNumber,
    switch: Switch,
    select: Object.assign(({options, name}) => {
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
    }, {factoryName: 'select'})
  }
;

export function buildWidget(item, widgets = []) {
  let {widget} = item;
  widget = widget ?? 'default';
  if (typeof widget === 'string') {
    widget = widgets.find(v => v['displayName'] === widget || v['factoryName'] === widget) ?? DefaultWidgets[widget]
    if (!widget) {
      console.error(`invalid widget`, item);
      widget = DefaultWidgets['default']
    }
  }
  if (widget['factoryName']) {
    return widget(item)
  }
  if (React.isValidElement(widget)) {
    return widget
  }
  return React.createElement(widget)
}

export function buildFormItems(items, opt?) {
  return items.map(v => buildFormItem(v, opt))
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
