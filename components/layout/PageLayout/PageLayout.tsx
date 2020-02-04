import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Icon, Layout, Menu} from 'antd';
import Link from 'next/link';
import 'antd/dist/antd.css';
import {useRouter} from 'next/router';
import {HashingAlgorithms} from 'modules/hash/types';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: true});

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;
const Footer = Layout.Footer;

interface MenuSpec {
  title
  iconType?
  iconComponent?
  path?: string
  route?: string
  routes?: string[]

  children?: MenuSpec[]
}

// Icon.add
const menus: MenuSpec[] = [
  {
    title: '首页',
    iconType: 'home',
    path: '/',
  },
  {
    title: '电话归属地',
    iconType: 'phone',
    path: '/phone/attribution',
    routes: ['/phone/attribution/[num]']
  },
  {
    title: '密码强度检测',
    iconType: 'key',
    path: '/password/strength',
  },
  {
    title: '搜狗词库',
    iconType: 'book',
    children: [
      {
        title: '词库解析',
        path: '/scel/read',
      },
    ]
  },
  {
    title: '摘要哈希计算',
    iconType: 'lock',
    children: [
      ...(HashingAlgorithms.map(v => ({
        title: v.toUpperCase(),
        route: '/hash/md/[algorithm]',
        path: `/hash/md/${v}`
      })))
    ],
  },
];

const PageMenu: React.FC = () => {
  const router = useRouter();
  return (
    <Menu theme="light" mode="inline" selectedKeys={[router.route]}>
      {menus.map(({path, title, iconType, iconComponent, children}) => (
        path ? (
          <Menu.Item key={path || title}>
            <Link href={path}>
              <div>
                <Icon type={iconType} />
                <span>{title}</span>
              </div>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.SubMenu
            key={path || title}
            title={(
              <div>
                {iconComponent && <Icon component={iconComponent} />}
                {iconType && <Icon type={iconType} />}
                <span>{title}</span>
              </div>
            )}
          >
            {children.map(({title, iconType, path, route}) => (
              <Menu.Item key={path || title}>
                <Link href={route || path} as={path}>
                  <div>
                    {iconType && <Icon type={iconType} />}
                    <span>{title}</span>
                  </div>
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        )
      ))}

    </Menu>
  )
};

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
          <Icon type="api" style={{fontSize: '24px', margin: '0 4px', color: '#9ccfe7'}} />
          <span>Wener's APIs</span>
        </div>
      </Link>
    </div>
  )
};

export const PageLayout: React.FC = ({children}) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();
    const handleError = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError)
    }
  }, []);

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
              Wener's APIs © 2020 by
              <Button type="link" href="https://wener.me" style={{padding: '0 4px'}}>wener</Button>
              {process?.env?.APP_VERSION ? `v${process?.env?.APP_VERSION}` : ''}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
};
