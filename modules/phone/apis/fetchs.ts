import unfetch from 'isomorphic-unfetch';

const isDev = (process?.env?.NODE_ENV || '').startsWith('dev');
const apiUrl = isDev ? 'http://localhost:3000' : 'https://wener-apis.now.sh'

export function fetchPhoneAttribution({number}) {
  return unfetch(`${apiUrl}/api/phone/attribution/${number}`).then(v => v.json())
}
