import React, { CSSProperties, useState } from 'react';
import { Layout } from 'antd';
import { LayoutFrameMenu } from './LayoutFrameMenu';
import { useNamedTheme } from '../../../hooks/useNamedTheme';

export const LayoutFrameSider: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  const [broken, setBroken] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [theme] = useNamedTheme();

  return (
    <Layout.Sider
      theme={theme === 'dark' ? 'dark' : 'light'}
      breakpoint="md"
      onBreakpoint={setBroken}
      collapsedWidth={broken ? 0 : 80}
      collapsible
      collapsed={collapse}
      onCollapse={(v) => setCollapse(v)}
      style={{ height: '100%', ...style }}
    >
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <LayoutFrameMenu />
      </div>
    </Layout.Sider>
  );
};
