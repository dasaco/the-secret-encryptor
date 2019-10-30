import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";

@Entity()
export class DataItem {
  @PrimaryGeneratedColumn()
  id: number;

}
