import {isDev, urljoin} from 'utils/utils';
import {IncomingMessage} from 'http';
import {parseRequestUrl} from 'libs/nexts/apis';

export const API = {
  get url(): string {
    if (typeof window === 'undefined') {
      return isDev() ? 'http://localhost:3000' : 'https://apis.wener.me';
    }
    return window.location.origin;
  },

  apiOf(apiPath, req?: IncomingMessage) {
    if (/^http?s:/.test(apiPath)) {
      return apiPath;
    }
    if (req) {
      return urljoin(parseRequestUrl(req, API.url).origin, apiPath)
    }
    return `${API.url}${apiPath}`
  }
};
