
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Product } from '../../../product/entities/product.entity';
import { Stock } from '../../../stock/entities/stock.entity';

/* tabela de produto que faz parte do produto final(por ex: queijo)
a gente coloca a quantidade (por ex:200), diz que o produto final é tal(linha 17)
e coloca a tabela estoque pra gente saber qual produto é(por ex queijo, e a unidade de medida é
KG, por ex, e coloca só a quantidade)
*/

@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.items, { onDelete: 'CASCADE'})
    product: Product;

    @ManyToOne(() => Stock, stock => stock.productItems, { eager: true })
    stock: Stock;

    @Column({ nullable: false, type: "int" })
    quantity: number;

    @Column({ nullable: true, type: "boolean", default: true })
    isPortion: boolean;

    @Column({ type: "varchar", nullable: true })
    measurementUnit: string;
}
