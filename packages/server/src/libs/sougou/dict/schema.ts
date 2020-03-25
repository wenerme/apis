import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sougou_dict_metas')
export class SougouDictMetaEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;
  @Column('text', { nullable: false })
  name: string;
  @Column('text', { nullable: true })
  createdBy: string;
  @Column('timestamp', {
    // comment: 'Unix Timestamp',
    // transformer: {
    //   from(value: any): any {
    //     if (value instanceof Date) {
    //       return value;
    //     }
    //     return value ? new Date(value * 1000) : null
    //   },
    //   to(value: any): any {
    //     if (typeof value === 'number') {
    //       return value;
    //     }
    //     return value ? Math.fround(+(value as Date) / 1000) : null
    //   }
    // }
  })
  updatedAt: Date;
  @Column('int')
  size: number;
  @Column('int')
  count: number;
  @Column('int')
  downloadCount: number;
  @Column('int', { default: 0 })
  version: number;
}
