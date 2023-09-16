
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductItems } from '../../product_items/entity/product_items.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ nullable: false, type: "float64" })
    price: number;

    @OneToMany(() => ProductItems, productItems => productItems.product)
    items: ProductItems[];
}
