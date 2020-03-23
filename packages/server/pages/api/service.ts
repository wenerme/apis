import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceInvocation } from 'apis/services/types';
import { flow } from 'lodash';
import { handleErrors } from 'libs/nexts/middlewares/errors';
import { GlobalRegistry } from 'apis/services/global';
import { PersistPeerService } from 'libs/webrtc/persist/PersistPeerService';
import { createRtcPeerConnection } from 'libs/webrtc/persist/connection';
import { createServiceDefinition } from 'apis/services/ServiceRegistry';
import { PingService } from 'apis/services/PingService';
import { ScelDataService } from 'libs/sougou/dict/ScelDataService';

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
