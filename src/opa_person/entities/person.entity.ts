import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./opa_person.entity";
import { Order } from "../../order/entities/order.entity";
import { Table } from "../../table/entities/table.entity";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id?: number;

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
    user?: User;

    @OneToMany(() => Order, order => order.responsible)
    orders?: Order[];

    @ManyToOne(() => Table, table => table.persons)
    table?: Table;
    // table tava em user e deve estar em person pq user eh exclusivo so pra login
}
