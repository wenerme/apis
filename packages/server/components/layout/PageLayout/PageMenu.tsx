import {Menu} from 'antd';
import {HashingAlgorithms} from 'modules/hash/types';
import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {EnvironmentOutlined, HomeOutlined, KeyOutlined, LinkOutlined, PhoneOutlined} from '@ant-design/icons';
import {useRootSelector} from 'reducers/index';
import {useDispatch} from 'react-redux';
import {setMenuOpenKeys} from 'reducers/layout';
import {BarcodeOutlined, BorderlessTableOutlined} from '@ant-design/icons/lib';
import IpfsOutlined from 'components/icons/IpfsOutlined';
import DictOutlined from 'components/icons/DictOutlined';
import RtcOutlined from 'components/icons/RtcOutlined';
import QrcodePrintOutlined from 'components/icons/QrcodePrintOutlined';
import QrcodeReadOutlined from 'components/icons/QrcodeReadOutlined';
import BarcodePrintOutlined from 'components/icons/BarcodePrintOutlined';
import BarcodeReadOutlined from 'components/icons/BarcodeReadOutlined';
import WebTorrentFilled from 'components/icons/WebTorrentFilled';

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
    title: '条形码',
    iconComponent: <BarcodeOutlined />,
    iconType: 'qrcode',
    children: [
      {
        title: '二维码生成',
        path: '/barcode/qrcode/builder',
        iconComponent: <QrcodePrintOutlined />
      },
      {
        title: '二维码解析',
        path: '/barcode/qrcode/reader',
        iconComponent: <QrcodeReadOutlined />,
      },
      {
        title: '条形码生成',
        path: '/barcode/linear/builder',
        iconComponent: <BarcodePrintOutlined />,
      },
      {
        title: '条形码解析',
        path: '/barcode/linear/reader',
        iconComponent: <BarcodeReadOutlined />,
      },
    ]
  },
  {
    title: 'WebTorrent',
    iconComponent: <WebTorrentFilled />,
    children: [
      {
        title: '客户端',
        path: '/webtorrent/client',
      },
      {
        title: 'BT文件解析',
        path: '/webtorrent/torrent/reader',
      },
      {
        title: 'Bencode',
        path: '/webtorrent/bencode',
      },
    ]
  },
  {
    title: 'WebRTC',
    iconComponent: <RtcOutlined />,
    children: [
      {
        title: '浏览器检测',
        path: '/webrtc/checker',
      },
    ]
  },
  {
    title: '搜狗词库',
    // iconComponent: <BookOutlined />,
    iconComponent: <DictOutlined />,
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
    iconComponent: <IpfsOutlined />,
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
    // iconComponent: <LockOutlined />,
    iconComponent: <BorderlessTableOutlined />,
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
            {children.map(({title, iconType, iconComponent, path, route}) => (
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
