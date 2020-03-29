import { normalizeOptions, OptionLike } from './options';
import { Form, Input, InputNumber, Select, Slider, Switch } from 'antd';
import React, { DependencyList, useMemo } from 'react';
import { Rule } from 'rc-field-form/lib/interface';
import set from 'lodash/set';

export type Widget =
  | string
  | React.ReactNode
  | React.ComponentClass
  | React.FunctionComponent
  | ((item: any) => React.ReactNode);
// 例如 switch - overrides 需要 valuePropName='checked'
// | { component: React.ElementType; overrides: any }

export interface FormFieldProps {
  // region 基础
  key: string;
  name?: string | string[];
  label?: string | React.ReactNode;
  // endregion

  // region 辅助属性
  /// 默认值
  defaultValue?: any;
  // endregion

  // region 组件属性 - widgetProps
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: any;
  // endregion

  /// 定义使用的组件 - 可能是字符串映射
  widget?: Widget;
  /// 具体组件 - 字符串映射后的内容
  widgetComponent?: React.ElementType;
  /// 组件额外属性
  widgetProps?: any;

  /// 是否必须
  required?: boolean;

  options?: OptionLike;

  /// 校验规则
  rules?: Rule[];

  /// 跳过构建逻辑 - 直接渲染
  render?: (props: { field: FormFieldProps }) => any;

  // region 字段属性 - fieldProps
  /// 从事件获取值
  getValueFromEvent?: (...args: any[]) => any;
  /// 将值标准化给组件
  normalize?: (value: any, prevValue: any, prevValues: any) => any;

  help: React.ReactNode;
  extra: React.ReactNode;
  // endregion

  /// 字段属性
  fieldProps?: any;

  // 自定义控件
  trigger?: string; // onChange
  valuePropName?: string; // value
  validateTrigger?: string | string[]; // onChange

  [k: string]: any;
}

export interface FormBuilderOptions {
  widgets?: Widget[];
}

function prefixedObject(entries: Array<[string, any]>, prefix: string) {
  return Object.fromEntries(
    entries.filter(([v]) => v.startsWith(prefix)).map(([k, v]) => [k.substring(prefix.length), v])
  );
}

export function normalizeField(item: FormFieldProps, normalizers?: Array<(v: FormFieldProps) => FormFieldProps>) {
  if (!item.name && typeof item.key === 'string') {
    item.name = item.key.split('.');
  }

  // FIXME do this when register
  if (!item.valuePropName && item.widget === 'switch') {
    item.valuePropName = 'checked';
  }

  // extract
  const entries = Object.entries(item);
  // widget
  item.widgetProps = Object.assign(prefixedObject(entries, 'widget:'), item.widgetProps);
  // field
  item.fieldProps = Object.assign(prefixedObject(entries, 'field:'), item.fieldProps);

  // 常用组件属性
  // defaultValue 无效 - 组件受控
  const { autoFocus, disabled, readOnly, placeholder } = item;
  Object.entries({ autoFocus, disabled, readOnly, placeholder }).forEach(([k, v]) => {
    if (v === null || v === undefined) {
      return;
    }
    item.widgetProps[k] = v;
  });
  // item.widgetComponent = item.widgetComponent ?? findWidget(item.widget)

  // 常用字段属性
  // https://ant.design/components/form-cn/#Form.Item
  const { help, extra, normalize } = item;
  Object.entries({ help, extra, normalize }).forEach(([k, v]) => {
    if (v === null || v === undefined) {
      return;
    }
    item.fieldProps[k] = v;
  });

  // 预处理
  item = normalizers?.reduce((o, v) => v(o), item) ?? item;

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
  select: ({ field: { options, name }, ...props }: { field: FormFieldProps }) => {
    options = normalizeOptions(options || []);
    return (
      <Select {...props}>
        {options.map(({ label, value }) => (
          <Select.Option value={value} key={label}>
            {label}
          </Select.Option>
        ))}
      </Select>
    );
  },
};

function findWidget(w?: Widget) {
  let widget: any = w ?? 'default';
  if (typeof widget === 'string') {
    widget = Widgets[widget] ?? widget;
  }
  return widget;
}

function buildWidget(field: FormFieldProps, opts?: FormBuilderOptions) {
  const { widget: w, widgetProps } = field;
  let widget: any = w ?? 'default';
  if (typeof widget === 'string') {
    const { widgets = [] } = opts ?? {};
    // fixme - not good
    widget =
      widgets.find((v: any) => v?.['displayName'] === widget || v?.['factoryName'] === widget) ?? Widgets[widget];
    if (!widget) {
      console.error(`invalid widget`, field);
      widget = Widgets['default'];
    }
  }
  if (React.isValidElement(widget)) {
    if (Object.keys(widgetProps).length === 0) {
      return widget;
    }
    return React.cloneElement(widget, widgetProps);
  }
  // console.log(`createElement`, widget, widgetProps);
  return React.createElement(widget, Object.assign({ field }, widgetProps));
}

function buildRules(item: FormFieldProps) {
  const rules = Array.from(item.rules ?? []);

  const { required, label, key } = item;

  // FIXME 应该有更好的方式 - 全局也能配置
  if (required) {
    rules.push({
      required,
      message: `请填写${typeof label === 'string' ? label : '该字段'}`,
    });
  }

  return rules;
}

function buildFormFields(fields: FormFieldProps[], opt?: FormBuilderOptions) {
  return fields.map((v) => buildFormField(v, opt));
}

function buildFormField(field: FormFieldProps, options?: FormBuilderOptions) {
  field = normalizeField(field);
  const { render } = field;
  if (render) {
    return render({ field });
  }

  const { label, key, name, valuePropName, fieldProps, children } = field;
  return (
    <Form.Item
      key={key}
      valuePropName={valuePropName}
      label={label}
      name={name || key}
      rules={buildRules(field)}
      {...fieldProps}
    >
      {children ?? buildWidget(field, options)}
    </Form.Item>
  );
}

export function buildInitialValues(fields: FormFieldProps[]): any {
  const o = {};
  fields.forEach(({ name, key, defaultValue }) => {
    if (defaultValue === null || defaultValue === undefined || !(name || key)) {
      return;
    }
    set(o, name || key, defaultValue);
  });
  return o;
}

export interface FormFieldBuilderProps extends FormBuilderOptions {
  field: FormFieldProps;
  pure?: boolean;
}

export const FormFieldBuilder: React.FC<FormFieldBuilderProps> = (props) => {
  const { field, children, pure, ...opts } = props;
  let deps: DependencyList = [];
  if (!pure) {
    deps = [field, children];
  }
  return useMemo(() => {
    // debug rerender
    // console.log(`render ${field.key}`, field)

    if (children) {
      return buildFormField({ ...field, children }, opts);
    }
    return buildFormField(field, opts);
  }, deps);
};

export interface FormFieldsBuilderOptions extends FormBuilderOptions {
  fields: FormFieldProps[];
  pure?: boolean;
}

export const FormFieldsBuilder: React.FC<FormFieldsBuilderOptions> = (props) => {
  const { fields, pure, ...opts } = props;

  let deps: DependencyList = [];
  if (!pure) {
    deps = fields;
  }

  return <React.Fragment>{useMemo(() => buildFormFields(fields, opts), deps)}</React.Fragment>;
};
