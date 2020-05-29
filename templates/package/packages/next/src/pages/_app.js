import App from 'next/app';

export function reportWebVitals(metric) {
  console.log('Web Vitals Metrics', metric);
}

export default class NextApp extends App {
  componentDidMount() {
    // skip for localhost
    if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
      return;
    }
    // skip for dev
    if (process.env.NODE_ENV.startsWith('dev')) {
      return;
    }

    // Setup GA
    // initGA();
    // logPageView();
    // Router.events.on('routeChangeComplete', logPageView);
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
