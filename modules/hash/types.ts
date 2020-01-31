export interface HashingRequest {
  algorithm: string
  content: string
  encoding: string
  format: string
}

export interface HashingResponse {
  digest
  algorithm?
  encoding?
}

/* openssl list -digest-algorithms
gost-mac
md_gost94
streebog256
streebog512
*/
export const HashingAlgorithms = ['md4', 'md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'whirlpool', 'ripemd160',];

export function isValidRequest(req, errors = []): req is HashingRequest {
  const {algorithm, content, encoding, format} = req;
  if (!(format in ['txt', 'json'])) {
    errors.push('错误的格式: txt, json')
  }
  if (!(algorithm in HashingAlgorithms)) {
    errors.push(`错误的哈希算法: ${HashingAlgorithms.join(', ')}`)
  }
  if (!(encoding in ['latin1', 'hex', 'base64'])) {
    errors.push('错误的编码方式: latin1, hex, base64')
  }
  return true;
}
