import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('sqlar')
export class SqlAr {
  @PrimaryColumn({type: 'text'})
  name: string;
  @Column('int')
  mode: number;
  @Column('int')
  mtime: number;
  @Column('int', {name: 'sz'})
  size: number;
  @Column('blob')
  data: number[]
}
