import axios, { AxiosResponse } from 'axios';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

/*
ts-node --project ./tsconfig.ts-node.json ./scripts/kong-lego.ts
 */
async function main() {
  const API = process.env.KONG_ADMIN_API || 'http://127.0.0.1:8002';
  const homedir = require('os').homedir();
  const LEGO_CERTS_PATH = process.env.LEGO_CERTS_PATH || `${homedir}/.certs/lego/.lego/certificates`;

  const {
    data: { data: certs },
  } = await axios.get(`${API}/certificates?tags=lego`);

  certs.forEach((v) => {
    v.domains = v.tags
      .filter((v) => !v.startsWith('lego'))
      .map((v) => {
        // normalize
        return v.replace(/^_[.]/, '*.');
      });
    v.legoOptions = Object.fromEntries(
      v.tags
        .filter((v) => v.startsWith('lego.'))
        .map((v) => v.substring(5))
        .map((v) => v.split('~'))
    );
  });
  const byDomain = certs.reduce((o, v) => {
    v.domains.forEach((vv) => (o[vv] = v));
    return o;
  }, {});

  console.log(`Found ${certs.length} lego certs`);
  certs.forEach((v) => {
    console.log(`${v.id} - ${v.domains.join(',')} -  ${JSON.stringify(v.legoOptions)}`);
  });

  const files = glob.sync(`${LEGO_CERTS_PATH}/*.json`);

  // read data
  const certDataByDomain: Record<string, { domain; crt; key }> = {};
  for (const metaFile of files) {
    const meta = JSON.parse(fs.readFileSync(metaFile).toString());
    const domain = meta.domain;
    try {
      meta.crt = fs.readFileSync(path.join(LEGO_CERTS_PATH, `${domain}.crt`)).toString();
      meta.key = fs.readFileSync(path.join(LEGO_CERTS_PATH, `${domain}.key`)).toString();

      certDataByDomain[domain] = meta;
    } catch (e) {
      console.error(`failed to read cert data: ${domain}`, e);
    }
  }

  // sync
  for (const cert of Object.values(certDataByDomain)) {
    const { domain, crt, key } = cert;
    const entity = byDomain[domain];
    if (!entity) {
      console.info(`found new cert ${domain}`);
      try {
        const { id } = await resultOf(
          axios.post(`${API}/certificates`, {
            cert: crt,
            key,
            tags: ['lego', domain],
          })
        );

        console.info(`create cert ${domain} - ${id}`);
      } catch (e) {
        console.error(`failed to create new cert entity ${e.message || e}`);
      }
    } else if (crt !== entity.cert && key !== entity.key) {
      console.info(`update cert  ${domain} - ${entity.id}`);

      try {
        await resultOf(
          axios.post(`${API}/certificates/${entity.id}`, {
            cert: crt,
            key,
            tags: entity.tags,
          })
        );

        console.info(`update cert entity ${domain} - ${entity.id}`);
      } catch (e) {
        console.error(`failed to update cert entity ${e.message || e}`);
      }
    } else {
      console.info(`ignore same cert  ${domain} - ${entity.id}`);
    }
  }
}

(async function run() {
  await main();
})();

async function resultOf<T = any>(r: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const res = await r;
    return res.data;
  } catch (e) {
    const res = e.response?.data;
    if (!res) {
      throw e;
    }
    throw res;
  }
}
