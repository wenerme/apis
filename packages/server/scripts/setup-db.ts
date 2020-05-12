import { parsePhoneData } from '../src/libs/phonedata/parser';
import { fetchPhoneData } from '../src/libs/phonedata/source';
import { savePhoneData } from '../src/libs/phonedata/persist';
import { createPhoneDataConnection } from '../src/libs/phonedata/connection';

require('dotenv').config();

async function main() {
  const buffer = await fetchPhoneData();
  const data = parsePhoneData(buffer);

  const db = await createPhoneDataConnection();
  await savePhoneData(db.manager, data);
}

(async function run() {
  await main();
})();
