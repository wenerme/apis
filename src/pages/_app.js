import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { initGA, logPageView } from '../utils/analytics';
import '../../public/styles/global.css';
import 'tailwindcss/tailwind.css';

import 'nprogress/nprogress.css';
// todo no need to global
import 'react-virtualized/styles.css';
import Head from 'next/head';

export function reportWebVitals(metric) {
  console.debug(`Vitals`, metric);
}

export default class WenerApisApp extends App {
  componentDidMount() {
    try {
      if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
        return;
      }
      if (process.env.NODE_ENV.startsWith('dev')) {
        return;
      }
    } catch (e) {
      //
    }
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Wener API Lab</title>
          <meta httpEquiv="Content-Language" content="zh-cn" />
          <meta
            name="description"
            content="Experimental, demos, tools of something feel fun.Using react components with Next.js. Hosted on Vercel."
          />
          <meta
            name="og:description"
            content="Experimental, demos, tools of something feel fun.Using react components with Next.js. Hosted on Vercel."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://apis.wener.me/og.png" />
          <meta name="twitter:site:domain" content="https://apis.wener.me" />
          <meta name="twitter:url" content="https://apis.wener.me/og.png" />
          <meta name="og:title" content="Wener APIs" />
          <meta name="og:image" content="https://apis.wener.me/og.png" />
          {/*<link
          rel="preload"
          as="fetch"
          crossOrigin="anonymous"
          href={
            'https://apis.wener.me/api?location=%7B%22selectedId%22%3Anull%2C%22isEditing%22%3Afalse%2C%22searchText%22%3A%22%22%7D'
          }
        />*/}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
