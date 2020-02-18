import {NextApiRequest, NextApiResponse} from 'next'
import {parseRequestUrl} from 'libs/nexts/apis';
import {ApiError} from 'next/dist/next-server/server/api-utils';
import {BehaviorSubject} from 'rxjs';
import {handleErrors} from 'libs/nexts/middlewares/errors';
import {flow} from 'lodash';
import {addMinutes, min} from 'date-fns';


interface SessionInit {
  id
}

class Session {
  id: string;
  state = new BehaviorSubject<any>({});
  peers = []
  createdAt = new Date();
  expiredAt = addMinutes(new Date(), 3);
  uid = 0;

  constructor(init: SessionInit) {
    Object.assign(this, init)
  }

  get expired(): boolean {
    return this.expiredAt.getTime() < Date.now()
  }

  touch() {
    this.expiredAt = min([addMinutes(new Date(), 3), addMinutes(this.createdAt, 10)])
  }

  handle(body) {
    this.state.next(body);
    this.touch();
  }

  join({peerId = null, onChange, onClose = null}) {
    peerId = this.uid++;
    const sub = this.state.subscribe(v => {
      onChange(v)
    });

    const closer = () => {
      console.log(`[${this.id}]: peer leave ${peerId}`);

      sub.unsubscribe();
      const i = this.peers.findIndex(v => v.peerId === peerId);
      this.peers.splice(i, 1);

      onClose?.();
    };

    this.peers.push({peerId, closer});
    console.log(`[${this.id}]: peer join ${peerId}`);
    return closer
  }

  close(reason?) {
    this.peers.forEach(({closer, peerId}) => {
      try {
        closer()
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

  getSession(id): Session {
    const session = this.sessions[id];
    if (!session) {
      throw new ApiError(404, `session expired or not exists: ${id}`)
    }
    return session;
  }

  getOrCreateSession(id): Session {
    return this.sessions[id] = this.sessions[id] ?? new Session({id});
  }

  clean() {
    console.log(`cleaning sessions`);
    Object
      .values(this.sessions)
      .filter(v => v.expired || v.peers.length === 0)
      .forEach(v => this.closeSession(v))
  }

  closeSession(v) {
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

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const {peerId, sessionId} = req.query;
  let body = req.body;
  if (typeof body === 'string') {
    body = JSON.parse(body);
  }
  const session = manager.getSession(sessionId);
  session.handle(body);

  res.status(200).json({message: 'success', expiredAt: session.expiredAt})
};
const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', parseRequestUrl(req).origin);
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');

  const {peerId, sessionId} = req.query;
  const session = manager.getOrCreateSession(sessionId);

  await new Promise(((resolve, reject) => {
    const leave = session.join({
      peerId,
      onChange(v) {
        res.write(`data: ${JSON.stringify(v)}\n\n`)
      },
      onClose() {
        resolve();
      }
    });

    res.on('close', () => leave())
  }));

  res.write(`data: {"__type":"Close"}`);
  res.end();
};

// curl -Nv localhost:3000/api/webrtc/session/test
// curl -X POST -H "Content-Type: application/json" localhost:3000/api/webrtc/session/test --data '{"a":1}' -v
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      throw new ApiError(400, 'invalid request')
  }
};

export default flow([handleErrors()])(handler);
