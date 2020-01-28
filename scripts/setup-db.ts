import {parsePhoneData} from 'libs/phonedata/parser';
import {fetchPhoneData} from 'libs/phonedata/source';
import {createDatabaseConnection} from 'db/connection';
import {savePhoneData} from 'libs/phonedata/persist';


async function main() {
  const buffer = await fetchPhoneData();
  const data = parsePhoneData(buffer);

  const db = await createDatabaseConnection();
  await savePhoneData(db.manager, data);
}

(async function run() {
  await main();
})();
