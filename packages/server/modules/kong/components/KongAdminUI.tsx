import React from 'react';
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {HashRouter as Router, Link} from 'react-router-dom';
import {RouteFrameContent} from 'components/layout/RouteFrame/RouteFrameContent';
import {LayoutFrame} from 'components/layout/LayoutFrame/LayoutFrame';
import {RouteSpec} from 'components/layout/RouteFrame/types';
import {LayoutFrameContent} from 'components/layout/LayoutFrame/LayoutFrameContent';
import i18next from 'i18next'
import {isDev} from 'utils/utils';
import {
  ApiOutlined,
  AppstoreAddOutlined,
  ClusterOutlined,
  FullscreenOutlined,
  FundOutlined,
  SafetyCertificateOutlined,
  TeamOutlined
} from '@ant-design/icons/lib';

i18next.init({
  lng: 'zh',
  debug: isDev(),
  resources: {
    en: {
      translation: {
        'key': 'hello world'
      }
    }
  }
}, (err, t) => {
  // initiali=?zed and ready to go!
  // document.getElementById('output').innerHTML = i18next.t('key');
});
const _ = i18next.t

const menus: Array<MenuSpec & RouteSpec> = [
  {
    // title: _('基础信息'),
    title: '基础信息',
    path: '/',
    iconComponent: <FundOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongAdminSummary'))
  },
  {
    title: '服务',
    path: '/service',
    iconComponent: <ApiOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongServiceList').then(({KongServiceList}) => ({default: KongServiceList})))
  },
  {
    title: '路由',
    path: '/route',
    iconComponent: <FullscreenOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongRouteList').then(({KongRouteList}) => ({default: KongRouteList})))
  },
  {
    title: '消费者',
    path: '/consumer',
    iconComponent: <TeamOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongConsumerList').then(({KongConsumerList}) => ({default: KongConsumerList})))
  },
  {
    title: '插件',
    path: '/plugin',
    iconComponent: <AppstoreAddOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongPluginList').then(({KongPluginList}) => ({default: KongPluginList})))
  },
  {
    title: '上游',
    path: '/upstream',
    exact: true,
    iconComponent: <ClusterOutlined />,
    component: React.lazy(() => import('./pages/KongUpstreamList').then(({KongUpstreamList}) => ({default: KongUpstreamList})))
  },
  {
    title: '证书',
    path: '/certificate',
    iconComponent: <SafetyCertificateOutlined />,
    exact: true,
    component: React.lazy(() => import('./pages/KongCertificateList').then(({KongCertificateList}) => ({default: KongCertificateList})))
  },
];

const ReactRouterLink: React.FC<{ href }> = ({href, ...props}) => <Link to={href} {...props} />

export const KongAdminUI: React.FC = () => {
  return (
    <Router>
      <LayoutFrame menus={menus} Link={ReactRouterLink}>
        <LayoutFrameContent>
          <RouteFrameContent routes={menus as any} />
        </LayoutFrameContent>
      </LayoutFrame>
    </Router>
  )
};
