import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClosedWeekDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  closedWeekDays: number[];
}
