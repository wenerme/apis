// https://github.com/xluohome/phonedata/raw/master/phone.dat
import {PhoneData, PhoneDataIndex, PhoneDataRecord, vendors} from 'libs/phonedata/types';
import {sortedIndexBy} from 'lodash-es';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {lib: 'phonedata', mod: 'parser'},
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

function readString(buf: Buffer, offset: number, len: number) {
  let s = '';
  for (let n = 0; n < len; n++) {
    s += String.fromCharCode(buf.readUInt8(offset + n));
  }
  return s;
}

function readStringUntil(buf: Buffer, offset: number, pivot: number): { data: string, size: number } {
  const idx = buf.indexOf(pivot, offset, 'utf8');
  const s = buf.toString('utf8', offset, idx);
  return {data: s, size: idx - offset};
}

function readIndexes(buf: Buffer, offset: number): PhoneDataIndex[] {
  const maxOffset = buf.length - 9;
  const all: PhoneDataIndex[] = [];
  let i = offset;
  do {
    all.push(readIndex(buf, i));
    i += 9;
  } while (i <= maxOffset);
  return all;
}

function readIndex(buf: Buffer, offset: number): PhoneDataIndex {
  // 索引区 中每条记录的格式为"<手机号前七位><记录区的偏移><卡类型>"，每个索引的长度为9个字节；
  // const prefix = readString(buf, offset, 7);
  const prefix = buf.readInt32LE(offset);
  const recordOffset = buf.readInt32LE(offset + 4);
  const vendorType = buf.readUInt8(offset + 8);
  return {prefix, offset, vendorType, vendor: vendors[vendorType], recordOffset}
}

/*
| 4 bytes |                    <- phone.dat 版本号（如：1701即17年1月份）
------------
| 4 bytes |                    <-  第一个索引的偏移
-----------------------
|  offset - 8         |        <-  记录区
-----------------------
|  index              |        <-  索引区
-----------------------

头部为8个字节，版本号为4个字节，第一个索引的偏移为4个字节；
记录区 中每条记录的格式为"<省份>|<城市>|<邮编>|<长途区号>\0"。 每条记录以'\0'结束；
 */

function readRecord(buf: Buffer, offset: number): { record: PhoneDataRecord, size: number } {
  const {data: s, size} = readStringUntil(buf, offset, 0);
  const split = s.split('|').map(v => v.trim());
  return {record: {province: split[0], city: split[1], zip: split[2], code: split[3], offset}, size};
}

function readRecords(buf: Buffer, offset: number, maxOffset: number): PhoneDataRecord[] {
  const all: PhoneDataRecord[] = [];
  let i = offset;

  do {
    const {record, size} = readRecord(buf, i);
    all.push(record);
    i += size + 1;

  } while (i < maxOffset);

  return all;
}

export function parsePhoneData(buffer: Buffer) {
  const data: PhoneData = {version: '', records: [], indexes: []};
  data.version = readString(buffer, 0, 4);

  const indexOffset = buffer.readInt16LE(4);

  logger.log('info', `Parse version ${data.version} Index Offset ${indexOffset}`);

  data.records = readRecords(buffer, 8, indexOffset);
  data.indexes = readIndexes(buffer, indexOffset);

  return data;
}

export function searchByPhoneNumber(data: PhoneData, num: number | string): { index?: PhoneDataIndex, record?: PhoneDataRecord } {
  const prefix = normalizePrefix(num);
  const idx = sortedIndexBy<Partial<PhoneDataIndex>>(data.indexes, {prefix}, o => o.prefix);
  const phoneDataIndex = data.indexes[idx];
  if (!phoneDataIndex) {
    return
  }
  const recordIndex = sortedIndexBy<Partial<PhoneDataRecord>>(data.records, {offset: phoneDataIndex.recordOffset}, o => o.offset);
  const phoneDataRecord = data.records[recordIndex];
  if (!phoneDataRecord) {
    return;
  }
  return {index: phoneDataIndex, record: phoneDataRecord};
}

export function normalizePrefix(num: string | number) {
  // tslint:disable-next-line:ban
  return parseInt((num + '').substr(0, 7).padEnd(7, '0'), 10)
}
