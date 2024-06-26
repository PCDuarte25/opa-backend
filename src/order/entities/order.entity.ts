import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Table } from '../../table/entities/table.entity';
import { Bill } from '../../bill/entities/bill.entity';
import { User } from '../../opa_person/entities/user.entity';
import { Person } from '../../opa_person/entities/person.entity';
import { OrderStatus } from '../dto/create-order.dto';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalValue: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.EmAndamento })
  status: number;

  @ManyToOne(() => Table, { eager: false })
  table: Table;

  @ManyToMany(() => Person, (person) => person.orders, { eager: true })
  @JoinTable()
  people: Person[];

  @ManyToOne(() => Product, { cascade: false, eager: true })
  @JoinTable()
  product: Product;

  @ManyToOne(() => Bill, (account) => account.orders)
  bill: Bill;

  @ManyToOne(() => Person, (user) => user.orders, { eager: true })
  responsible: Person;

  @Column()
  checkouted: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;
}
