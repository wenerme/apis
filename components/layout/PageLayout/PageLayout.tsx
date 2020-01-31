import React, {useState} from 'react';
import {Button, ConfigProvider, Icon, Layout, Menu} from 'antd';
import Link from 'next/link';
import 'antd/dist/antd.css';

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;
const Footer = Layout.Footer;

const PageSider: React.FC = () => {
  const [broken, setBroken] = useState(false);
  const [collapse, setCollapse] = useState(false);
  return (
    <Sider
      breakpoint="md"
      theme="light"
      collapsedWidth={broken ? 0 : 80}
      onBreakpoint={setBroken}

      collapsible
      collapsed={collapse}
      onCollapse={v => setCollapse(v)}
    >

      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="0">
          <Link href="/">
            <div>
              <Icon type="home" />
              <span>首页</span>
            </div>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link href="/phone/attribution">
            <div>
              <Icon type="phone" />
              <span>电话归属地</span>
            </div>
          </Link>
        </Menu.Item>

      </Menu>

    </Sider>
  )
};

const PageLogo: React.FC = () => {
  return (
    <div className="logo">
      <style jsx>{`
div.logo {
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
  color: lightgray;
  
  line-height: 0;
}
`}</style>
      <Link href="/">
        <div style={{display: 'flex', alignItems: 'center', height: 30}}>
          <Icon type="api" style={{fontSize: '24px', margin: '0 4px', color: '#9ccfe7'}} />
          <span>Wener's APIs</span>
        </div>
      </Link>
    </div>
  )
};

export const PageLayout: React.FC = ({children}) => {
  return (
    <ConfigProvider>

      <Layout style={{minHeight: '100vh'}}>
        <Header>
          <PageLogo />
        </Header>
        <Layout hasSider>

          <PageSider />

          <Layout>
            <Content>

              {children}

            </Content>

            <Footer style={{textAlign: 'center'}}>
              Wener's APIs © 2020 by <Button type="link" href="https://wener.me">wener</Button>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
};
