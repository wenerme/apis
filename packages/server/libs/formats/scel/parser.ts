import {Buffer} from 'buffer/'
import {ScelContent, ScelPinyin, ScelWord} from './types';

const ENCODING = 'utf-16le';

const MAGIC = Buffer.from([0x40, 0x15, 0x00, 0x00, 0x44, 0x43, 0x53, 0x01, 0x01, 0x00, 0x00, 0x00]);
const PY_MAGIC = Buffer.from([0x9D, 0x01, 0x00, 0x00]);
const OFFSET_PINGYIN = 0x1540;
const OFFSET_CHINESE = 0x2628;

export function parseScelHeader(buf: Buffer) {
  if (buf.compare(MAGIC, 0, MAGIC.length, 0, MAGIC.length) !== 0) {
    throw new Error('Invalid file: magic not match')
  }

  return {
    name: toString(buf.slice(0x130, 0x338)),
    type: toString(buf.slice(0x338, 0x540)),
    description: toString(buf.slice(0x540, 0xD40)),
    example: toString(buf.slice(0xD40, OFFSET_PINGYIN)),
  }
}

export function parseScelContent(buf: Buffer): ScelContent {
  const pinyins = readPinyins(buf);
  const words = readWords(buf);
  return {words, pinyins}
}

export function enrichContent({pinyins, words}: ScelContent) {
  const indexed = pinyins.reduce((p, {index, pinyin}) => {
    p[index] = pinyin
    return p;
  }, {});
  words.forEach(v => {
    v.pinyin = v.pinyinIndex.map(i => indexed[i])
  })
}

function toString(slice: Buffer) {
  let end = slice.indexOf(Buffer.from([0, 0]));
  end = end - end % 2;
  return slice.toString(ENCODING, 0, end);
}

function readPinyins(buf: Buffer) {
  buf = buf.slice(OFFSET_PINGYIN, OFFSET_CHINESE);
  if (buf.compare(PY_MAGIC, 0, PY_MAGIC.length, 0, PY_MAGIC.length) !== 0) {
    throw new Error('PinYin Magic not match');
  }
  let pos = PY_MAGIC.length;
  const n = buf.length;
  const pinyins: ScelPinyin[] = [];
  while (pos < n) {
    const index = buf.readUInt16LE(pos);
    pos += 2;
    const len = buf.readUInt16LE(pos);
    pos += 2;

    const pinyin = buf.toString(ENCODING, pos, pos + len);
    pos += len;
    pinyins.push({index, pinyin});
  }

  return pinyins;
}

function readWords(buf: Buffer): ScelWord[] {
  buf = buf.slice(OFFSET_CHINESE);
  let pos = 0;
  const n = buf.length;

  const words: ScelWord[] = [];
  while (pos < n) {
    // 同音字
    const same = buf.readUInt16LE(pos);
    pos += 2;
    const pyLen = buf.readUInt16LE(pos) / 2;// 2 byte / uint16
    pos += 2;

    const pinyins = [];
    for (let i = 0; i < pyLen; i++) {
      pinyins.push(buf.readUInt16LE(pos));
      pos += 2
    }

    for (let i = 0; i < same; i++) {
      const wordLen = buf.readUInt16LE(pos);
      pos += 2;
      const word = buf.toString(ENCODING, pos, pos + wordLen);
      pos += wordLen;
      const extLen = buf.readUInt16LE(pos);
      pos += 2;
      // 目前不知道扩展是什么用
      // ua.slice(dvr.position, dvr.position + extLen);
      pos += extLen;

      words.push({pinyinIndex: pinyins, word})
    }
  }

  return words;
}
