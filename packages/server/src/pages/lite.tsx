import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { buildImportMap, imports } from 'src/modules/root/imports';

const Page = ({ title = `Wener's APIs` }) => {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>

        <link href="https://unpkg.com/antd/dist/antd.min.css" rel="stylesheet" />
      </Head>

      <script
        type="systemjs-importmap"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildImportMap(
              imports.get([
                'single-spa',
                'single-spa-layout',
                'react',
                'react-dom',
                'antd',
                'moment',
                'lodash',
                'rxjs',
              ]),
              {
                dev: false,
              },
            ),
          ),
        }}
      />

      <script
        type="systemjs-importmap"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            imports: {
              // 有些依赖可以统一管理或者打包到应用

              'react-is': 'https://cdn.jsdelivr.net/npm/react-is/umd/react-is.production.min.js',
              'styled-components':
                // 'https://cdn.jsdelivr.net/npm/styled-components/dist/styled-components.browser.esm.min.js',
                'https://cdn.jsdelivr.net/npm/@esm-bundle/styled-components/system/styled-components.min.js',
              immer: 'https://cdn.jsdelivr.net/npm/immer/dist/immer.umd.production.min.js',
              tslib: 'https://cdn.jsdelivr.net/npm/tslib/tslib.js',

              '@wener/utils': '/modules/wener-utils.system.min.js',
              '@wener/ui': '/modules/wener-ui.umd.js',
              '@wener/ui/antds': '/modules/wener-ui-antds.umd.js',

              '@wener/apis-root': '/modules/wener-apis-root.system.js',
              '@wener/apis-geo': '/modules/wener-apis-geo.system.js',
              '@wener/apis-test': '/modules/wener-apis-test.system.js',
              '@wener/apis-dash': '/modules/wener-apis-dash.system.js',
            },
          }),
        }}
      />

      <script src="https://cdn.jsdelivr.net/npm/import-map-overrides/dist/import-map-overrides.js" />
      <div
        dangerouslySetInnerHTML={{
          __html: '<import-map-overrides-full show-when-local-storage="devtools" dev-libs/>',
        }}
      />
      {isDev && (
        <>
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/named-exports.js" />
        </>
      )}
      {!isDev && (
        <>
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.min.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/named-exports.min.js" />
        </>
      )}

      <div id="WenerApis" />
      <div id="single-spa-application:root" />
      <div id="single-spa-application:@wener/apis-test" />
      {/*<script src="/api/frontend/bootstrap.js" />*/}
      {/*FIXME*/}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          System.import('@wener/apis-root');
          window.process = {env:{NODE_ENV:'development'}}
          `,
        }}
      />
    </>
  );
};
export default Page;

// prevent prerender
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { title: "Wener's APIs" },
  };
};
export const config = {
  unstable_runtimeJS: false,
};
