import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../../order/entities/order.entity";
import { Table } from "../../../table/entities/table.entity";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToMany(() => Order, order => order.bill, { eager: true })
    orders: Order[];

    @OneToOne(() => Table, table => table.bill, { eager: true })
    table: Table;
}