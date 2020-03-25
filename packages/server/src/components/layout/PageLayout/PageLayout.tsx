import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

import 'moment/locale/zh-cn';
import { useRouteProgress } from '../../../libs/nexts/hooks/useRouteProgress';
import { PageContext } from './PageContext';
import { LayoutFrame } from '../LayoutFrame/LayoutFrame';
import { menus } from './menus';

const Footer: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      Wener&apos;s APIs © 2020 by
      <Button type="link" href="https://wener.me" target="_blank" style={{ padding: '0 4px' }}>
        wener
      </Button>
      <span title={`${process?.env?.BUILD_PLATFORM ?? 'Wener'}${process?.env?.APP_BUILD_DATE ?? ''}`}>
        {process?.env?.APP_VERSION ? `v${process?.env?.APP_VERSION}` : ''}
      </span>
    </div>
  );
};

const NextLink: React.FC<{ href }> = ({ href, children }) => {
  return (
    <Link href={href} passHref={true}>
      <a>{children}</a>
    </Link>
  );
};

export const PageLayout: React.FC<{ showFooter? }> = ({ children, showFooter }) => {
  useRouteProgress();

  return (
    <PageContext>
      <LayoutFrame menus={menus} showFooter={showFooter} footer={<Footer />} link={NextLink}>
        {children}
      </LayoutFrame>
    </PageContext>
  );
};
