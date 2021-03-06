import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sqlar')
export class SqlArEntity {
  @PrimaryColumn({ type: 'text' })
  name: string;
  @Column('int')
  mode: number;
  @Column('int')
  mtime: number;
  @Column('int', { name: 'sz' })
  size: number;
  // Buffer | string
  @Column('blob', { nullable: true })
  data: any;
}
