import { fetchGatewayChecker } from 'libs/ipfs/gateway/checker';
import { isDev } from 'utils/utils';
import { getGlobalThis } from 'utils/getGlobalThis';
import { urljoin } from 'utils/urljoin';

export function detectingDummyFastestGateway(gateways: string[]): Promise<string> {
  return firstSuccessResolve(gateways.map((gw) => fetchGatewayChecker(gw))) as any;
}

function firstSuccessResolve(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    Promise.all(promises.map((promise) => promise.then(resolve).catch((e) => errors.push(e)))).finally(() =>
      reject(errors)
    );
  });
}

export function buildIpfsUrl(gateway, hash, ...path) {
  gateway = gateway || getPreferIpfsGateway();
  return urljoin(gateway.replace(':hash', hash), ...path);
}

export function setPreferIpfsGateway(gateway) {
  if (getGlobalThis()?.localStorage) {
    getGlobalThis().localStorage['IPFS_PREFER_GW'] = gateway;
  } else {
    getGlobalThis()['IPFS_PREFER_GW'] = gateway;
  }
}

export function getPreferIpfsGateway() {
  // localStorage['IPFS_PREFER_GW'].replace(':hash','111')
  let gw =
    getGlobalThis()?.localStorage?.['IPFS_PREFER_GW'] ??
    getGlobalThis()?.['IPFS_PREFER_GW'] ??
    process.env.IPFS_PREFER_GW;
  gw = gw || (isDev() ? 'http://127.0.0.1:8080/ipfs/:hash' : 'https://ipfs.io/ipfs/:hash');

  return gw;
}
