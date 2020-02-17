import {ScelIpfsHash} from 'libs/sougou/dict/ScelDataService';
import {PublicGateways} from 'libs/ipfs/gateway/gateways';
import fs from 'fs'
import {detectingDummyFastestGateway} from 'libs/ipfs/gateway/selector';

async function main() {
  console.log(`Use Scel IPFS HASH ${ScelIpfsHash}`);
  const gateway = await detectingDummyFastestGateway(PublicGateways);
  console.log(`Found fastest gateway ${gateway}`);

  lineInFile({
    line: `IPFS_PREFER_GW=${gateway}`,
    regex: /IPFS_PREFER_GW=/,
    file: '.env'
  })

}

function lineInFile({line, regex, file}) {
  let content = '';
  if (fs.existsSync(file)) {
    content = fs.readFileSync(file).toString().trimEnd()
  }
  let done = false;
  const lines = content.split('\n')
    .map(v => {
      if (regex.test(v)) {
        done = true;
        return line
      }
      return v
    });

  if (!done) {
    lines.push(line);
  }

  lines.push('');

  const neo = lines.join('\n');
  if (neo !== content) {
    fs.writeFileSync(file, neo)
  }
}

(async function run() {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(`Failed main`, e);
    process.exit(1)
  }
})();
