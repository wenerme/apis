import React from 'react';

import { Layout } from 'antd';
import { LayoutFrameSider } from './LayoutFrameSider';
import { useLayoutFrame } from 'src/antds/layouts/LayoutFrame/layout';
import { useNamedTheme } from 'src/hooks/useNamedTheme';

export interface LayoutFrameLayoutProps {
  showHeader?: boolean;
  showFooter?: boolean;

  footer?: React.ReactNode;
  header?: React.ReactNode;
}

export const LayoutFrameLayout: React.FC<LayoutFrameLayoutProps> = (props) => {
  const { header, footer, children } = props;
  let { showHeader, showFooter } = props;
  if (typeof showHeader !== 'boolean') {
    showHeader = Boolean(header);
  }
  if (typeof showFooter !== 'boolean') {
    showFooter = Boolean(footer);
  }
  const layout = useLayoutFrame();
  const [theme] = useNamedTheme();
  // height: '100%' 确保布局不变
  return (
    <Layout style={{ height: '100%' }} data-layout-frame-name={layout.name}>
      {header && showHeader && (
        <Layout.Header style={theme === 'light' ? { backgroundColor: '#fff' } : {}}>{header}</Layout.Header>
      )}
      <Layout hasSider>
        <LayoutFrameSider />

        <Layout>
          <Layout.Content style={{ maxHeight: '100%', overflowY: 'auto' }}>{children}</Layout.Content>

          {footer && showFooter && <Layout.Footer>{footer}</Layout.Footer>}
        </Layout>
      </Layout>
    </Layout>
  );
};
