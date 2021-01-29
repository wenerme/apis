import { createHash } from 'crypto';
import { HashingRequest, HashingResponse } from '../types';
import { HashingService } from 'src/modules/client';

export function hashing({ algorithm, content, encoding }: HashingRequest): HashingResponse {
  const digest = createHash(algorithm)
    .update(content)
    .digest(encoding as any);
  return { digest, algorithm, encoding };
}

export class HashingServiceImpl implements HashingService {
  async hashing(request: HashingRequest): Promise<HashingResponse> {
    return hashing(request);
  }
}
