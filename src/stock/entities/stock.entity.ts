import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { ProductItem } from "../../database_config/productItems/entity/productItems.entity";

enum MeasurementUnit {
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
}

