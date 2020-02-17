import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import {initGA, logPageView} from '../utils/analytics'

export default class MyApp extends App {
  // https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md
  // static async getInitialProps({Component, router, ctx}) {
  //   let pageProps = {};
  //
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }
  //
  //   return {pageProps}
  // }

  componentDidMount() {
    try {
      if (progress.env.NODE_ENV.startsWith('dev')) {
        return
      }
    } catch (e) {
      //
    }
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView)
  }

  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />
  }
}
