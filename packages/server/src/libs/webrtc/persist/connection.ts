import { createApisConnectionFactory } from 'src/db/apis';
import { RtcPeerEntity, RtcPeerSessionEntity } from './schema';

export const createRtcPeerConnection = createApisConnectionFactory({
  name: 'rtc',
  entities: [RtcPeerEntity, RtcPeerSessionEntity],
});
