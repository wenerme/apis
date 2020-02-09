import {AbstractPeerService, PeerData, PeerSessionData} from 'libs/webrtc/peer/PeerService';
import {EntityManager} from 'typeorm';
import {RtcPeerEntity, RtcPeerSessionEntity} from 'libs/webrtc/persist/schema';


export class PersistPeerService extends AbstractPeerService {
  em: EntityManager;

  async findPeerById(id): Promise<PeerData> {
    return this
      .em
      .getRepository(RtcPeerEntity)
      .findOne(id)
  }

  findSessionById(id): Promise<PeerSessionData> {
    return this
      .em
      .getRepository(RtcPeerSessionEntity)
      .findOne(id)
  }

  async pollInitialSessions({calleeId, updatedAt}): Promise<PeerSessionData[]> {
    return this.em.getRepository(RtcPeerSessionEntity)
      .createQueryBuilder()
      .select()
      .where({
        calleeId
      })
      .execute()
  }

  savePeer(v: PeerData): Promise<PeerData> {
    return this.em.getRepository(RtcPeerEntity).save(v)
  }

  saveSession(v: PeerSessionData): Promise<PeerSessionData> {
    return this.em.getRepository(RtcPeerSessionEntity).save(v)
  }
}
