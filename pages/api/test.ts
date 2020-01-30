import {NowRequest, NowResponse} from '@now/node'
import {fetchPhoneData} from 'libs/phonedata/source';
import {parsePhoneData} from 'libs/phonedata/parser';
import {createDatabaseConnection} from 'db/connection';
import {savePhoneData} from 'libs/phonedata/persist';

let _init = false;
export default async (req: NowRequest, res: NowResponse) => {
  if (!_init) {
    _init = true;
    const buffer = await fetchPhoneData();
    const data = parsePhoneData(buffer);

    const db = await createDatabaseConnection();
    await savePhoneData(db.manager, data);
  }

  res.json({name: 'John', email: 'john@example.com'})
}
