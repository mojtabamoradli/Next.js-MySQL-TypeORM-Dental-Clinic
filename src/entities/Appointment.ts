import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 11, nullable: false })
  mobileNumber: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  date: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  createdAt: string;
}
