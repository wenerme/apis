import unfetch from 'isomorphic-unfetch';
import { API } from 'apis/api';

export function fetchPhoneAttribution({ number }) {
  return unfetch(`${API.origin}/api/phone/attribution/${number}`).then((v) => v.json());
}
