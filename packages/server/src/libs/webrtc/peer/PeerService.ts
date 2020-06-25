import { addMinutes } from 'date-fns';
import moment from 'moment';
import { ApiError } from 'next/dist/next-server/server/api-utils';

export interface PeerService {
  registerPeer(data: Partial<PeerData>): Promise<PeerData>;

  pollInitialSessions({ calleeId, updatedAt }): Promise<PeerSessionData[]>;

  createSession(data: Partial<PeerSessionData> & { callerId; calleeId }): Promise<PeerSessionData>;

  updateSession(data: { id; state; data }): Promise<{ id; updatedAt; expireAt }>;

  pullSession({ id, updateAt }): Promise<PeerSessionData>;
}

export interface PeerData {
  id?;
  name?;
  profile?;
  setting?;
  expireAt?;
  updatedAt?;
}

export type PeerSessionState = 'new' | 'offer' | 'answer' | 'connected' | 'error';

export interface PeerSessionData {
  id: string;

  callerId: string;
  calleeId: string;

  state: PeerSessionState;
  data;

  expireAt: Date;
  updatedAt: Date;
}

export abstract class AbstractPeerService implements PeerService {
  methods: Array<keyof PeerService> = [
    'registerPeer',
    'pollInitialSessions',
    'createSession',
    'updateSession',
    'pullSession',
  ];

  abstract savePeer(v: PeerData): Promise<PeerData>;

  abstract findPeerById(id): Promise<PeerData>;

  abstract findSessionById(id): Promise<PeerSessionData>;

  abstract saveSession(v: PeerSessionData): Promise<PeerSessionData>;

  abstract pollInitialSessions({ calleeId, updatedAt }): Promise<PeerSessionData[]>;

  async createSession(data: Partial<PeerSessionData> & { callerId; calleeId }): Promise<PeerSessionData> {
    const { callerId, calleeId } = data;

    const callee = await this.findPeerById(calleeId);
    const caller = await this.findPeerById(callerId);
    if (!callee || !caller) {
      throw new ApiError(400, '错误的会话请求');
    }

    const session = Object.assign(
      { callerId, calleeId, state: 'new', data: {} },
      {
        expireAt: addMinutes(new Date(), 5),
      },
    ) as PeerSessionData;
    return this.saveSession(session);
  }

  async pullSession({ id, updateAt }: { id: any; updateAt: any }): Promise<PeerSessionData> {
    const session = await this.findSessionById(id);
    if (!session) {
      throw Object.assign(new Error('session not found'), { status: 400 });
    }
    if (moment(session.updatedAt) > moment(updateAt)) {
      return session;
    }
    return null;
  }

  async registerPeer(data: Partial<PeerData>): Promise<PeerData> {
    let peer: PeerData;
    if (data.id) {
      peer = await this.findPeerById(data.id);
    }
    if (!peer) {
      peer = Object.assign({ profile: {}, setting: {} }, data, {
        id: undefined,
      }) as PeerData;
    }
    peer.name = peer.name ?? peer.id ?? 'noname';
    peer.updatedAt = new Date();
    peer.expireAt = addMinutes(new Date(), 5);

    return this.savePeer(peer);
  }

  async updateSession(update: PeerSessionData): Promise<{ id; updatedAt; expireAt }> {
    const session = await this.findSessionById(update.id);
    if (!session) {
      throw Object.assign(new Error('session not found'), { status: 404 });
    }

    const { state, data } = update;
    Object.assign(session, {
      state,
      data,
      updateAt: new Date(),
      expireAt: addMinutes(new Date(), 5),
    });
    const neo = await this.saveSession(session);
    const { id, updatedAt, expireAt } = neo;
    return { id, updatedAt, expireAt };
  }
}

export class MemoryPeerService extends AbstractPeerService {
  peers: Record<string, PeerData> = {};
  sessions: Record<string, PeerSessionData> = {};
  uid = 1;

  async findPeerById(id): Promise<PeerData> {
    return this.peers[id];
  }

  async findSessionById(id): Promise<PeerSessionData> {
    if (this.sessions[id]) {
      return { ...this.sessions[id] };
    }
    return null;
  }

  async pollInitialSessions({ calleeId, updatedAt }): Promise<PeerSessionData[]> {
    return Object.values(this.sessions)
      .filter((v) => v.calleeId === calleeId)
      .filter((v) => v.state === 'new' || v.state === 'offer')
      .filter((v) => {
        if (updatedAt) {
          return moment(v.updatedAt) > moment(updatedAt);
        }
        return true;
      });
  }

  async savePeer(v: PeerData): Promise<PeerData> {
    v.id = v.id || `S-${this.uid++}`;
    v.updatedAt = new Date();
    console.info('MemoryPeerService.savePeer', v);
    return (this.peers[v.id] = v);
  }

  async saveSession(v: PeerSessionData): Promise<PeerSessionData> {
    v.id = v.id || `S-${this.uid++}`;
    v.updatedAt = new Date();
    console.info(`[${+v.updatedAt}] MemoryPeerService.saveSession`, v);
    return (this.sessions[v.id] = v);
  }
}
