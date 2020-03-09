import React from 'react';
import {Descriptions} from 'antd';
import {DescriptionsItemProps} from 'antd/lib/descriptions/Item';

export interface DataDescriptionProps<T = any> extends Omit<DescriptionsItemProps, 'children'> {
  name
  value?: T

  children?: React.ReactNode;
  key?
}


export const renderDataDescription: React.FC<DataDescriptionProps> = (props) => {
  const {prefixCls, className, style, label, span} = props;
  let {children, key} = props;
  const {name, value} = props;

  if (!key) {
    key = label
  }
  if (!children) {
    children = value?.[name]
  }
  return (
    <Descriptions.Item {...{prefixCls, className, style, label, span, key}}>
      {children}
    </Descriptions.Item>
  )
};
