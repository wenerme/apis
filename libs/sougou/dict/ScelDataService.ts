import unfetch from 'isomorphic-unfetch';
import {getGlobalThis, isDev, urljoin} from 'utils/utils';

export const ScelIpfsHash = 'QmehCds7FhEKv9J78izwTtqCKGZkMzxE8FKqGFeLjkwqu4';

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
    console.log(`initial ScelDataService ${ScelIpfsHash}`);
  }

  async getIpfsHash() {
    return ScelIpfsHash;
  }

  getScelUrl({id, version}) {
    return getIpfsFilePath(ScelIpfsHash, 'files', id, `v${version}.scel`)
  }

  async getMetadata({id, version}) {
    return unfetch(getIpfsFilePath(ScelIpfsHash, 'files', id, `v${version}.json`))
      .then(v => v.json())
  }

  async getRawIndex(): Promise<string> {
    return this.indexRaw = this.indexRaw ?? await unfetch(getIpfsFilePath(ScelIpfsHash, 'index.csv')).then(v => v.text())
  }

  async getFullIndex(): Promise<ScelIndexRecord[]> {
    if (!this.indexFull) {
      const filePath = `/tmp/${ScelIpfsHash}-index.full.json`;
      let fs = {} as any;
      try {
        fs = require('fs')
      } catch (e) {
      }

      if (fs.promises) {
        if (fs.existsSync(filePath)) {
          this.indexFull = JSON.parse(fs.readFileSync(filePath).toString())
        }
      }

      if (!this.indexFull) {
        this.indexFull = await unfetch(getIpfsFilePath(ScelIpfsHash, 'index.full.json')).then(v => v.json());
      }

      if (fs.writeFileSync && JSON.stringify(this.indexFull)) {
        fs.writeFileSync(filePath, JSON.stringify(this.indexFull))
      }

      console.log(`load full index ${this.indexFull.length}`);
    }
    return this.indexFull;
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
    gw = getGlobalThis()?.localStorage?.['IPFS_PREFER_GW'] ?? getGlobalThis()?.['IPFS_PREFER_GW'] ?? process.env.IPFS_PREFER_GW ?? 'https://ipfs.io/ipfs/:hash'
  }

  return gw
}

// http://127.0.0.1:8080/ipfs/QmVfkpF7MKeZNSbcSyTxtWFCsLFetXM6B1oZTGQabMqdzf
