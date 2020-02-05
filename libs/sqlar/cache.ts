import {Repository} from 'typeorm';
import {SqlArEntity} from 'libs/sqlar/schema';


export async function getCache(name, repo: Repository<SqlArEntity>, fetcher: (name) => PromiseLike<Partial<SqlArEntity>>): Promise<SqlArEntity> {
  const entity = await repo.findOne(name);
  if (entity) {
    return entity;
  }
  return repo.save(await fetcher(name));
}
