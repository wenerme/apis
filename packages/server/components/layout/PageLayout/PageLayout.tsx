import React from 'react';
import {Button, Layout} from 'antd';
import Link from 'next/link';

import 'moment/locale/zh-cn'
import {useRouteProgress} from 'libs/nexts/hooks/useRouteProgress';
import {PageContext} from 'components/layout/PageLayout/PageContext';
import {LayoutFrame} from 'components/layout/LayoutFrame/LayoutFrame';
import {menus} from 'components/layout/PageLayout/menus';

const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{textAlign: 'center'}}>
      Wener's APIs © 2020 by
      <Button type="link" href="https://wener.me" target="_blank" style={{padding: '0 4px'}}>wener</Button>
      <span
        title={`${process?.env?.BUILD_PLATFORM ?? 'Wener'}${process?.env?.APP_BUILD_DATE ?? ''}`}
      >
        {process?.env?.APP_VERSION ? `v${process?.env?.APP_VERSION}` : ''}
      </span>
    </Layout.Footer>
  )
};

const NextLink: React.FC<{ href }> = ({href, children}) => {
  return (
    <Link href={href} passHref={true}>
      <a>
        {children}
      </a>
    </Link>
  )
};

export const PageLayout: React.FC<{ showFooter? }> = ({children, showFooter}) => {
  useRouteProgress();

  return (
    <PageContext>
      <LayoutFrame
        menus={menus}
        showFooter={showFooter}
        footer={<Footer />}
        Link={NextLink}
      >
        {children}
      </LayoutFrame>
    </PageContext>
  )
};
