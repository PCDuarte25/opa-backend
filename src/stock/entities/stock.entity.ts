import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { ProductItem } from "../../database_config/productItems/entity/productItems.entity";
import { Restaurant } from "../../restaurant/entities/restaurant.entity";

export enum MeasurementUnit {
    UN = 'UN',
    G = 'G',
    KG = 'KG',
}

//tabela de cadastro de produto
@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100, unique: true, nullable: false, type: "varchar" })
    productDescription: string;

    @Column({ nullable: false, type: "decimal" })
    stockQuantity: number;

    @Column({ type: "enum", enum: MeasurementUnit, default: MeasurementUnit.G })
    measurementUnit: string

    @OneToMany(() => ProductItem, productItem => productItem.stock)
    productItems?: ProductItem[];

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.stockProducts)
    restaurant: Restaurant;

    @Column()
    type: string;
}

