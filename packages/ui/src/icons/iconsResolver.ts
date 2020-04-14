import { LazyComponentType } from '../types/types';

export function iconsResolver({ type }) {
  let c: LazyComponentType | null = null;
  // @formatter:off
  // prettier-ignore
  switch (type) {
// generated:begin
    case 'BarcodePrintOutlined':c = import('./components/BarcodePrintOutlined');break;
    case 'BarcodeReadOutlined':c = import('./components/BarcodeReadOutlined');break;
    case 'BarcodeScanOutlined':c = import('./components/BarcodeScanOutlined');break;
    case 'BittorrentFilled':c = import('./components/BittorrentFilled');break;
    case 'BtFileFilled':c = import('./components/BtFileFilled');break;
    case 'CaCertificateOutlined':c = import('./components/CaCertificateOutlined');break;
    case 'CertificateVerifiedBadgeOutlined':c = import('./components/CertificateVerifiedBadgeOutlined');break;
    case 'CertificateVerifiedFilled':c = import('./components/CertificateVerifiedFilled');break;
    case 'DarkModeFilled':c = import('./components/DarkModeFilled');break;
    case 'DictOutlined':c = import('./components/DictOutlined');break;
    case 'ExternalLinkOutlined':c = import('./components/ExternalLinkOutlined');break;
    case 'HashLock':c = import('./components/HashLock');break;
    case 'IpfsOutlined':c = import('./components/IpfsOutlined');break;
    case 'KongLogo':c = import('./components/KongLogo');break;
    case 'LightModeFilled':c = import('./components/LightModeFilled');break;
    case 'MagnetOutlined':c = import('./components/MagnetOutlined');break;
    case 'ManTiedOutlined':c = import('./components/ManTiedOutlined');break;
    case 'QrcodePrintOutlined':c = import('./components/QrcodePrintOutlined');break;
    case 'QrcodeReadOutlined':c = import('./components/QrcodeReadOutlined');break;
    case 'RtcOutlined':c = import('./components/RtcOutlined');break;
    case 'TorrentFileFilled':c = import('./components/TorrentFileFilled');break;
    case 'UTorrentFilled':c = import('./components/UTorrentFilled');break;
    case 'WebTorrentFilled':c = import('./components/WebTorrentFilled');break;
    case 'WikipediaOutlined':c = import('./components/WikipediaOutlined');break;
    case 'WomenWithMicroPhoneFIlled':c = import('./components/WomenWithMicroPhoneFIlled');break;
// generated:end
    // @formatter:on
    default:
  }
  return c;
}
