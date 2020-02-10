import {AbstractPeerService, PeerData, PeerSessionData} from 'libs/webrtc/peer/PeerService';
import {EntityManager, Equal, Raw} from 'typeorm';
import {RtcPeerEntity, RtcPeerSessionEntity} from 'libs/webrtc/persist/schema';


function mapPeerSessionEntity(e: RtcPeerSessionEntity): PeerSessionData {
  if (!e) {
    return null;
  }
  const {id, calleeId, callerId, state, data, expireAt, updatedAt} = e;
  return {id, calleeId, callerId, state, data, expireAt, updatedAt};
}

function mapPeerEntity(e: RtcPeerEntity): PeerData {
  if (!e) {
    return null;
  }
  const {id, name, profile, setting, expireAt, updatedAt} = e;
  return {id, name, profile, setting, expireAt, updatedAt};
}

export class PersistPeerService extends AbstractPeerService {
  em: EntityManager;

  async findPeerById(id): Promise<PeerData> {
    return this
      .em
      .getRepository(RtcPeerEntity)
      .findOne(id)
      .then(mapPeerEntity)
  }

  findSessionById(id): Promise<PeerSessionData> {
    return this
      .em
      .getRepository(RtcPeerSessionEntity)
      .findOne(id)
      .then(mapPeerSessionEntity)
  }

  async pollInitialSessions({calleeId, updatedAt}): Promise<PeerSessionData[]> {
    return this.em.getRepository(RtcPeerSessionEntity)
      .find({
        where: {
          expireAt: Raw(v => `${v} > current_timestamp`),
          // updatedAt: MoreThan(updatedAt),
          calleeId: Equal(calleeId),
        }
      })
      .then(v => {
        return v.map(mapPeerSessionEntity)
      })
  }

  savePeer(v: PeerData): Promise<PeerData> {
    return this.em.getRepository(RtcPeerEntity).save(v).then(mapPeerEntity)
  }

  saveSession(v: PeerSessionData): Promise<PeerSessionData> {
    return this.em.getRepository(RtcPeerSessionEntity).save(v).then(mapPeerSessionEntity)
  }
}
