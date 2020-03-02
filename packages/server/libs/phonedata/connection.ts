import {createApisConnectionFactory} from 'db/apis';
import {PhoneDataIndexEntity, PhoneDataRecordEntity} from 'libs/phonedata/schema';

export const createPhoneDataConnection = createApisConnectionFactory({
  name: 'phonedata',
  entities: [
    PhoneDataIndexEntity,
    PhoneDataRecordEntity,
  ]
});
