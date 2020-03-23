import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/next-server/server/api-utils';
import { BehaviorSubject } from 'rxjs';
import { handleErrors } from 'libs/nexts/middlewares/errors';
import { flow } from 'lodash';
import { addMinutes, min } from 'date-fns';
import { applyPatches } from 'immer';
import { cors } from 'libs/nexts/middlewares/cors';
import uuidv4 from 'uuid/v4';
import { isDev } from 'utils/utils';
import { platformNotSupported } from 'server/platforms';

interface SessionInit {
  id;
}

interface SessionPeer {
  peerId;
  onClose?: (reason?) => void;
  onChange: (o: any) => void;
}

interface SessionData {
  id: string;
  data: object;
}

class Session {
  id: string;
  state: BehaviorSubject<SessionData>;
  peers: SessionPeer[] = [];
  createdAt = new Date();
  expiredAt = addMinutes(new Date(), 5);
  uid = 1;

  constructor(init: SessionInit) {
    Object.assign(this, init);
    this.touch();
    this.state = new BehaviorSubject<any>({
      id: this.id,
      data: {},
      createdAt: this.createdAt,
      expiredAt: this.expiredAt,
    });
  }

  get expired(): boolean {
    return this.expiredAt.getTime() < Date.now();
  }

  emit(body) {
    body = Object.assign(body, { id: this.id });
    let peers = this.peers;
    if (body.peerId) {
      peers = peers.filter(({ peerId }) => peerId === body.peerId);
    }
    peers.forEach(({ onChange, peerId }) => {
      try {
        onChange(body);
      } catch (e) {
        console.error(`[${this.id}]failed to send to ${peerId}`, e);
      }
    });
  }

  tick() {
    this.emit({ type: 'Keepalive' });
  }

  touch() {
    this.expiredAt = min([addMinutes(new Date(), 5), addMinutes(this.createdAt, 60)]);
  }

  put(body) {
    this.touch();
    this.state.next(Object.assign(this.state.value, { data: body, expiredAt: this.expiredAt }));
  }

  patch(body) {
    if (!Array.isArray(body)) {
      this.put(Object.assign({}, this.state.value.data, body));
      return;
    }

    const neo = applyPatches(this.state.value.data, body);
    if (this.state.value.data !== neo) {
      this.put(neo);
    } else {
      this.touch();
    }
  }

  join({ peerId = null, onChange, onClose = null }) {
    peerId = this.uid++;
    const sub = this.state.subscribe((v) => {
      onChange(Object.assign({}, v, { type: 'Data' }));
    });

    const closer = () => {
      console.log(`[${this.id}]: peer leave ${peerId}`);

      sub.unsubscribe();
      const i = this.peers.findIndex((v) => v.peerId === peerId);
      this.peers.splice(i, 1);

      onClose?.('Leave');
    };

    this.peers.push({ peerId, onClose: closer, onChange });
    console.log(`[${this.id}]: peer join ${peerId}`);
    return closer;
  }

  close(reason?) {
    this.peers.forEach(({ onClose, peerId }) => {
      try {
        onClose();
      } catch (e) {
        console.error(`failed to close ${peerId}`, e);
      }
    });
  }
}

class SessionManager {
  id = Date.now();
  sessions: Record<string, Session> = {};
  tickTimeout: NodeJS.Timeout;
  shouldDispose?: (v) => boolean;

  constructor() {
    this.tick();
  }

  async getSession(id): Promise<Session> {
    if (!id) {
      throw new ApiError(400, `no session id`);
    }
    const session = this.sessions[id];
    if (!session) {
      throw new ApiError(404, `session expired or not exists: ${id}`);
    }
    return session;
  }

  async getOrCreateSession(id): Promise<Session> {
    if (!this.sessions[id]) {
      const session = new Session({ id });
      this.sessions[id] = session;
      console.log(`[${this.id}] create session ${session.id}`);
    }
    return this.sessions[id];
  }

  tick() {
    if (this.shouldDispose?.(this)) {
      this.close('dispose');
      return;
    }

    this.clean();
    Object.values(this.sessions).forEach((v) => v.tick());

    this.tickTimeout = setTimeout(() => this.tick(), 30000);
    this.tickTimeout.unref?.();
  }

  clean() {
    console.log(`[${this.id}] cleaning sessions`);
    Object.values(this.sessions)
      .filter((v) => v.expired || v.peers.length === 0)
      .forEach((v) => this.closeSession(v));
  }

  async closeSession(v) {
    if (typeof v === 'string') {
      v = await this.getSession(v);
    }
    console.log(`[${this.id}] close session ${v.id}`);
    try {
      v.close();
    } finally {
      delete this.sessions[v.id];
    }
  }

  close(reason?) {
    console.log(`[${this.id}] close manager ${reason ?? ''}`);
    Object.values(this.sessions).forEach((v) => this.closeSession(v));
    clearTimeout(this.tickTimeout);
  }
}

const manager = new SessionManager();
manager.shouldDispose = (v) => manager !== v;

if (module['hot']) {
  module['hot'].dispose((data) => {
    console.log(`hmr dispose manager`);
    manager.close();
  });
  console.log(`hmr register disposer`);
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { peerId, sessionId } = req.query;

  if (!req.headers['accept']?.includes('text/event-stream')) {
    const session = await manager.getSession(sessionId);
    res.status(200).json(session.state.value);
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  const session = await manager.getOrCreateSession(isDev() ? sessionId ?? uuidv4() : uuidv4());
  await new Promise((resolve, reject) => {
    const leave = session.join({
      peerId,
      onChange(v) {
        res.write(`data: ${JSON.stringify(v)}\n\n`);
      },
      onClose(reason) {
        resolve();
      },
    });

    res.on('close', () => leave());
  });

  res.end();
};

// curl -Nv -H 'Accept: text/event-stream' localhost:3000/api/webrtc/session/test
// curl -X PUT -H "Content-Type: application/json" localhost:3000/api/webrtc/session/test --data '{"a":1}' -v
// curl -X PATCH -H "Content-Type: application/json" localhost:3000/api/webrtc/session/test --data '[{"op":"replace","path":["a"],"value":2}]' -v
//
// curl -Nv -H 'Accept: text/event-stream' https://wener-apis.herokuapp.com/api/webrtc/session
// curl -X PUT -H "Content-Type: application/json" https://wener-apis.herokuapp.com/api/webrtc/session/test --data '{"a":1}' -v
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  platformNotSupported('now');

  const { peerId, sessionId } = req.query;

  switch (req.method) {
    case 'GET': {
      await handleGet(req, res);
      break;
    }
    case 'PUT':
    case 'PATCH': {
      const session = await manager.getSession(sessionId);
      if (req.method === 'PUT') {
        session.put(req.body);
      } else {
        session.patch(req.body);
      }

      res.status(200).json({ message: 'success', expiredAt: session.expiredAt });
      break;
    }

    case 'DELETE':
      await manager.closeSession(sessionId);
      break;
    default:
      throw new ApiError(400, 'invalid request');
  }
};

export default flow([
  cors({
    origin: ['http://localhost:3000', 'https://apis.wener.me'],
  }),
  handleErrors(),
])(handler);
