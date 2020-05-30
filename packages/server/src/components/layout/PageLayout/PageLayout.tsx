import React from 'react';
import { Avatar, Button } from 'antd';
import Link from 'next/link';

import 'moment/locale/zh-cn';
import { useRouteProgress } from 'src/libs/nexts/hooks/useRouteProgress';
import { PageContext } from './PageContext';
import { menus } from './menus';
import { Portal } from 'src/components/Portal';
import { DarkModeFilled, LightModeFilled } from '@wener/ui/icons';
import styled from 'styled-components';
import { useAntdTheme } from '@wener/ui/antds';
import Head from 'next/head';
import { LayoutFrame } from '@wener/ui/antds';
import { NamedThemeProvider, useNamedTheme } from '@wener/ui';

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

const FatButton = styled(Avatar)<{ onClick }>`
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
  const [theme, setTheme] = useNamedTheme();
  useAntdTheme({ theme });
  return (
    <Portal>
      <FixedContainer>
        <FatButton
          onClick={() =>
            setTheme((s) => {
              const next = s === 'light' ? 'dark' : 'light';
              localStorage['THEME'] = next;
              return next;
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
  title = title || `Wener's APIs`;
  console.log(`PageLayout init`, title);
  // 预先加载 style 避免页面闪烁 - 主题不同会加载后才切换
  return (
    <NamedThemeProvider
      initialTheme={
        typeof window === 'undefined'
          ? 'light'
          : () => {
              return localStorage['THEME'] === 'dark' ? 'dark' : 'light';
            }
      }
    >
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

          <link rel="preload" as="style" href="https://unpkg.com/antd/dist/antd.dark.min.css" />
          <link href="https://unpkg.com/antd/dist/antd.min.css" rel="stylesheet" data-antd-theme="light" />
        </Head>
        <LayoutFrame menus={menus} showFooter={showFooter} footer={<Footer />} link={NextLink}>
          <React.Fragment>
            {children}
            <PageAction />
          </React.Fragment>
        </LayoutFrame>
      </PageContext>
    </NamedThemeProvider>
  );
};
