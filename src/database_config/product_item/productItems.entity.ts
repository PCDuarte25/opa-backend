import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Stock } from '../../stock/entities/stock.entity';

/* tabela de produto que faz parte do produto final(por ex: queijo)
a gente coloca a quantidade (por ex: 200), diz que o produto final é tal(linha 17)
e coloca a tabela estoque pra gente saber qual produto é(por ex queijo, e a unidade de medida é
KG, por ex, e coloca só a quantidade)
*/
export enum MeasurementUnit {
    UN = 'UN',
    G = 'G',
    KG = 'KG',
    PORTION = 'PORTION',
}
@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.items)
    product: Product;

    @ManyToOne(() => Stock, stock => stock.productItems, { eager: true })
    stock: Stock;

    @Column({ type: "enum", enum: MeasurementUnit, default: MeasurementUnit.G })
    measurementUnit: string;

    @Column({ nullable: false, type: "int" })
    quantity: number;

    @Column({ type: "boolean" })
    isPortion: boolean;
}
