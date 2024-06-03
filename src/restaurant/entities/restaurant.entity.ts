import { Person } from 'src/opa_person/entities/person.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bill } from '../../bill/entities/bill.entity';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';
import { Table } from '../../table/entities/table.entity';
import { Stock } from '../../stock/entities/stock.entity';

export enum SegmentEnum {
  Bar = 1,
  Sweeties = 2,
  Traditional = 3,
  ToGo = 4,
  Bakery = 5,
}

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'enum', enum: SegmentEnum, default: SegmentEnum.Traditional })
  segment: number;

  @Column({ length: 14 })
  cnpj: string;

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

  @OneToOne(() => Person, (person) => person.restaurant)
  owner: Person;

  @OneToMany(() => Person, (person) => person.restaurant)
  emplooyes?: Person[];

  @OneToMany(() => Bill, (bill) => bill.restaurant)
  bills: Bill[];

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  @OneToMany(() => Stock, (stock) => stock.restaurant)
  stockProducts: Stock[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @OneToMany(() => Table, (table) => table.restaurant)
  tables: Table[];
}
