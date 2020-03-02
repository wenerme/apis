import {createApisConnectionFactory} from 'db/apis';
import {RtcPeerEntity, RtcPeerSessionEntity} from 'libs/webrtc/persist/schema';

export const createRtcPeerConnection = createApisConnectionFactory({
  name: 'rtc',
  entities: [
    RtcPeerEntity,
    RtcPeerSessionEntity,
  ]
});
