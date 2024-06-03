import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductItem } from '../../database_config/productItems/entity/productItems.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

//tabela de produto final(por ex: file a parmegiana)
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column({ nullable: false, type: 'decimal' })
  price: number;

  @OneToMany(() => ProductItem, (productItem) => productItem.product, {
    cascade: true,
    eager: true,
  })
  items: ProductItem[];

  @Column()
  type: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products)
  restaurant: Restaurant;
}
