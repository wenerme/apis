import {normalizeOptions, OptionLike} from 'libs/antds/form/options';
import {Form, Input, InputNumber, Select, Slider, Switch} from 'antd';
import React, {useMemo} from 'react';
import {Rule} from 'rc-field-form/lib/interface';
import set from 'lodash/set'

export type Widget =
  string
  | React.ReactNode
  | React.ComponentClass
  | React.FunctionComponent
  | ((item: any) => React.ReactNode)
  // 例如 switch - overrides 需要 valuePropName='checked'
  | { component, overrides }

export interface FormBuilderFieldProps {
  key: string
  name?: string | string[]
  label?: string | React.ReactNode

  /// 默认值 - 需要实现支持
  defaultValue?: any
  autoFocus?: boolean
  disabled?: boolean

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

export function normalizeField(item: FormBuilderFieldProps) {
  if (item.key.includes('.') && !item.name) {
    item.name = item.name = item.key.split('.');
  }
  // FIXME
  if (!item.valuePropName && item.widget === 'switch') {
    item.valuePropName = 'checked'
  }
  const entries = Object.entries(item);

  item.widgetProps = Object.assign(
    prefixedObject(entries, 'widget:'),
    item.widgetProps
  );
  // 常用组件属性
  // defaultValue 无效 - 组件受控
  const {autoFocus, disabled} = item;
  Object
    .entries({autoFocus, disabled})
    .forEach(([k, v]) => {
      if (v === null || v === undefined) {
        return
      }
      item.widgetProps[k] = v;
    });

  item.fieldProps = Object.assign(
    prefixedObject(entries, 'field:'),
    item.fieldProps
  );
  // 常用字段属性
  const {help, extra} = item;
  Object
    .entries({help, extra})
    .forEach(([k, v]) => {
      if (v === null || v === undefined) {
        return
      }
      item.fieldProps[k] = v;
    });

  return item;
}

export const Widgets: Record<string, Widget> = {
  default: Input,
  text: Input,
  password: Input.Password,
  textarea: Input.TextArea,
  number: InputNumber,
  slider: Slider,
  switch: Switch,
  select: ({field: {options, name}, ...props}) => {
    options = normalizeOptions(options);
    if (!options.length) {
      console.error(`no options`, name)
    }
    return (
      <Select {...props}>
        {options.map(({label, value}) => (
          <Select.Option value={value} key={label}>{label}</Select.Option>
        ))}
      </Select>
      );
  }
  }
;

function buildWidget(field: FormBuilderFieldProps, opts?: FormBuilderOptions) {
  const {widget: w, widgetProps} = field;
  let widget: any = w ?? 'default';
  if (typeof widget === 'string') {
    const {widgets = []} = opts ?? {};

    widget = widgets.find(v => v['displayName'] === widget || v['factoryName'] === widget) ?? Widgets[widget];
    if (!widget) {
      console.error(`invalid widget`, field);
      widget = Widgets['default']
    }
  }
  if (React.isValidElement(widget)) {
    if (Object.keys(widgetProps).length === 0) {
      return widget;
    }
    return React.cloneElement(widget, widgetProps)
  }
  // console.log(`createElement`, widget, widgetProps);
  return React.createElement(widget, Object.assign({field}, widgetProps))
}

function buildRules(item: FormBuilderFieldProps) {
  const rules = Array.from(item.rules ?? []);

  const {required, label, key} = item;

  // FIXME 应该有更好的方式 - 全局也能配置
  if (required) {
    rules.push({required, message: `请填写${typeof label === 'string' ? label : '该字段'}`})
  }

  return rules;
}

function buildFormItems(items, opt?) {
  return items.map(v => buildFormItem(v, opt))
}

function buildFormItem(item: FormBuilderFieldProps, opts?: FormBuilderOptions) {
  item = normalizeField(item);
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

export function buildInitialValues(fields: FormBuilderFieldProps[]) {
  const o = {};
  fields.forEach(({name, key, defaultValue}) => {
    if (defaultValue === null || defaultValue === undefined || !(name || key)) {
      return
    }
    set(o, name || key, defaultValue)
  });
  return o;
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
