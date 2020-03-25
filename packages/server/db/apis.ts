import { Connection } from 'typeorm/connection/Connection';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';
import { format } from 'date-fns';
import { isDev } from '@wener/utils/src/envs/isDev';

export function createApisConnectionFactory(
  options: { name } & Partial<BaseConnectionOptions>
): () => Connection | Promise<Connection> {
  let _connection: Connection;
  return () => {
    if (!isDev() && _connection) {
      return _connection;
    }
    const { name: rawName, ...opts } = options;
    let name = rawName;
    if (isDev()) {
      name = `${name}-${format(new Date(), 'yyyyMMddHHmmss')}`;
    }
    console.log(`create connection ${name}`);

    return createConnection({
      type: 'postgres',
      url: process.env.APIS_DB_URL,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      // logging: true,

      //
      name,
      ...(opts as any),
    }).then((v) => (_connection = v));
  };
}
