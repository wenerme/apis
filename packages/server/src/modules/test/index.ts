import { camelCase } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { TestPanel } from './TestPanel';

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
