import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Table } from "../../table/entities/table.entity";
import { Order } from "../../order/entities/order.entity";

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
    person?: Relation<Person>;

    @ManyToOne(() => Table, table => table.users)
    table?: Relation<Table>;

    @OneToMany(() => Order, order => order.responsible)
    orders: Order[];
}

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 1 })
    gender: string;

    @Column({ length: 11 })
    cpf: string;

    @Column({ length: 70 })
    street: string;

    @Column({ length: 70 })
    neighborhood: string;

    @Column({ length: 6 })
    streetNumber: string;

    @Column({ length: 40 })
    complement: string;

    @Column({ length: 40 })
    city: string;

    @Column({ length: 40 })
    state: string;

    @Column({ length: 8 })
    cep: string;

    @Column({ length: 14 })
    phoneNumber: string;

    @Column({ type: 'date' })
    birthDate: string;

    @OneToOne(() => User, user => user.person)
    user: User;
}
