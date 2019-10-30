import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class DataItem {
  @Column('text', { unique: true, primary: true })
  id: string;

  @Column('text')
  data: string;

  @Column('text')
  iv: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
