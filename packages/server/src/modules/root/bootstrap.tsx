import * as singleSpa from 'single-spa';
import { registerApplication, start } from 'single-spa';
import { constructApplications, constructRoutes, constructLayoutEngine } from 'single-spa-layout';

import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { route } from 'next/dist/next-server/server/router';
import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import { WenerApisLayout } from './WenerApisLayout';
// import { WenerApisWelcome } from '../../../../ui/src/components/WenerApisWelcome';
import _ from 'lodash';
import { WenerApisApp } from './WenerApisApp';

if (typeof window !== 'undefined') {
  window['singleSpa'] = singleSpa;
}

console.info('Initializing');

const apps = {
  Welcome: singleSpaReact({
    React,
    ReactDOM,
    rootComponent: () => (
      <WenerApisLayout>
        <div>Home page</div>
      </WenerApisLayout>
    ),
    // rootComponent: () => (
    //   <PageLayout title="Wener's APIs">
    //     {/*<WenerApisWelcome />*/}
    //     Hello
    //   </PageLayout>
    // ),
    errorBoundary(err, info, props) {
      // Customize the root error boundary for your microfrontend here.
      return null;
    },
  }),
  NotFound: () => {
    return singleSpaReact({
      React,
      ReactDOM,
      rootComponent: () => <h2>Sorry, not found.</h2>,
      errorBoundary(err, info, props) {
        // Customize the root error boundary for your microfrontend here.
        return null;
      },
    });
  },
};

// registerApplication({
//   name: 'root',
//   app: () => import('@wener/apis-test'),
//   activeWhen: [],
// });

// registerApplication({
//   name: '@wener/apis-test',
//   app: () => import('@wener/apis-test'),
//   activeWhen: ['/'],
// });

// const doc = new DOMParser()
//   .parseFromString(
//     `
// <single-spa-router mode="hash" containerEl="#WenerApis">
//   <div class="main-content">
//     <route path="/test">
//       <application name="@wener/apis-test"></application>
//     </route>
//     <route path="/">
//       <application name="Welcome"></application>
//     </route>
//   </div>
// </single-spa-router>
// `,
//     'text/html',
//   )
//   .documentElement.querySelector('single-spa-router');
//
// const resolvedRoutes = constructRoutes({
//   mode: 'hash',
//   containerEl: '#WenerApis',
//   routes: [
//     {
//       type: 'route',
//       path: '/',
//       routes: [{ type: 'application', name: 'Welcome' }],
//     },
//     // {
//     //   type: 'route',
//     //   path: '/test',
//     //   routes: [
//     //     { type: 'application', name: '@wener/apis-test' },
//     //     // { type: 'application', name: 'root' },
//     //   ],
//     // },
//     {
//       type: 'route',
//       default: true,
//       routes: [{ type: 'application', name: 'NotFound' }],
//     },
//   ],
// });
// resolvedRoutes.routes[0].activeWhen = (location) => {
//   console.log(`Loc`, location);
//   return false;
// };
//
// console.log({ resolvedRoutes });
// const applications = constructApplications({
//   routes: resolvedRoutes,
//   loadApp: async (app) => {
//     console.log('loadApp', apps[app.name] ? 'static' : 'dynamic', app.name);
//     return apps[app.name] || import(app.name);
//   },
// });
//
// constructLayoutEngine({
//   routes: resolvedRoutes,
//   applications: applications,
// });
//
// applications.forEach((v) => {
//   console.log('Load', v);
//   registerApplication(v);
// });

registerApplication({
  name: 'WenerApis',
  activeWhen: ['/'],
  app: async () =>
    singleSpaReact({
      React,
      ReactDOM,
      rootComponent: () => (
        <WenerApisApp>
          <div>Home page</div>
        </WenerApisApp>
      ),
      // rootComponent: () => (
      //   <PageLayout title="Wener's APIs">
      //     {/*<WenerApisWelcome />*/}
      //     Hello
      //   </PageLayout>
      errorBoundary(err, info, props) {
        // Customize the root error boundary for your microfrontend here.
        return null;
      },
    }),
});

start();
// start({urlRerouteOnly: true});
