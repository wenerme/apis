import { PhoneAttributionService } from 'src/modules/client';
import { PhoneData } from 'src/libs/phonedata/types';
import { fetchPhoneData } from 'src/libs/phonedata/source';
import { parsePhoneData, searchByPhoneNumber } from 'src/libs/phonedata/parser';
import { RequestError } from 'src/libs/nexts/middlewares/errors';
import { isDev } from '@wener/utils';

export class PhoneAttributionServiceImpl extends PhoneAttributionService {
  _phoneData: PhoneData;

  async _resolvePhoneData() {
    if (this._phoneData) {
      return this._phoneData;
    }
    const buffer = await fetchPhoneData({ checkUpdate: !isDev() });
    return (this._phoneData = parsePhoneData(buffer));
  }

  async getAttribution({ number }) {
    const n = number + '';
    if (!/^[0-9]+$/.test(n)) {
      throw new RequestError({ status: 400, message: `错误的号码格式: '${n}'` });
    }
    const { index, record } = await searchByPhoneNumber(await this._resolvePhoneData(), n);
    if (!index) {
      throw new RequestError({ status: 404, message: `未能找到匹配的号码归属: ${n}` });
    }
    return {
      number: n,

      vendor: index.vendor,
      prefix: index.prefix,

      province: record.province,
      city: record.city,
      zip: record.zip,
      areaCode: record.code,
    };
  }
}
