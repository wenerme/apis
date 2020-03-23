import { Repository } from 'typeorm';
import { SqlArEntity } from 'libs/sqlar/schema';

export async function getCache(
  name,
  repo: Repository<SqlArEntity>,
  fetcher: (name) => PromiseLike<Partial<SqlArEntity>>
): Promise<SqlArEntity> {
  let entity = await repo.findOne(name);
  if (entity) {
    return entity;
  }
  entity = (await fetcher(name)) as SqlArEntity;
  if (!entity) {
    return entity;
  }

  entity.name = entity.name ?? name;
  entity.mode = entity.mode ?? 0o100644;
  entity.size = entity.size ?? entity.data?.length;
  entity.mtime = Math.round(Date.now() / 1000);

  return repo.save(entity);
}

export function getUncompressedCacheData(data) {
  if (typeof data === 'string') {
    return data;
  }

  if (data[0] === 0x78) {
    const zlib = require('zlib');
    return zlib.inflateSync(data).toString();
  }

  return data;
}

export function getCacheDataAsString(data): string {
  if (typeof data === 'string') {
    return data;
  }
  const zlib = require('zlib');
  return zlib.inflateSync(data).toString();
}
