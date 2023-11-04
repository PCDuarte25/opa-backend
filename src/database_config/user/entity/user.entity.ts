import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "../../../table/entities/table.entity";
import { Person } from "../../person/entity/person.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 255, unique: true, nullable: false, type: "varchar" })
    email: string;

    @Column({ length: 255, unique: true, nullable: false, type: "varchar" })
    username: string;

    @Column({ length: 255, unique: false, nullable: false, type: "varchar" })
    password: string;

    @OneToOne(() => Person, person => person.user)
    person?: Person;

    @ManyToOne(() => Table, table => table.users)
    table?: Table;
}
