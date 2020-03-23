import { NextApiRequest, NextApiResponse } from 'next';
import { handleErrors } from 'libs/nexts/middlewares/errors';
import { flow, sortedIndexBy } from 'lodash';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import { ScelCompactIndex } from 'libs/sougou/dict/ScelDataService';

const index: ScelCompactIndex = require('public/data/scel/index.full.json');

export function findMetadataFromIndex({ id, version }) {
  if (!id) {
    throw new ApiError(400, 'query failed');
  }
  id = Number(id);
  version = Number(version ?? 0);

  const { fields, rows } = index;

  const indexOfId = fields.indexOf('id');
  const indexOfVersion = fields.indexOf('version');

  const match = new Array(fields.length);
  match[indexOfId] = id;
  match[indexOfVersion] = version;

  const i = sortedIndexBy(rows, match, (v) => v[indexOfId]) ?? -1;
  const row = rows[i];
  if (!row || row[indexOfId] !== id) {
    throw new ApiError(404, `dict not found ${id} v${version}`);
  }

  return Object.fromEntries(row.map((v, i) => [fields[i], v]));
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, version } = req.query as any;
  res.status(200).json(findMetadataFromIndex({ id, version }));
};

export default flow([handleErrors()])(handler);
