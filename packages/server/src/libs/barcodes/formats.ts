import { keyBy } from 'lodash';

export interface BarcodeFormat {
  name;
  label;
  alias?: string[];
}

const formats: BarcodeFormat[] = [
  { name: 'AZTEC', label: 'Aztec 2D barcode' },

  { name: 'CODABAR', label: 'CODABAR 1D' },

  { name: 'CODE_39', label: 'Code 39 1D' },
  { name: 'CODE_93', label: 'Code 93 1D' },
  { name: 'CODE_128', label: 'Code 128 1D' },
  { name: 'CODE_128_A', label: 'Code 128 A 1D' },
  { name: 'CODE_128_B', label: 'Code 128 B 1D' },
  { name: 'CODE_128_C', label: 'Code 128 C 1D' },

  { name: 'DATA_MATRIX', label: 'Data Matrix 2D barcode' },

  { name: 'EAN_2', label: 'EAN-2 1D' },
  { name: 'EAN_5', label: 'EAN-5 1D' },
  { name: 'EAN_8', label: 'EAN-8 1D' },
  { name: 'EAN_13', label: 'EAN-13 1D', alias: ['ISBN'] },

  { name: 'ITF', label: 'ITF (Interleaved Two of Five) 1D' },
  { name: 'ITF_14', label: 'ITF (Interleaved Two of Five) 14 1D' },

  { name: 'MAXICODE', label: 'MaxiCode 2D barcode' },
  { name: 'PDF_417', label: 'PDF417' },
  { name: 'QR_CODE', label: 'QR Code 2D barcode' },

  { name: 'RSS_14', label: 'RSS 14' },
  { name: 'RSS_EXPANDED', label: 'RSS EXPANDED' },

  { name: 'UPC_A', label: 'Universal Product Code/UPC-A 1D', alias: ['UPC'] },
  { name: 'UPC_E', label: 'Universal Product Code/UPC-E 1D' },
  { name: 'UPC_EAN_EXTENSION', label: 'UPC/EAN extension' },

  { name: 'MSI', label: 'MSI' },
  { name: 'MSI_10', label: 'MSI_10' },
  { name: 'MSI_11', label: 'MSI_11' },
  { name: 'MSI_1010', label: 'MSI_1010' },
  { name: 'MSI_1110', label: 'MSI_1110' },

  { name: 'PHARMACODE', label: 'Pharmaceutical Binary Code' },

  { name: 'GENERIC_BARCODE', label: 'Generic Barcode' },
];

const byName: Record<string, BarcodeFormat> = keyBy(formats, 'name');

const jsBarcodeMapping = {
  CODE39: 'CODE_39',
  CODE128: 'CODE_128',
  CODE128A: 'CODE_128_A',
  CODE128B: 'CODE_128_B',
  CODE128C: 'CODE_128_C',
  EAN13: 'EAN_13',
  EAN8: 'EAN_8',
  EAN5: 'EAN_5',
  EAN2: 'EAN_2',
  UPC: 'UPC_A',
  UPCE: 'UPC_E',
  ITF14: 'ITF_14',
  ITF: 'ITF',

  MSI: 'MSI',
  MSI10: 'MSI_10',
  MSI11: 'MSI_11',
  MSI1010: 'MSI_1010',
  MSI1110: 'MSI_1110',

  pharmacode: 'PHARMACODE',
  codabar: 'CODABAR',
  GenericBarcode: 'GENERIC_BARCODE',
};

export function getJsBarcodeFormat(v: string): BarcodeFormat {
  return byName[jsBarcodeMapping[v]];
}

const zxingMapping: Record<number, string> = Object.fromEntries(
  Object.entries({
    AZTEC: 0,
    CODABAR: 1,
    CODE_39: 2,
    CODE_93: 3,
    CODE_128: 4,
    DATA_MATRIX: 5,
    EAN_8: 6,
    EAN_13: 7,
    ITF: 8,
    MAXICODE: 9,
    PDF_417: 10,
    QR_CODE: 11,
    RSS_14: 12,
    RSS_EXPANDED: 13,
    UPC_A: 14,
    UPC_E: 15,
    UPC_EAN_EXTENSION: 16,
  }).map(([k, v]) => [v, k]),
);

export function getZxingFormat(v: number): BarcodeFormat {
  return byName[zxingMapping[v]];
}
