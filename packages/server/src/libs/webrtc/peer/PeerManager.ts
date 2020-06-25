import { PeerData, PeerService, PeerSessionData } from './PeerService';
import { clearAsyncInterval, setAsyncInterval } from '@wener/utils';
import { PeerSession } from './PeerSession';
import { BehaviorSubject } from 'rxjs';

export interface PeerManagerInit {
  id?: string;
  name?: string;
}

export class PeerManager {
  data = new BehaviorSubject<PeerData>({});
  sessions: Record<string, PeerSession> = {};
  service: PeerService;
  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          // 'stun:67.216.195.122',
          'stun:111.231.102.99',
        ],
      },
    ],
  };
  private sessionPollId;

  get id() {
    return this.currentData.id;
  }

  get name() {
    return this.currentData.name;
  }

  get currentData() {
    return this.data.value;
  }

  constructor(options: PeerManagerInit = {}) {
    Object.assign(this, options);
  }

  close() {
    clearAsyncInterval(this.sessionPollId);
  }

  async init() {
    const { service } = this;
    let store = {};
    try {
      store = localStorage;
    } catch (e) {
      //
    }
    this.data.next(
      await service.registerPeer({
        id: store['peerId'],
        name: store['peerName'],
      }),
    );
    store['peerId'] = this.id;
    store['peerName'] = this.name;

    let updatedAt: any = 0;
    this.sessionPollId = setAsyncInterval(
      async () => {
        const all = await service.pollInitialSessions({
          calleeId: this.id,
          updatedAt,
        });
        console.debug(`PEER [${this.id}] [${updatedAt}] polling initial session`, all);

        if (all.length) {
          updatedAt = all.map((v) => v.updatedAt).sort((a, b) => (a > b ? -1 : 1))?.[0] ?? updatedAt;
        }
        all.forEach((v) => this.handleSession(v));
      },
      8000,
      1000,
    );

    return this;
  }

  async handleSession(data: PeerSessionData) {
    if (data.id in this.sessions) {
      console.warn(`ignore duplicated session ${data.id}`);
      return;
    }
    console.log(`handle session`, data);
    const session = (this.sessions[data.id] = await this.createSession());
    await session.init(data);
    session.answer();
  }

  async createSession(): Promise<PeerSession> {
    const session = new PeerSession();
    session.manager = this;
    session.localId = this.id;
    return session;
  }

  async createInviteSession(invite: { id: string }): Promise<PeerSession> {
    const { id: calleeId } = invite;
    const { service, id: callerId } = this;

    const data = await service.createSession({ calleeId, callerId });
    const session = (this.sessions[data.id] = this.sessions[data.id] ?? (await this.createSession()));

    await session.init(data);
    return session;
  }
}
