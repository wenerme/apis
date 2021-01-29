export interface PhoneAttributionResponse {
  number;
  vendor;
  prefix;
  province;
  city;
  zip;
  areaCode;
}

export abstract class PhoneAttributionService {
  static service = 'me.wener.apis.phone.PhoneAttributionService';

  abstract getAttribution(options: { number }): Promise<PhoneAttributionResponse>;
}
