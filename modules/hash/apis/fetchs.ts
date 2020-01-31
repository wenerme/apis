import unfetch from 'isomorphic-unfetch';
import {API} from 'apis/api';

export function fetchHashing({algorithm, content}) {
  return unfetch(`${API.url}/api/hash/md/${algorithm}/base64/json/${content}`).then(v => v.json())
}
