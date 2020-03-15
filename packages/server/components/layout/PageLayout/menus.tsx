import {BarcodeOutlined, BorderlessTableOutlined, PartitionOutlined} from '@ant-design/icons/lib';
import QrcodePrintOutlined from 'components/icons/QrcodePrintOutlined';
import QrcodeReadOutlined from 'components/icons/QrcodeReadOutlined';
import BarcodePrintOutlined from 'components/icons/BarcodePrintOutlined';
import BarcodeReadOutlined from 'components/icons/BarcodeReadOutlined';
import WebTorrentFilled from 'components/icons/WebTorrentFilled';
import RtcOutlined from 'components/icons/RtcOutlined';
import DictOutlined from 'components/icons/DictOutlined';
import IpfsOutlined from 'components/icons/IpfsOutlined';
import {HashingAlgorithms} from 'modules/hash/types';
import React from 'react';
import {MenuSpec} from '../LayoutFrame/types';

import {EnvironmentOutlined, HomeOutlined, KeyOutlined, LinkOutlined, PhoneOutlined} from '@ant-design/icons';
import CertificateVerifiedBadgeOutlined from 'components/icons/CertificateVerifiedBadgeOutlined';

export const menus: MenuSpec[] = [
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
    title: 'URI',
    iconComponent: <LinkOutlined />,
    children: [
      {
        title: 'URL',
        path: '/uri/url',
      }
    ]
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
    title: 'Kong网关',
    iconComponent: <PartitionOutlined />,
    children: [
      {
        title: '管理',
        path: '/kong/admin',
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
    title: 'PKI',
    iconComponent: <CertificateVerifiedBadgeOutlined />,
    children: [
      {
        title: '证书解析',
        path: '/pki/pem/reader',
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
      {
        title: '摘要哈希',
        path: `/hash/digest`,
      },
      ...(HashingAlgorithms.map(v => ({
        title: v.toUpperCase(),
        route: '/hash/md/[algorithm]',
        path: `/hash/md/${v}`
      })))
    ],
  },
];
