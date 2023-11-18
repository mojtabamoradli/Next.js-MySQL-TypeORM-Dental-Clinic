import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  fullName: string;

  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  mobileNumber: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  createdAt: string;
}
