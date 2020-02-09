import {isDev} from 'utils/utils';

export const API = {
  get url(): string {
    if (typeof window === 'undefined') {
      return isDev() ? 'http://localhost:3000' : 'https://apis.wener.me';
    }
    return window.location.origin;
  },

  apiOf(apiPath) {
    if (/^http?s:/.test(apiPath)) {
      return apiPath;
    }
    return `${API.url}${apiPath}`
  }
};
