import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WaitingTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  waitingTime: string;
}
