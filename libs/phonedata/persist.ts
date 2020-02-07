import {EntityManager, EntitySchema, MoreThanOrEqual} from 'typeorm';
import {PhoneDataIndexEntity, PhoneDataRecordEntity} from 'libs/phonedata/schema';
import {ObjectType} from 'typeorm/common/ObjectType';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import {chunk} from 'lodash-es';
import {PhoneData} from 'libs/phonedata/types';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {lib: 'phonedata', mod: 'persist'},
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const debug = require('debug')('phonedata');

export async function findByPhoneNumber(em: EntityManager, num: string | number): Promise<{ index?: PhoneDataIndexEntity, record?: PhoneDataRecordEntity }> {
  // tslint:disable-next-line:ban
  const prefix = parseInt((num + '').substr(0, 7), 10);
  const entities = await em.getRepository(PhoneDataIndexEntity)
    .find({
      where: {
        prefix: MoreThanOrEqual(prefix),
      },
      order: {
        prefix: 'ASC'
      },
      take: 1,
    });
  const index = entities[0];
  if (!index) {
    return {};
  }
  const record = await em.getRepository(PhoneDataRecordEntity)
    .findOne({offset: index.recordOffset});
  return {index, record};
}

export async function savePhoneData(em: EntityManager, data: PhoneData, {} = {}) {
  await em.clear(PhoneDataIndexEntity);
  await em.clear(PhoneDataRecordEntity);

  logger.log({
    level: 'info',
    message: `Version ${data.version} Index ${data.indexes.length} Record ${data.records.length}`
  });

  logger.log({level: 'info', message: `Saving record`});
  await saveChunks(
    em,
    PhoneDataRecordEntity,
    data.records
      .map(v => ({
        province: v.province,
        city: v.city,
        zip: v.zip,
        code: v.code,
        offset: v.offset
      }))
  );

  logger.log('info', 'Saving index');
  await saveChunks(
    em,
    PhoneDataIndexEntity,
    data.indexes.map(v => ({
      prefix: v.prefix,
      offset: v.offset,
      recordOffset: v.recordOffset,
      vendor: v.vendor,
      vendorType: v.vendorType
    }))
  );
  logger.log('info', 'Saved');
}

async function saveChunks<T>(em: EntityManager, entityTarget: ObjectType<T> | EntitySchema<T> | string, all: Array<QueryDeepPartialEntity<T>>, {size = 100} = {}) {
  const chunks = chunk(all, size);

  for (const chunk of chunks) {
    await em.createQueryBuilder()
      .insert()
      .into(entityTarget)
      .values(chunk)
      .execute();
  }
}
