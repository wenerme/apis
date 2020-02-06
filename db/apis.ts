import {Connection} from 'typeorm/connection/Connection';
import {createConnection} from 'typeorm';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {BaseConnectionOptions} from 'typeorm/connection/BaseConnectionOptions';

export function createApisConnectionFactory(options: { name } & Partial<BaseConnectionOptions>): () => Connection | Promise<Connection> {
  let _connection: Connection;
  return () => {
    if (_connection) {
      return _connection;
    }
    return createConnection({
      type: 'postgres',
      url: process.env.APIS_DB_URL,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      ...(options as any),
      // logging: true,
    }).then(v => _connection = v);
  }
}
