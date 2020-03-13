import React, {CSSProperties, useState} from 'react';
import {Layout} from 'antd';
import {LayoutFrameMenu} from 'components/layout/LayoutFrame/LayoutFrameMenu';
import {useLayoutDarkLightTheme} from 'components/layout/LayoutFrame/layout';

export const LayoutFrameSider: React.FC<{ style?: CSSProperties }> = ({style}) => {
  const [broken, setBroken] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const theme = useLayoutDarkLightTheme();

  return (
    <Layout.Sider
      theme={theme}

      breakpoint="md"
      onBreakpoint={setBroken}

      collapsedWidth={broken ? 0 : 80}
      collapsible
      collapsed={collapse}
      onCollapse={v => setCollapse(v)}

      style={{height: '100%', ...style}}
    >

      <div style={{height: '100%', overflowY: 'auto'}}>
        <LayoutFrameMenu />
      </div>
    </Layout.Sider>
  )
};
