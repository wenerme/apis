import get from 'lodash/get'

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const isDev = () => (process?.env?.NODE_ENV || '').startsWith('dev');

export const getGlobalThis = () => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  if (typeof this !== 'undefined') return this;
  throw new Error('Unable to locate global `this`');
};

/**
 * 替换类似于 JS 的模板字符串
 *
 * @example
 * templateString('My name is ${name}',{name:'wener'})
 */
export function templateString(template, variables) {
  return template.replace(/\${(.*?)}/g, (_, g) => {
    // variables[g.trim()]
    // 支持路径 - 例如 a.b[0]
    return get(variables, g.trim())
  });
}
