import { Instance, TorrentOptions } from 'webtorrent';

export interface CreateSeedOptions {
  type: 'text' | 'file';
  text?: CreateTextSeedOptions;
}

export interface CreateTextSeedOptions extends Omit<TorrentOptions, 'name'> {
  filename: string;
  content: string;
}

export async function createSeed(client: Instance, options: CreateSeedOptions) {
  switch (options.type) {
    case 'text':
      return createTextSeed(client, options.text);
    case 'file':
      break;
    default:
      throw new Error('invalid seed options');
  }
}

function createTextSeed(client: Instance, options: CreateTextSeedOptions) {
  const { filename, content, ...opts } = options;

  return client.seed(new Buffer(content), { name: filename, ...opts });
}
