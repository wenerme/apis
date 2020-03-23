import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sougou_dict_cache_metas')
export class SougouDictCacheMetaEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;
  @PrimaryColumn({ type: 'int' })
  version: number;

  @Column('text', { nullable: false })
  name: string;
  @Column('text', { nullable: true })
  createdBy: string;
  @Column('datetime', {})
  updatedAt: Date;

  @Column('text', { nullable: true })
  type: string;

  @Column('text', { nullable: true })
  example: string;
  @Column('text', { nullable: true })
  description: string;

  @Column('int')
  size: number;
  @Column('int')
  count: number;

  @Column('int', { nullable: true })
  downloadCount: number;
  @Column('text', { nullable: true })
  downloadUrl: number;

  @Column('datetime', { nullable: true })
  fetchedAt: Date;

  @Column('text', { nullable: true })
  ipfsHash: string;
}
