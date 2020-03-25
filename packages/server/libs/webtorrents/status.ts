import { Instance, Torrent } from 'webtorrent';

export interface InstanceStatus {
  nodeId;
  peerId;

  downloadSpeed;
  uploadSpeed;
  progress;
  ratio;

  // torrents: Record<string, TorrentStatus>
}

export type TorrentStatus = TorrentField;

export function setInstanceStatus(s: InstanceStatus, c: Instance) {
  s.nodeId = c['nodeId'];
  s.peerId = c['peerId'];

  s.downloadSpeed = c.downloadSpeed;
  s.uploadSpeed = c.uploadSpeed;
  s.progress = c.progress;
  s.ratio = c.ratio;

  // s.torrents = s.torrents ?? {}
  // c.torrents.forEach(v => {
  //   s.torrents[v.infoHash] = setTorrentStatus(s.torrents[v.infoHash] ?? {} as any, v)
  // })

  return s;
}

class TorrentField {
  readonly infoHash: string;
  readonly magnetURI: string;
  // readonly torrentFile: Buffer;
  readonly torrentFileBlobURL: string;
  // readonly files: TorrentFile[];
  readonly announce: string[];
  // readonly pieces: Array<TorrentPiece | null>;
  readonly timeRemaining: number;
  readonly received: number;
  readonly downloaded: number;
  readonly uploaded: number;
  readonly downloadSpeed: number;
  readonly uploadSpeed: number;
  readonly progress: number;
  readonly ratio: number;
  readonly length: number;
  readonly pieceLength: number;
  readonly lastPieceLength: number;
  readonly numPeers: number;
  readonly path: string;
  readonly ready: boolean;
  readonly paused: boolean;
  readonly done: boolean;
  readonly name: string;
  readonly created: Date;
  readonly createdBy: string;
  readonly comment: string;
  readonly maxWebConns: number;
}

const fields = Object.keys(TorrentField.prototype).filter((v) => !['constructor'].includes(v));

export function setTorrentStatus(s: TorrentStatus, c: Torrent) {
  fields.forEach((v) => (s[v] = c[v]));
  return s;
}
