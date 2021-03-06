import React from 'react';
import { MenuSpec } from './types';
import { LayoutFrameLayout } from './LayoutFrameLayout';
import { LayoutFrameInstance, LayoutFrameProvider, useLayoutFrame } from './layout';
import type { MenuProps } from 'antd/lib/menu';

export interface LayoutFrameProps {
  menus: MenuSpec[];
  showFooter?: boolean;
  showHeader?: boolean;

  footer?: React.ReactNode;
  header?: React.ReactNode;

  link?: ({ href }) => React.ReactNode;

  layout?: LayoutFrameInstance;
  name?: string;

  menuProps?: Partial<MenuProps>;
}

export const LayoutFrame: React.FC<LayoutFrameProps> = (props) => {
  const { children, showFooter, showHeader, footer, header, name, menus, link, menuProps } = props;
  const layout = useLayoutFrame(props.layout ? { layout: props.layout } : {});

  return (
    <LayoutFrameProvider layout={layout} options={{ name, menus, link, menuProps }}>
      <LayoutFrameLayout {...{ children, showFooter, showHeader, footer, header }} />
    </LayoutFrameProvider>
  );
};
