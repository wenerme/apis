import { ScelDirectoryIpfsHash } from '../../libs/sougou/dict/ScelDataService';
import { PublicGateways } from '../../libs/ipfs/gateway/gateways';
import fs from 'fs';
import { buildIpfsUrl, detectingDummyFastestGateway } from '../../libs/ipfs/gateway/selector';
import unfetch from 'isomorphic-unfetch';
import { lineInFile } from './utils';

async function main() {
  console.log(`Use Scel IPFS HASH ${ScelDirectoryIpfsHash}`);
  const gateway = await detectingDummyFastestGateway(PublicGateways.filter((v) => !v.includes('//:hash')));
  console.log(`Found fastest gateway ${gateway}`);

  lineInFile({
    line: `IPFS_PREFER_GW=${gateway}`,
    regex: /IPFS_PREFER_GW=/,
    file: '.env',
  });

  fs.writeFileSync(
    'public/data/scel/index.csv',
    await unfetch(buildIpfsUrl(gateway, ScelDirectoryIpfsHash, 'index.csv')).then((v) => v.text())
  );
  fs.writeFileSync(
    'public/data/scel/index.full.json',
    JSON.stringify(
      Object.assign(
        await unfetch(buildIpfsUrl(gateway, ScelDirectoryIpfsHash, 'index.full.json')).then((v) => v.json()),
        { hash: ScelDirectoryIpfsHash }
      )
    )
  );
}

(async function run() {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(`Failed main`, e);
    process.exit(1);
  }
})();
