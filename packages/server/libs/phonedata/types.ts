export interface PhoneData {
  version: string
  records: PhoneDataRecord[]
  indexes: PhoneDataIndex[]
}

export interface PhoneDataIndex {
  prefix: number
  offset?: number
  recordOffset: number
  vendor: string
  vendorType: number
}

export interface PhoneDataRecord {
  province: string
  city: string
  zip: string
  code: string
  offset?: number
}

export const vendors = [
  '未知',
  '移动', // 1
  '联通', // 2
  '电信', // 3
  '电信虚拟运营商', // 4
  '联通虚拟运营商', // 5
  '移动虚拟运营商' // 6
];
