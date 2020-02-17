import unfetch from 'isomorphic-unfetch';
import {getGlobalThis, isDev, urljoin} from 'utils/utils';

const HASH = 'Qmduh8ZzrERJHRKtUvAvMBUC2VVsntZDm5nHrgrLGLEBAk';

export interface ScelMetadata extends ScelIndexRecord {
  size
  example
  description
}

export interface ScelIndexRecord {
  id
  version
  name
  type
  count
  createdBy
  updatedAt
}

let _instance: ScelDataService

export function createScelDataService() {
  if (!_instance) {
    _instance = new ScelDataService();
  }
  return _instance
}

export class ScelDataService {

  private index

  constructor() {
    console.log(`initial ScelDataService ${HASH}`);
  }

  async getIpfsHash() {
    return HASH;
  }

  getScelUrl({id, version}) {
    return getIpfsFilePath(HASH, 'files', id, `v${version}.scel`)
  }

  async getMetadata({id, version}) {
    return unfetch(getIpfsFilePath(HASH, 'files', id, `v${version}.json`))
      .then(v => v.json())
  }

  async getIndex(): Promise<ScelIndexRecord[]> {
    return this.index = this.index ?? await unfetch(getIpfsFilePath(HASH, 'index.csv'))
      .then(v => v.text())
      .then(text => {
        return text
          .split('\n')
          .map(v => v.split(','))
          .map(([id, version, name, type, count, createdBy, updatedAt]) => ({
            id: Number(id),
            version: Number(version),
            name,
            type,
            count: Number(count),
            createdBy,
            updatedAt: updatedAt ? Number(updatedAt) * 1000 : null,
          }))
      })
  }
}

function getIpfsFilePath(hash, ...path) {
  return urljoin(getIpfsGateway().replace(':hash', hash), ...path)
}

function getIpfsGateway() {
  // localStorage['IPFS_PREFER_GW'].replace(':hash','111')
  let gw
  if (isDev()) {
    gw = process.env.IPFS_PREFER_GW || 'http://127.0.0.1:8080/ipfs/:hash';
  } else {
    gw = getGlobalThis()?.localStorage?.['IPFS_PREFER_GW'] ?? process.env.IPFS_PREFER_GW ?? 'https://ipfs.io/ipfs/:hash'
  }

  return gw
}

// http://127.0.0.1:8080/ipfs/QmVfkpF7MKeZNSbcSyTxtWFCsLFetXM6B1oZTGQabMqdzf
