import unfetch from 'isomorphic-unfetch';
import { buildIpfsUrl } from 'libs/ipfs/gateway/selector';
import { API } from 'apis/api';

export const ScelDirectoryIpfsHash = 'QmaTARJ73WduELvCkPtnYfoBD4Qn74fFEicuc76eTT8p62';

export interface ScelCompactIndex {
  fields: string[];
  rows: any[][];
}

export interface ScelMetadata extends ScelIndexRecord {
  size;
  example;
  description;
}

export interface ScelIndexRecord {
  id;
  version;
  name;
  type;
  count;
  createdBy;
  updatedAt;

  size?;
  example?;
  description?;

  fileIpfsHash?;
}

let _instance: ScelDataService;

export function createScelDataService() {
  if (!_instance) {
    _instance = new ScelDataService();
  }
  return _instance;
}

export class ScelDataService {
  private index;
  private indexFull;
  private indexRaw;

  constructor() {
    console.log(`initial ScelDataService ${ScelDirectoryIpfsHash}`);
  }

  async getIpfsHash() {
    return ScelDirectoryIpfsHash;
  }

  getScelUrl({ id, version }) {
    return getIpfsFilePath(ScelDirectoryIpfsHash, 'files', id, `v${version}.scel`);
  }

  async getMetadata({ id, version, req = null }) {
    return unfetch(API.apiOf(`/api/scel/dict?id=${id}&version=${version ?? 0}`, req)).then((v) => v.json());
    // return unfetch(getIpfsFilePath(ScelDirectoryIpfsHash, 'files', id, `v${version}.json`)).then(v => v.json())
  }

  async getRawIndex(): Promise<string> {
    return (this.indexRaw =
      this.indexRaw ?? (await unfetch(getIpfsFilePath(ScelDirectoryIpfsHash, 'index.csv')).then((v) => v.text())));
  }

  async getFullIndex(): Promise<ScelIndexRecord[]> {
    if (!this.indexFull) {
      this.indexFull = await unfetch(getIpfsFilePath(ScelDirectoryIpfsHash, 'index.full.json')).then((v) => v.json());
      console.log(`load full index ${this.indexFull.length}`);
    }
    return this.indexFull;
  }

  async getIndex(): Promise<ScelIndexRecord[]> {
    return (this.index = this.index ?? parseScelIndex(await this.getRawIndex()));
  }

  parseScelIndex(text: string): ScelIndexRecord[] {
    return (this.index = this.index ?? parseScelIndex(text));
  }

  getRandomRecommends(index = null): ScelIndexRecord[] | Promise<ScelIndexRecord[]> {
    index = index ?? this.index;
    if (index?.length === 0) {
      return [];
    }
    if (!index) {
      return this.getIndex().then((v) => this.getRandomRecommends(v));
    }

    const good = index.filter((v) => v.count > 10000);
    const result = {};
    if (good.length > 100) {
      for (let i = 0; i < 20; i++) {
        const v = good[Math.floor(good.length * Math.random())];
        result[v.id] = v;
      }
    }
    return Object.values(result);
  }
}

export function parseScelIndex(text: string): ScelIndexRecord[] {
  return text
    .split('\n')
    .map((v) => v.split(','))
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
    }));
}

function getIpfsFilePath(hash, ...path) {
  return buildIpfsUrl(null, hash, ...path);
}
