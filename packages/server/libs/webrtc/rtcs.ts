import { createLazyPromise } from 'utils/promises';
import produce from 'immer';
import { PeerConnectionState } from 'libs/webrtc/types';

export function getCandidates(conn: RTCPeerConnection): Promise<RTCIceCandidate[]> {
  const candidatesPromise = createLazyPromise();
  const candidates = [];
  const handler = (e) => {
    if (e.candidate) {
      candidates.push(e.candidate);
    }

    if (conn.iceGatheringState === 'complete') {
      candidatesPromise.resolve(candidates);
    }
  };

  conn.addEventListener('icecandidate', handler);
  conn.addEventListener('icegatheringstatechange', handler);

  candidatesPromise.finally?.(() => {
    conn.removeEventListener('icecandidate', handler);
    conn.removeEventListener('icegatheringstatechange', handler);
  });
  return candidatesPromise;
}

const ConnectionEvents = [
  'connectionstatechange',
  'datachannel',
  'icecandidate',
  'icecandidateerror',
  'iceconnectionstatechange',
  'negotiationneeded',
  'signalingstatechange',
  'statsended',
  'track',
];
export const ChannelEvents = ['bufferedamountlow', 'close', 'error', 'message', 'open'];

export function addConnectionEventLogger({ name, connection, excludes = [] }) {
  ConnectionEvents.filter((v) => !excludes.includes(v)).map((v) =>
    connection.addEventListener(v, (e) => {
      const conn = e.target as RTCPeerConnection;
      const { signalingState, iceGatheringState, iceConnectionState, connectionState } = conn;
      const { state: sctpState } = conn?.sctp ?? {};
      console.log(
        `${name} Connection EVENT ${v}`,
        {
          signalingState,
          iceGatheringState,
          iceConnectionState,
          connectionState,
          sctpState,
        },
        e.target,
        e
      );
    })
  );
}

export function addChannelEventLogger({ name, channel, excludes = [] }) {
  ChannelEvents.filter((v) => !excludes.includes(v)).map((v) =>
    channel.addEventListener(v, (e) => {
      const target = e.target as RTCDataChannel;
      const {
        id,
        label,
        readyState,
        negotiated,
        bufferedAmount,
        bufferedAmountLowThreshold,
        maxPacketLifeTime,
        maxRetransmits,
      } = target;
      console.log(
        `${name} Channel EVENT ${v}`,
        {
          id,
          label,
          readyState,
          negotiated,
          bufferedAmount,
          bufferedAmountLowThreshold,
          maxPacketLifeTime,
          maxRetransmits,
        },
        e.target,
        e
      );
    })
  );
}

export function getPeerConnectionState(conn: RTCPeerConnection): PeerConnectionState {
  const {
    connectionState,
    iceGatheringState,
    iceConnectionState,
    signalingState,

    idpErrorInfo,
  } = conn;

  return {
    connectionState,
    iceGatheringState,
    iceConnectionState,
    signalingState,

    idpErrorInfo,
    //
    sctpState: conn.sctp?.state,
    sctpTransportState: conn.sctp?.transport?.state,
  };
}

export function addPeerConnectionStateListener(
  conn: RTCPeerConnection,
  onStateChange: (s: PeerConnectionState) => void
): () => void {
  let state = getPeerConnectionState(conn);
  const handler = (e) => {
    const neo = produce(state, (s) => {
      Object.assign(s, getPeerConnectionState(conn));
    });
    if (neo !== state) {
      state = neo;
      onStateChange(state);
    }
  };
  onStateChange(state);

  const events = ['connectionstatechange', 'icegatheringstatechange', 'signalingstatechange', 'negotiationneeded'];
  events.forEach((v) => conn.addEventListener(v, handler));

  return () => {
    events.forEach((v) => conn.removeEventListener(v, handler));
  };
}
