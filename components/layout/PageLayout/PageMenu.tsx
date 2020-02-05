import {Icon, Menu} from 'antd';
import {HashingAlgorithms} from 'modules/hash/types';
import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

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
    title: '我的定位',
    iconType: 'environment',
    path: '/geo/me',
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

export const PageMenu: React.FC = () => {
  const router = useRouter();
  return (
    <Menu theme="light" mode="inline" selectedKeys={[router.asPath.replace(/[.]html$/, '')]}>
      {menus.map(({path, title, iconType, iconComponent, children}) => (
        path ? (
          <Menu.Item key={path || title}>
            <Link href={path}>
              <a href={path}>
                <div>
                  <Icon type={iconType} />
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
                {iconComponent && <Icon component={iconComponent} />}
                {iconType && <Icon type={iconType} />}
                <span>{title}</span>
              </div>
            )}
          >
            {children.map(({title, iconType, path, route}) => (
              <Menu.Item key={path || title}>
                <Link href={route || path} as={path}>
                  <a href={path}>
                    <div>
                      {iconType && <Icon type={iconType} />}
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
