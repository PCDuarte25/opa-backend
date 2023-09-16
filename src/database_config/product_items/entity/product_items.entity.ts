
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Product } from '../../product/entity/product.entity';
import { Estoque } from '../../stock/entity/stock.entity';

@Entity()
export class ProductItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.items)
    @Column({ nullable: false })
    product: Product;

    @ManyToOne(() => Estoque, stock => stock.id)
    @Column({ nullable: false })
    Stock: Estoque;

    @Column({ nullable: false, type: "int" })
    quantity: number;
}
