import { NextApiRequest, NextApiResponse } from 'next';
import { flow } from 'lodash';
import { handleErrors } from 'libs/nexts/middlewares/errors';
import { PersistPeerService } from 'libs/webrtc/persist/PersistPeerService';
import { createRtcPeerConnection } from 'libs/webrtc/persist/connection';
import { ScelDataService } from 'libs/sougou/dict/ScelDataService';
import { PingService } from '@wener/tinyrpc/src/services/PingService';
import { GlobalRegistry } from '@wener/tinyrpc/src/global';
import { createServiceDefinition } from '@wener/tinyrpc/src/ServiceRegistry';
import { ServiceInvocation } from '@wener/tinyrpc/src/types';

let _init = false;

async function registryServices() {
  if (_init) {
    return;
  }
  {
    GlobalRegistry.provide(
      createServiceDefinition({
        name: 'PingService',
        target: PingService.instance,
      })
    );
  }
  {
    const svc = new PersistPeerService();
    svc.em = (await createRtcPeerConnection()).manager;
    GlobalRegistry.provide(
      createServiceDefinition({
        name: 'PeerService',
        target: svc,
        includes: svc.methods,
      })
    );
  }
  {
    GlobalRegistry.provide(
      createServiceDefinition({
        name: 'ScelDataService',
        target: new ScelDataService(),
        prototype: ScelDataService.prototype,
        provider: () => {
          return new ScelDataService();
        },
      })
    );
  }
  _init = true;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await registryServices();
  const registry = GlobalRegistry;

  let invocation: ServiceInvocation;
  if (typeof req.body === 'string') {
    invocation = JSON.parse(req.body);
  } else {
    invocation = req.body;
  }

  const response = await registry.invoke(invocation);
  res.status(200).json(response);
};

export default flow([handleErrors()])(handler);
