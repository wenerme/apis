import { createApisConnectionFactory } from 'src/db/apis';
import { PhoneDataIndexEntity, PhoneDataRecordEntity } from './schema';

export const createPhoneDataConnection = createApisConnectionFactory({
  name: 'phonedata',
  entities: [PhoneDataIndexEntity, PhoneDataRecordEntity],
});
