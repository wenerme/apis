import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { camelCase } from 'lodash';
import { TestPanel } from './components/TestPanel';

export { default as metadata } from './metadata.json';

export interface TestService {
  camel(s: string): string;
}

console.log('Load test module');

export const utils = { camelCase };

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: TestPanel,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

export * from './components/PingServiceTest';
