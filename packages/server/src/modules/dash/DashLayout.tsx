import { Layout, Menu } from 'antd';
import React from 'react';
import { BoxShuffle } from '@wener/ui';

export const DashLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Layout hasSider>
        <Layout.Sider
          theme={'light'}
          breakpoint="md"
          // onBreakpoint={setBroken}
          // collapsedWidth={broken ? 0 : 80}
          // collapsible
          // collapsed={collapse}
          // onCollapse={(v) => setCollapse(v)}
          style={{ height: '100%' }}
        >
          <div style={{ height: '100%', overflowY: 'auto' }}>
            <Menu
              theme={'light'}
              mode="inline"
              // style={style}
              // style={{minHeight: '100%', paddingBottom: 48}}
              // openKeys={menuOpenKeys}
              // onOpenChange={v => dispatch(setMenuOpenKeys(v))}
              // selectedKeys={[selected]}
            >
              <Menu.Item>
                <div>
                  Go for it
                </div>
                {/*<Menu.Item key={path || title}>*/}
                {/*  <Link href={path}>*/}
                {/*    <div>*/}
                {/*      {iconComponent}*/}
                {/*      <span style={{ ...(iconComponent ? { marginLeft: 10 } : {}) }}>{title}</span>*/}
                {/*    </div>*/}
                {/*  </Link>*/}
                {/*</Menu.Item>*/}
              </Menu.Item>
            </Menu>
            <BoxShuffle/>
          </div>
        </Layout.Sider>
        <Layout>
          <Layout.Content style={{ maxHeight: '100%', overflowY: 'auto' }}>{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
