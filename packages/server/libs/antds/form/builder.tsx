import {normalizeOptions, OptionLike} from 'libs/antds/form/utils';
import {Form, Input, InputNumber, Select, Slider, Switch} from 'antd';
import React, {useMemo} from 'react';
import {Rule} from 'rc-field-form/lib/interface';


export type Widget =
  string
  | React.ReactNode
  | React.ComponentClass
  | React.FunctionComponent
  | ((item: any) => React.ReactNode)

export interface FormBuilderFieldProps {
  key: string
  name?: string | string[]
  label?: string | React.ReactNode

  widget?: Widget
  widgetProps?: any

  fieldProps?: any

  required?: boolean

  options?: OptionLike

  rules?: Rule[]

  [k: string]: any
}

export interface FormBuilderOptions {
  widgets?: Widget[]
}

function prefixedObject(entries: any, prefix) {
  return Object.fromEntries(
    entries
      .filter(([v]) => v.startsWith(prefix))
      .map(([k, v]) => [k.substring(prefix.length), v])
  );
}

export function normalizeItem(item: FormBuilderFieldProps) {
  if (item.key.includes('.') && !item.name) {
    item.name = item.name = item.key.split('.');
  }
  if (!item.valuePropName && item.widget === 'switch') {
    item.valuePropName = 'checked'
  }
  const entries = Object.entries(item);

  item.widgetProps = Object.assign(
    prefixedObject(entries, 'widget:'),
    item.widgetProps
  );
  item.fieldProps = Object.assign(
    prefixedObject(entries, 'field:'),
    item.fieldProps
  );

  return item;
}

export const DefaultWidgets: Record<string, Widget> = {
    default: Input,
    text: Input,
    password: Input.Password,
    textarea: Input.TextArea,
    number: InputNumber,
    slider: Slider,
    switch: Switch,
    select: Object.assign(({options, name}) => {
      options = normalizeOptions(options);
      if (!options.length) {
        console.error(`no options`, name)
      }
      return (
        <Select>
          {options.map(({label, value}) => (
            <Select.Option value={value} key={label}>{label}</Select.Option>
          ))}
        </Select>
      );
    }, {factoryName: 'select'})
  }
;

function buildWidget(item: FormBuilderFieldProps, opts?: FormBuilderOptions) {
  const {widget: w, widgetProps} = item;
  let widget: any = w ?? 'default';
  if (typeof widget === 'string') {
    const {widgets = []} = opts ?? {};

    widget = widgets.find(v => v['displayName'] === widget || v['factoryName'] === widget) ?? DefaultWidgets[widget];
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
  return React.createElement(widget, widgetProps ?? {})
}

function buildRules(item: FormBuilderFieldProps) {
  const rules = Array.from(item.rules ?? []);

  const {required, label, key} = item;

  if (required) {
    rules.push({required, message: `请填写${typeof label === 'string' ? label : '该字段'}`})
  }

  return rules;
}

function buildFormItems(items, opt?) {
  return items.map(v => buildFormItem(v, opt))
}

function buildFormItem(item: FormBuilderFieldProps, opts?: FormBuilderOptions) {
  item = normalizeItem(item);
  const {label, key, name, required, valuePropName, fieldProps, children} = item;
  return (
    <Form.Item
      key={key}
      valuePropName={valuePropName}
      label={label}
      name={name || key}
      rules={buildRules(item)}
      {...fieldProps}
    >
      {children ?? buildWidget(item, opts)}
    </Form.Item>
  )
}

let objectHash;
export const FormFieldBuilder: React.FC<{ field: FormBuilderFieldProps, hash?: boolean, pure?: boolean } & FormBuilderOptions> = (props) => {
  const {field, children, hash, pure, ...opts} = props;
  let deps;
  if (pure) {
    deps = []
  } else if (hash) {
    if (objectHash) {
      deps = [objectHash(field)]
    } else {
      import('object-hash')
        .then(({default: oh}) => objectHash = oh)
    }
  }
  deps = deps || [field, children];
  return useMemo(() => {
    // debug rerender
    // console.log(`render ${field.key}`, field)

    if (children) {
      return buildFormItem({...field, children}, opts)
    }
    return buildFormItem(field, opts)
  }, deps)
};
export const FormFieldListBuilder: React.FC<{ fields: FormBuilderFieldProps[], pure?: boolean } & FormBuilderOptions> = (props) => {
  const {fields, children, pure, ...opts} = props;

  let deps;
  if (pure) {
    deps = []
  }
  deps = deps || [fields];

  return useMemo(() => buildFormItems(fields, opts), deps)
};
