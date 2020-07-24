import unfetch from 'isomorphic-unfetch';
import { API } from 'src/apis/api';

export function fetchHashing({ algorithm, content }) {
  return unfetch(`${API.origin}/api/hash/md/${algorithm}/base64/json/${content}`).then((v) => v.json());
}
