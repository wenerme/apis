export interface HashingRequest {
  algorithm: string;
  content: string;
  encoding: string;
  format: string;
}

export interface HashingResponse {
  digest;
  algorithm?;
  encoding?;
}

export abstract class HashingService {
  static service = 'me.wener.apis.hash.HashingService';

  abstract hashing(request: HashingRequest): Promise<HashingResponse>;
}
