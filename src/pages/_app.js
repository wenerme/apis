import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { initGA, logPageView } from '../utils/analytics';
import '../../public/styles/global.css';
import 'tailwindcss/tailwind.css';

import 'nprogress/nprogress.css';
// todo no need to global
import 'react-virtualized/styles.css';

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
    return <Component {...pageProps} />;
  }
}
