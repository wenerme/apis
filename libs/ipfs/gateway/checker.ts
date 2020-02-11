/**
 * https://github.com/ipfs/public-gateway-checker
 */
import produce from 'immer';

const HASH_TO_TEST = 'bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m';
const SCRIPT_HASH = 'bafybeietzsezxbgeeyrmwicylb5tpvf7yutrm3bxrfaoulaituhbi7q6yi';
const HASH_STRING = 'Hello from IPFS Gateway Checker';

export interface GatewayCheckNodeState {
  id
  index?

  startTime
  endTime?

  gateway
  hostname

  status: CheckerState,
  cors: CheckerState,
  origin: CheckerState,

  error?
}

export interface CheckerState {
  startTime?
  endTime?

  status: 'new' | 'running' | 'error' | 'success'

  error?
  result?
}

export const GlobalResolver: Record<string, (...any) => void> = {};

function checkCors({getState}) {
  const gatewayAndHash = getState().gateway.replace(':hash', HASH_TO_TEST);
  const now = Date.now();
  const testUrl = `${gatewayAndHash}?now=${now}#x-ipfs-companion-no-redirect`;

  return fetch(testUrl)
    .then((res) => res.text())
    .then((text) => {
      const matched = (HASH_STRING === text.trim());
      if (matched) {
        return true
      } else {
        throw new Error(`content not match: ${text.trim()}`)
      }
    });
}

async function checkOrigin({getState}) {
  const cidInSubdomain = getState().gateway.startsWith('https://:hash.ipfs.');
  if (cidInSubdomain) {
    return true
  } else {
    throw new Error('cid not in sub-domain - expect start with "https://:hash.ipfs."')
  }
}

export function OnScriptloaded(src) {
  try {
    const url = new URL(src);
    const index = url.searchParams.get('i');
    const resolver = GlobalResolver[index];
    if (resolver) {
      resolver()
    } else {
      console.error(`no resolver found for ${index}`);
    }
  } catch (e) {
    // this is a URL exception, we can do nothing, user is probably using Internet Explorer
    console.error(`unexpected error: ${src}`, e);
  }
}

async function checkStatus({getState}) {
  return new Promise(((resolve, reject) => {
    try {
      const gatewayAndScriptHash = getState().gateway.replace(':hash', SCRIPT_HASH);

      // we set a unused number as a url parameter, to try to prevent content caching
      // is it right ? ... do you know a better way ? ... does it always work ?
      const now = Date.now();

      // 3 important things here
      //   1) we add #x-ipfs-companion-no-redirect to the final url (self explanatory)
      //   2) we add ?filename=anyname.js as a parameter to let the gateway guess Content-Type header
      //      to be sent in headers in order to prevent CORB
      //   3) parameter 'i' is the one used to identify the gateway once the script executes
      const src = `${gatewayAndScriptHash}?i=${getState().id}&now=${now}&filename=anyname.js#x-ipfs-companion-no-redirect`;

      const script = document.createElement('script');
      script.src = src;
      document.body.append(script);
      script.onerror = (e) => {
        // we check this because the gateway could be already checked by CORS before onerror executes
        // and, even though it is failing here, we know it is UP
        reject(e?.['error'] ?? e)
      };
      script.onload = e => {
        setTimeout(() => reject('load script is invalid'), 500)
      };

      GlobalResolver[getState().id] = (v) => {
        delete GlobalResolver[getState().id];
        resolve(v)
      };
    } catch (e) {
      reject(e);
    }
  }))
}

async function check(opts: { checker, name, getState: () => GatewayCheckNodeState, onStateChange: (update: (s: GatewayCheckNodeState) => void) => void }) {
  const {onStateChange, getState} = opts;
  const {checker, name, ...passBy} = opts;

  onStateChange(s => {
    const check = s[name];

    check.startTime = Date.now();
    check.status = 'running';
  });

  try {
    let result;
    result = await checker(passBy);

    onStateChange(s => {
      const check = s[name];
      if (check.status === 'running') {
        check.status = 'success'
      }
      check.result = result;
      check.endTime = Date.now()
    })
  } catch (e) {
    // const {gateway} = getState();
    // console.error(`check failed ${gateway} - ${name}`, e);
    onStateChange(s => {
      const check = s[name];
      if (check.status === 'running') {
        check.status = 'error'
      }
      check.error = e;
      check.endTime = Date.now()
    })
  }
}

let _uid = 0;

export function compareCheckState(a: GatewayCheckNodeState, b: GatewayCheckNodeState) {
  if (a.status?.status === b.status?.status) {
    if (a.status?.status === 'success') {
      return (a.status.endTime - a.status.startTime) - (b.status.endTime - b.status.startTime)
    }

    return 0;
  }
  if (a.status?.status === 'success') {
    return -1
  }
  if (b.status?.status === 'success') {
    return 1
  }
  return 0
}

export async function checkGateways(gateways: string[], onStateChange: (s: GatewayCheckNodeState[]) => void) {
  let state = new Array(gateways.length);

  await Promise.all(
    gateways.map((v, i) =>
      checkGateway(v, s => {
        state = produce(state, (base) => {
          base[i] = s;
        });
        onStateChange(state);
      })
    )
  )
  return state;
}

export async function checkGateway(gateway, onStateChange: (s: GatewayCheckNodeState) => void) {
  let state: GatewayCheckNodeState = {
    id: _uid++,

    gateway,
    hostname: gatewayHostname(new URL(gateway.replace(':hash', HASH_TO_TEST))),

    startTime: Date.now(),
    status: {status: 'new'},
    cors: {status: 'new'},
    origin: {status: 'new'},
  };
  onStateChange(state);

  const opts = {
    getState() {
      return state;
    },
    onStateChange(update) {
      const neo = produce(state, update);
      if (neo === state) {
        return
      }
      state = neo;
      onStateChange(state);
    }
  };

  await Promise.all([
    check({...opts, name: 'status', checker: checkStatus}),
    check({...opts, name: 'cors', checker: checkCors}),
    check({...opts, name: 'origin', checker: checkOrigin}),
  ]);

  return state
}

function gatewayHostname(url) {
  if (url && url.hostname) url = url.hostname.toString();
  return url.replace(`${HASH_TO_TEST}.ipfs.`, '') // skip .ipfs. in subdomain gateways
    .replace(`${HASH_TO_TEST}.`, '') // path-based
}
