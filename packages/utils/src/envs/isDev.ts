export const isDev = () => (process?.env?.NODE_ENV || '').startsWith('dev');
