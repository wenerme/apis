import {Menu} from 'antd';
import {HashingAlgorithms} from 'modules/hash/types';
import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {
  BookOutlined,
  EnvironmentOutlined,
  FileOutlined,
  HomeOutlined,
  KeyOutlined,
  LinkOutlined,
  LockOutlined,
  PhoneOutlined,
  QrcodeOutlined,
  RetweetOutlined
} from '@ant-design/icons';
import {useRootSelector} from '../../../reducers';
import {useDispatch} from 'react-redux';
import {setMenuOpenKeys} from 'reducers/layout';

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
    iconComponent: <HomeOutlined />,
    iconType: 'home',
    path: '/',
  },
  {
    title: '我的定位',
    iconComponent: <EnvironmentOutlined />,
    iconType: 'environment',
    path: '/geo/me',
  },
  {
    title: '电话归属地',
    iconComponent: <PhoneOutlined />,
    iconType: 'phone',
    path: '/phone/attribution',
    routes: ['/phone/attribution/[num]']
  },
  {
    title: 'URL',
    iconComponent: <LinkOutlined />,
    iconType: 'link',
    path: '/misc/url',
  },
  {
    title: '密码强度检测',
    iconComponent: <KeyOutlined />,
    iconType: 'key',
    path: '/password/strength',
  },
  {
    title: 'QRCode',
    iconComponent: <QrcodeOutlined />,
    iconType: 'qrcode',
    children: [
      {
        title: 'QR生成',
        path: '/qrcode/builder',
      },
      {
        title: 'QR解析',
        path: '/qrcode/reader',
      },
    ]
  },
  {
    title: 'WebRTC',
    iconComponent: <RetweetOutlined />,
    iconType: 'retweet',
    children: [
      {
        title: '浏览器检测',
        path: '/webrtc/checker',
      },
    ]
  },
  {
    title: '搜狗词库',
    iconComponent: <BookOutlined />,
    iconType: 'book',
    children: [
      {
        title: '词库列表',
        path: '/scel/list',
      },
      {
        title: '词库解析',
        path: '/scel/read',
      },
    ]
  },
  {
    title: 'IPFS',
    iconComponent: <FileOutlined />,
    iconType: 'file',
    children: [
      {
        title: '网关检测',
        path: '/ipfs/gateway/checker',
      },
    ]
  },
  {
    title: '摘要哈希计算',
    iconComponent: <LockOutlined />,
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

export const PageMenu: React.FC = () => {
  const router = useRouter();
  const menuOpenKeys = useRootSelector(v => v.layout.menuOpenKeys);
  const dispatch = useDispatch();

  const selected = router.pathname.replace(/[.]html$/, '');
  return (
    <Menu
      theme="light"
      mode="inline"
      openKeys={menuOpenKeys}
      onOpenChange={v => dispatch(setMenuOpenKeys(v))}
      selectedKeys={[selected]}
    >
      {menus.map(({path, title, iconType, iconComponent, children}) => (
        path ? (
          <Menu.Item key={path || title}>
            <Link href={path}>
              <a href={path}>
                <div>
                  {/*<Icon type={iconType} />*/}
                  {iconComponent}
                  <span>{title}</span>
                </div>
              </a>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.SubMenu
            key={path || title}
            title={(
              <div>
                {iconComponent}
                {/*{iconType && <Icon type={iconType} />}*/}
                <span>{title}</span>
              </div>
            )}
          >
            {children.map(({title, iconType, path, route}) => (
              <Menu.Item key={path || title}>
                <Link href={route || path} as={path}>
                  <a href={path}>
                    <div>
                      {iconComponent}
                      {/*{iconType && <Icon type={iconType} />}*/}
                      <span>{title}</span>
                    </div>
                  </a>
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        )
      ))}

    </Menu>
  )
};
