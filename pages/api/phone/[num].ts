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
import {findByPhoneNumber} from 'libs/phonedata/persist';
import {createPhoneDataConnection} from 'db/connection';

// API 文件模板

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {num} = req.query;

  try {
    const n = num + '';
    if (!/[^[0-9]+$/.test(n)) {
      res.status(400).json({code: 400, message: '错误的号码格式',});
      return
    }

    const db = await createPhoneDataConnection();

    const {index, record} = await findByPhoneNumber(db.manager, n);
    if (!index) {
      res.status(404).json({code: 404, message: '未能找到匹配的号码归属',});
      return
    }
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
