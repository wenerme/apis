import {Connection, createConnection, EntityManager, Repository} from 'typeorm';
import {SqlArEntity} from 'libs/sqlar/schema';
import fetch from 'node-fetch';
import {getCache} from 'libs/sqlar/cache';
import {URL} from 'url';
import cheerio from 'cheerio';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {SougouDictMetaEntity} from 'libs/sougou/dict/schema';
import {createApisConnectionFactory} from 'db/apis';

export interface SougouDictMeta {
  id?
  name: string
  size: number
  count: number
  downloadCount?: number
  downloadUrl
  version
  createdBy
  updatedAt
}

export async function createSougouDictFetcher({cacheDbFile = './sougou-dict-cache.sqlite', db = null} = {}) {
  const fetcher = new SougouDictFetcher();
  // NOTE different db type
  db = db ?? await createApisConnectionFactory({
    name: 'sougou-dict',
    entities: [SougouDictMetaEntity]
  })();

  fetcher.cache = await createConnection({
    name: 'sougou-dict-cache',
    type: 'sqlite',
    database: cacheDbFile,
    entities: [
      //
      SqlArEntity,
      // use same
      ...(!db ? [SougouDictMetaEntity] : [])
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  });

  fetcher.db = db || fetcher.cache;

  fetcher.sqlArRepo = fetcher.cache.getRepository(SqlArEntity);
  return fetcher;
}

export class SougouDictFetcher {
  cache: Connection;
  db: Connection;
  sqlArRepo: Repository<SqlArEntity>;
  em: EntityManager;

  static parseMeta(content): SougouDictMeta {
    const doc: CheerioStatic = cheerio.load(content);
    const downloadHref = doc('#dict_dl_btn a').attr('href');
    if (!downloadHref) {
      return null;
    }
    // 词条: "3564个", 创建者: "搜狗拼音输入法", 大小: "157720", 更新: "2013-03-26 17:12:47", 版本: "第24个版本"
    const {词条: count, 创建者: createdBy, 大小: size, 更新: updatedAt, 版本: version} = Object.fromEntries(
      doc('.dict_info_list')
        .text()
        .split('\n')
        .map(v =>
          v.split('：').map(v => v.trim()).filter(s => s)
        )
        .filter(s => s.length)
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
    }
  }

  fetchDetail(id): Promise<string> {
    return fetch(`https://pinyin.sogou.com/dict/detail/index/${id}`).then(v => {
      // return v.headers['Location'] ? null : v.text()
      return v.text();
    })
  }

  async getMeta(id): Promise<SougouDictMeta | null> {
    const name = `detail/${id}.html`;
    let content = await this.sqlArRepo.findOne(name);
    if (!content) {
      const html = await this.fetchDetail(id);
      console.log(`Fetch dict ${id} ${html?.length ?? 0}`);
      if (!html) {
        return null;
      }

      content = await this.sqlArRepo.save<SqlArEntity>({
        name,
        mode: 0o77,
        mtime: Date.now() / 1000,
        size: html.length,
        data: html
      })
    }
    return SougouDictFetcher.parseMeta(content.data)
  }

  getScelData(meta: SougouDictMeta): Promise<SqlArEntity> {
    return getCache(`scel/${meta.id}.scel`, this.sqlArRepo, async name => {
      const url = new URL(meta.downloadUrl);
      const buf = await fetch(url.toString()).then(v => v.buffer());
      const encoded = buf.toString('base64');

      console.log(`download scel ${name} ${url.searchParams.get('name')} ${meta.downloadUrl}`);
      return {
        name,
        mode: 0o77,
        mtime: Date.now() / 1000,
        size: encoded.length,
        data: encoded,
      }
    });
  }

  async getLargestMetaId(): Promise<number> {
    return this.sqlArRepo.query(`
      select cast(substr(name, length('detail/') + 1, length(name) - length('detail/.html')) as integer) as id
      from sqlar
      where name like 'detail/%'
      order by id desc
      limit 1
    `).then(v => v[0]?.id ?? 1)
  }

  async getLargestDataId(): Promise<number> {
    return this.sqlArRepo.query(`
      select cast(substr(name, length('scel/') + 1, length(name) - length('scel/.html')) as integer) as id
      from sqlar
      where name like 'scel/%'
      order by id desc
      limit 1
    `).then(v => v[0]?.id ?? 1)
  }

  async updateMeta(id): Promise<SougouDictMetaEntity | null> {
    const meta = await this.getMeta(id);
    if (!meta) {
      return null
    }
    return this.db.getRepository(SougouDictMetaEntity).save(meta)
  }

  async updateAllMeta({fromId = 1} = {}) {
    const maxId = await this.getLargestMetaId();
    let batch = [];
    const save = batch => {
      return this.db.getRepository(SougouDictMetaEntity)
        .createQueryBuilder()
        .insert()
        .values(batch)
        // todo update
        .onConflict('("id") DO NOTHING')
        // .onConflict(`("id") DO UPDATE SET "name" = :name`)
        // .setParameter("name", post2.name)
        .execute()
    };
    for (let id = fromId; id <= maxId; id++) {
      const meta = await this.getMeta(id);
      if (!meta) {
        continue
      }
      batch.push(meta);
      if (batch.length === 100) {
        await save(batch);
        batch = [];
      }
    }
    if (batch.length > 0) {
      await save(batch);
    }
  }
}
