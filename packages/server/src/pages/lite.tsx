import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { buildImportMap, imports } from 'src/modules/root/imports';

const Page = ({ title = `Wener's APIs` }) => {
  // const isDev = process.env.NODE_ENV !== 'production';
  const isDev = true;

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
                dev: isDev,
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

              '@ant-design/icons': 'https://cdn.jsdelivr.net/npm/@ant-design/icons@4.2.1/dist/index.umd.min.js',

              '@wener/utils': '/modules/wener-utils.system.min.js',
              '@wener/ui': '/modules/wener-ui.system.js',
              '@wener/ui/antds': '/modules/wener-ui-antds.system.js',
              '@wener/ui/icons': '/modules/wener-ui-icons.system.js',

              '@wener/apis-boot': '/modules/wener-apis-boot.system.js',
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
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/use-default.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/named-exports.js" />
        </>
      )}
      {!isDev && (
        <>
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js" />
          <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/use-default.min.js" />
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
          window.process = {env:{NODE_ENV:'development'}}
          System.import('@wener/apis-boot');
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
