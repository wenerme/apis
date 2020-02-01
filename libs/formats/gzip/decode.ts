import {Flag, GzipHeader} from './types';

export function parseGzipHeader(buf: Buffer): GzipHeader {
  if (buf.readUInt16BE(0) !== 0x1f8b) {
    throw new Error(`Invalid magic header}`);
  }

  const flags = buf.readUInt8(3);
  const header: GzipHeader = {
    compressionMethod: buf.readUInt8(2),
    flags,
    mtime: buf.readInt32LE(4),
    extraFlags: buf.readUInt8(8),
    osType: buf.readUInt8(9),

    crc32: buf.readUInt32LE(buf.length - 8),
    inputSize: buf.readUInt32LE(buf.length - 4)
  };

  let offset = 10;
  if (flags & Flag.EXTRA) {
    const xlen = buf.readUInt16LE(offset);
    header.extraField = buf.slice(offset, offset + xlen);
    offset += xlen
  }
  if (flags & Flag.NAME) {
    const idx = buf.indexOf(0, offset);
    header.name = buf.toString('utf8', offset, idx);
    offset = idx + 1;
  }
  if (flags & Flag.COMMENT) {
    const idx = buf.indexOf(0, offset);
    header.comment = buf.toString('utf8', offset, idx);
    offset = idx + 1;
  }
  if (flags & Flag.HCRC) {
    header.crc16 = buf.readUInt16LE(offset);
    offset += 2;
  }

  return header
}
