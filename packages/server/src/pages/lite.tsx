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

      <div>
        <script
          type="systemjs-importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildImportMap(imports.get(['single-spa', 'react', 'react-dom', 'antd', 'moment', 'lodash']), {
                dev: isDev,
              }),
            ),
          }}
        />

        <script
          type="systemjs-importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                '@wener/apis-test': '/modules/wener-apis-test.system.js',
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

        <div id="single-spa-application:@wener/apis-test" />
        <script src="/api/frontend/bootstrap.js" />
      </div>
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
