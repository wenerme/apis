const isDev = (process?.env?.NODE_ENV || '').startsWith('dev');

export const API = {
  url: isDev ? 'http://localhost:3000' : 'https://apis.wener.me'
};
