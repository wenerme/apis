import 'systemjs';
import 'systemjs/dist/extras/named-register';
import 'systemjs/dist/extras/named-exports';
import 'systemjs/dist/extras/module-types';
import 'systemjs/dist/extras/dynamic-import-maps';
import * as ReactModule from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime.js';
export function useSystem() {
  System.register('react', [], (exports) => ({
    execute: () => {
      console.log('React', ReactModule);
      exports(ReactModule);
    },
  }));

  System.register('react/jsx-runtime', [], (exports) => ({
    execute: () => {
      exports({ jsxs, jsx, Fragment });
    },
  }));

  return System;
}
