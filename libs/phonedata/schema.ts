import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';


@Entity('phonedata_record')
export class PhoneDataRecordEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column('text')
  province: string;
  @Column('text')
  city: string;
  @Column('text')
  zip: string;
  @Column('text')
  code: string;

  @Index('offset_uidx', {unique: true})
  @Column('int')
  offset: number
}

@Entity('phonedata_index')
export class PhoneDataIndexEntity {
  @PrimaryGeneratedColumn({type: 'int'})
  id: number;

  @Column('int')
  prefix: number;
  @Column('int')
  offset: number;
  @Column('int')
  recordOffset: number;
  @Column('text')
  vendor: string;
  @Column('int')
  vendorType: number;

  // @ManyToOne(type => PhoneDataRecordEntity, {eager: false, cascade: false, nullable: true, persistence: false})
  // @JoinColumn({name: 'record_offset', referencedColumnName: 'offset'})
  // record: PhoneDataRecordEntity;
}
