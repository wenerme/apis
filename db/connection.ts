import {createConnection} from 'typeorm';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies'
import {Connection} from 'typeorm/connection/Connection';
import {PhoneDataIndexEntity, PhoneDataRecordEntity} from 'libs/phonedata/schema';
import {SqlAr} from './entity/SqlAr';
// tell zeit/now include sqlite
import 'sqlite3'

let _connection: Connection;

export function createDatabaseConnection() {
  if (_connection) {
    return _connection;
  }
  return createConnection({
    type: 'sqlite',
    database: '/tmp/wener-apis-db.sqlite',
    entities: [
      //
      PhoneDataIndexEntity,
      PhoneDataRecordEntity,
      //
      SqlAr,
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    // logging: true,
  }).then(v => _connection = v);
}
