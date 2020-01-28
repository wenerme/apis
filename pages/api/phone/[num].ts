// import {NowRequest, NowResponse} from '@now/node'
// import {createDatabaseConnection} from '../../../../db/connection';
// import {findByPhoneNumber} from 'libs/phonedata/persist';
//
// export default async (req: NowRequest, res: NowResponse) => {
//   const db = await createDatabaseConnection();
//   const {index, record} = await findByPhoneNumber(db.manager, req.query.number + '');
//   res.status(200).json({record});
// }


import {NextApiRequest, NextApiResponse} from 'next'
import {createDatabaseConnection} from '../../../db/connection';
import {findByPhoneNumber} from 'libs/phonedata/persist';

// API 文件模板

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {num} = req.query;

  try {
    const db = await createDatabaseConnection();
    const {index, record} = await findByPhoneNumber(db.manager, num + '');
    res.status(200).json({
      number: num,

      vendor: index.vendor,
      prefix: index.prefix,

      province: record.province,
      city: record.city,
      zip: record.zip,
      areaCode: record.code,
    });
  } catch (e) {
    console.error(`Failed ${num}`, e);
    res.json({message: e.message});
  }
}
