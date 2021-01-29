import { API } from '../../../../apis/api';
import * as url from 'url';

export function buildZxcvbnLink(query: { password }) {
  return API.apiOf(url.format({ pathname: '/api/password/zxcvbn', query }));
}
