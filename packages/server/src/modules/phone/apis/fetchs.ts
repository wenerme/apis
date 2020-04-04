import unfetch from 'isomorphic-unfetch';
import { API } from 'src/apis/api';

export function fetchPhoneAttribution({ number }) {
  return unfetch(`${API.origin}/api/phone/attribution/${number}`).then((v) => v.json());
}
