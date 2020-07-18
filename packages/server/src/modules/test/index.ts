import { camelCase } from 'lodash';

export interface TestService {
  camel(s: string): string;
}

console.log('Load test module');
export const camel = camelCase;
