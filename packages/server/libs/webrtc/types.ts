export interface PeerConnectionState {
  connectionState: RTCPeerConnectionState;
  iceConnectionState: RTCIceConnectionState;
  iceGatheringState: RTCIceGatheringState;
  signalingState: RTCSignalingState

  sctpState?: RTCSctpTransportState
  sctpTransportState?: RTCDtlsTransportState

  idpErrorInfo?
}
