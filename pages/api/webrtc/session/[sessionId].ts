import {NextApiRequest, NextApiResponse} from 'next'
import {ApiError} from 'next/dist/next-server/server/api-utils';
import {BehaviorSubject} from 'rxjs';
import {handleErrors} from 'libs/nexts/middlewares/errors';
import {flow} from 'lodash';
import {addMinutes, min} from 'date-fns';
import {applyPatches} from 'immer';
import {cors} from 'libs/nexts/middlewares/cors';
import uuidv4 from 'uuid/v4'
import {isDev} from 'utils/utils';

interface SessionInit {
  id
}

interface SessionPeer {
  peerId
  onClose?: (reason?) => void
  onChange: (o: any) => void
}

interface SessionData {
  id: string
  data: object
}

class Session {
  id: string;
  state: BehaviorSubject<SessionData>;
  peers: SessionPeer[] = []
  createdAt = new Date();
  expiredAt = addMinutes(new Date(), 5);
  uid = 1;

  keepaliveInterval

  constructor(init: SessionInit) {
    Object.assign(this, init);
    this.touch();
    this.state = new BehaviorSubject<any>({
      id: this.id,
      data: {},
      createdAt: this.createdAt,
      expiredAt: this.expiredAt,
    })

    this.keepaliveInterval = setInterval(() => {
      this.emit({type: 'Keepalive'});
    }, 30 * 1000)
  }

  get expired(): boolean {
    return this.expiredAt.getTime() < Date.now()
  }

  emit(body) {
    body = Object.assign(body, {id: this.id});
    let peers = this.peers;
    if (body.peerId) {
      peers = peers.filter(({peerId}) => peerId === body.peerId)
    }
    peers.forEach(({onChange, peerId}) => {
      try {
        onChange(body)
      } catch (e) {
        console.error(`[${this.id}]failed to send to ${peerId}`, e)
      }
    })
  }

  touch() {
    this.expiredAt = min([addMinutes(new Date(), 5), addMinutes(this.createdAt, 60)])
  }

  put(body) {
    this.touch();
    this.state.next(Object.assign(this.state.value, {data: body, expiredAt: this.expiredAt}));
  }

  patch(body) {
    if (!Array.isArray(body)) {
      this.put(Object.assign({}, this.state.value.data, body));
      return
    }

    const neo = applyPatches(this.state.value.data, body);
    if (this.state.value.data !== neo) {
      this.put(neo)
    } else {
      this.touch();
    }
  }

  join({peerId = null, onChange, onClose = null}) {
    peerId = this.uid++;
    const sub = this.state.subscribe(v => {
      onChange(Object.assign({}, v, {type: 'Data'}))
    });

    const closer = () => {
      console.log(`[${this.id}]: peer leave ${peerId}`);

      sub.unsubscribe();
      const i = this.peers.findIndex(v => v.peerId === peerId);
      this.peers.splice(i, 1);

      onClose?.('Leave');
    };

    this.peers.push({peerId, onClose: closer, onChange});
    console.log(`[${this.id}]: peer join ${peerId}`);
    return closer
  }

  close(reason?) {
    this.peers.forEach(({onClose, peerId}) => {
      try {
        onClose()
      } catch (e) {
        console.error(`failed to close ${peerId}`, e)
      }
    })
  }
}

class SessionManager {
  sessions: Record<string, Session> = {};
  cleanerInterval;

  constructor() {
    this.cleanerInterval = setInterval(() => {
      this.clean()
    }, 30000)
  }

  async getSession(id): Promise<Session> {
    if (!id) {
      throw new ApiError(400, `no session id`)
    }
    const session = this.sessions[id];
    if (!session) {
      throw new ApiError(404, `session expired or not exists: ${id}`)
    }
    return session;
  }

  async getOrCreateSession(id): Promise<Session> {
    return this.sessions[id] = this.sessions[id] ?? new Session({id});
  }

  clean() {
    console.log(`cleaning sessions`);
    Object
      .values(this.sessions)
      .filter(v => v.expired || v.peers.length === 0)
      .forEach(v => this.closeSession(v))
  }

  async closeSession(v) {
    if (typeof v === 'string') {
      v = await this.getSession(v);
    }
    console.log(`close session ${v.id}`);
    try {
      v.close();
    } finally {
      delete this.sessions[v.id];
    }
  }

  close() {
    Object.values(this.sessions).forEach(v => this.closeSession(v))
    clearInterval(this.cleanerInterval)
  }
}

const manager = new SessionManager();

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const {peerId, sessionId} = req.query;

  if (!req.headers['accept']?.includes('text/event-stream')) {
    const session = await manager.getSession(sessionId);
    res.status(200).json(session.state.value);
    return
  }

  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  const session = await manager.getOrCreateSession(isDev() ? (sessionId ?? uuidv4()) : uuidv4());
  await new Promise(((resolve, reject) => {
    const leave = session.join({
      peerId,
      onChange(v) {
        res.write(`data: ${JSON.stringify(v)}\n\n`)
      },
      onClose(reason) {
        resolve();
      }
    });

    res.on('close', () => leave())
  }));

  res.end();
};

// curl -Nv -H 'Accept: text/event-stream' localhost:3000/api/webrtc/session/test
// curl -X PUT -H "Content-Type: application/json" localhost:3000/api/webrtc/session/test --data '{"a":1}' -v
// curl -X PATCH -H "Content-Type: application/json" localhost:3000/api/webrtc/session/test --data '[{"op":"replace","path":["a"],"value":2}]' -v
//
// curl -Nv -H 'Accept: text/event-stream' https://wener.herokuapp.com/api/webrtc/session
// curl -X PUT -H "Content-Type: application/json" https://wener.herokuapp.com/api/webrtc/session/test --data '{"a":1}' -v
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {peerId, sessionId} = req.query;

  switch (req.method) {
    case 'GET': {
      await handleGet(req, res);
      break
    }
    case 'PUT':
    case 'PATCH': {
      const session = await manager.getSession(sessionId);
      if (req.method === 'PUT') {
        session.put(req.body);
      } else {
        session.patch(req.body);
      }

      res.status(200).json({message: 'success', expiredAt: session.expiredAt})
      break;
    }

    case 'DELETE':
      await manager.closeSession(sessionId);
      break;
    default:
      throw new ApiError(400, 'invalid request')
  }
};

export default flow([
  cors({
    origin: ['http://localhost:3000', 'https://apis.wener.me']
  }),
  handleErrors(),
])(handler);
