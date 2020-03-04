import React, {useState} from 'react';
import {Button, ConfigProvider, Layout} from 'antd';
import Link from 'next/link';

import 'moment/locale/zh-cn'
import {PageMenu} from 'components/layout/PageLayout/PageMenu';

import {ApiOutlined} from '@ant-design/icons'
import {useRouteProgress} from 'libs/nexts/hooks/useRouteProgress';
import {PageContext} from 'components/layout/PageLayout/PageContext';
import {useDarkLightTheme} from '../../../reducers';


const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;
const Footer = Layout.Footer;

const PageSider: React.FC = () => {
  const [broken, setBroken] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const theme = useDarkLightTheme();

  return (
    <Sider
      breakpoint="md"
      theme={theme}
      collapsedWidth={broken ? 0 : 80}
      onBreakpoint={setBroken}

      collapsible
      collapsed={collapse}
      onCollapse={v => setCollapse(v)}
    >

      <PageMenu />

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
          <ApiOutlined style={{fontSize: '24px', margin: '0 4px', color: '#9ccfe7'}} />
          <span>Wener's APIs</span>
        </div>
      </Link>
    </div>
  )
};

const AntdLayout: React.FC<{ showFooter? }> = ({children, showFooter = true}) => {
  return (
    <ConfigProvider>
      <Layout style={{minHeight: '100vh'}}>
        {/*<Header>*/}
        {/*  <PageLogo />*/}
        {/*</Header>*/}
        <Layout hasSider>

          <PageSider />

          <Layout>
            <Content>

              {children}

            </Content>

            <Footer style={{textAlign: 'center', ...(showFooter ? {} : {display: 'none'})}}>
              Wener's APIs © 2020 by
              <Button type="link" href="https://wener.me" target="_blank" style={{padding: '0 4px'}}>wener</Button>
              <span title={`${process?.env?.BUILD_PLATFORM ?? 'Wener'}${process?.env?.APP_BUILD_DATE ?? ''}`}>
                {process?.env?.APP_VERSION ? `v${process?.env?.APP_VERSION}` : ''}
              </span>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
};

export const PageLayout: React.FC<{ showFooter? }> = ({children, showFooter}) => {
  useRouteProgress();

  return (
    <PageContext>
      <AntdLayout showFooter={showFooter}>
        {children}
      </AntdLayout>
    </PageContext>
  )
};
