import {parsePhoneData} from 'libs/phonedata/parser';
import {fetchPhoneData} from 'libs/phonedata/source';
import {savePhoneData} from 'libs/phonedata/persist';
import {createPhoneDataConnection} from 'libs/phonedata/connection';


async function main() {
  const buffer = await fetchPhoneData();
  const data = parsePhoneData(buffer);

  const db = await createPhoneDataConnection();
  await savePhoneData(db.manager, data);
}

(async function run() {
  await main();
})();
