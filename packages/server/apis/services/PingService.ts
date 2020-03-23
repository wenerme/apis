export class PingService {
  static instance = new PingService();

  async ping() {
    return 'PONG';
  }

  async hello(name = 'wener') {
    return `Hello ${name} !`;
  }

  async echo(body) {
    return body;
  }
}
