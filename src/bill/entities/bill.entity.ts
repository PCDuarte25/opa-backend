import {
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Table } from '../../table/entities/table.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Order, (order) => order.bill, { eager: true })
  orders: Order[];

  @OneToOne(() => Table, (table) => table.bill)
  table: Table;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.bills)
  restaurant: Restaurant;
}
