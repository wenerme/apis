import React from 'react';
import {
  BarcodeOutlined,
  BorderlessTableOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  HomeOutlined,
  InteractionOutlined,
  KeyOutlined,
  LinkOutlined,
  PartitionOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { HashingAlgorithms } from 'src/modules/hash/types';
import {
  BarcodePrintOutlined,
  BarcodeReadOutlined,
  CertificateVerifiedBadgeOutlined,
  DictOutlined,
  IpfsOutlined,
  QrcodePrintOutlined,
  QrcodeReadOutlined,
  RtcOutlined,
  WebTorrentFilled,
} from '@wener/ui/icons';
import type { MenuSpec } from '@wener/ui/antds';

export interface LoadableComponentSpec {
  module;
  name;
  props?;
}

export interface ContentedMenuSpec extends MenuSpec {
  content?: LoadableComponentSpec;
  extraPaths?: string[];
  children?: ContentedMenuSpec[];
}

export interface RouteSpec {
  title;
  iconComponent?;
  path;
  content: LoadableComponentSpec;
}

export const menus: ContentedMenuSpec[] = [
  {
    title: '首页',
    iconComponent: <HomeOutlined />,
    iconType: 'home',
    path: '/',
    content: {
      module: '@wener/ui/wener',
      name: 'WenerApisWelcome',
    },
  },
  {
    title: '我的定位',
    iconComponent: <EnvironmentOutlined />,
    iconType: 'environment',
    path: '/geo/me',
    content: {
      module: '@wener/apis-geo',
      name: 'LocationMeLite',
    },
  },
  {
    title: '电话归属地',
    iconComponent: <PhoneOutlined />,
    iconType: 'phone',
    path: '/phone/attribution',
    extraPaths: ['/phone/attribution/:number'],
    routes: ['/phone/attribution/[num]'],
    content: {
      module: '@wener/apis-phone',
      name: 'PhoneAttributionContent',
    },
  },
  {
    title: 'URI',
    iconComponent: <LinkOutlined />,
    children: [
      {
        title: 'URL',
        path: '/uri/url',
        content: {
          module: '@wener/apis-uri',
          name: 'UrlPlayground',
        },
      },
    ],
  },
  {
    title: '语言',
    iconComponent: <InteractionOutlined />,
    children: [
      {
        title: 'INI',
        path: '/langs/ini/play',
        content: {
          module: '@wener/apis-langs',
          name: 'IniPlayground',
        },
      },
      {
        title: 'Asterisk Conf',
        path: '/langs/asterisk-conf/play',
        content: {
          module: '@wener/apis-langs',
          name: 'AsteriskConfPlayground',
        },
      },
      {
        title: 'HTML Entities',
        path: '/langs/html-entities/play',
        content: {
          module: '@wener/apis-langs',
          name: 'HtmlEntitiesPlayground',
        },
      },
      {
        title: 'XML',
        path: '/langs/xml/play',
        content: {
          module: '@wener/apis-lang-xml',
          name: 'XmlPlayground',
        },
      },
    ],
  },
  {
    title: '密码强度检测',
    iconComponent: <KeyOutlined />,
    iconType: 'key',
    path: '/password/strength',
    extraPaths: ['/password/strength/:password'],
    content: {
      module: '@wener/apis-password',
      name: 'PasswordStrengthContent',
    },
  },
  {
    title: '条形码',
    iconComponent: <BarcodeOutlined />,
    iconType: 'qrcode',
    children: [
      {
        title: '二维码生成',
        path: '/barcode/qrcode/builder',
        iconComponent: <QrcodePrintOutlined />,
        content: {
          module: '@wener/apis-qrcode',
          name: 'QrCodeBuilderPlayground',
        },
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
    ],
  },
  {
    title: 'Kong网关',
    iconComponent: <PartitionOutlined />,
    children: [
      {
        title: '管理',
        path: '/kong/admin',
      },
    ],
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
    ],
  },
  {
    title: 'PKI',
    iconComponent: <CertificateVerifiedBadgeOutlined />,
    children: [
      {
        title: '证书解析',
        path: '/pki/pem/reader',
      },
    ],
  },
  {
    title: 'WebRTC',
    iconComponent: <RtcOutlined />,
    children: [
      {
        title: '浏览器检测',
        path: '/webrtc/checker',
        content: {
          module: '@wener/apis-webrtc',
          name: 'WebRTCChecker',
        },
      },
    ],
  },
  {
    title: '编辑器',
    iconComponent: <EditOutlined />,
    children: [
      {
        title: 'ProseMirror',
        path: '/editor/prosemirror',
      },
      {
        title: 'Slate',
        path: '/editor/slate',
      },
      {
        title: 'Simple Code Editor',
        path: '/editor/simple-code',
      },
      {
        title: 'Prettier格式化',
        path: '/editor/prettier',
      },
    ],
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
    ],
  },
  {
    title: 'IPFS',
    iconComponent: <IpfsOutlined />,
    iconType: 'file',
    children: [
      {
        title: '网关检测',
        path: '/ipfs/gateway/checker',
        content: {
          module: '@wener/apis-ipfs',
          name: 'GatewayChecker',
        },
      },
    ],
  },
  {
    title: '摘要哈希计算',
    // iconComponent: <LockOutlined />,
    iconComponent: <BorderlessTableOutlined />,
    iconType: 'lock',
    children: [
      {
        title: '摘要哈希',
        path: `/hash/digest`,
      },
      ...HashingAlgorithms.map((v) => ({
        title: v.toUpperCase(),
        route: '/hash/md/[algorithm]',
        path: `/hash/md/${v}`,
      })),
    ],
  },

  {
    title: '实验',
    iconComponent: <ExperimentOutlined />,
    children: [
      {
        title: '模块管理',
        path: '/lab/modules',
        content: {
          module: '@wener/apis-mgmt',
          name: 'ModuleManagementPanel',
        },
      },
      {
        title: '测试 PingService',
        path: '/lab/ping',
        content: {
          module: '@wener/apis-test',
          name: 'PingServiceTest',
        },
      },
    ],
  },
];

function flatMenus(menus: ContentedMenuSpec[]): ContentedMenuSpec[] {
  const reducer = (all: ContentedMenuSpec[], cur: ContentedMenuSpec): ContentedMenuSpec[] => {
    all.push(cur);
    if (cur.children) {
      cur.children
        .map((v) => ({ ...cur, children: [], path: undefined, extraPaths: undefined, content: undefined, ...v }))
        .reduce(reducer, all);
    }
    return all;
  };
  return menus.reduce(reducer, [] as MenuSpec[]);
}

function buildRoutes(menus: ContentedMenuSpec[]): RouteSpec[] {
  const all = flatMenus(menus);
  return all
    .filter((v) => v.content)
    .filter((v) => v.path)
    .map((v) => {
      return {
        ...v,
        path: [v.path, ...(v.extraPaths || [])],
      };
    })
    .map((v) => v as RouteSpec);
}

export const routes: RouteSpec[] = [
  ...buildRoutes(menus),
  {
    title: 'PingServiceTest',
    path: '/test/ping',
    content: {
      module: '@wener/apis-test',
      name: 'PingServiceTest',
    },
  },
];
