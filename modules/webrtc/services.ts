import {createServiceDefinition, ServiceRegistry} from 'apis/services/registry';
import {PersistPeerService} from 'libs/webrtc/persist/PersistPeerService';
import {createRtcPeerConnection} from 'libs/webrtc/persist/connection';
import {PingService} from 'apis/services/PingService';

let _registry: ServiceRegistry;

export async function createPeerServiceRegistry(): Promise<ServiceRegistry> {
  if (_registry) {
    return _registry;
  }

  const registry = _registry = new ServiceRegistry();
  {
    const svc = new PersistPeerService();
    svc.em = (await createRtcPeerConnection()).manager;
    registry.provide(createServiceDefinition(svc, {name: 'PeerService', includes: svc.methods}))
  }
  {
    registry.provide(createServiceDefinition(PingService.instance, {name: 'PingService'}))
  }
  return registry;
}
