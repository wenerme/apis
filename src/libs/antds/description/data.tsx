import React from 'react';
import { Descriptions } from 'antd';
import { DescriptionsItemProps } from 'antd/lib/descriptions/Item';
import get from 'lodash/get';

export interface DataDescriptionProps<T = any> extends Omit<DescriptionsItemProps, 'children'> {
  name?: string | string[];
  value?: T;

  children?: React.ReactNode;
  key?;

  render?: ({ value: any, item: DataDescriptionProps, record: T }) => React.ReactNode;
}

export const renderDataDescription: React.FC<DataDescriptionProps> = (props) => {
  const { prefixCls, className, style, label, span } = props;
  let { children, key } = props;
  const { name, value, render } = props;

  if (!key) {
    key = label;
  }
  if (!children && value) {
    children = name ? get(value, name) : value;
    if (render) {
      children = render({
        value: children,
        item: props,
        record: value,
      });
    }
  }
  return <Descriptions.Item {...{ prefixCls, className, style, label, span, key }}>{children}</Descriptions.Item>;
};
