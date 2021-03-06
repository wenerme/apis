import { IncomingMessage } from 'http';
import { parseRequestUrl } from '../libs/http/parseRequestUrl';
import { isDev, urljoin } from '@wener/utils';

export const API = {
  get origin(): string {
    if (typeof window === 'undefined') {
      return isDev() ? `http://localhost:${process.env.PORT || '3000'}` : 'https://apis.wener.me';
    }
    return window.location.origin;
  },

  apiOf(apiPath, req?: IncomingMessage) {
    if (/^http?s:/.test(apiPath)) {
      return apiPath;
    }

    let origin = API.origin;
    if (req) {
      origin = parseRequestUrl(req, API.origin).origin;
    }

    // https://wener-apis.herokuapp.com
    if (!origin.includes('localhost')) {
      if (/^[/]api[/]webrtc[/]session/.test(apiPath)) {
        origin = 'https://wener-apis.herokuapp.com';
      }
    }

    return urljoin(origin, apiPath);
  },
};
