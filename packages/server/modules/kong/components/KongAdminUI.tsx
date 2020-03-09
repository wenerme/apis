import React from 'react';
import {MenuSpec} from 'components/layout/LayoutFrame/types';
import {HashRouter as Router, Link} from 'react-router-dom';
import {RouteFrameContent} from 'components/layout/RouteFrame/RouteFrameContent';
import {LayoutFrame} from 'components/layout/LayoutFrame/LayoutFrame';
import {RouteSpec} from 'components/layout/RouteFrame/types';
import {LayoutFrameContent} from 'components/layout/LayoutFrame/LayoutFrameContent';

const menus: Array<MenuSpec & RouteSpec> = [
  {
    title: '基础信息',
    path: '/',
    exact: true,
    component: React.lazy(() => import('./pages/KongAdminSummary'))
  },
  {
    title: '服务',
    path: '/service',
    exact: true,
    component: React.lazy(() => import('./pages/KongServiceList').then(({KongServiceList}) => ({default: KongServiceList})))
  },
  {
    title: '路由',
    path: '/route',
    exact: true,
    component: React.lazy(() => import('./pages/KongRouteList').then(({KongRouteList}) => ({default: KongRouteList})))
  },
  {
    title: '上游',
    path: '/upstream',
    exact: true,
    component: React.lazy(() => import('./pages/KongUpstreamList').then(({KongUpstreamList}) => ({default: KongUpstreamList})))
  },
  {
    title: '客户端',
    path: '/consumer',
    exact: true,
    component: React.lazy(() => import('./pages/KongConsumerList').then(({KongConsumerList}) => ({default: KongConsumerList})))
  },
  {
    title: '插件',
    path: '/plugin',
    exact: true,
    component: React.lazy(() => import('./pages/KongPluginList').then(({KongPluginList}) => ({default: KongPluginList})))
  },
  {
    title: '证书',
    path: '/certificate',
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
