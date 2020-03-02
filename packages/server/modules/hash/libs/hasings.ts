import {createHash} from 'crypto';
import {HashingRequest, HashingResponse} from 'modules/hash/types';

export function hashing({algorithm, content, encoding}: HashingRequest): HashingResponse {
  const digest = createHash(algorithm).update(content).digest(encoding as any);
  return {digest, algorithm, encoding}
}
