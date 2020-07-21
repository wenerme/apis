import * as singleSpa from 'single-spa';
import { registerApplication, start } from 'single-spa';

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import { WenerApisApp } from './WenerApisApp';

if (typeof window !== 'undefined') {
  window['singleSpa'] = singleSpa;
}

console.info('Initializing');

registerApplication({
  name: 'WenerApis',
  activeWhen: ['/'],
  app: async () =>
    singleSpaReact({
      React,
      ReactDOM,
      domElementGetter: () => document.querySelector('#WenerApis'),
      rootComponent: () => (
        <WenerApisApp>
          <div>Home page</div>
        </WenerApisApp>
      ),
      errorBoundary(err, info, props) {
        // Customize the root error boundary for your microfrontend here.
        return null;
      },
    }),
});

start();
