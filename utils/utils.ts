export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const isDev = () => (process?.env?.NODE_ENV || '').startsWith('dev');
