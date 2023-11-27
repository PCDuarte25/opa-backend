
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductItem } from '../../product-item/entities/productItems.entity';

//tabela de produto final(por ex: file a parmegiana)
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, type: 'varchar' })
    name: string;

    @Column({ length: 50, type: 'varchar' })
    code: string;

    @Column({ nullable: false, type: "decimal" })
    price: number;

    @OneToMany(() => ProductItem, productItem => productItem.product)
    items: ProductItem[];
}
