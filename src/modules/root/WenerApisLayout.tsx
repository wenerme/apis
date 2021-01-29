import * as React from 'react';
import { NamedThemeProvider } from 'src/ui';
import { LayoutFrame } from 'src/ui/antds';
import { Helmet } from 'react-helmet';

export const WenerApisLayout: React.FC<{
  Link;
  menus?;
  showFooter?;
  title?;
  description?;
  keywords?: string | string[];
}> = ({ menus, showFooter, children, title, description, keywords, Link }) => {
  title = title || `Wener's APIs`;

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
      <Helmet key="layout">
        <title>
          {title}
          {title !== `Wener's APIs` ? ` - Wener's APIs` : ''}
        </title>

        <meta name="og:title" property="og:title" content={title} />

        {description && <meta name="description" content={description} />}
        {description && <meta name="og:description" property="og:description" content={description} />}

        {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(',') : keywords} />}

        {/*<link rel="preload" as="style" href="https://unpkg.com/antd/dist/antd.dark.min.css" />*/}
        {/*<link href="https://unpkg.com/antd/dist/antd.min.css" rel="stylesheet" data-antd-theme="light" />*/}
      </Helmet>
      <LayoutFrame menuProps={{ mode: 'vertical' }} menus={menus} showFooter={showFooter} link={Link}>
        <React.Fragment>
          {children}
          {/*<PageAction />*/}
        </React.Fragment>
      </LayoutFrame>
    </NamedThemeProvider>
  );
};
