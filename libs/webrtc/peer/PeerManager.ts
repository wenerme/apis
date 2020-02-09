import {PeerData, PeerService, PeerSessionData} from 'libs/webrtc/peer/PeerService';
import {clearAsyncInterval, setAsyncInterval} from 'utils/promises';
import {PeerSession} from 'libs/webrtc/peer/PeerSession';

export interface PeerManagerInit {
  id?: string;
  name?: string;
}

export class PeerManager {
  id: string;
  name: string;
  data: PeerData;
  sessions: Record<string, PeerSession> = {};
  service: PeerService;
  configuration: RTCConfiguration = {
    iceServers: [{
      urls: [
        // 'stun:67.216.195.122',
        'stun:111.231.102.99',
      ]
    }]
  };
  private sessionPollId;

  constructor(options: PeerManagerInit = {}) {
    Object.assign(this, options);
  }

  close() {
    clearAsyncInterval(this.sessionPollId);
  }

  async init() {
    const {service} = this;
    this.id = globalThis?.sessionStorage?.store?.['peerId'];
    this.data = await service.registerPeer({id: this.id, name: this.name});
    this.id = this.data.id;
    this.name = this.data.name;
    (globalThis?.sessionStorage ?? {})['peerId'] = this.id;

    let updatedAt: any = 0;
    this.sessionPollId = setAsyncInterval(async () => {
      const all = await service.pollInitialSessions({calleeId: this.id, updatedAt});
      console.debug(`PEER [${this.id}] polling initial session`, all);

      all.forEach(v => this.handleSession(v));
      if (all.length) {
        updatedAt = all.map(v => v.updatedAt).sort((a, b) => a > b ? -1 : 1)?.[0]
      }
    }, 8000, 1000);

    return this
  }

  async handleSession(data: PeerSessionData) {
    if (data.id in this.sessions) {
      console.warn(`ignore duplicated session ${data.id}`);
      return
    }
    console.log(`handle session`);
    const session = this.sessions[data.id] = await this.createSession();
    await session.init(data);
    session.answer();
  }

  async createSession(): Promise<PeerSession> {
    const session = new PeerSession();
    session.manager = this;
    session.localId = this.id;
    return session
  }

  async createInviteSession(invite: { id: string }): Promise<PeerSession> {
    const {id: calleeId} = invite;
    const {service, id: callerId} = this;

    const data = await service.createSession({calleeId, callerId});
    const session = this.sessions[data.id] = this.sessions[data.id] ?? await this.createSession();

    await session.init(data);
    return session
  }
}

