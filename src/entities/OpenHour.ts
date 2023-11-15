import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OpenHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: string;

  @Column()
  startAM: number;

  @Column()
  endAM: number;

  @Column()
  startPM: number;

  @Column()
  endPM: number;
}
