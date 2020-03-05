import {Instance, TorrentOptions} from 'webtorrent';

export interface CreateDownloadOptions {
  type: 'magnet'
  magnet: CreateMagnetDownloadOptions
}

export interface CreateMagnetDownloadOptions extends TorrentOptions {
  uri
}

export async function createDownload(client: Instance, options: CreateDownloadOptions) {
  switch (options.type) {
    case 'magnet':
      return createMagnetDownload(client, options.magnet);
    default:
      throw new Error(`无效的下载请求`)
  }
}

function createMagnetDownload(client: Instance, options: CreateMagnetDownloadOptions) {
  const {uri, ...opts} = options;
  return client.add(uri, opts)
}
