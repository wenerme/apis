import {fetchGatewayChecker} from 'libs/ipfs/gateway/checker';

export function detectingDummyFastestGateway(gateways: string[]): Promise<string> {
  return firstSuccessResolve(gateways.map(gw => fetchGatewayChecker(gw))) as any
}

function firstSuccessResolve(promises) {
  return new Promise(((resolve, reject) => {
    const errors = [];
    Promise.all(promises.map(promise => promise.then(resolve).catch(e => errors.push(e)))).finally(() => reject(errors))
  }))
}
