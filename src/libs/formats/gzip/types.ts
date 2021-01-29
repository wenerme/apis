/**
 * @see http://www.onicos.com/staff/iz/formats/gzip.html
 * @see https://tools.ietf.org/html/rfc1952.html
 */
export interface GzipHeader {
  compressionMethod: number;
  flags: number;
  mtime: number;

  /// XFL = 2 - compressor used maximum compression, slowest algorithm
  ///
  /// XFL = 4 - compressor used fastest algorithm
  extraFlags: number;
  osType: number;

  crc32: number;
  inputSize: number;

  extraField?;
  name?: string;
  comment?: string;
  crc16?: number;
}

export enum Flag {
  TEXT = 1 << 0,
  HCRC = 1 << 1,
  EXTRA = 1 << 2,
  NAME = 1 << 3,
  COMMENT = 1 << 4,
  ENCRYPTED = 1 << 5,
}
