import { Connection, createConnection, Repository } from 'typeorm';
import { SqlArEntity } from '../../sqlar/schema';
import fetch from 'node-fetch';
import { getCache, getCacheDataAsString } from '../../sqlar/cache';
import { URL } from 'url';
import cheerio from 'cheerio';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SougouDictCacheMetaEntity } from './cache';

export interface SougouDictMeta {
  id?;
  name: string;
  size: number;
  count: number;
  downloadCount?: number;
  downloadUrl;
  version;
  createdBy;
  updatedAt;

  type: string;
  example: string;
  description: string;
}

export async function createSougouDictFetcher({ cacheDbFile = './sougou-dict-cache.sqlite' } = {}) {
  const fetcher = new SougouDictFetcher();

  fetcher.cache = await createConnection({
    name: 'sougou-dict-cache',
    type: 'sqlite',
    database: cacheDbFile,
    entities: [
      //
      SqlArEntity,
      //
      SougouDictCacheMetaEntity,
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  });

  fetcher.sqlArRepo = fetcher.cache.getRepository(SqlArEntity);
  return fetcher;
}

export class SougouDictFetcher {
  cache: Connection;
  sqlArRepo: Repository<SqlArEntity>;

  static parseMeta(content: string | Buffer): SougouDictMeta {
    const doc: CheerioStatic = cheerio.load(content);
    const downloadHref = doc('#dict_dl_btn a').attr('href');
    if (!downloadHref) {
      return null;
    }
    // 词条: "3564个", 创建者: "搜狗拼音输入法", 大小: "157720", 更新: "2013-03-26 17:12:47", 版本: "第24个版本"
    const { 词条: count, 创建者: createdBy, 大小: size, 更新: updatedAt, 版本: version } = Object.fromEntries(
      doc('.dict_info_list')
        .text()
        .split('\n')
        .map((v) =>
          v
            .split('：')
            .map((v) => v.trim())
            .filter((s) => s)
        )
        .filter((s) => s.length)
        .map(([k, v]) => [k.replace(/\s/g, ''), v])
    );

    return {
      // tslint:disable-next-line:ban
      id: parseInt(doc('#dict_id').attr('value'), 0),
      name: doc('.dict_detail_title').text(),
      // tslint:disable-next-line:ban
      size: parseInt(size, 10),
      // tslint:disable-next-line:ban
      count: parseInt(count, 10),
      createdBy,
      updatedAt: new Date(updatedAt),
      // tslint:disable-next-line:ban
      downloadCount: parseInt(doc('#dict_dl_num .num_mark').text(), 10),
      // tslint:disable-next-line:ban
      version: parseInt(version.replace(/\D/g, ''), 10),
      downloadUrl: downloadHref.replace(/^(https?:)?/, 'https:'),

      type: doc('#dict_cate_show .select_now').text().trim().replace(/\(.*/, '').trim() || null,
      example: doc('#dict_info_sample .sample_center')
        .text()
        .split('、')
        .map((v) => v.trim())
        .filter((v) => v)
        .join(' '),
      description: doc('#dict_info_intro .dict_info_str').text(),
    };
  }

  fetchDetail(id): Promise<string> {
    return fetch(`https://pinyin.sogou.com/dict/detail/index/${id}`).then((v) => {
      // return v.headers['Location'] ? null : v.text()
      return v.text();
    });
  }

  getScelData(meta: SougouDictMeta): Promise<SqlArEntity> {
    return getCache(`scel/files/${meta.id}/v${meta.version}.scel`, this.sqlArRepo, async (name) => {
      const url = new URL(meta.downloadUrl);
      const data = await fetch(url.toString()).then((v) => v.buffer());
      console.log(`download scel ${name} ${data.length} ${url.searchParams.get('name')} ${meta.downloadUrl}`);
      return { data };
    });
  }

  getLargestMetaId(): Promise<number> {
    return this.cache
      .getRepository(SougouDictCacheMetaEntity)
      .find({
        order: {
          id: 'DESC',
        },
        take: 1,
      })
      .then((v) => v[0]?.id ?? 1);
  }

  async findMeta(id, { version = null } = {}): Promise<SougouDictCacheMetaEntity> {
    return this.cache
      .getRepository(SougouDictCacheMetaEntity)
      .find({
        where: {
          id,
          ...(version ? { version } : {}),
        },
        order: {
          version: 'DESC',
        },
        take: 1,
      })
      .then((v) => v[0]);
  }

  async getParsedPageMeta(id): Promise<SougouDictMeta | null> {
    const name = `cache/scel/html/${id}.html`;
    const content = await getCache(name, this.sqlArRepo, async (name) => {
      const data = await this.fetchDetail(id);
      console.log(`Fetch dict ${id} ${data?.length ?? 0}`);
      if (!data) {
        return null;
      }

      return { data };
    });

    return SougouDictFetcher.parseMeta(getCacheDataAsString(content.data));
  }

  async getLargestCachePageId(): Promise<number> {
    return this.sqlArRepo
      .query(
        `
      select cast(substr(name, length('cache/scel/html/') + 1, length(name) - length('cache/scel/html/.html')) as integer) as id
      from sqlar
      where name like 'cache/scel/html/%'
      order by id desc
      limit 1
    `
      )
      .then((v) => v[0]?.id ?? 1);
  }

  async getLargestCacheScelId(): Promise<number> {
    return this.sqlArRepo
      .query(
        `
      with names(name) as (
          select substr(name, length('scel/files/') + 1)
          from sqlar
          where name like 'scel/files/%'
            and data is not null
      )
      select cast(substr(name, 0, instr(name, '/')) as integer) as id
      from names
      order by id desc
    `
      )
      .then((v) => v[0]?.id ?? 1);
  }
}
