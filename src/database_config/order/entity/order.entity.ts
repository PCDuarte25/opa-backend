import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalValue: number;

    @Column({ default: 'Pending' })
    status: string;

    @ManyToMany(() => Product, { cascade: true })
    @JoinTable()
    products: Product[];
}
