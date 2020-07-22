import { ServiceNameAttribute } from 'src/modules/service/interfaces';

export class PingService {
  static [ServiceNameAttribute] = 'me.wener.test.PingService';
  static instance = new PingService();

  async ping() {
    return 'PONG';
  }

  async hello(name: string) {
    return `Hello ${name} !`;
  }

  async echo(body: any) {
    return body;
  }

  async now() {
    return Date.now();
  }
}
