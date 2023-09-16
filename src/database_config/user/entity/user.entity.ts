import { Person } from "src/database_config/person/entity/person.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false, type: "varchar" })
  email: string;

  @Column({ length: 255, unique: true, nullable: false, type: "varchar" })
  username: string;

  @Column({ length: 255, unique: false, nullable: false, type: "varchar" })
  password: string;

  @OneToOne(() => Person, person => person.user)
  person: Person;
 }
