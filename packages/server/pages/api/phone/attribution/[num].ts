import { NextApiRequest, NextApiResponse } from 'next';
import { PhoneData } from 'libs/phonedata/types';
import { fetchPhoneData } from 'libs/phonedata/source';
import { parsePhoneData, searchByPhoneNumber } from 'libs/phonedata/parser';

let _phoneData;

async function buildPhoneData(): Promise<PhoneData> {
  if (_phoneData) {
    return _phoneData;
  }
  const buffer = await fetchPhoneData();
  return (_phoneData = parsePhoneData(buffer));
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { num } = req.query;

  res.setHeader('Cache-Control', 'public, max-age=86400');
  try {
    const n = num + '';
    if (!/^[0-9]+$/.test(n)) {
      res.status(400).json({ code: 400, message: `错误的号码格式: '${n}'` });
      return;
    }
    const { index, record } = await searchByPhoneNumber(await buildPhoneData(), n);
    if (!index) {
      res.status(404).json({ code: 404, message: '未能找到匹配的号码归属' });
      return;
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
    res.json({ message: e.message });
  }
};
