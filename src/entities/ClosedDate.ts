import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClosedDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  closedDates: number[];
}
