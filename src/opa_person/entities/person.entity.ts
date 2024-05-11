import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity";
import { Order } from "../../order/entities/order.entity";
import { Table } from "../../table/entities/table.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";

export enum OccupationEnum {
    Customer = 1,
    Waiter = 2,
    Adm = 3,
}

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

    @Column({ type: 'enum', enum: OccupationEnum, default: OccupationEnum.Adm })
    ocuppation: number;

    @OneToOne(() => User, user => user.person, { cascade: true })
    @JoinColumn({ referencedColumnName: "id", name: "user_id" })
    user?: User;

    @OneToMany(() => Order, order => order.responsible, { nullable: true, eager: false })
    orders?: Order[];

    @ManyToOne(() => Table, table => table.persons, { nullable: true, eager: false })
    table?: Table;

    @OneToMany(() => Table, table => table.persons, { nullable: true, eager: false })
    waiterTables?: Table[];

    @OneToMany(() => Restaurant, restaurant => restaurant.owner)
    restaurant: Restaurant[];
    // table tava em user e deve estar em person pq user eh exclusivo so pra login
}
