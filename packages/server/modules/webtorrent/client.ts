import {Instance} from 'webtorrent';

let client: Instance;

export function getCurrentWebTorrentClient(): Instance | null {
  return client;
}

export function getWebTorrentClient(): Instance | Promise<Instance> {
  if (client) {
    return client
  }

  return import('webtorrent')
    .then(({default: WebTorrent}) => {
      console.log(`Initializing WebTorrent client`);
      client = new WebTorrent({});
      if (typeof window !== 'undefined') {
        window['wtClient'] = client;
        import('buffer/').then(({Buffer}) => window['Buffer'] = Buffer)
      }

      return client;
    })
}
