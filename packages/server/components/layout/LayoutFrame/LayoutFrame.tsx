import React from 'react';
import { MenuSpec } from 'components/layout/LayoutFrame/types';
import { LayoutFrameLayout } from 'components/layout/LayoutFrame/LayoutFrameLayout';
import { LayoutFrameInstance, LayoutFrameProvider, useLayoutFrame } from 'components/layout/LayoutFrame/layout';

export interface LayoutFrameProps {
  menus: MenuSpec[];
  showFooter?: boolean;
  showHeader?: boolean;

  footer?: React.ReactNode;
  header?: React.ReactNode;

  link?: ({ href }) => React.ReactNode;

  layout?: LayoutFrameInstance;
  name?: string;
}

export const LayoutFrame: React.FC<LayoutFrameProps> = (props) => {
  const { children, showFooter, showHeader, footer, header, name, menus, link } = props;
  const layout = useLayoutFrame(props.layout, { name });

  return (
    <LayoutFrameProvider layout={layout} options={{ name, menus, link }}>
      <LayoutFrameLayout {...{ children, showFooter, showHeader, footer, header }} />
    </LayoutFrameProvider>
  );
};
