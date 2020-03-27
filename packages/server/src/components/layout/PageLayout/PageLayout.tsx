import React from 'react';
import { Avatar, Button } from 'antd';
import Link from 'next/link';

import 'moment/locale/zh-cn';
import { useRouteProgress } from '../../../libs/nexts/hooks/useRouteProgress';
import { PageContext } from './PageContext';
import { LayoutFrame } from '../LayoutFrame/LayoutFrame';
import { menus } from './menus';
import { Portal } from 'src/components/Portal';
import DarkModeFilled from 'src/components/icons/DarkModeFilled';
import styled from 'styled-components';
import LightModeFilled from 'src/components/icons/LightModeFilled';
import { useLayoutFrame, useLayoutFrameSelector } from 'src/components/layout/LayoutFrame/layout';
import { useAntdTheme } from 'src/hooks/useAntdTheme';
import Head from 'next/head';

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

const FatButton = styled(Avatar)`
  background-color: white !important;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;
const FixedContainer = styled.div`
  height: 120px;
  width: 64px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const PageAction: React.FC = () => {
  const theme = useLayoutFrameSelector((s) => {
    if (typeof window !== 'undefined') {
      localStorage['THEME'] = s.theme;
    }
    return s.theme;
  });
  useAntdTheme({ theme });
  const layout = useLayoutFrame();
  return (
    <Portal>
      <FixedContainer>
        <FatButton
          onClick={() =>
            layout.update((s) => {
              s.theme = s.theme === 'light' ? 'dark' : 'light';
            })
          }
          size={44}
          icon={theme === 'light' ? <DarkModeFilled /> : <LightModeFilled />}
        />
      </FixedContainer>
    </Portal>
  );
};

export const PageLayout: React.FC<{ showFooter?; title?; description?; keywords?: string | string[] }> = ({
  children,
  showFooter,
  title,
  description,
  keywords,
}) => {
  useRouteProgress();
  const layout = useLayoutFrame({
    initialState: () => {
      if (typeof window !== 'undefined') {
        return { theme: localStorage['THEME'] === 'dark' ? 'dark' : 'light' };
      }
      return {};
    },
  });
  title = title || `Wener's APIs`;

  // 预先加载 style 避免页面闪烁 - 主题不同会加载后才切换
  return (
    <PageContext>
      <Head key="layout">
        <title>
          {title}
          {title !== `Wener's APIs` ? ` - Wener's APIs` : ''}
        </title>

        <meta name="og:title" property="og:title" content={title} />

        {description && <meta name="description" content={description} />}
        {description && <meta name="og:description" property="og:description" content={description} />}

        {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(',') : keywords} />}

        <link href="https://unpkg.com/antd@4.0.4/dist/antd.min.css" rel="stylesheet" data-antd-theme="light" />
      </Head>
      <LayoutFrame layout={layout} menus={menus} showFooter={showFooter} footer={<Footer />} link={NextLink}>
        <React.Fragment>
          {children}
          <PageAction />
        </React.Fragment>
      </LayoutFrame>
    </PageContext>
  );
};
