import React, {useState} from 'react';
import {useDarkLightTheme} from 'reducers/index';
import {Layout} from 'antd';
import {LayoutFrameMenu} from 'components/layout/LayoutFrame/LayoutFrameMenu';

export const LayoutFrameSider: React.FC = () => {
  const [broken, setBroken] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const theme = useDarkLightTheme();

  return (
    <Layout.Sider
      breakpoint="md"
      theme={theme}
      collapsedWidth={broken ? 0 : 80}
      onBreakpoint={setBroken}

      collapsible
      collapsed={collapse}
      onCollapse={v => setCollapse(v)}
    >

      <LayoutFrameMenu />

    </Layout.Sider>
  )
};
