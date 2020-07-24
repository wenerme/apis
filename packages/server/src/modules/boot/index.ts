// https://babeljs.io/docs/en/babel-polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export * from './boot';
export { default as metadata } from './metadata.json';
export * from './ModuleService';
export * from './types';
export * from './base';
