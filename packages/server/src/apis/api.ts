import { IncomingMessage } from 'http';
import { parseRequestUrl } from '../libs/nexts/utils/requests';
import { urljoin } from '@wener/utils/src/strings/urljoin';
import { isDev } from '@wener/utils/src/envs/isDev';

export const API = {
  get origin(): string {
    if (typeof window === 'undefined') {
      return isDev() ? 'http://localhost:3000' : 'https://apis.wener.me';
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
