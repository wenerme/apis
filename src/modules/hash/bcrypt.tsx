export function parseBcrypt(raw?: string) {
  /*
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
\__/\/ \____________________/\_____________________________/
 Alg Cost      Salt                        Hash
   */
  const result = {
    raw,
    valid: false,
    algorithm: '',
    costFactor: 0,
    rounds: 0,
    salt: '',
    hash: '',
  };
  if (!raw) {
    return result;
  }
  const s = raw.split('$');
  result.algorithm = s[1];
  result.costFactor = parseInt(s[2], 10);
  result.rounds = Math.pow(2, result.costFactor);
  result.salt = (s[3] || '').substr(0, 22);
  result.hash = (s[3] || '').substr(22);
  result.valid = result.algorithm && result.costFactor && result.salt.length === 22 && result.hash.length === 31;
  return result;
}
