import unfetch from 'isomorphic-unfetch';
import {getGlobalThis, isDev, urljoin} from 'utils/utils';

const HASH = 'QmXYt8oE2BJJEyWBDFrv583WypBgSjGNyNHFRfQ5yMxxFt';

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

  size?
  example?
  description?
}

let _instance: ScelDataService;

export function createScelDataService() {
  if (!_instance) {
    _instance = new ScelDataService();
  }
  return _instance
}

export class ScelDataService {

  private index;
  private indexFull;
  private indexRaw;

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

  async getRawIndex(): Promise<string> {
    return this.indexRaw = this.indexRaw ?? await unfetch(getIpfsFilePath(HASH, 'index.csv')).then(v => v.text())
  }

  async getFullIndex(): Promise<ScelIndexRecord[]> {
    return this.indexFull = this.indexFull ?? await unfetch(getIpfsFilePath(HASH, 'index.full.json')).then(v => v.json());
  }

  async getIndex(): Promise<ScelIndexRecord[]> {
    return this.index = this.index ?? parseScelIndex(await this.getRawIndex());
  }

  parseScelIndex(text: string): ScelIndexRecord[] {
    return this.index = this.index ?? parseScelIndex(text);
  }

  getRandomRecommends(index = null): ScelIndexRecord[] | Promise<ScelIndexRecord[]> {
    index = index ?? this.index;
    if (index?.length === 0) {
      return []
    }
    if (!index) {
      return this.getIndex().then((v) => this.getRandomRecommends(v))
    }

    const good = index.filter(v => v.count > 10000);
    const result = {};
    if (good.length > 100) {
      for (let i = 0; i < 20; i++) {
        const v = good[Math.floor(good.length * Math.random())]
        result[v.id] = v;
      }
    }
    return Object.values(result);
  }
}

export function parseScelIndex(text: string): ScelIndexRecord[] {
  return text
    .split('\n')
    .map(v => v.split(','))
    .map(([id, version, name, type, count, createdBy, updatedAt, size, description, example]) => ({
      id: Number(id),
      version: Number(version),
      name,
      type,
      count: Number(count),
      createdBy,
      updatedAt: updatedAt ? Number(updatedAt) * 1000 : null,
      size: size ? Number(size) : undefined,
      description,
      example,
    }))
}

function getIpfsFilePath(hash, ...path) {
  return urljoin(getIpfsGateway().replace(':hash', hash), ...path)
}

function getIpfsGateway() {
  // localStorage['IPFS_PREFER_GW'].replace(':hash','111')
  let gw;
  if (isDev()) {
    gw = process.env.IPFS_PREFER_GW || 'http://127.0.0.1:8080/ipfs/:hash';
  } else {
    gw = getGlobalThis()?.localStorage?.['IPFS_PREFER_GW'] ?? process.env.IPFS_PREFER_GW ?? 'https://ipfs.io/ipfs/:hash'
  }

  return gw
}

// http://127.0.0.1:8080/ipfs/QmVfkpF7MKeZNSbcSyTxtWFCsLFetXM6B1oZTGQabMqdzf
