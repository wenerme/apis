
export class PingService {
  static service = 'me.wener.apis.PingService';
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
