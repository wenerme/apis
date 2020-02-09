import {BehaviorSubject} from 'rxjs';
import {PeerSessionData} from 'libs/webrtc/peer/PeerService';
import {getCandidates, getPeerConnectionState, PeerConnectionState} from 'libs/webrtc/utils/rtcs';
import {clearAsyncInterval, createLazyPromise, setAsyncInterval} from 'utils/promises';
import produce from 'immer';
import {isFunction} from 'lodash';
import {promiseOfSubject} from 'utils/rxjsx';
import {PeerManager} from 'libs/webrtc/peer/PeerManager';

export interface PeerSessionInitialState {
  state: string

  caller: PeerInitialState
  callee: PeerInitialState

  error?
}

export interface PeerInitialState {
  descriptor?: RTCSessionDescriptionInit
  candidates?: RTCIceCandidateInit[]
}

export class PeerSession {
  id: string;
  localId: string;

  manager: PeerManager;

  connection: RTCPeerConnection;
  meta: RTCDataChannel;

  offerOptions: RTCOfferOptions = {};

  data = new BehaviorSubject<PeerSessionData>(null);
  connectionState = new BehaviorSubject<PeerConnectionState>(null);

  private pollSessionUpdateId;

  get currentState(): PeerSessionInitialState {
    return this.data.getValue().data;
  }

  get currentData(): PeerSessionData {
    return this.data.getValue();
  }

  close() {
    clearAsyncInterval(this.pollSessionUpdateId);
  }

  async updateState(updater: (s: PeerSessionInitialState) => void) {
    const neo = produce(this.currentState, updater);
    if (this.currentState === neo) {
      this.log('log', 'ignore update state');
      return
    }
    this.log(`[${+this.currentData?.updatedAt}] update state`, this.currentState, neo);
    await this.manager.service.updateSession({id: this.id, data: neo, state: neo.state});
  }

  updatePeerConnectionState = (updater?) => {
    const neo = produce<PeerConnectionState>(this.connectionState.value ?? getPeerConnectionState(this.connection), s => {
      Object.assign(s, getPeerConnectionState(this.connection));

      s.metaChannelState = this.meta?.readyState;
      if (isFunction(updater)) {
        updater(s);
      }
    }) as PeerConnectionState;

    if (this.connectionState.value === neo) {
      return
    }
    this.connectionState.next(neo)
  };


  async init(data: PeerSessionData) {
    this.id = data.id;
    this.data.next(data);

    const {log} = this;

    log('init', data);

    const {id} = data;
    const {manager: {service}} = this;
    this.pollSessionUpdateId = setAsyncInterval(async () => {
      if (this.meta?.readyState === 'open') {
        // ignore
        return
      }
      const session = await service.pullSession({
        id,
        updateAt: this.currentData.updatedAt,
      });
      log('debug', `[${+this.currentData.updatedAt}] polling session update`, session);
      if (session?.data) {
        this.data.next(session);
      }
    }, 5000, 1000);

    this.connectionState.subscribe(v => {
      log('debug', 'state change', v)
    })
  }

  async createConnection() {
    const conn = new RTCPeerConnection(this.manager.configuration);

    conn.addEventListener('connectionstatechange', this.updatePeerConnectionState);
    conn.addEventListener('icegatheringstatechange', this.updatePeerConnectionState);
    conn.addEventListener('signalingstatechange', this.updatePeerConnectionState);

    conn.addEventListener('negotiationneeded', this.updatePeerConnectionState);

    return conn;
  }

  async invite() {
    const log = this.log;

    log('info', `inviting ${this.currentData.calleeId}`);
    // const {connection: conn} = this;
    const conn = this.connection = await this.createConnection();

    this.handleMetaChannel(conn.createDataChannel(`meta/${this.id}`, {ordered: true}));

    const offer = await conn.createOffer(this.offerOptions);
    const candidatesPromise = getCandidates(conn);
    {
      conn.addEventListener('icecandidateerror', e => {
        log('warn', `candidate error ${e.errorCode}:${e.errorText}`);
      })
    }
    await conn.setLocalDescription(offer);
    log('info', 'offer');
    log('debug', 'offer detail', offer);

    log('info', 'waiting candidates');
    const candidates = await candidatesPromise;
    log('info', 'offer complete candidates');

    this.updateState(s => {
      s.state = 'offer';
      s.caller = s.caller ?? {};
      s.caller.descriptor = offer;
      s.caller.candidates = candidates
    });

    log('info', 'waiting answer');
    await this.promiseOf(v => v.state === 'answer');
    log('info', 'got answer');
    log('debug', 'got answer detail', this.currentState.callee);

    await conn.setRemoteDescription(this.currentState.callee.descriptor);
    for (const candidate of this.currentState.callee.candidates ?? []) {
      await conn.addIceCandidate(candidate);
    }
    log('info', 'waiting meta channel open', this.meta.readyState);
    await this.promiseOfConnection(s => s.metaChannelState === 'open');
    log('info', 'meta channel opened');
    this.meta.send(JSON.stringify({type: 'ping', message: `hello from ${this.localId}`}));
    log('info', 'waiting meta pong');
    await this.promiseOfConnection(s => s.metaChannelPing > 0);
    log('info', 'connected');
    this.updateState(s => {
      s.state = 'connected'
    })
  }

  handleMetaChannel = (channel: RTCDataChannel) => {
    this.meta = channel;

    channel.binaryType = 'arraybuffer';

    channel.addEventListener('message', this.handleMetaMessage);
    channel.addEventListener('close', this.updatePeerConnectionState);
    channel.addEventListener('error', this.updatePeerConnectionState);
    channel.addEventListener('open', this.updatePeerConnectionState);
  };

  handleMetaMessage = async (e: MessageEvent) => {
    this.log('debug', 'meta message', e);
    const body = JSON.parse(e.data);


    if (body.type === 'ping') {
      this.meta.send(JSON.stringify({type: 'pong', message: `hello from ${this.localId}`}))
    }
    if (['ping', 'pong'].includes(body.type)) {
      this.updatePeerConnectionState(s => {
        s.metaChannelPing = Date.now()
      })
    }
  };

  async answer() {
    const log = this.log;
    log('info', 'accept session');

    const conn = this.connection = await this.createConnection();
    conn.addEventListener('datachannel', e => {
      log('info', 'got datachannel', e.channel.label);
      if (e.channel.label === 'meta/' + this.id) {
        this.handleMetaChannel(e.channel)
      }
    });

    log('info', 'waiting offer');
    await this.promiseOf(s => s.state === 'offer');
    log('info', 'got offer');
    log('debug', 'got offer detail', this.currentState.caller);

    await conn.setRemoteDescription(this.currentState.caller.descriptor);
    for (const candidate of this.currentState.caller.candidates ?? []) {
      await conn.addIceCandidate(candidate);
    }

    const answer = await conn.createAnswer(this.offerOptions);
    conn.setLocalDescription(answer);
    const candidates = await getCandidates(conn);
    log('info', 'answer');
    this.updateState(s => {
      s.state = 'answer';
      s.callee = s.callee ?? {};
      s.callee.descriptor = answer;
      s.callee.candidates = candidates;
    });

    log('info', 'waiting meta channel');
    await this.promiseOfConnection(s => s.metaChannelState === 'open');
    log('info', 'meta channel opened');

    log('info', 'waiting meta ping');
    await this.promiseOfConnection(s => s.metaChannelPing > 0);
    log('info', 'connected');
  }

  async promiseOfConnection(s: (state: PeerConnectionState) => boolean): Promise<PeerConnectionState> {
    return promiseOfSubject(this.connectionState, s);
  }

  async promiseOf(s: (state: PeerSessionInitialState) => boolean): Promise<PeerSessionInitialState> {
    const promise = createLazyPromise();
    const subscription = this.data.subscribe(v => {
      let r: boolean;
      try {
        r = s(v?.data ?? {});
      } catch (e) {
        promise.reject(e);
        return
      }
      if (r) {
        promise.resolve(v.data)
      }
    });
    return promise
      .finally(() => {
        subscription.unsubscribe();
      })
  }

  log = (level, ...args) => {
    const prefix = `SESSION [${this.currentData?.id}/${this.localId}/${this.manager.name}]`;
    if (['warn', 'info', 'log', 'error', 'trace', 'debug'].includes(level)) {
      console[level](prefix, ...args);
    } else {
      console.log(prefix, level, ...args)
    }
  }
}
