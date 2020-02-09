import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {PeerData, PeerSessionData, PeerSessionState} from 'libs/webrtc/peer/PeerService';


@Entity('rtc_peers')
export class RtcPeerEntity implements PeerData {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({type: 'text'})
  name: string;

  @Column({type: 'json', nullable: true})
  profile: object;
  @Column({type: 'json', nullable: true})
  setting: object;

  @Column({type: 'timestamptz'})
  expireAt: Date;

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt: Date;
  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date
}

@Entity('rtc_peer_sessions')
export class RtcPeerSessionEntity implements PeerSessionData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  callerId: string;
  @Column('uuid')
  calleeId: string;

  @Column({type: 'text'})
  state: PeerSessionState;

  @Column({type: 'json'})
  data: object;

  @Column({type: 'timestamptz'})
  expireAt: Date;
  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt: Date;
  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date
}

@Entity('webrtc_groups')
export class WebRtcGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({type: 'text', nullable: false})
  name: string;

  @Column({type: 'json', nullable: true})
  attachment: object;

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt: Date;
  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date
}

@Entity('webrtc_group_peers')
export class WeebRtcGroupPeerEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column({type: 'json', nullable: true})
  attachment: object;

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt: Date;
  @CreateDateColumn({type: 'timestamptz'})
  createdAt: Date
}
